#!/usr/bin/env node

const { program } = require('commander')
const fs = require('fs')
const path = require('path')
const { repl } = require('./repl')
const server = require('./server')

// Defaults
const DEFAULT_PORT = 3000

let routesFilePath

program
  .version('0.0.1', '-v, --vers', 'output the current version')
  .arguments('<filepath>')
  .action(filepath => {
    routesFilePath = filepath
  })
  .option(
    '-p, --port <port>',
    'The port to listen on.', DEFAULT_PORT)
  .parse(process.argv)

if (!fs.existsSync(path.resolve(__dirname, '..', routesFilePath))) {
  console.error(`The routes file was not found in path ${routesFilePath}. Exiting with error.`)
  process.exit(1)
}

server(routesFilePath)
  .then(app => {
    app.listen(program.port, () => {
      console.info(`API listening on port: ${program.port}\n`)

      process.on('SIGINT', () => {
        console.info('Received SIGINT. Terminating execution.\n\n')
        process.exit()
      })

      repl(routesFilePath)
    })
  })
  .catch(err => {
    console.error(err)
    console.error('Exiting with error.')
    process.exit(1)
  })
