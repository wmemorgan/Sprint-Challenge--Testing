const request = require('supertest')

const server = require('./server')

describe(`test basic API server`, () => {
  it('server should be available', async () => {
    const res = await request(server).get('/')

    expect(res.status).toBe(200)
  })

  it('server status should be `up`', async () => {
    const res = await request(server).get('/')

    expect(res.body.status).toBe('up')
  })
})