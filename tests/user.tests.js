"use strict"
const expect = require('chai').expect,
  db = require('../server/database'),
  app = require('../main'),
  request = require('supertest'),
  agent = request.agent(app);

// describe('POST', () => {
//   describe('when a user is not logged in', () => {
//     it('creates a user', () => {
//       request(app)
//         .post('/api/users/signup')
//         .send({
//           email: 'test@test.com',
//           password: '1234'
//         })
//         .then((res) => {
//           console.log("WTF")
//           console.log("I'm the body", res)
//         })
//     })
//   })
// })

describe('GET', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('when we get to users/me', () => {
    it('returns undefined if there is no user logged in', () => {
      return agent
        .get('/api/users/me')
        .then(res => {
          expect(res.body).to.deep.equal({})
      })
    })
  })
})
