/* ============================================================================ *
 * Kainure - Node.js Framework for SA-MP (San Andreas Multiplayer)              *
 * ================================= About ==================================== *
 *                                                                              *
 * Kainure embeds Node.js runtime into SA-MP servers, enabling developers       *
 * to write gamemodes using modern JavaScript/TypeScript with full access       *
 * to the Node.js ecosystem, async/await, npm packages, and native SA-MP        *
 * functions through automatic bindings.                                        *
 *                                                                              *
 * =============================== Copyright ================================== *
 *                                                                              *
 * Copyright (c) 2025, AlderGrounds                                             *
 * All rights reserved.                                                         *
 *                                                                              *
 * Repository: https://github.com/aldergrounds/kainure                          *
 *                                                                              *
 * ================================ License =================================== *
 *                                                                              *
 * Licensed under the Apache License, Version 2.0 (the "License");              *
 * you may not use this file except in compliance with the License.             *
 * You may obtain a copy of the License at:                                     *
 *                                                                              *
 *     http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                              *
 * Unless required by applicable law or agreed to in writing, software          *
 * distributed under the License is distributed on an "AS IS" BASIS,            *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.     *
 * See the License for the specific language governing permissions and          *
 * limitations under the License.                                               *
 *                                                                              *
 * ============================================================================ */

// General Limits and Invalid IDs
declare const MAX_PLAYER_NAME: number;
declare const MAX_PLAYERS: number;
declare const MAX_VEHICLES: number;
declare const MAX_ACTORS: number;
declare const MAX_OBJECTS: number;
declare const MAX_GANG_ZONES: number;
declare const MAX_TEXT_DRAWS: number;
declare const MAX_PLAYER_TEXT_DRAWS: number;
declare const MAX_MENUS: number;
declare const MAX_3DTEXT_GLOBAL: number;
declare const MAX_3DTEXT_PLAYER: number;
declare const MAX_PICKUPS: number;
declare const MAX_PLAYER_ATTACHED_OBJECTS: number;
declare const MAX_CHATBUBBLE_LENGTH: number;

declare const INVALID_PLAYER_ID: number;
declare const INVALID_VEHICLE_ID: number;
declare const INVALID_ACTOR_ID: number;
declare const INVALID_OBJECT_ID: number;
declare const INVALID_MENU: number;
declare const INVALID_TEXT_DRAW: number;
declare const INVALID_GANG_ZONE: number;
declare const INVALID_3DTEXT_ID: number;

declare const NO_TEAM: number;

// Player States and Actions
declare const PLAYER_STATE_NONE: number;
declare const PLAYER_STATE_ONFOOT: number;
declare const PLAYER_STATE_DRIVER: number;
declare const PLAYER_STATE_PASSENGER: number;
declare const PLAYER_STATE_EXIT_VEHICLE: number;
declare const PLAYER_STATE_ENTER_VEHICLE_DRIVER: number;
declare const PLAYER_STATE_ENTER_VEHICLE_PASSENGER: number;
declare const PLAYER_STATE_WASTED: number;
declare const PLAYER_STATE_SPAWNED: number;
declare const PLAYER_STATE_SPECTATING: number;

declare const SPECIAL_ACTION_NONE: number;
declare const SPECIAL_ACTION_DUCK: number;
declare const SPECIAL_ACTION_USEJETPACK: number;
declare const SPECIAL_ACTION_ENTER_VEHICLE: number;
declare const SPECIAL_ACTION_EXIT_VEHICLE: number;
declare const SPECIAL_ACTION_DANCE1: number;
declare const SPECIAL_ACTION_DANCE2: number;
declare const SPECIAL_ACTION_DANCE3: number;
declare const SPECIAL_ACTION_DANCE4: number;
declare const SPECIAL_ACTION_HANDSUP: number;
declare const SPECIAL_ACTION_USECELLPHONE: number;
declare const SPECIAL_ACTION_SITTING: number;
declare const SPECIAL_ACTION_STOPUSECELLPHONE: number;
declare const SPECIAL_ACTION_DRINK_BEER: number;
declare const SPECIAL_ACTION_SMOKE_CIGGY: number;
declare const SPECIAL_ACTION_DRINK_WINE: number;
declare const SPECIAL_ACTION_DRINK_SPRUNK: number;
declare const SPECIAL_ACTION_CUFFED: number;
declare const SPECIAL_ACTION_CARRY: number;

declare const FIGHT_STYLE_NORMAL: number;
declare const FIGHT_STYLE_BOXING: number;
declare const FIGHT_STYLE_KUNGFU: number;
declare const FIGHT_STYLE_KNEEHEAD: number;
declare const FIGHT_STYLE_GRABKICK: number;
declare const FIGHT_STYLE_ELBOW: number;

