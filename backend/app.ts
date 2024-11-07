import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { checkConnection } from './src/database'
import cookieParser from 'cookie-parser'
import { getEnv } from './src/helpers/env-helpers'

dotenv.config()

// check connection
checkConnection()

const app: Application = express()

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

app.listen(port, () => console.log(`Listening on port ${port}`))
