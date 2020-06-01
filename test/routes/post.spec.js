'use strict'

const HttpStatus = require('http-status-codes') 
const supertest = require('supertest')
const server = require('../../src/server')
const { createTestRouteFile, dropTestRouteFile } = require('./fixtures')

const DEFAULT_TEST_ROUTES_FILE_PATH = './data/input-file-test.txt'
const DEFAULT_TEST_ROUTES_FILE_CONTENTS = 
  `"GRU","BRC",10
  "BRC","SCL",5
  "GRU","CDG",75
  "GRU","SCL",20
  "GRU","ORL",56
  "ORL","CDG",5
  "SCL","ORL",20` 

describe('POST /routes', () => {
  let _request

  beforeAll(async () => {
    createTestRouteFile(DEFAULT_TEST_ROUTES_FILE_PATH, DEFAULT_TEST_ROUTES_FILE_CONTENTS)
    _request = supertest(await server(DEFAULT_TEST_ROUTES_FILE_PATH))
  });

  afterAll(async () => {
    dropTestRouteFile(DEFAULT_TEST_ROUTES_FILE_PATH)
  });

  describe('success', () => {
    test('Should insert a new route into routes file', async () => {

      const data = {
        source: 'BSB',
        destiny: 'JFK',
        cost: 300
      }

      const res = await _request
        .post(`/routes`)
        .send(data)

      expect(res.status).toBe(HttpStatus.OK)
      expect(res.body.success).toBeTruthy()
    });
  });

  describe('failures', () => {
    test('Should return 400 bad request when source parameter is missing', async () => {
      const data = {
        destiny: 'JFK',
        cost: 300
      }

      const res = await _request
        .post(`/routes`)
        .send(data)

      expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    });

    test('Should return 400 bad request when destiny parameter is missing', async () => {
      const data = {
        source: 'BSB',
        cost: 300
      }

      const res = await _request
        .post(`/routes`)
        .send(data)

      expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    });

    test('Should return 400 bad request when cost parameter is missing', async () => {
      const data = {
        source: 'BSB',
        destiny: 'JFK'
      }

      const res = await _request
        .post(`/routes`)
        .send(data)

      expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    });
  })
});
