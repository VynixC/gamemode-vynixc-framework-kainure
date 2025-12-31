/*
VynixC Gamemode — Framework Kainure
Criadora do Kainure: AlderGrounds
Organização Oficial: VynixC (https://github.com/VynixC)
Framework: https://github.com/aldergrounds/kainure
*/
require('../Kainure/core/api.js');
require('../Kainure/core/samp_constants.js');
require('../Kainure/core/commands.js');
require('./modules/mapas/mapls.js');
const registerEvents = require('./modules/events');
const registerCommands = require('./modules/commands');
const registerAdmin = require('./modules/admin');
const registerVelogalaxy = () => {};
const registerEmpregoGas = () => {};
registerEvents();
registerCommands();
registerAdmin();
registerVelogalaxy();
registerEmpregoGas();
