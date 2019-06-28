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
      const res = await request(server).get('/games')
      expect(Array.isArray(res.body)).toBeTruthy()
    })
  })

  xdescribe(`POST /games`, () => {
    it('confirm required data is received', async () => {
      const testData = { title: 'Legend of Zelda' }
      const res = await request(server).post('/games').send(testData)
      expect(res.status).toBe(422)
    })
  })
})