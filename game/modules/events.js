/*
VynixC Gamemode — Framework Kainure
Criadora do Kainure: AlderGrounds
Organização Oficial: VynixC (https://github.com/VynixC)
Framework: https://github.com/aldergrounds/kainure
*/
const { initDb, dbFindByName, dbInsertOrUpdate, presenceUpsert, presenceUpsertByName, dbUpdateIp } = require('./db');
const { playerState, dialogs, applyLoadout, setSpawn } = require('./player');


function hash(value) {
  const crypto = require('node:crypto');
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}
function registerEvents() {

  Public('OnGameModeInit', () => {
    console.log('[GameMode] OnGameModeInit disparado em JS');
    Native.UsePlayerPedAnims();
    Native.SetGameModeText('VynixC');
  });
  
  Public('OnGameModeInit', () => {
    initDb();
    return 1;
  });

  Public('OnPlayerConnect', (playerid) => {
    const nameRef = Ref("");
    try {
      Native.GetPlayerName(playerid, nameRef, MAX_PLAYER_NAME);
    } catch {}
    const pname = String(nameRef[0] || '').trim();
    playerState.set(playerid, { step: 'auth', nome: pname, sexo: 'masculino', idade: 18, senha: '', rg: '', skin: 0, armas: [], cargo: 'jogador' });
    presenceUpsertByName(pname, 1);
    try {
      const ipRef = Ref("");
      Native.GetPlayerIp(playerid, ipRef, 16);
      const ip = String(ipRef[0] || '').trim();
      if (ip) dbUpdateIp(pname, ip);
      const { banFindActive } = require('./db');
      banFindActive(pname, ip).then((ban) => {
        if (ban) {
          try { Native.SendClientMessage(playerid, 0xFF0000FF, 'Você está banido.'); } catch {}
          try { Native.Kick(playerid); } catch {}
        }
      });
    } catch {}
    Native.ShowPlayerDialog(playerid, dialogs.chooseAuth, DIALOG_STYLE_LIST, 'Autenticação', 'Login\nRegistrar', 'Selecionar', 'Sair');
    return 1;
  });

  Public('OnPlayerSpawn', (playerid) => {
    setSpawn(playerid);
    applyLoadout(playerid);
    const st = playerState.get(playerid) || {};
    playerState.set(playerid, st);
    if (st.nome) presenceUpsertByName(st.nome, 1);
    return 1;
  });

  Public('OnPlayerDisconnect', (playerid, reason) => {
    const st = playerState.get(playerid) || {};
    if (st.db_id) {
      presenceUpsert(st.db_id, 0);
    } else if (st.nome) {
      presenceUpsertByName(st.nome, 0);
    }
    playerState.delete(playerid);
    return 1;
  });

  Public('OnPlayerText', (playerid, text = "s") => {
    return 1;
  });
  Public('OnPlayerCommandText', (playerid, cmdtext = "s") => {
    const txt = String(cmdtext || '');
    if (!txt.startsWith('/')) return 1;
    if (!globalThis.Kainure_Command_Processed_Last) {
      Native.SendClientMessage(playerid, 0xFF0000FF, 'Comando desconhecido. Use /ajuda');
    }
    return 1;
  });
  setInterval(() => {
    for (const [, st] of playerState.entries()) {
      if (st && st.db_id) {
        presenceUpsert(st.db_id, 1);
      } else if (st && st.nome) {
        presenceUpsertByName(st.nome, 1);
      }
    }
  }, 60000);
  

  Public('OnDialogResponse', (playerid, dialogid, response, listitem, inputtext = "s") => {
    if (!response) return 1;
    const st = playerState.get(playerid) || {};
    if (dialogid === dialogs.chooseAuth) {
      if (listitem === 0) {
        Native.ShowPlayerDialog(playerid, dialogs.loginPass, DIALOG_STYLE_INPUT, 'Login', 'Digite sua senha', 'Entrar', 'Voltar');
      } else {
        Native.ShowPlayerDialog(playerid, dialogs.registerGender, DIALOG_STYLE_LIST, 'Sexo', 'Masculino\nFeminino', 'Continuar', 'Sair');
      }
      return 1;
    }
    if (dialogid === dialogs.loginPass) {
      const senhaHash = hash(inputtext || '');
      dbFindByName(st.nome || '')
        .then((p) => {
          if (!p) {
            Native.SendClientMessage(playerid, 0xFF0000FF, 'Conta não encontrada. Prosseguindo para registro.');
            Native.ShowPlayerDialog(playerid, dialogs.registerGender, DIALOG_STYLE_LIST, 'Sexo', 'Masculino\nFeminino', 'Continuar', 'Sair');
            return;
          }
          if (String(p.senha) !== String(senhaHash)) {
            Native.SendClientMessage(playerid, 0xFF0000FF, 'Senha incorreta');
            Native.ShowPlayerDialog(playerid, dialogs.loginPass, DIALOG_STYLE_INPUT, 'Login', 'Digite sua senha', 'Entrar', 'Voltar');
            return;
          }
          st.nome = p.nome;
          st.db_id = p.id;
          st.skin = p.skin || 0;
          st.idade = p.idade || 18;
          st.level = p.level || 1;
          st.sexo = p.sexo || 'masculino';
          st.conta_registrada = p.conta_registrada ? 1 : 0;
          try { st.armas = JSON.parse(p.armas || '[]'); } catch { st.armas = []; }
          st.cargo = p.cargo || 'jogador';
          st.org = p.org || '';
          playerState.set(playerid, st);
          dbInsertOrUpdate({ ...p, ultimo_login: new Date(), conta_registrada: 1 });
          presenceUpsert(p.id, 1);
          Native.SendClientMessage(playerid, 0x00FF00FF, 'Login efetuado');
          Native.SpawnPlayer(playerid);
          applyLoadout(playerid);
        })
        .catch(() => {
          Native.SendClientMessage(playerid, 0xFF0000FF, 'Erro no login');
        });
      return 1;
    }
    if (dialogid === dialogs.registerGender) {
      st.sexo = listitem === 1 ? 'feminino' : 'masculino';
      playerState.set(playerid, st);
      Native.ShowPlayerDialog(playerid, dialogs.registerAge, DIALOG_STYLE_INPUT, 'Idade', 'Digite sua idade (18-60)', 'Continuar', 'Voltar');
      return 1;
    }
    if (dialogid === dialogs.registerAge) {
      const idade = parseInt(String(inputtext || '').trim(), 10);
      if (isNaN(idade) || idade < 18 || idade > 60) {
        Native.SendClientMessage(playerid, 0xFF0000FF, 'Idade inválida (18–60)');
        Native.ShowPlayerDialog(playerid, dialogs.registerAge, DIALOG_STYLE_INPUT, 'Idade', 'Digite sua idade (18-60)', 'Continuar', 'Voltar');
        return 1;
      }
      st.idade = idade;
      playerState.set(playerid, st);
      Native.ShowPlayerDialog(playerid, dialogs.registerPassword, DIALOG_STYLE_INPUT, 'Senha', 'Defina uma senha', 'Continuar', 'Voltar');
      return 1;
    }
    if (dialogid === dialogs.registerPassword) {
      st.senha = hash(inputtext || '');
      st.rg = '';
      st.skin = st.sexo === 'feminino' ? 12 : 1;
      st.level = 1;
      st.conta_registrada = 1;
      st.armas = [];
      st.cargo = 'jogador';
      st.org = '';
      playerState.set(playerid, st);
      dbFindByName(st.nome).then((existing) => {
        if (existing) {
          Native.SendClientMessage(playerid, 0xFF0000FF, 'Nome já registrado');
          return;
        }
        dbInsertOrUpdate(st).then(() => {
          Native.SendClientMessage(playerid, 0x00FF00FF, 'Registro concluído');
          Native.SpawnPlayer(playerid);
          applyLoadout(playerid);
        }).catch(() => {
          Native.SendClientMessage(playerid, 0xFF0000FF, 'Erro ao registrar');
        });
      });
      return 1;
    }
    return 1;
  });
}
module.exports = registerEvents;
