const express = require('express')
const app = express()
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const path = require('path');

const apiRoutes = require('./server/apiRoutes')
const db = require('./server/database')

//logging middleware
app.use(volleyball)

//serve static files
app.use(express.static('public'))

//body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routing for all api calls
app.use('/api', apiRoutes)

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

//error handler
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error!')
})

db.sync({force: true})
  .then( () => {
    app.listen(3030, () => console.log("Server is listening on port 3030"))
  })
  .catch(console.error);
