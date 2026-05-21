import { Player } from './Player.js'

import { Game } from './Game.js'

const player = new Player('Kseniia', 100)

const game = new Game(player)

game.start()
