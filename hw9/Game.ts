<<<<<<< Updated upstream
import { Player } from './Player'
import { IPlanet } from './types'
import { getPlanetData } from './api'
=======
import { Player } from './Player.js'
import { IPlanet } from './types.js'
import { getPlanetData } from './api.js'
const promptSync = require('prompt-sync')
const prompt = promptSync()
//import promptSync from 'prompt-sync'
>>>>>>> Stashed changes

export class Game {
  player: Player
  constructor(player: Player) {
    this.player = player
  }

  start(): void {
    let planetId = 1

    while (this.player.fuelLevel > 0) {
      try {
        console.log('Travelling to Planet')
        const planet: IPlanet = getPlanetData(planetId)
        console.log(`Arrived to ${planet.name}`)
        this.player.travel(planet.distance)

        if (planet.event.type === 'resource') {
          this.player.addResource(planet.event.resource)
        } else if (planet.event.type === 'trader') {
          console.log('Hi trader!')
        } else if (planet.event === null) {
          console.log('Nothing happaned')
        }
        planetId++
      } catch (error) {
        console.log('Error:', (error as Error).message)
        break
      }
    }

    console.log('GAME OVER')
  }
}
