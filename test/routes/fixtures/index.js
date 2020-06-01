'use strict'

const fs = require('fs-extra')

const createTestRouteFile = (filePath, contents) => {
  fs.writeFileSync(filePath, contents)
}

const dropTestRouteFile = (filePath) => {
  fs.unlinkSync(filePath)
}

module.exports = {
  createTestRouteFile,
  dropTestRouteFile
}
