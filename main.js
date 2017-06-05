const express = require('express')
const app = express()
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const path = require('path');

const apiRoutes = require('./server/apiRoutes')
const db = require('./server/database')
//sessions and storing sessions in Sequelize
const passport = require('passport')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db: db})


//logging middleware
app.use(volleyball)

//serve static files
app.use(express.static('public'))

//body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//session middleware
dbStore.sync()
app.use(session({
  secret: require('./.secrets').sessionSecret,
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

//routing for all api calls
app.use('/api', apiRoutes)

//routing for everything else
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

//error handler
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error!')
})

//sync the DB and then start the server lisening
db.sync({force: true})
  .then(() => {
    app.listen(3030, () => console.log("Server is listening on port 3030"))
  })
  .catch(console.error);
