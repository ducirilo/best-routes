'use strict'

const express = require('express')
const getBest = require('../controllers/routes/getBest')
const post = require('../controllers/routes/post')

const configureRouter = (routesFilePath) => {
  const router = express.Router()

  router.post(
    '/routes',
    post(routesFilePath)
  )

  router.get(
    '/routes/best',
    getBest(routesFilePath)
  )

  return router
};

module.exports = configureRouter