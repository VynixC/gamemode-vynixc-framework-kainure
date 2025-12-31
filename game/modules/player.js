/*
VynixC Gamemode — Framework Kainure
Criadora do Kainure: AlderGrounds
Organização Oficial: VynixC (https://github.com/VynixC)
Framework: https://github.com/aldergrounds/kainure
*/
const { exec } = require('node:child_process');
const { dbInsertOrUpdate, dbUpdateArmas } = require('./db');
const playerState = new Map();
const spawnPos = { x: 1682.7471, y: -2241.0029, z: 13.5469, a: 178.8375 };
const dialogs = {
  chooseAuth: 1000,
  loginPass: 1001,
  registerGender: 1003,
  registerAge: 1004,
  registerPassword: 1005
};

function applyLoadout(playerid) {
  const st = playerState.get(playerid) || {};
  const skin = st.skin || 0;
  try {
    if (Array.isArray(st.armas)) {
      for (const w of st.armas) {
        const id = parseInt((w && w.id), 10);
        const ammo = parseInt((w && w.ammo) || 0, 10);
        if (!isNaN(id) && ammo > 0)
          Native.GivePlayerWeapon(playerid, id, ammo);
      }
    }
    Native.SetPlayerSkin(playerid, skin);
  } catch {}
}

function setSpawn(playerid) {
  Native.SetPlayerPos(playerid, Float(spawnPos.x), Float(spawnPos.y), Float(spawnPos.z));
  Native.SetPlayerFacingAngle(playerid, Float(spawnPos.a));
}

function giveDefaultWeapons(playerid) {
  try {
    Native.GivePlayerWeapon(playerid, WEAPON_DEAGLE, 50);
    Native.GivePlayerWeapon(playerid, WEAPON_M4, 150);
    Native.SendClientMessage(playerid, 0x00FF00FF, 'Armas adicionadas');
    const st = playerState.get(playerid) || {};
    const armas = [{ id: WEAPON_DEAGLE, ammo: 50 }, { id: WEAPON_M4, ammo: 150 }];
    if (st.nome) dbUpdateArmas(st.nome, armas);
  } catch {}
}

module.exports = {
  playerState,
  spawnPos,
  dialogs,
  applyLoadout,
  setSpawn,
  giveDefaultWeapons
};
