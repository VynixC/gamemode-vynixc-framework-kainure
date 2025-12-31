/*
VynixC Gamemode — Framework Kainure
Criadora do Kainure: AlderGrounds
Organização Oficial: VynixC (https://github.com/VynixC)
Framework: https://github.com/aldergrounds/kainure
*/
const path = require('node:path');
const fs = require('node:fs');
let mysqlPool = null;
let useMemoryStore = false;
let memoryStore = new Map();
const DB_FILE = path.join(__dirname, '..', 'players.json');
function ensureDbFile() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ players: [], bans: [] }));
  }
}
function query(sql, params, cb) {
  if (!mysqlPool) return cb && cb(new Error('no_pool'));
  mysqlPool.query(sql, params || [], cb || (() => {}));
}
function readJsonPlayers() {
  ensureDbFile();
  const raw = fs.readFileSync(DB_FILE, 'utf8');
  const data = JSON.parse(raw || '{}');
  return Array.isArray(data.players) ? data.players : [];
}
function writeJsonPlayers(players) {
  ensureDbFile();
  const raw = fs.readFileSync(DB_FILE, 'utf8');
  let data = {};
  try { data = JSON.parse(raw || '{}'); } catch { data = {}; }
  const bans = Array.isArray(data.bans) ? data.bans : [];
  fs.writeFileSync(DB_FILE, JSON.stringify({ players, bans }, null, 2));
}
function readJsonBans() {
  ensureDbFile();
  const raw = fs.readFileSync(DB_FILE, 'utf8');
  const data = JSON.parse(raw || '{}');
  return Array.isArray(data.bans) ? data.bans : [];
}
function writeJsonBans(bans) {
  ensureDbFile();
  const raw = fs.readFileSync(DB_FILE, 'utf8');
  let data = {};
  try { data = JSON.parse(raw || '{}'); } catch { data = {}; }
  const players = Array.isArray(data.players) ? data.players : [];
  fs.writeFileSync(DB_FILE, JSON.stringify({ players, bans }, null, 2));
}
function initDb() {
  try {
    let mysql;
    try {
      mysql = require('mysql2');
    } catch {
      mysql = require(path.join(__dirname, '..', '..', 'site', 'node_modules', 'mysql2'));
    }
    const host = process.env.DB_HOST || 'localhost';
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASS || '';
    const database = process.env.DB_NAME || 'vynixc-db';
    mysqlPool = mysql.createPool({ host, user, password, database, waitForConnections: true, connectionLimit: 5, queueLimit: 0 });
    const fallback = () => {
      useMemoryStore = true;
      ensureDbFile();
      const list = readJsonPlayers();
      for (const p of list) memoryStore.set(p.nome.toLowerCase(), p);
    };
    mysqlPool.getConnection((err, conn) => {
      if (err) {
        fallback();
        return;
      }
      conn.release();
      mysqlPool.query(
        'CREATE TABLE IF NOT EXISTS players (' +
        'id INT AUTO_INCREMENT PRIMARY KEY,' +
        'nome VARCHAR(32) UNIQUE,' +
        'senha VARCHAR(128),' +
        'idade INT,' +
        'level INT DEFAULT 1,' +
        'skin INT DEFAULT 0,' +
        'conta_registrada TINYINT(1) DEFAULT 0,' +
        'ultimo_login DATETIME,' +
        'rg VARCHAR(32),' +
        'sexo ENUM("masculino","feminino") DEFAULT "masculino",' +
        'armas TEXT,' +
        'last_ip VARCHAR(64) DEFAULT NULL' +
        ')',
        (e) => { if (e) fallback(); }
      );
      mysqlPool.query('ALTER TABLE players ADD COLUMN cargo VARCHAR(32) DEFAULT "jogador"', (e) => { if (e) {} });
      mysqlPool.query('ALTER TABLE players ADD COLUMN org VARCHAR(64) DEFAULT NULL', (e) => { if (e) {} });
      mysqlPool.query(
        'CREATE TABLE IF NOT EXISTS bans (' +
        'id INT AUTO_INCREMENT PRIMARY KEY,' +
        'player_name VARCHAR(32) DEFAULT NULL,' +
        'player_id INT DEFAULT NULL,' +
        'ip VARCHAR(64) DEFAULT NULL,' +
        'motivo TEXT,' +
        'expires_at DATETIME DEFAULT NULL,' +
        'created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,' +
        'created_by VARCHAR(32) DEFAULT NULL' +
        ')',
        (e) => { if (e) fallback(); }
      );
      mysqlPool.query(
        'CREATE TABLE IF NOT EXISTS player_presence (' +
        'player_id INT PRIMARY KEY,' +
        'online TINYINT(1) NOT NULL DEFAULT 0,' +
        'last_seen DATETIME' +
        ')',
        (e) => { if (e) fallback(); }
      );
      
      mysqlPool.query(
        'CREATE TABLE IF NOT EXISTS player_stats (' +
        'player_id INT PRIMARY KEY,' +
        'fome INT NOT NULL DEFAULT 100,' +
        'sede INT NOT NULL DEFAULT 100,' +
        'sono INT NOT NULL DEFAULT 100,' +
        'vida INT NOT NULL DEFAULT 100,' +
        'colete INT NOT NULL DEFAULT 100,' +
        'updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' +
        ')',
        (e) => { if (e) fallback(); }
      );
    });
  } catch (e) {
    useMemoryStore = true;
    ensureDbFile();
    const list = readJsonPlayers();
    for (const p of list) memoryStore.set(p.nome.toLowerCase(), p);
  }
}
function dbFindByName(nome) {
  const key = String(nome).toLowerCase();
  if (useMemoryStore) {
    return Promise.resolve(memoryStore.get(key) || null);
  }
  return new Promise((resolve, reject) => {
    mysqlPool.query('SELECT * FROM players WHERE nome = ?', [nome], (err, rows) => {
      if (err) return reject(err);
      resolve(rows && rows[0] ? rows[0] : null);
    });
  });
}
function dbInsertOrUpdate(player) {
  if (useMemoryStore) {
    memoryStore.set(String(player.nome).toLowerCase(), player);
    writeJsonPlayers(Array.from(memoryStore.values()));
    return Promise.resolve();
  }
  const sql = 'INSERT INTO players (nome, senha, idade, level, skin, conta_registrada, ultimo_login, rg, sexo, armas, cargo, org, last_ip) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?) ' +
              'ON DUPLICATE KEY UPDATE senha=VALUES(senha), idade=VALUES(idade), level=VALUES(level), skin=VALUES(skin), conta_registrada=VALUES(conta_registrada), ultimo_login=VALUES(ultimo_login), rg=VALUES(rg), sexo=VALUES(sexo), armas=VALUES(armas), cargo=VALUES(cargo), org=VALUES(org), last_ip=VALUES(last_ip)';
  const serializeArmas = (val) => {
    if (!val) return '[]';
    if (Array.isArray(val)) return JSON.stringify(val);
    if (typeof val === 'string') return val;
    try { return JSON.stringify(val); } catch { return '[]'; }
  };
  const params = [player.nome, player.senha, player.idade, player.level || 1, player.skin || 0, player.conta_registrada ? 1 : 0, player.rg || '', player.sexo || 'masculino', serializeArmas(player.armas), player.cargo || 'jogador', player.org || null, player.last_ip || null];
  return new Promise((resolve, reject) => {
    mysqlPool.query(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
function presenceUpsert(playerId, online) {
  if (!mysqlPool) return Promise.resolve();
  const sql = 'INSERT INTO player_presence (player_id, online, last_seen) VALUES (?, ?, NOW()) ' +
              'ON DUPLICATE KEY UPDATE online=VALUES(online), last_seen=VALUES(last_seen)';
  return new Promise((resolve) => {
    mysqlPool.query(sql, [playerId, online ? 1 : 0], () => resolve());
  });
}
function presenceUpsertByName(nome, online) {
  if (!mysqlPool) return Promise.resolve();
  return new Promise((resolve) => {
    mysqlPool.query('SELECT id FROM players WHERE nome = ?', [nome], (err, rows) => {
      const id = rows && rows[0] ? rows[0].id : null;
      if (!id) return resolve();
      presenceUpsert(id, online).then(resolve);
    });
  });
}
function dbUpdateArmas(nome, armas) {
  if (useMemoryStore) {
    const key = String(nome).toLowerCase();
    const p = memoryStore.get(key);
    if (p) {
      p.armas = armas;
      writeJsonPlayers(Array.from(memoryStore.values()));
    }
    return Promise.resolve();
  }
  const sql = 'UPDATE players SET armas = ? WHERE nome = ?';
  const params = [Array.isArray(armas) ? JSON.stringify(armas) : (typeof armas === 'string' ? armas : '[]'), nome];
  return new Promise((resolve, reject) => {
    mysqlPool.query(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
function dbUpdateIp(nome, ip) {
  if (!mysqlPool) return Promise.resolve();
  const sql = 'UPDATE players SET last_ip = ? WHERE nome = ?';
  return new Promise((resolve) => {
    mysqlPool.query(sql, [ip, nome], () => resolve());
  });
}
function dbUpdateSkin(nome, skin) {
  if (useMemoryStore) {
    const key = String(nome).toLowerCase();
    const p = memoryStore.get(key);
    if (p) {
      p.skin = skin;
      writeJsonPlayers(Array.from(memoryStore.values()));
    }
    return Promise.resolve();
  }
  const sql = 'UPDATE players SET skin = ? WHERE nome = ?';
  return new Promise((resolve, reject) => {
    mysqlPool.query(sql, [skin, nome], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
function dbFindById(id) {
  const idNum = parseInt(id, 10);
  if (useMemoryStore) {
    const list = Array.from(memoryStore.values());
    const found = list.find(p => parseInt(p.id, 10) === idNum) || null;
    return Promise.resolve(found);
  }
  return new Promise((resolve, reject) => {
    mysqlPool.query('SELECT * FROM players WHERE id = ?', [idNum], (err, rows) => {
      if (err) return reject(err);
      resolve(rows && rows[0] ? rows[0] : null);
    });
  });
}
function statsUpsertByName(nome, stats) {
  if (!mysqlPool) return Promise.resolve();
  return new Promise((resolve) => {
    mysqlPool.query('SELECT id FROM players WHERE nome = ?', [nome], (err, rows) => {
      const id = rows && rows[0] ? rows[0].id : null;
      if (!id) return resolve();
      const s = stats || {};
      const fome = Number(s.fome ?? 100);
      const sede = Number(s.sede ?? 100);
      const sono = Number(s.sono ?? 100);
      const vida = Number(s.vida ?? 100);
      const colete = Number(s.colete ?? 100);
      const up = 'INSERT INTO player_stats (player_id, fome, sede, sono, vida, colete, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW()) ' +
                 'ON DUPLICATE KEY UPDATE fome=VALUES(fome), sede=VALUES(sede), sono=VALUES(sono), vida=VALUES(vida), colete=VALUES(colete), updated_at=VALUES(updated_at)';
      mysqlPool.query(up, [id, fome, sede, sono, vida, colete], () => resolve());
    });
  });
}
function banInsert(ban) {
  if (useMemoryStore) {
    const bans = readJsonBans();
    bans.push({
      player_name: ban.player_name || null,
      player_id: ban.player_id || null,
      ip: ban.ip || null,
      motivo: ban.motivo || '',
      expires_at: ban.expires_at ? new Date(ban.expires_at).toISOString() : null,
      created_at: new Date().toISOString(),
      created_by: ban.created_by || null
    });
    writeJsonBans(bans);
    return Promise.resolve();
  }
  const sql = 'INSERT INTO bans (player_name, player_id, ip, motivo, expires_at, created_by) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [ban.player_name || null, ban.player_id || null, ban.ip || null, ban.motivo || '', ban.expires_at || null, ban.created_by || null];
  return new Promise((resolve, reject) => {
    mysqlPool.query(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
function banFindActive(player_name, ip) {
  if (useMemoryStore) {
    const list = readJsonBans();
    const now = Date.now();
    const match = list.find(b => {
      const exp = b.expires_at ? Date.parse(b.expires_at) : null;
      const active = exp === null || exp > now;
      if (!active) return false;
      const byName = player_name && b.player_name && String(b.player_name).toLowerCase() === String(player_name).toLowerCase();
      const byIp = ip && b.ip && String(b.ip) === String(ip);
      return byName || byIp;
    });
    return Promise.resolve(match || null);
  }
  const sql = 'SELECT * FROM bans WHERE (player_name = ? OR ip = ?) AND (expires_at IS NULL OR expires_at > NOW()) ORDER BY id DESC LIMIT 1';
  return new Promise((resolve) => {
    mysqlPool.query(sql, [player_name || null, ip || null], (err, rows) => {
      resolve(rows && rows[0] ? rows[0] : null);
    });
  });
}
function banRemoveByTarget(target) {
  if (useMemoryStore) {
    const list = readJsonBans();
    const filtered = list.filter(b => {
      if (!target) return true;
      const t = String(target).toLowerCase();
      const byName = b.player_name && String(b.player_name).toLowerCase() === t;
      const byIp = b.ip && String(b.ip) === target;
      return !(byName || byIp);
    });
    writeJsonBans(filtered);
    return Promise.resolve();
  }
  const sql = 'DELETE FROM bans WHERE player_name = ? OR ip = ?';
  return new Promise((resolve) => {
    mysqlPool.query(sql, [target || null, target || null], () => resolve());
  });
}
function banRemoveByName(nome) {
  if (useMemoryStore) {
    const list = readJsonBans();
    const filtered = list.filter(b => !(b.player_name && String(b.player_name).toLowerCase() === String(nome).toLowerCase()));
    writeJsonBans(filtered);
    return Promise.resolve();
  }
  const sql = 'DELETE FROM bans WHERE player_name = ?';
  return new Promise((resolve) => {
    mysqlPool.query(sql, [nome || null], () => resolve());
  });
}
function dbUpdateCargo(nome, cargo) {
  if (useMemoryStore) {
    const key = String(nome).toLowerCase();
    const p = memoryStore.get(key) || { nome };
    p.cargo = cargo;
    memoryStore.set(key, p);
    writeJsonPlayers(Array.from(memoryStore.values()));
    return Promise.resolve();
  }
  const sql = 'UPDATE players SET cargo = ? WHERE nome = ?';
  return new Promise((resolve, reject) => {
    mysqlPool.query(sql, [cargo, nome], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
function dbGetCargo(nome) {
  if (useMemoryStore) {
    const key = String(nome).toLowerCase();
    const p = memoryStore.get(key);
    return Promise.resolve(p && p.cargo ? p.cargo : 'jogador');
  }
  return new Promise((resolve, reject) => {
    mysqlPool.query('SELECT cargo FROM players WHERE nome = ?', [nome], (err, rows) => {
      if (err) return reject(err);
      const c = rows && rows[0] ? rows[0].cargo : null;
      resolve(c || 'jogador');
    });
  });
}
module.exports = {
  initDb,
  dbFindByName,
  dbFindById,
  dbInsertOrUpdate,
  presenceUpsert,
  presenceUpsertByName,
  dbUpdateArmas,
  dbUpdateIp,
  dbUpdateSkin,
  statsUpsertByName,
  query,
  dbUpdateCargo,
  dbGetCargo,
  banInsert,
  banFindActive,
  banRemoveByTarget,
  banRemoveByName
};
