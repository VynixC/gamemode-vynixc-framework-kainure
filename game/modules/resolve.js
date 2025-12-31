/*
VynixC Gamemode — Framework Kainure
Criadora do Kainure: AlderGrounds
Organização Oficial: VynixC (https://github.com/VynixC)
Framework: https://github.com/aldergrounds/kainure
*/
const { playerState } = require('./player');
function resolvePlayerIdByName(nome) {
  const target = String(nome || '').toLowerCase();
  for (const [pid, st] of playerState.entries()) {
    if (String(st?.nome || '').toLowerCase() === target) return pid;
  }
  return -1;
}
function resolvePlayerIdByDbId(dbId) {
  const idNum = parseInt(dbId, 10);
  for (const [pid, st] of playerState.entries()) {
    if (parseInt(st?.db_id, 10) === idNum) return pid;
  }
  return -1;
}
module.exports = {
  resolvePlayerIdByName,
  resolvePlayerIdByDbId
};
