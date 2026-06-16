import { IPlanet, PlanetEvent } from './types.js'

function generateEvent(): PlanetEvent {
  const rand = Math.random()

  if (rand < 0.3) {
    return {
      type: 'resource',
      resource: {
        name: 'Gold',
        value: Math.floor(Math.random() * 100),
      },
    }
  }

  if (rand < 0.7) {
    return {
      type: 'trader',
    }
  }

  return null
}

export function fetchData<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}


  const planet: IPlanet = {
    id: planetId,
    name: `Planet-${planetId}`,
    distance: Math.floor(Math.random() * 100),
    event: generateEvent(),
  }



  return await fetchData<IPlanet>(planet)
}

