/*
VynixC Gamemode — Framework Kainure
Criadora do Kainure: AlderGrounds
Organização Oficial: VynixC (https://github.com/VynixC)
Framework: https://github.com/aldergrounds/kainure
*/
const { playerState } = require('./player');
const DB = require('./db');
const { resolvePlayerIdByName } = require('./resolve');

function registerAdmin() {
  const Perms = {
    MANAGE_ROLES: 1 << 0,
    MUTE: 1 << 1,
    TP: 1 << 2,
    SET_SKIN: 1 << 3,
    GIVE_WEAPON: 1 << 4,
    BAN: 1 << 5,
    BAN_IP: 1 << 6,
    UNBAN: 1 << 7
  };
  const Level = {
    jogador: 0,
    ajudante: 1,
    moderador: 2,
    administrador: 3,
    supervisor: 4,
    gerente: 5,
    coordenador: 6,
    'sub dono': 7,
    subdono: 7,
    fundador: 8
  };
  const Roles = {
    jogador: 0,
    ajudante: Perms.MUTE,
    moderador: Perms.MUTE | Perms.TP | Perms.BAN,
    administrador: Perms.MANAGE_ROLES | Perms.MUTE | Perms.TP | Perms.SET_SKIN | Perms.GIVE_WEAPON | Perms.BAN | Perms.BAN_IP,
    supervisor: Perms.MANAGE_ROLES | Perms.MUTE | Perms.TP | Perms.SET_SKIN | Perms.GIVE_WEAPON | Perms.BAN | Perms.BAN_IP,
    gerente: Perms.MANAGE_ROLES | Perms.MUTE | Perms.TP | Perms.SET_SKIN | Perms.GIVE_WEAPON | Perms.BAN | Perms.BAN_IP | Perms.UNBAN,
    coordenador: Perms.MANAGE_ROLES | Perms.MUTE | Perms.TP | Perms.SET_SKIN | Perms.GIVE_WEAPON | Perms.BAN | Perms.BAN_IP | Perms.UNBAN,
    'sub dono': Perms.MANAGE_ROLES | Perms.MUTE | Perms.TP | Perms.SET_SKIN | Perms.GIVE_WEAPON | Perms.BAN | Perms.BAN_IP | Perms.UNBAN,
    subdono: Perms.MANAGE_ROLES | Perms.MUTE | Perms.TP | Perms.SET_SKIN | Perms.GIVE_WEAPON | Perms.BAN | Perms.BAN_IP | Perms.UNBAN,
    fundador: Perms.MANAGE_ROLES | Perms.MUTE | Perms.TP | Perms.SET_SKIN | Perms.GIVE_WEAPON | Perms.BAN | Perms.BAN_IP | Perms.UNBAN
  };
  const muted = new Map();
  function getCargo(playerid) {
    const st = playerState.get(playerid) || {};
    return String(st.cargo || 'jogador').toLowerCase();
  }
  function getLevelByCargo(cargo) {
    const c = String(cargo || '').toLowerCase();
    return Level[c] ?? 0;
  }
  function setCargoByName(nome, cargo) {
    const pid = resolvePlayerIdByName(nome);
    if (pid !== -1) {
      const st = playerState.get(pid) || {};
      st.cargo = cargo;
      playerState.set(pid, st);
    }
    return DB.dbUpdateCargo(nome, cargo);
  }
  function hasPerm(playerid, perm) {
    const role = getCargo(playerid);
    const mask = Roles[role] ?? 0;
    return (mask & perm) !== 0;
  }
  function hasLevelAtLeast(playerid, minLevel) {
    const lvl = getLevelByCargo(getCargo(playerid));
    return lvl >= minLevel;
  }
  Public('OnPlayerText', (playerid, text = "s") => {
    const until = muted.get(playerid);
    if (until && Date.now() < until) {
      try { Native.SendClientMessage(playerid, 0xFF0000FF, 'Você está mutado.'); } catch {}
      return 0;
    }
    if (until && Date.now() >= until) muted.delete(playerid);
    return 1;
  });
  Command('setcargo', (playerid, params) => {
    if (!hasPerm(playerid, Perms.MANAGE_ROLES)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Sem permissão');
      return;
    }
    const parts = String(params || '').trim().split(' ');
    const nome = parts[0];
    const cargo = String(parts[1] || '').toLowerCase();
    if (!nome || !cargo || !(cargo in Roles)) {
      Native.SendClientMessage(playerid, -1, 'Uso: /setcargo [nome] [jogador|moderador|admin|dono]');
      return;
    }
    setCargoByName(nome, cargo).then(() => {
      Native.SendClientMessage(playerid, 0x00FF00FF, `Cargo de ${nome} definido para ${cargo}`);
    }).catch(() => {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Erro ao definir cargo');
    });
  });
  Command('cargo', (playerid) => {
    const role = getCargo(playerid);
    Native.SendClientMessage(playerid, -1, `Seu cargo: ${role}`);
  });
  Command('aa', (playerid) => {
    const role = getCargo(playerid);
    const mask = Roles[role] ?? 0;
    const list = [];
    if (mask & Perms.MANAGE_ROLES) list.push('/setcargo');
    if (mask & Perms.MUTE) list.push('/mute');
    if (mask & Perms.TP) list.push('/tp');
    if (mask & Perms.SET_SKIN) list.push('/setskin');
    if (mask & Perms.GIVE_WEAPON) list.push('/dararma');
    if (mask & Perms.BAN) list.push('/ban');
    if (mask & Perms.BAN_IP) list.push('/banip');
    if (mask & Perms.UNBAN) list.push('/unban');
    Native.SendClientMessage(playerid, -1, `Comandos: ${list.join(', ') || 'nenhum'}`);
  });
  Command('ban', (playerid, params) => {
    if (!hasLevelAtLeast(playerid, 2)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Sem permissão para banir');
      return;
    }
    const tokens = String(params || '').trim().split(' ');
    const target = tokens[0];
    const timeStr = tokens[1] || 'perma';
    const motivo = tokens.slice(2).join(' ') || 'Sem motivo';
    if (!target) {
      Native.SendClientMessage(playerid, -1, 'Uso: /ban [id|nome] [minutos|perma] [motivo]');
      return;
    }
    const id = parseInt(target, 10);
    let name = null;
    let ip = null;
    if (!isNaN(id)) {
      const nameRef = Ref("");
      const ipRef = Ref("");
      try {
        Native.GetPlayerName(id, nameRef, MAX_PLAYER_NAME);
        Native.GetPlayerIp(id, ipRef, 16);
      } catch {}
      name = String(nameRef[0] || '').trim() || null;
      ip = String(ipRef[0] || '').trim() || null;
    } else {
      name = target;
      const pid = resolvePlayerIdByName(name);
      if (pid !== -1) {
        const ipRef = Ref("");
        try { Native.GetPlayerIp(pid, ipRef, 16); } catch {}
        ip = String(ipRef[0] || '').trim() || null;
      }
    }
    const mins = timeStr.toLowerCase() === 'perma' ? null : parseInt(timeStr, 10);
    const expires_at = mins && !isNaN(mins) ? new Date(Date.now() + mins * 60000) : null;
    const { banInsert } = require('./db');
    banInsert({ player_name: name, player_id: isNaN(id) ? null : id, ip, motivo, expires_at, created_by: getCargo(playerid) }).then(() => {
      try { if (!isNaN(id)) Native.Kick(id); } catch {}
      Native.SendClientMessage(playerid, -1, `Ban aplicado: ${name || ip} ${mins ? `${mins} min` : 'permanente'}`);
    }).catch(() => {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Erro ao banir');
    });
  });
  Command('banip', (playerid, params) => {
    if (!hasLevelAtLeast(playerid, 3)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Sem permissão para banir por IP');
      return;
    }
    const tokens = String(params || '').trim().split(' ');
    const target = tokens[0];
    const timeStr = tokens[1] || 'perma';
    const motivo = tokens.slice(2).join(' ') || 'Sem motivo';
    if (!target) {
      Native.SendClientMessage(playerid, -1, 'Uso: /banip [idfixo|nick] [minutos|perma] [motivo]');
      return;
    }
    let ip = null;
    const fixedId = parseInt(target, 10);
    const { dbFindById, dbFindByName } = require('./db');
    const resolveIp = () => {
      if (!isNaN(fixedId)) {
        return dbFindById(fixedId).then(p => p && p.last_ip ? p.last_ip : null);
      }
      return dbFindByName(target).then(p => p && p.last_ip ? p.last_ip : null);
    };
    resolveIp().then((foundIp) => {
      ip = foundIp;
      if (!ip) {
        Native.SendClientMessage(playerid, 0xFF0000FF, 'IP não encontrado para o alvo');
        return;
      }
      const mins = timeStr.toLowerCase() === 'perma' ? null : parseInt(timeStr, 10);
      const expires_at = mins && !isNaN(mins) ? new Date(Date.now() + mins * 60000) : null;
      const { banInsert } = require('./db');
      const nameForRecord = isNaN(fixedId) ? target : null;
      banInsert({ player_name: nameForRecord, player_id: isNaN(fixedId) ? null : fixedId, ip, motivo, expires_at, created_by: getCargo(playerid) }).then(() => {
        Native.SendClientMessage(playerid, -1, `Ban IP aplicado: ${ip} ${mins ? `${mins} min` : 'permanente'}`);
      }).catch(() => {
        Native.SendClientMessage(playerid, 0xFF0000FF, 'Erro ao banir IP');
      });
    });
  });
  Command('unban', (playerid, params) => {
    if (!hasLevelAtLeast(playerid, 5)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Sem permissão para desbanir');
      return;
    }
    const nome = String(params || '').trim();
    if (!nome) {
      Native.SendClientMessage(playerid, -1, 'Uso: /unban [nick]');
      return;
    }
    const { banRemoveByName } = require('./db');
    banRemoveByName(nome).then(() => {
      Native.SendClientMessage(playerid, -1, `Desbanido: ${nome}`);
    }).catch(() => {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Erro ao desbanir');
    });
  });
  Command('mute', (playerid, params) => {
    if (!hasPerm(playerid, Perms.MUTE)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Sem permissão');
      return;
    }
    const parts = String(params || '').trim().split(' ');
    const id = parseInt(parts[0], 10);
    const mins = Math.max(0, parseInt(parts[1] || '5', 10));
    if (isNaN(id)) {
      Native.SendClientMessage(playerid, -1, 'Uso: /mute [id] [minutos]');
      return;
    }
    const until = Date.now() + mins * 60000;
    muted.set(id, until);
    Native.SendClientMessage(playerid, -1, `Jogador ${id} mutado por ${mins} min`);
    try { Native.SendClientMessage(id, 0xFF0000FF, `Você foi mutado por ${mins} min`); } catch {}
  });
  Command('tp', (playerid, params) => {
    if (!hasPerm(playerid, Perms.TP)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Sem permissão');
      return;
    }
    const parts = String(params || '').trim().split(' ');
    const id = parseInt(parts[0], 10);
    if (isNaN(id)) {
      Native.SendClientMessage(playerid, -1, 'Uso: /tp [id]');
      return;
    }
    const x = Ref(0.0), y = Ref(0.0), z = Ref(0.0), a = Ref(0.0);
    try {
      Native.GetPlayerPos(id, x, y, z);
      Native.GetPlayerFacingAngle(id, a);
      Native.SetPlayerPos(playerid, Float(x[0]), Float(y[0]), Float(z[0]));
      Native.SetPlayerFacingAngle(playerid, Float(a[0]));
      Native.SendClientMessage(playerid, -1, `Teleportado para ${id}`);
    } catch {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Falha ao teleportar');
    }
  });
  Command('setskin', (playerid, params) => {
    if (!hasPerm(playerid, Perms.SET_SKIN)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Sem permissão');
      return;
    }
    const parts = String(params || '').trim().split(' ');
    const id = parseInt(parts[0], 10);
    const skin = parseInt(parts[1], 10);
    if (isNaN(id) || isNaN(skin)) {
      Native.SendClientMessage(playerid, -1, 'Uso: /setskin [id] [skin]');
      return;
    }
    try {
      Native.SetPlayerSkin(id, skin);
      Native.SendClientMessage(playerid, -1, `Skin do ${id} atualizada para ${skin}`);
    } catch {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Falha ao atualizar skin');
    }
  });
  Command('dararma', (playerid, params) => {
    if (!hasPerm(playerid, Perms.GIVE_WEAPON)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Sem permissão');
      return;
    }
    const parts = String(params || '').trim().split(' ');
    const id = parseInt(parts[0], 10);
    const weapon = parseInt(parts[1], 10);
    const ammo = Math.max(0, parseInt(parts[2] || '50', 10));
    if (isNaN(id) || isNaN(weapon)) {
      Native.SendClientMessage(playerid, -1, 'Uso: /givew [id] [arma] [munição]');
      return;
    }
    try {
      Native.GivePlayerWeapon(id, weapon, ammo);
      Native.SendClientMessage(playerid, -1, `Arma ${weapon} dada a ${id} (${ammo} munição)`);
    } catch {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Falha ao dar arma');
    }
  });
}
module.exports = registerAdmin;
