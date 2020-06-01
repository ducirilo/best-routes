'use strict'

const csv = require('csvtojson')
const json2csv = require('json2csv')
const path = require('path')
const fs = require('fs-extra')

const loadRoutes = (routeFilePath) => {
  const csvSpecs = csv({
    noheader: true,
    trim: true,
    headers: ['source', 'destiny', 'cost'],
    colParser: {
      source: 'string',
      destiny: 'string',
      cost: 'number'
    },
    checkType: true
  })

  return csvSpecs.fromFile(path.resolve(__dirname, '../..', routeFilePath))
}

const addNewRoute = (routeFilePath, source, destiny, cost) => {
  return new Promise(async (resolve, reject) => {
    try {
      const routes = await loadRoutes(routeFilePath)

      const existingRouteIndex = routes.findIndex(route => {
        return route.source === source && route.destiny === destiny
      })

      const newRoute = {
        source,
        destiny,
        cost
      }

      if (existingRouteIndex >= 0) {
        routes[existingRouteIndex] = newRoute // replaces existing one
      } else {
        routes.push(newRoute) // add a new one
      }

      const csvOptions = {
        fields: ['source', 'destiny', 'cost'],
        header: false
      }

      const csvParser = new json2csv.Parser(csvOptions)
      const outputCsv = csvParser.parse(routes)
      fs.outputFileSync(path.resolve(__dirname, '../..', routeFilePath), outputCsv)

      resolve({ success: true })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  loadRoutes,
  addNewRoute
}
