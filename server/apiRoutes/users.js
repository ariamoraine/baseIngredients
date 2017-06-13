const userRouter = require('express').Router()
const User = require('../database/models/user')

userRouter.get('/', (req, res, next) => {
  res.send('User Router GET to /')
})

userRouter.get('/me', (req, res, next) => {
  res.send(req.user)
})

userRouter.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) res.status(401).send('User not found')
    else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect Password')
    } else {
      req.logIn(user, err => {
        if (err) next(err)
        else res.json(user)
      })
    }
  })
  .catch(next)
})

userRouter.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err)
        //else res.json(user)
        else res.send(404)
      })
    })
    .catch(next)
})

userRouter.post('/logout', (req, res, next) => {
  req.logout()
  res.sendStatus(200)
})

userRouter.put('/:userId', (req, res, next) => {
  console.log('User Router PUT to /:userId', req.params.userId)
})

userRouter.delete('/:userId', (req, res, next) => {
  console.log('User Router DELETE to /:userId', req.params.userId)
})

module.exports = userRouter
