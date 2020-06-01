'use strict'

const HttpStatus = require('http-status-codes')

const errorHandler = (res, statusCode, message) => {
  statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR
  message = message || 'Operation failed'
  
  return res.status(statusCode).send({
    message
  }) 
}

module.exports = {
  errorHandler
}