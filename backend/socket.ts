import { Application, NextFunction, Request, Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { getUserConversation } from './src/services/auth-service'

export const startSocket = (app: Application) => {
  const server = createServer(app)
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://admin.socket.io'],
      credentials: true
    },
    cookie: true
  })

  // set middleware
  io.use(async (socket, next) => {
    // check user is authenticated
    const { auth } = socket.handshake

    if (auth.user_id) {
      // check if user has conversations
      socket.data = { user_id: auth.user_id }
      const conversations = await getUserConversation(auth.user_id)
      if (conversations && conversations.length) {
        // join conversations
        conversations.forEach(async (convo) => {
          const roomName = encryptConvoRoom(convo.id)
          const sockets = await io.in(roomName).fetchSockets()

          sockets.forEach((s) => {
            if (s.data.user_id == auth.user_id) {
              s.leave(roomName)
            }
          })

          socket.join(roomName)

          console.log(`${socket.id}: Joined conversation convo-${convo.id}`)
        })
      }

      next()
    } else {
      next(new Error('Authentication error'))
    }
  })

  // event handlers
  io.on('connection', (socket) => {
    // TODO: Upon connection broadcast that you are online

    // handle socket events from client
    socket.on('message', (msg) => {
      socket.to(encryptConvoRoom(msg.conversation.id)).emit('message', msg)
    })

    socket.on('disconnect', () => {
      console.log(`${socket.id}: Disconnected`)
    })
  })

  return { server, io }
}

// helper methods
export const encryptConvoRoom = (convo_id: number) => `convo-${convo_id}`
