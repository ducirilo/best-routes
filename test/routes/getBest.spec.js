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

describe('GET /routes/best', () => {
  let _request

  beforeAll(async () => {
    createTestRouteFile(DEFAULT_TEST_ROUTES_FILE_PATH, DEFAULT_TEST_ROUTES_FILE_CONTENTS)
    _request = supertest(await server(DEFAULT_TEST_ROUTES_FILE_PATH))
  });

  afterAll(async () => {
    dropTestRouteFile(DEFAULT_TEST_ROUTES_FILE_PATH)
  });

  describe('success', () => {
    test('Should return best routes when correct parameters are informed', async () => {

      const source = 'GRU'
      const destiny = 'ORL'

      const res = await _request
        .get(`/routes/best?source=${source}&destiny=${destiny}`)

      expect(res.status).toBe(HttpStatus.OK)
      expect(typeof res.body.cost === 'number').toBeTruthy()
      expect(res.body.cost).toBe(35)
      expect(Array.isArray(res.body.path)).toBeTruthy()
      expect(res.body.path.join(' - ')).toBe('GRU - BRC - SCL - ORL')
    });
  });

  describe('failures', () => {
    test('Should return 400 bad request when source parameter is missing', async () => {
      const destiny = 'ORL'

      const res = await _request
        .get(`/routes/best?destiny=${destiny}`)

      expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    });

    test('Should return 400 bad request when destiny parameter is missing', async () => {
      const source = 'GRU'

      const res = await _request
        .get(`/routes/best?source=${source}`)

      expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    });

    test('Should return 500 error when source is unknown', async () => {
      const source = 'XXY'
      const destiny = 'ORL'

      const res = await _request
        .get(`/routes/best?source=${source}&destiny=${destiny}`)

      expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    });

    test('Should return 500 error when destiny is unknown', async () => {
      const source = 'GRU'
      const destiny = 'ABC'

      const res = await _request
        .get(`/routes/best?source=${source}&destiny=${destiny}`)

      expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    });
  })
});
