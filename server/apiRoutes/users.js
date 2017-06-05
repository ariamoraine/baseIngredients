const userRouter = require('express').Router()
const User = require('../database/models/user')

userRouter.get('/', (req, res, next) => {
  res.send('User Router GET to /')
})

userRouter.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) res.status(401).send('User not found')
    else if (!user.hasMatchingPassword(req.body.password)) {
      res.status(401).send('Incorrect Password')
    } else {
      req.login(user, err => {
        if (err) next(err)
        else res.json(user)
      })
    }
  })
  .catch(next)
})

userRouter.put('/:userId', (req, res, next) => {
  console.log('User Router PUT to /:userId', req.params.userId)
})

userRouter.delete('/:userId', (req, res, next) => {
  console.log('User Router DELETE to /:userId', req.params.userId)
})

module.exports = userRouter