// Player Keys
declare const KEY_ACTION: number;
declare const KEY_CROUCH: number;
declare const KEY_FIRE: number;
declare const KEY_SPRINT: number;
declare const KEY_SECONDARY_ATTACK: number;
declare const KEY_JUMP: number;
declare const KEY_LOOK_RIGHT: number;
declare const KEY_HANDBRAKE: number;
declare const KEY_LOOK_LEFT: number;
declare const KEY_SUBMISSION: number;
declare const KEY_LOOK_BEHIND: number;
declare const KEY_WALK: number;
declare const KEY_ANALOG_UP: number;
declare const KEY_ANALOG_DOWN: number;
declare const KEY_ANALOG_LEFT: number;
declare const KEY_ANALOG_RIGHT: number;
declare const KEY_YES: number;
declare const KEY_NO: number;
declare const KEY_CTRL_BACK: number;

declare const KEY_UP: number;
declare const KEY_DOWN: number;
declare const KEY_LEFT: number;
declare const KEY_RIGHT: number;

// Weapons and Skills
declare const WEAPON_BRASSKNUCKLE: number;
declare const WEAPON_GOLFCLUB: number;
declare const WEAPON_NITESTICK: number;
declare const WEAPON_KNIFE: number;
declare const WEAPON_BAT: number;
declare const WEAPON_SHOVEL: number;
declare const WEAPON_POOLSTICK: number;
declare const WEAPON_KATANA: number;
declare const WEAPON_CHAINSAW: number;
declare const WEAPON_DILDO: number;
declare const WEAPON_DILDO2: number;
declare const WEAPON_VIBRATOR: number;
declare const WEAPON_VIBRATOR2: number;
declare const WEAPON_FLOWER: number;
declare const WEAPON_CANE: number;
declare const WEAPON_GRENADE: number;
declare const WEAPON_TEARGAS: number;
declare const WEAPON_MOLTOV: number;
declare const WEAPON_COLT45: number;
declare const WEAPON_SILENCED: number;
declare const WEAPON_DEAGLE: number;
declare const WEAPON_SHOTGUN: number;
declare const WEAPON_SAWEDOFF: number;
declare const WEAPON_SHOTGSPA: number;
declare const WEAPON_UZI: number;
declare const WEAPON_MP5: number;
declare const WEAPON_AK47: number;
declare const WEAPON_M4: number;
declare const WEAPON_TEC9: number;
declare const WEAPON_RIFLE: number;
declare const WEAPON_SNIPER: number;
declare const WEAPON_ROCKETLAUNCHER: number;
declare const WEAPON_HEATSEEKER: number;
declare const WEAPON_FLAMETHROWER: number;
declare const WEAPON_MINIGUN: number;
declare const WEAPON_SATCHEL: number;
declare const WEAPON_BOMB: number;
declare const WEAPON_SPRAYCAN: number;
declare const WEAPON_FIREEXTINGUISHER: number;
declare const WEAPON_CAMERA: number;
declare const WEAPON_PARACHUTE: number;
declare const WEAPON_VEHICLE: number;
declare const WEAPON_DROWN: number;
declare const WEAPON_COLLISION: number;

declare const WEAPONSKILL_PISTOL: number;
declare const WEAPONSKILL_PISTOL_SILENCED: number;
declare const WEAPONSKILL_DESERT_EAGLE: number;
declare const WEAPONSKILL_SHOTGUN: number;
declare const WEAPONSKILL_SAWNOFF_SHOTGUN: number;
declare const WEAPONSKILL_SPAS12_SHOTGUN: number;
declare const WEAPONSKILL_MICRO_UZI: number;
declare const WEAPONSKILL_MP5: number;
declare const WEAPONSKILL_AK47: number;
declare const WEAPONSKILL_M4: number;
declare const WEAPONSKILL_SNIPERRIFLE: number;

declare const WEAPONSTATE_UNKNOWN: number;
declare const WEAPONSTATE_NO_BULLETS: number;
declare const WEAPONSTATE_LAST_BULLET: number;
declare const WEAPONSTATE_MORE_BULLETS: number;
declare const WEAPONSTATE_RELOADING: number;

// Vehicles
declare const CARMODTYPE_SPOILER: number;
declare const CARMODTYPE_HOOD: number;
declare const CARMODTYPE_ROOF: number;
declare const CARMODTYPE_SIDESKIRT: number;
declare const CARMODTYPE_LAMPS: number;
declare const CARMODTYPE_NITRO: number;
declare const CARMODTYPE_EXHAUST: number;
declare const CARMODTYPE_WHEELS: number;
declare const CARMODTYPE_STEREO: number;
declare const CARMODTYPE_HYDRAULICS: number;
declare const CARMODTYPE_FRONT_BUMPER: number;
declare const CARMODTYPE_REAR_BUMPER: number;
declare const CARMODTYPE_VENT_RIGHT: number;
declare const CARMODTYPE_VENT_LEFT: number;

declare const VEHICLE_PARAMS_UNSET: number;
declare const VEHICLE_PARAMS_OFF: number;
declare const VEHICLE_PARAMS_ON: number;

