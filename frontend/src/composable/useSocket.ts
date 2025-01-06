import { useConversationStore } from '@/stores/conversation-store'
import type { Conversation, Message, User } from '@shared/pack'
import { Socket } from 'socket.io-client'
import { ref } from 'vue'
import { SocketService } from '@/socket'

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
    socket.value.on('message', (msg: Message<Conversation, User>) => {
      const convoIndex = conversationStore.convoDisplays.findIndex(
        (c) => c.id == msg.conversation?.id
      )

      if (convoIndex > -1) {
        conversationStore.convoDisplays[convoIndex].messages.unshift(msg)

        const unread_messages = conversationStore.convoDisplays[convoIndex].messages.filter(
          (m) => !m.is_seen
        )

        conversationStore.convoDisplays[convoIndex].last_message = msg
        conversationStore.convoDisplays[convoIndex].unread_messages = unread_messages
        conversationStore.convoDisplays[convoIndex].unread_messages_number = unread_messages.length
        const convo = conversationStore.convoDisplays[convoIndex]

        // re assign the convo display in the store if the conversation_id
        // matches the conversation_id of the message
        if (convo.id == conversationStore.convoDisplay?.id) {
          conversationStore.convoDisplay = conversationStore.convoDisplays[convoIndex]
        }
      }
    })

    socket.value.off('user-connected')
    socket.value.on('user-connected', (data) => {
      conversationStore.setActiveStatus(data.convo_id, data.user_id, true)
    })

    socket.value.off('user-disconnected')
    socket.value.on('user-disconnected', (data) => {
      conversationStore.setActiveStatus(data.convo_id, data.user_id, false)
    })

    socket.value.off('seen')
    socket.value.on('seen', (msg) => {
      console.log('Message seen', msg)
    })
  }

  const sendSeen = (message: Message) => {
    if (!socket.value) {
      console.log('Lost connection to the server')
      return
    }
    socket.value.emit('seen', message)
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
    sendSeen,
    disconnect,
    sendMessage
  }
}
