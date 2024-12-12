import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeDataSource } from './src/database'
import cookieParser from 'cookie-parser'
import { getEnv } from './src/helpers/env-helpers'
import { shorthandResponse } from './src/middlewares/response'
import { startSocket } from './socket'

import { instrument } from '@socket.io/admin-ui'

dotenv.config()

// check connection
initializeDataSource()

const app: Application = express()

// implement shorthand response
app.use(shorthandResponse())

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(getEnv('SECRET_KEY', 'thisisasecret')))

// use api routes
import apiRoutes from './src/routes/api-routes'
app.use('/api', apiRoutes)

const port = process.env.PORT || 3000

// Setting up socket io server
const { server, io } = startSocket(app)

// socket io admin ui
instrument(io, {
  auth: false
})

server.listen(port, () => console.log(`Listening on port ${port}`))
