import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { checkConnection } from './src/database'
import cookieParser from 'cookie-parser'
import { getEnv } from './src/helpers/env-helpers'
import { shorthandResponse } from './src/middlewares/response'
import { Server } from 'socket.io'
import { createServer } from 'http'

dotenv.config()

// check connection
checkConnection()

const app: Application = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  }
})

// socket io events
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('message', (message) => {
    console.log('message: ', message)
  })
})

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

server.listen(port, () => console.log(`Listening on port ${port}`))
