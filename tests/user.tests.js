"use strict"
const expect = require('chai').expect,
  db = require('../server/database'),
  app = require('../main'),
  request = require('supertest'),
  agent = request.agent(app);

describe("Something ", () =>{
  beforeEach('Await database sync', () => db.sync({force: true, logging: false}))
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('GET', () => {
    describe('when we get to users/me', () => {
      xit('returns undefined if there is no user logged in', () => {
        return agent
          .get('/api/users/me')
          .then(res => {
            expect(res.body).to.deep.equal({})
        })
      })
    })
  })

  describe('POST', () => {
    it('creates a new user', () => {
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
  })
})


