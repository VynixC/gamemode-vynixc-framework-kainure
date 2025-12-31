const Event_Emitter = require('node:events');
const path = require('node:path');
const fs = require('node:fs');

class Kainure_Core extends Event_Emitter {
    constructor() {
        super();

        this.call_public = null;
        this.native = {};
        this.signatures = new Map();
    }

    Public(event_name, callback) {
        if (typeof event_name !== 'string' || typeof callback !== 'function')
            throw new Error("Invalid arguments for Public. Expected (string, function).");

        const fn = callback.toString();
        let signature = "";
        const args_match = fn.match(/^[^(]*\(([^)]*)\)/);

        if (args_match && args_match[1]) {
            const params = args_match[1].split(',');

            for (const param of params) {
                if (param.trim().length === 0)
                    continue;
                
                const match = param.match(/=\s*['"]([a-zA-Z0-9]+)['"]/);

                if (match) {
                    const type_char = match[1].toLowerCase();

                    if (type_char === 'f')
                        signature += 'f';
                    else if (type_char === 's')
                        signature += 's';
                    else {
                        console.warn(
                            `[Kainure]:[Warning]: Unnecessary signature type '${type_char}' in Public '${event_name}'. ` +
                            `Only 'f' (Float) and 's' (String) need to be specified. ` +
                            `Integers and Booleans are handled automatically.`);
                            
                        signature += 'i';
                    }
                }
                else
                    signature += 'i';
            }
        }

        if (signature.length > 0)
            this.signatures.set(event_name, signature);

        this.on(event_name, callback);
    }
}

const kainure = new Kainure_Core();
globalThis.Kainure = kainure;

globalThis.Float = (value) => ({
    __type: 'float',
    value: value,
    toString() {
        return String(this.value);
    },
    valueOf() {
        return this.value;
    }
});

const Ref_Symbol = Symbol('kainure_ref');

globalThis.Ref = (initial_value = 0) => {
    const ref_array = [initial_value];
    
    Object.defineProperty(ref_array, Ref_Symbol, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
    });
    
    return ref_array;
};

const Is_Ref = (value) => {
    return Array.isArray(value) && value[Ref_Symbol] === true;
};

globalThis.Public = (event_name, callback) => {
    kainure.Public(event_name, callback);
};

globalThis.Call_Public = new Proxy({}, {
    get(_, prop) {
        return (...args) => {
            if (!kainure.call_public)
                throw new Error('"call_public" not initialized by C++ yet.');

            const processed_args = args.map(arg => Is_Ref(arg) ? arg[0] : arg);
            
            return kainure.call_public(String(prop), ...processed_args);
        };
    }
});

const Native_Proxy_Cache = new WeakMap();

globalThis.Native = new Proxy(kainure.native, {
    get(target, prop) {
        if (!Reflect.has(target, prop))
            throw new ReferenceError(`The native '${String(prop)}' was not found.`);
        
        const original_native = Reflect.get(target, prop);
        
        if (Native_Proxy_Cache.has(original_native)) {
            return Native_Proxy_Cache.get(original_native);
        }
        
        const wrapped_native = new Proxy(original_native, {
            apply(target_fn, this_arg, args) {
                let has_arrays = false;
                for (let i = 0; i < args.length; i++) {
                    if (Array.isArray(args[i])) {
                        has_arrays = true;
                        break;
                    }
                }
                
                if (!has_arrays) {
                    return Reflect.apply(target_fn, this_arg, args);
                }
                
                let ref_count = 0;
                let total_params = args.length;
                
                for (let i = 0; i < total_params; i++) {
                    if (Is_Ref(args[i])) {
                        ref_count++;
                    }
                }
                
                if (ref_count === 0) {
                    return Reflect.apply(target_fn, this_arg, args);
                }
                
                let all_arrays_are_refs = true;
                for (let i = 0; i < total_params; i++) {
                    if (Array.isArray(args[i]) && !Is_Ref(args[i])) {
                        all_arrays_are_refs = false;
                        break;
                    }
                }
                
                if (all_arrays_are_refs) {
                    return Reflect.apply(target_fn, this_arg, args);
                }
                
                const processed_args = new Array(total_params);
                
                for (let i = 0; i < total_params; i++) {
                    processed_args[i] = Is_Ref(args[i]) ? args[i][0] : args[i];
                }
                
                return Reflect.apply(target_fn, this_arg, processed_args);
            }
        });
        
        Native_Proxy_Cache.set(original_native, wrapped_native);
        
        return wrapped_native;
    }
});

globalThis.Native_Hook = (native_name, callback) => {
    if (typeof native_name !== 'string' || typeof callback !== 'function')
        throw new Error("Usage: Native_Hook(string, function)");

    if (globalThis.Kainure_Register_Native_Hook)
        globalThis.Kainure_Register_Native_Hook(native_name, callback);
    else
        throw new Error("Native Hook system not initialized.");
};

globalThis.Include_Storage = (folder_name) => {
    if (typeof folder_name !== 'string' || folder_name.trim().length === 0)
        throw new Error("Include_Storage: 'folder_name' must be a non-empty string.");

    const safe_name = folder_name.replace(/[^a-zA-Z0-9_-]/g, '_');
    
    if (safe_name !== folder_name) {
        console.warn(
            `[Kainure]:[Warning]: Include name '${folder_name}' was sanitized to '${safe_name}'. ` +
            `Use only letters, numbers, underscore and hyphen.`
        );
    }

    const storage_base = path.resolve(process.cwd(), 'Kainure', 'includes_storage');
    const include_storage_path = path.join(storage_base, safe_name);

    try {
        if (!fs.existsSync(include_storage_path))
            fs.mkdirSync(include_storage_path, { recursive: true });
    }
    catch (error) {
        throw new Error(`Include_Storage: Failed to create directory '${include_storage_path}': ${error.message}`);
    }

    return include_storage_path;
};

globalThis.Kainure_Emit_Event = (name, ...args) => {
    const listeners = kainure.listeners(name);

    if (listeners.length === 0)
        return undefined;

    let last_result;

    for (const listener of listeners)
        last_result = listener(...args);

    return last_result;
};

globalThis.Kainure_Has_Listeners = (name) => {
    return kainure.listenerCount(name) > 0;
};

globalThis.Kainure_Get_Signature = (name) => {
    return kainure.signatures.get(name) || "";
};

module.exports = kainure;