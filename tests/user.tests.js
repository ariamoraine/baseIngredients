"use strict"

const expect = require('chai').expect,
  db = require('../server/database'),
  app = require('../main'),
  request = require('supertest'),
  agent = request.agent(app);

describe("USER ROUTES", function () {
  before('syncing DB', function () {
    return db.truncate({ cascade: true })
  })

  describe('User signin flow', function () {
    it('when we first ping users/me we get an empty object because there is no user logged in', function () {
      return request(app)
        .get('/api/users/me')
        .then(res => {
          expect(res.body).to.deep.equal({})
      })
    })

    it('we create a new user by posting to the users/signup', function () {
      return agent
        .post('/api/users/signup')
        .send({
          email: 'testuser@test.com',
          password: '12345'
        })
        .then(res => {
          expect(res.body.email).to.equal('testuser@test.com')
        })
    })

    it('we then can ping the users/me route to check that there is now a user signed in', function () {
      return agent
        .get('/api/users/me')
        .then(res => {
          expect(res.body.email).to.equal("testuser@test.com")
        })
    })
  })

  after('syncing after DB', function () {
    return db.truncate({ cascade: true })
  })
})


