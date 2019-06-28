const request = require('supertest')

// Import data models
const db = require('../data/testData')

// Import API server
const server = require('../api/server')

describe(`Games endpoint testing`, () => {
  describe(`GET /games`, () => {
    it('route is available', async () => {
      const res = await request(server).get('/games')
      expect(res.status).toBe(200)
    })

    it('return a list of games', async () => {
      const expected = db
      const res = await request(server).get('/games')
      expect(res.body).toEqual(expected)
    })

    it('confirm list of games is an array', async () => {
      const expected = []
      const res = await request(server).get('/games')
      expect.arrayContaining(expected)
    })
  })

  describe(`POST /games`, () => {

  })
})