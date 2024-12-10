import { Application } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

export const startSocket = (app: Application) => {
  const server = createServer(app)
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://admin.socket.io'],
      credentials: true
    }
  })

  // event handlers
  io.on('connection', (socket) => {
    console.log('a user connected')
  })

  return { server, io }
}
