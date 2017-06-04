const Sequelize = require('sequelize')
const db = require('../')

module.exports = db.define('user', {
  userName: {
    type: Sequelize.STRING
  }
})
