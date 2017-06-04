const Sequelize = require('sequelize')

const bd = new Sequelize('postgres://localhost:5432/baseIngredients', {
  logging: true
})

module.exports = db;
