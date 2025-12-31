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
globalThis.MAX_PLAYER_NAME = 25;
globalThis.MAX_PLAYERS = 1000;
globalThis.MAX_VEHICLES = 2000;
globalThis.MAX_ACTORS = 1000;
globalThis.MAX_OBJECTS = 1000;
globalThis.MAX_GANG_ZONES = 1024;
globalThis.MAX_TEXT_DRAWS = 2048;
globalThis.MAX_PLAYER_TEXT_DRAWS = 256;
globalThis.MAX_MENUS = 128;
globalThis.MAX_3DTEXT_GLOBAL = 1024;
globalThis.MAX_3DTEXT_PLAYER = 1024;
globalThis.MAX_PICKUPS = 4096;
globalThis.MAX_PLAYER_ATTACHED_OBJECTS = 10;
globalThis.MAX_CHATBUBBLE_LENGTH = 144;

globalThis.INVALID_PLAYER_ID = 0xFFFF;
globalThis.INVALID_VEHICLE_ID = 0xFFFF;
globalThis.INVALID_ACTOR_ID = 0xFFFF;
globalThis.INVALID_OBJECT_ID = 0xFFFF;
globalThis.INVALID_MENU = 0xFF;
globalThis.INVALID_TEXT_DRAW = 0xFFFF;
globalThis.INVALID_GANG_ZONE = -1;
globalThis.INVALID_3DTEXT_ID = 0xFFFF;

globalThis.NO_TEAM = 255;

// Player States and Actions
globalThis.PLAYER_STATE_NONE = 0;
globalThis.PLAYER_STATE_ONFOOT = 1;
globalThis.PLAYER_STATE_DRIVER = 2;
globalThis.PLAYER_STATE_PASSENGER = 3;
globalThis.PLAYER_STATE_EXIT_VEHICLE = 4;
globalThis.PLAYER_STATE_ENTER_VEHICLE_DRIVER = 5;
globalThis.PLAYER_STATE_ENTER_VEHICLE_PASSENGER = 6;
globalThis.PLAYER_STATE_WASTED = 7;
globalThis.PLAYER_STATE_SPAWNED = 8;
globalThis.PLAYER_STATE_SPECTATING = 9;

globalThis.SPECIAL_ACTION_NONE = 0;
globalThis.SPECIAL_ACTION_DUCK = 1;
globalThis.SPECIAL_ACTION_USEJETPACK = 2;
globalThis.SPECIAL_ACTION_ENTER_VEHICLE = 3;
globalThis.SPECIAL_ACTION_EXIT_VEHICLE = 4;
globalThis.SPECIAL_ACTION_DANCE1 = 5;
globalThis.SPECIAL_ACTION_DANCE2 = 6;
globalThis.SPECIAL_ACTION_DANCE3 = 7;
globalThis.SPECIAL_ACTION_DANCE4 = 8;
globalThis.SPECIAL_ACTION_HANDSUP = 10;
globalThis.SPECIAL_ACTION_USECELLPHONE = 11;
globalThis.SPECIAL_ACTION_SITTING = 12;
globalThis.SPECIAL_ACTION_STOPUSECELLPHONE = 13;
globalThis.SPECIAL_ACTION_DRINK_BEER = 20;
globalThis.SPECIAL_ACTION_SMOKE_CIGGY = 21;
globalThis.SPECIAL_ACTION_DRINK_WINE = 22;
globalThis.SPECIAL_ACTION_DRINK_SPRUNK = 23;
globalThis.SPECIAL_ACTION_CUFFED = 24;
globalThis.SPECIAL_ACTION_CARRY = 25;

globalThis.FIGHT_STYLE_NORMAL = 4;
globalThis.FIGHT_STYLE_BOXING = 5;
globalThis.FIGHT_STYLE_KUNGFU = 6;
globalThis.FIGHT_STYLE_KNEEHEAD = 7;
globalThis.FIGHT_STYLE_GRABKICK = 15;
globalThis.FIGHT_STYLE_ELBOW = 16;

