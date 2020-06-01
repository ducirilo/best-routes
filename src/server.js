'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

async function server (routesFilePath) {
  const app = express()
  app.use(bodyParser.json())
  app.use(
    routes.map((router) => router(routesFilePath))
  )
  return app
}

module.exports = server
