const Sequelize = require('sequelize')
const db = require('./db')
console.log("INSIDE USER")
module.exports = db.define('user', {
  userName: {
    type: Sequelize.STRING
  }
})
