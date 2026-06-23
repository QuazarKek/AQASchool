import { IPlayer, Resource } from './types.js'

export class Player implements IPlayer {
  name: string
  fuelLevel: number
  inventory: Resource[] = []

  constructor(name: string, fuel: number) {
    this.name = name
    this.fuelLevel = fuel
  }

  travel(distance: number): void {
    if (distance > this.fuelLevel) {
      throw new Error('Not enough fuel!')
    }

    this.fuelLevel -= distance

    console.log(
      `Player ${this.name} traveled ${distance}. Fuel left: ${this.fuelLevel}`,
    )
  }

  addResource(resource: Resource): void {
    this.inventory.push(resource)

    console.log(
      `Player ${this.name} found ${resource.name} with value ${resource.value}`,
    )
  }
}
