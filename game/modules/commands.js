/*
VynixC Gamemode — Framework Kainure
Criadora do Kainure: AlderGrounds
Organização Oficial: VynixC (https://github.com/VynixC)
Framework: https://github.com/aldergrounds/kainure
*/
const { giveDefaultWeapons, playerState } = require('./player');
const { dbInsertOrUpdate } = require('./db');
const { exec } = require('node:child_process');

function registerCommands() {


  Command('pegararma', (playerid, params) => {
    giveDefaultWeapons(playerid);
  });

    Command('cv', (playerid, params) => {
    const PosX = Ref(0.1), PosY = Ref(0.1), PosZ = Ref(0.1), PosR = Ref(0.1);
    let VeiculoCriado;
    const IdVeiculo = { value: 0 };
    const Cor1 = { value: 0 };
    const Cor2 = { value: 0 };
    if (!Command_Params(params, "iii", IdVeiculo, Cor1, Cor2)) {
      Native.SendClientMessage(playerid, -1, "Use -> /cv [ID VEICULO] [COR1] [COR2]");
      return;
    }
    if (IdVeiculo.value < 400 || IdVeiculo.value > 611) {
      Native.SendClientMessage(playerid, 0xFF0000FF, "ID do Veículo inválido (deve ser entre 400 e 611).");
      return;
    }
    Native.GetPlayerPos(playerid, PosX, PosY, PosZ);
    Native.GetPlayerFacingAngle(playerid, PosR);
    VeiculoCriado = Native.CreateVehicle(IdVeiculo.value, PosX[0], PosY[0], PosZ[0], PosR[0], Cor1.value, Cor2.value, 0, 0);
    Native.PutPlayerInVehicle(playerid, VeiculoCriado, 0);
    Native.SendClientMessage(playerid, -1, `Veiculo criado com sucesso! ID: ${VeiculoCriado}`);
  });
  
  Alias_Command('cv', 'veh');

  Command('skin', (playerid, params) => {
    const parts = String(params || '').trim().split(' ');
    const skin = parseInt(parts[0], 10);
    if (isNaN(skin)) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Uso: /skin [id]');
      return;
    }
    Native.SetPlayerSkin(playerid, skin);
    const st = playerState.get(playerid) || {};
    st.skin = skin;
    playerState.set(playerid, st);
    if (st.nome) {
      try {
        const { dbUpdateSkin } = require('./db');
        dbUpdateSkin(st.nome, skin);
      } catch {}
    }
    Native.SendClientMessage(playerid, 0x00FF00FF, 'Skin atualizada');
  });
  
  Command('id', (playerid, params) => {
    const arg = String(params || '').trim();
    let target = playerid;
    if (arg) {
      const maybeId = parseInt(arg, 10);
      if (!isNaN(maybeId)) {
        target = maybeId;
      } else {
        try {
          const { resolvePlayerIdByName } = require('./resolve');
          const pid = resolvePlayerIdByName(arg);
          if (pid !== -1) target = pid;
        } catch {}
      }
    }
    const nameRef = Ref("");
    try { Native.GetPlayerName(target, nameRef, MAX_PLAYER_NAME); } catch {}
    const nome = String(nameRef[0] || '').trim();
    const st = playerState.get(target) || {};
    const level = st.level || 1;
    const idfixo = st.db_id || null;
    const org = st.org || '';
    const verRef = Ref("");
    let plataforma = 'PC';
    try {
      Native.GetPlayerVersion(target, verRef, 32);
      const v = String(verRef[0] || '').toLowerCase();
      if (v.includes('android') || v.includes('mobile') || v.includes('ios')) plataforma = 'Mobile';
    } catch {}
    Native.SendClientMessage(playerid, -1, `Nome: ${nome || 'N/A'} | Level: ${level} | ID Fixo: ${idfixo ?? 'N/A'} | Plataforma: ${plataforma} | Org/Corp: ${org || 'Nenhuma'}`);
  });
}

module.exports = registerCommands;
