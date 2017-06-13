const { expect } = require('chai'),
  db = require('../server/database'),
  app = require('../main'),
  request = require('supertest')

describe('POST', () => {
  describe('when a user is not logged in', () => {
    it('creates a user', () => {
      request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test.com',
          password: '1234'
        })
        .then((res) => {
          console.log(res.body)
        })
    })
  })
})
