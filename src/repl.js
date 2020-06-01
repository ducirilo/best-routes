'use strict'

const readline = require('readline')
const { dijkstra } = require('./libs/dijkstra')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const promptPlannedRoute = () => {
  return new Promise((resolve, reject) => {
    rl.question('please enter the route: ', (input) => {
      if (!/^[A-Z]{3}-[A-Z]{3}$/.test(input)) {
        return reject(new Error('invalid input. please try again'))
      }
      return resolve(input)
    })
  })
}

const repl = async (routeFilePath) => {
  while (true) {
    try {
      let plannedRoute = await promptPlannedRoute()
      plannedRoute = plannedRoute.split('-')

      const bestRoute = await dijkstra(routeFilePath, plannedRoute[0], plannedRoute[1])

      if (bestRoute.cost === Infinity) {
        throw new Error(`No feasible path between ${plannedRoute[0]} and ${plannedRoute[1]}`)
      }

      console.log(`best route: ${bestRoute.path.join(' - ')} > $${bestRoute.cost}`)
    } catch (err) {
      console.log(err.message)
    }
  }
}

module.exports = {
  repl
}
