import { useConversationStore } from '@/stores/conversation-store'
import type { Message, User } from '@shared/pack'
import { io, Socket } from 'socket.io-client'
import { ref } from 'vue'

export function useSocket() {
  const socket = ref<Socket | null>(null)
  const conversationStore = useConversationStore()

  const connect = (user_id: number) => {
    socket.value = io('http://localhost:3000', {
      auth: {
        user_id: user_id
      }
    })

    // setting up socket client events
    socket.value.on('connect_error', (err) => {
      console.error(err)
    })

    socket.value.on('message', (msg: Message<Object, User>) => {
      console.log(msg)
      conversationStore.messages.push(msg)
    })
  }

  const sendMessage = (message: Partial<Message>) => {
    if (!socket.value) {
      console.log('Lost connection to the server')
      return
    }
    socket.value.emit('message', message)
  }

  return {
    connect,
    sendMessage
  }
}
