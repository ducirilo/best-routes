'use strict'

const HttpStatus = require('http-status-codes')
const { addNewRoute } = require('../../libs/routesFile')
const { errorHandler } = require('../../libs/utils')

const postRoutes = (routeFilePath) => {
  return (req, res) => {
    if (!req.body.source || !req.body.destiny || !req.body.cost) {
      return errorHandler(res, HttpStatus.BAD_REQUEST, 'Missing mandatory paramters')
    }

    addNewRoute(routeFilePath, req.body.source, req.body.destiny, req.body.cost).then(result => {
      res.status(HttpStatus.OK).send(result)
    })
      .catch(err => {
        return errorHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message)
      })
  }
}

module.exports = postRoutes