declare const VEHICLE_MODEL_INFO_SIZE: number;
declare const VEHICLE_MODEL_INFO_FRONTSEAT: number;
declare const VEHICLE_MODEL_INFO_REARSEAT: number;
declare const VEHICLE_MODEL_INFO_PETROLCAP: number;
declare const VEHICLE_MODEL_INFO_WHEELSFRONT: number;
declare const VEHICLE_MODEL_INFO_WHEELSREAR: number;
declare const VEHICLE_MODEL_INFO_WHEELSMID: number;
declare const VEHICLE_MODEL_INFO_FRONT_BUMPER_Z: number;
declare const VEHICLE_MODEL_INFO_REAR_BUMPER_Z: number;

// Dialogs, Menus, and UI
declare const DIALOG_STYLE_MSGBOX: number;
declare const DIALOG_STYLE_INPUT: number;
declare const DIALOG_STYLE_LIST: number;
declare const DIALOG_STYLE_PASSWORD: number;
declare const DIALOG_STYLE_TABLIST: number;
declare const DIALOG_STYLE_TABLIST_HEADERS: number;

declare const TEXT_DRAW_FONT_SPRITE_DRAW: number;
declare const TEXT_DRAW_FONT_MODEL_PREVIEW: number;

// Objects
declare const OBJECT_MATERIAL_SIZE_32x32: number;
declare const OBJECT_MATERIAL_SIZE_64x32: number;
declare const OBJECT_MATERIAL_SIZE_64x64: number;
declare const OBJECT_MATERIAL_SIZE_128x32: number;
declare const OBJECT_MATERIAL_SIZE_128x64: number;
declare const OBJECT_MATERIAL_SIZE_128x128: number;
declare const OBJECT_MATERIAL_SIZE_256x32: number;
declare const OBJECT_MATERIAL_SIZE_256x64: number;
declare const OBJECT_MATERIAL_SIZE_256x128: number;
declare const OBJECT_MATERIAL_SIZE_256x256: number;
declare const OBJECT_MATERIAL_SIZE_512x64: number;
declare const OBJECT_MATERIAL_SIZE_512x128: number;
declare const OBJECT_MATERIAL_SIZE_512x256: number;
declare const OBJECT_MATERIAL_SIZE_512x512: number;

declare const OBJECT_MATERIAL_TEXT_ALIGN_LEFT: number;
declare const OBJECT_MATERIAL_TEXT_ALIGN_CENTER: number;
declare const OBJECT_MATERIAL_TEXT_ALIGN_RIGHT: number;

// Events and Callbacks
declare const CLICK_SOURCE_SCOREBOARD: number;

declare const EDIT_RESPONSE_CANCEL: number;
declare const EDIT_RESPONSE_FINAL: number;
declare const EDIT_RESPONSE_UPDATE: number;

declare const SELECT_OBJECT_GLOBAL_OBJECT: number;
declare const SELECT_OBJECT_PLAYER_OBJECT: number;

declare const BULLET_HIT_TYPE_NONE: number;
declare const BULLET_HIT_TYPE_PLAYER: number;
declare const BULLET_HIT_TYPE_VEHICLE: number;
declare const BULLET_HIT_TYPE_OBJECT: number;
declare const BULLET_HIT_TYPE_PLAYER_OBJECT: number;

// Variables (PVars/SVars)
declare const PLAYER_VARTYPE_NONE: number;
declare const PLAYER_VARTYPE_INT: number;
declare const PLAYER_VARTYPE_STRING: number;
declare const PLAYER_VARTYPE_FLOAT: number;

declare const SERVER_VARTYPE_NONE: number;
declare const SERVER_VARTYPE_INT: number;
declare const SERVER_VARTYPE_STRING: number;
declare const SERVER_VARTYPE_FLOAT: number;

// Others
declare const PLAYER_MARKERS_MODE_OFF: number;
declare const PLAYER_MARKERS_MODE_GLOBAL: number;
declare const PLAYER_MARKERS_MODE_STREAMED: number;

declare const MAPICON_LOCAL: number;
declare const MAPICON_GLOBAL: number;
declare const MAPICON_LOCAL_CHECKPOINT: number;
declare const MAPICON_GLOBAL_CHECKPOINT: number;

declare const CAMERA_CUT: number;
declare const CAMERA_MOVE: number;

declare const SPECTATE_MODE_NORMAL: number;
declare const SPECTATE_MODE_FIXED: number;
declare const SPECTATE_MODE_SIDE: number;

declare const PLAYER_RECORDING_TYPE_NONE: number;
declare const PLAYER_RECORDING_TYPE_DRIVER: number;
declare const PLAYER_RECORDING_TYPE_ONFOOT: number;

declare const HTTP_GET: number;
declare const HTTP_POST: number;
declare const HTTP_HEAD: number;

declare const HTTP_ERROR_BAD_HOST: number;
declare const HTTP_ERROR_NO_SOCKET: number;
declare const HTTP_ERROR_CANT_CONNECT: number;
declare const HTTP_ERROR_CANT_WRITE: number;
declare const HTTP_ERROR_CONTENT_TOO_BIG: number;
declare const HTTP_ERROR_MALFORMED_RESPONSE: number;