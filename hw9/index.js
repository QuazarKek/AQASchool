"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_js_1 = require("./Player.js");
var Game_js_1 = require("./Game.js");
var player = new Player_js_1.Player("Kseniia", 100);
var game = new Game_js_1.Game(player);
game.start();
