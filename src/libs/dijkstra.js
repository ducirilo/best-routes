'use strict'

/*
 Dijkstra's Algorithm in Javascript using a weighted graph
 Implementation adapted from https://hackernoon.com/how-to-implement-dijkstras-algorithm-in-javascript-abdfd1702d04
 */

const { loadRoutes } = require('./routesFile')

const buildGraph = (routesFile) => {
  const graph = routesFile.reduce((graph, currRoute) => {
    graph[currRoute.source] = {
      ...(graph[currRoute.source] || {}),
      [currRoute.destiny]: currRoute.cost
    }
    return graph
  }, {})
  return graph
}

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node
      }
    }
    return lowest
  }, null)
}

// computes the minimum cost and path to reach destiny from source
const dijkstra = (routeFilePath, source, destiny) => {
  return new Promise(async (resolve, reject) => {
    try {
      const routes = await loadRoutes(routeFilePath)

      const feasibleSource = routes.find(r => {
        return r.source === source
      })
      if (!feasibleSource) {
        throw new Error(`${source} is not a feasible source or it does not exist`)
      }

      const feasibleDestiny = routes.find(r => {
        return r.source === destiny || r.destiny === destiny
      })
      if (!feasibleDestiny) {
        throw new Error(`${destiny} is not a feasible destiny or it does not exist`)
      }

      const graph = buildGraph(routes)

      // track lowest cost to reach each node
      const costs = Object.assign({ [destiny]: Infinity }, { ...graph[source] })

      // track paths
      const parents = { [destiny]: null }
      for (const child in graph[source]) {
        parents[child] = source
      }

      // track nodes that have already been processed
      const processed = []

      let node = lowestCostNode(costs, processed)

      while (node) {
        const cost = costs[node]
        const children = graph[node]
        for (const n in children) {
          const newCost = cost + children[n]
          if (!costs[n] || costs[n] > newCost) {
            costs[n] = newCost
            parents[n] = node
          }
        }
        processed.push(node)
        node = lowestCostNode(costs, processed)
      }

      const optimalPath = [destiny]
      let parent = parents[destiny]
      while (parent) {
        optimalPath.push(parent)
        parent = parents[parent]
      }
      optimalPath.reverse()

      const results = {
        cost: costs[destiny],
        path: optimalPath
      }

      resolve(results)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  dijkstra
}
