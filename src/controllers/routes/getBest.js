'use strict'

const HttpStatus = require('http-status-codes')
const { dijkstra } = require('../../libs/dijkstra')
const { errorHandler } = require('../../libs/utils')

const getBestRoutes = (routeFilePath) => {
  return (req, res) => {
    if (!req.query.source || !req.query.destiny) {
      return errorHandler(res, HttpStatus.BAD_REQUEST, 'Missing mandatory paramters')
    }

    dijkstra(routeFilePath, req.query.source, req.query.destiny).then(bestRoutes => {
      res.status(HttpStatus.OK).send(bestRoutes)
    })
      .catch(err => {
        return errorHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message)
      })
  }
}

module.exports = getBestRoutes
