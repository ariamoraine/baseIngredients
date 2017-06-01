const apiRouter = require('express').Router()
const userRouter = require('./users')

apiRouter.use('/users', userRouter)

//404 error builder for any bad api requests
apiRouter.use((req, res, next) => {
  const err = new Error('Not Found!')
  err.status = 404;
  next(err)
})

module.exports = apiRouter
