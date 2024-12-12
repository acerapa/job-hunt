import { useConversationStore } from '@/stores/conversation-store'
import type { Message, User } from '@shared/pack'
import { Socket } from 'socket.io-client'
import { ref } from 'vue'
import { SocketService } from '@/socket'
import type { Convo } from '@/types'

export function useSocket() {
  const socket = ref<Socket | null>(null)
  const conversationStore = useConversationStore()

  const connect = (user_id: number) => {
    socket.value = new SocketService(user_id).getSocket()

    // setting up socket client events
    socket.value.on('connect_error', (err) => {
      console.error(err)
    })

    // remove listener and add new one
    socket.value.off('message')
    socket.value.on('message', (msg: Message<Object, User>) => {
      conversationStore.messages.unshift(msg)
    })

    socket.value.off('user-connected')
    socket.value.on('user-connected', (data) => {
      conversationStore.setActiveStatus(data.convo_id, data.user_id, true)
    })

    socket.value.off('user-disconnected')
    socket.value.on('user-disconnected', (data) => {
      conversationStore.setActiveStatus(data.convo_id, data.user_id, false)
    })
  }

  const sendMessage = (message: Partial<Message>) => {
    if (!socket.value) {
      console.log('Lost connection to the server')
      return
    }
    socket.value.emit('message', message)
  }

  const disconnect = () => {
    socket.value?.disconnect()
  }

  return {
    connect,
    disconnect,
    sendMessage
  }
}