// Player Keys
globalThis.KEY_ACTION = 1;
globalThis.KEY_CROUCH = 2;
globalThis.KEY_FIRE = 4;
globalThis.KEY_SPRINT = 8;
globalThis.KEY_SECONDARY_ATTACK = 16;
globalThis.KEY_JUMP = 32;
globalThis.KEY_LOOK_RIGHT = 64;
globalThis.KEY_HANDBRAKE = 128;
globalThis.KEY_LOOK_LEFT = 256;
globalThis.KEY_SUBMISSION = 512;
globalThis.KEY_LOOK_BEHIND = 512;
globalThis.KEY_WALK = 1024;
globalThis.KEY_ANALOG_UP = 2048;
globalThis.KEY_ANALOG_DOWN = 4096;
globalThis.KEY_ANALOG_LEFT = 8192;
globalThis.KEY_ANALOG_RIGHT = 16384;
globalThis.KEY_YES = 65536;
globalThis.KEY_NO = 131072;
globalThis.KEY_CTRL_BACK = 262144;

globalThis.KEY_UP = -128;
globalThis.KEY_DOWN = 128;
globalThis.KEY_LEFT = -128;
globalThis.KEY_RIGHT = 128;

// Weapons and Skills
globalThis.WEAPON_BRASSKNUCKLE = 1;
globalThis.WEAPON_GOLFCLUB = 2;
globalThis.WEAPON_NITESTICK = 3;
globalThis.WEAPON_KNIFE = 4;
globalThis.WEAPON_BAT = 5;
globalThis.WEAPON_SHOVEL = 6;
globalThis.WEAPON_POOLSTICK = 7;
globalThis.WEAPON_KATANA = 8;
globalThis.WEAPON_CHAINSAW = 9;
globalThis.WEAPON_DILDO = 10;
globalThis.WEAPON_DILDO2 = 11;
globalThis.WEAPON_VIBRATOR = 12;
globalThis.WEAPON_VIBRATOR2 = 13;
globalThis.WEAPON_FLOWER = 14;
globalThis.WEAPON_CANE = 15;
globalThis.WEAPON_GRENADE = 16;
globalThis.WEAPON_TEARGAS = 17;
globalThis.WEAPON_MOLTOV = 18;
globalThis.WEAPON_COLT45 = 22;
globalThis.WEAPON_SILENCED = 23;
globalThis.WEAPON_DEAGLE = 24;
globalThis.WEAPON_SHOTGUN = 25;
globalThis.WEAPON_SAWEDOFF = 26;
globalThis.WEAPON_SHOTGSPA = 27;
globalThis.WEAPON_UZI = 28;
globalThis.WEAPON_MP5 = 29;
globalThis.WEAPON_AK47 = 30;
globalThis.WEAPON_M4 = 31;
globalThis.WEAPON_TEC9 = 32;
globalThis.WEAPON_RIFLE = 33;
globalThis.WEAPON_SNIPER = 34;
globalThis.WEAPON_ROCKETLAUNCHER = 35;
globalThis.WEAPON_HEATSEEKER = 36;
globalThis.WEAPON_FLAMETHROWER = 37;
globalThis.WEAPON_MINIGUN = 38;
globalThis.WEAPON_SATCHEL = 39;
globalThis.WEAPON_BOMB = 40;
globalThis.WEAPON_SPRAYCAN = 41;
globalThis.WEAPON_FIREEXTINGUISHER = 42;
globalThis.WEAPON_CAMERA = 43;
globalThis.WEAPON_PARACHUTE = 46;
globalThis.WEAPON_VEHICLE = 49;
globalThis.WEAPON_DROWN = 53;
globalThis.WEAPON_COLLISION = 54;

