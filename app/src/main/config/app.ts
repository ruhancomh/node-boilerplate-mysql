import { setupMiddlewares } from './middlewares'
import express from 'express'
import { db } from './database'
import { setupRouts } from './routs'

const app = express()

db.authenticate()
  .then(() => {
    setupMiddlewares(app)
    setupRouts(app)
  })
  .catch((err: Error) => {
    console.log('Failed to connect with database: ' + err.message)
  })

export default app
