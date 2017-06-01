const userRouter = require('express').Router()

userRouter.get('/', (req, res, next) => {
  res.send('User Router GET to /')
})

userRouter.post('/', (req, res, next) => {
  console.log('User Router Post to /')
})

userRouter.put('/:userId', (req, res, next) => {
  console.log('User Router PUT to /:userId', req.params.userId)
})

userRouter.delete('/:userId', (req, res, next) => {
  console.log('User Router DELETE to /:userId', req.params.userId)
})

module.exports = userRouter