globalThis.WEAPONSKILL_PISTOL = 0;
globalThis.WEAPONSKILL_PISTOL_SILENCED = 1;
globalThis.WEAPONSKILL_DESERT_EAGLE = 2;
globalThis.WEAPONSKILL_SHOTGUN = 3;
globalThis.WEAPONSKILL_SAWNOFF_SHOTGUN = 4;
globalThis.WEAPONSKILL_SPAS12_SHOTGUN = 5;
globalThis.WEAPONSKILL_MICRO_UZI = 6;
globalThis.WEAPONSKILL_MP5 = 7;
globalThis.WEAPONSKILL_AK47 = 8;
globalThis.WEAPONSKILL_M4 = 9;
globalThis.WEAPONSKILL_SNIPERRIFLE = 10;

globalThis.WEAPONSTATE_UNKNOWN = -1;
globalThis.WEAPONSTATE_NO_BULLETS = 0;
globalThis.WEAPONSTATE_LAST_BULLET = 1;
globalThis.WEAPONSTATE_MORE_BULLETS = 2;
globalThis.WEAPONSTATE_RELOADING = 3;

// Vehicles
globalThis.CARMODTYPE_SPOILER = 0;
globalThis.CARMODTYPE_HOOD = 1;
globalThis.CARMODTYPE_ROOF = 2;
globalThis.CARMODTYPE_SIDESKIRT = 3;
globalThis.CARMODTYPE_LAMPS = 4;
globalThis.CARMODTYPE_NITRO = 5;
globalThis.CARMODTYPE_EXHAUST = 6;
globalThis.CARMODTYPE_WHEELS = 7;
globalThis.CARMODTYPE_STEREO = 8;
globalThis.CARMODTYPE_HYDRAULICS = 9;
globalThis.CARMODTYPE_FRONT_BUMPER = 10;
globalThis.CARMODTYPE_REAR_BUMPER = 11;
globalThis.CARMODTYPE_VENT_RIGHT = 12;
globalThis.CARMODTYPE_VENT_LEFT = 13;

globalThis.VEHICLE_PARAMS_UNSET = -1;
globalThis.VEHICLE_PARAMS_OFF = 0;
globalThis.VEHICLE_PARAMS_ON = 1;

globalThis.VEHICLE_MODEL_INFO_SIZE = 1;
globalThis.VEHICLE_MODEL_INFO_FRONTSEAT = 2;
globalThis.VEHICLE_MODEL_INFO_REARSEAT = 3;
globalThis.VEHICLE_MODEL_INFO_PETROLCAP = 4;
globalThis.VEHICLE_MODEL_INFO_WHEELSFRONT = 5;
globalThis.VEHICLE_MODEL_INFO_WHEELSREAR = 6;
globalThis.VEHICLE_MODEL_INFO_WHEELSMID = 7;
globalThis.VEHICLE_MODEL_INFO_FRONT_BUMPER_Z = 8;
globalThis.VEHICLE_MODEL_INFO_REAR_BUMPER_Z = 9;

// Dialogs, Menus, and UI
globalThis.DIALOG_STYLE_MSGBOX = 0;
globalThis.DIALOG_STYLE_INPUT = 1;
globalThis.DIALOG_STYLE_LIST = 2;
globalThis.DIALOG_STYLE_PASSWORD = 3;
globalThis.DIALOG_STYLE_TABLIST = 4;
globalThis.DIALOG_STYLE_TABLIST_HEADERS = 5;

globalThis.TEXT_DRAW_FONT_SPRITE_DRAW = 4;
globalThis.TEXT_DRAW_FONT_MODEL_PREVIEW = 5;

