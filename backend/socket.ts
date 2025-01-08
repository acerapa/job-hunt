import { Application, NextFunction, Request, Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { getUserConversation } from './src/services/auth.service'
import { updateUser } from './src/services/user.service'

export const startSocket = (app: Application) => {
  const server = createServer(app)
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://admin.socket.io', 'http://192.168.1.4:5173'],
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

      // save user conversations
      socket.data.conversations = conversations.map((c) => c.id)

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
  io.on('connection', async (socket) => {
    // TODO: Upon connection broadcast that you are online

    // update user status first
    await updateUser(socket.data.user_id, {
      is_active: true
    })

    socket.rooms.forEach((room) => {
      let convoId = decryptConvoRoom(room)
      if (convoId) {
        socket.to(room).emit('user-connected', {
          user_id: socket.data.user_id,
          convo_id: convoId
        })
      }
    })

    // handle socket events from client
    socket.on('message', (msg) => {
      io.to(encryptConvoRoom(msg.conversation.id)).emit('message', msg)
    })

    socket.on('seen', (msg) => {
      io.to(encryptConvoRoom(msg.conversation.id)).emit('seen', msg)
    })

    socket.on('typing', (payload) => {
      io.to(encryptConvoRoom(payload.data.convo_id)).emit('typing', payload)
    })

    socket.on('disconnect', async () => {
      await updateUser(socket.data.user_id, {
        is_active: false
      })

      socket.data.conversations.forEach((convo_id: number) => {
        socket.broadcast.to(encryptConvoRoom(convo_id)).emit('user-disconnected', {
          user_id: socket.data.user_id,
          convo_id
        })
      })

      console.log(`${socket.data.conversations}: Disconnected`)
    })
  })

  return { server, io }
}

// helper methods
export const encryptConvoRoom = (convo_id: number) => `convo-${convo_id}`
export const decryptConvoRoom = (room: string) => {
  return room.includes('convo-') ? parseInt(room.split('-')[1]) : null
}
