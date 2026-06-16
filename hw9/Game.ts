import { Player } from './Player.js'
import { IPlanet } from './types.js'
import { getPlanetData } from './api.js'
const promptSync = require('prompt-sync')
const prompt = promptSync()

export class Game {
  player: Player

  constructor(player: Player) {
    this.player = player
  }

  async start(): Promise<void> {
    while (this.player.fuelLevel > 0) {
      try {
        const input = prompt(
          'Choose planet number to travel to (or type 0 to exit): ',
        )

        const planetId = Number(input)

        if (planetId === 0) {
          console.log('Player exited the game')
          break
        }

        if (isNaN(planetId) || planetId < 1) {
          console.log('Invalid planet number')
          continue
        }

        console.log('Travelling to planet...')

        const planet: IPlanet = await getPlanetData(planetId)

        console.log(`Arrived to ${planet.name}`)

        this.player.travel(planet.distance)

        if (planet.event?.type === 'resource') {
          this.player.addResource(planet.event.resource)
        } else if (planet.event?.type === 'trader') {
          console.log('Hi trader!')
        } else {
          console.log('Nothing happened')
        }
      } catch (error) {
        console.log('Error:', (error as Error).message)
        break
      }
    }

    console.log('GAME OVER')
  }
}