// Objects
globalThis.OBJECT_MATERIAL_SIZE_32x32 = 10;
globalThis.OBJECT_MATERIAL_SIZE_64x32 = 20;
globalThis.OBJECT_MATERIAL_SIZE_64x64 = 30;
globalThis.OBJECT_MATERIAL_SIZE_128x32 = 40;
globalThis.OBJECT_MATERIAL_SIZE_128x64 = 50;
globalThis.OBJECT_MATERIAL_SIZE_128x128 = 60;
globalThis.OBJECT_MATERIAL_SIZE_256x32 = 70;
globalThis.OBJECT_MATERIAL_SIZE_256x64 = 80;
globalThis.OBJECT_MATERIAL_SIZE_256x128 = 90;
globalThis.OBJECT_MATERIAL_SIZE_256x256 = 100;
globalThis.OBJECT_MATERIAL_SIZE_512x64 = 110;
globalThis.OBJECT_MATERIAL_SIZE_512x128 = 120;
globalThis.OBJECT_MATERIAL_SIZE_512x256 = 130;
globalThis.OBJECT_MATERIAL_SIZE_512x512 = 140;

globalThis.OBJECT_MATERIAL_TEXT_ALIGN_LEFT = 0;
globalThis.OBJECT_MATERIAL_TEXT_ALIGN_CENTER = 1;
globalThis.OBJECT_MATERIAL_TEXT_ALIGN_RIGHT = 2;

// Events and Callbacks
globalThis.CLICK_SOURCE_SCOREBOARD = 0;

globalThis.EDIT_RESPONSE_CANCEL = 0;
globalThis.EDIT_RESPONSE_FINAL = 1;
globalThis.EDIT_RESPONSE_UPDATE = 2;

globalThis.SELECT_OBJECT_GLOBAL_OBJECT = 1;
globalThis.SELECT_OBJECT_PLAYER_OBJECT = 2;

globalThis.BULLET_HIT_TYPE_NONE = 0;
globalThis.BULLET_HIT_TYPE_PLAYER = 1;
globalThis.BULLET_HIT_TYPE_VEHICLE = 2;
globalThis.BULLET_HIT_TYPE_OBJECT = 3;
globalThis.BULLET_HIT_TYPE_PLAYER_OBJECT = 4;

// Variables (PVars/SVars)
globalThis.PLAYER_VARTYPE_NONE = 0;
globalThis.PLAYER_VARTYPE_INT = 1;
globalThis.PLAYER_VARTYPE_STRING = 2;
globalThis.PLAYER_VARTYPE_FLOAT = 3;

globalThis.SERVER_VARTYPE_NONE = 0;
globalThis.SERVER_VARTYPE_INT = 1;
globalThis.SERVER_VARTYPE_STRING = 2;
globalThis.SERVER_VARTYPE_FLOAT = 3;

// Others
globalThis.PLAYER_MARKERS_MODE_OFF = 0;
globalThis.PLAYER_MARKERS_MODE_GLOBAL = 1;
globalThis.PLAYER_MARKERS_MODE_STREAMED = 2;

globalThis.MAPICON_LOCAL = 0;
globalThis.MAPICON_GLOBAL = 1;
globalThis.MAPICON_LOCAL_CHECKPOINT = 2;
globalThis.MAPICON_GLOBAL_CHECKPOINT = 3;

globalThis.CAMERA_CUT = 2;
globalThis.CAMERA_MOVE = 1;

globalThis.SPECTATE_MODE_NORMAL = 1;
globalThis.SPECTATE_MODE_FIXED = 2;
globalThis.SPECTATE_MODE_SIDE = 3;

globalThis.PLAYER_RECORDING_TYPE_NONE = 0;
globalThis.PLAYER_RECORDING_TYPE_DRIVER = 1;
globalThis.PLAYER_RECORDING_TYPE_ONFOOT = 2;

globalThis.HTTP_GET = 1;
globalThis.HTTP_POST = 2;
globalThis.HTTP_HEAD = 3;

globalThis.HTTP_ERROR_BAD_HOST = 1;
globalThis.HTTP_ERROR_NO_SOCKET = 2;
globalThis.HTTP_ERROR_CANT_CONNECT = 3;
globalThis.HTTP_ERROR_CANT_WRITE = 4;
globalThis.HTTP_ERROR_CONTENT_TOO_BIG = 5;
globalThis.HTTP_ERROR_MALFORMED_RESPONSE = 6;