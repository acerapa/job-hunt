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
        conversationStore.convoDisplays[convoIndex].last_message = msg

        const convo = conversationStore.convoDisplays[convoIndex]

        // re assign the convo display in the store if the conversation_id
        // matches the conversation_id of the message
        if (convo.id == conversationStore.convoDisplay?.id) {
          conversationStore.convoDisplay = conversationStore.convoDisplays[convoIndex]
        }
      }
    })

    socket.value.off('seen')
    socket.value.on('seen', (msg) => {
      const convoIndex = conversationStore.convoDisplays.findIndex(
        (c) => c.id == msg.conversation.id
      )
      if (convoIndex > -1) {
        const msgIndex = conversationStore.convoDisplays[convoIndex].messages.findIndex(
          (m) => m.id == msg.id
        )

        if (msgIndex > -1) {
          conversationStore.convoDisplays[convoIndex].messages[msgIndex].is_seen = true
        }

        // re assign the convo display in the store if the conversation_id
        // matches the conversation_id of the message
        if (msg.conversation.id == conversationStore.convoDisplay?.id) {
          conversationStore.convoDisplay = conversationStore.convoDisplays[convoIndex]
        }
      }
    })

    socket.value.off('typing')
    socket.value.on('typing', (payload) => {
      const convoIndex = conversationStore.convoDisplays.findIndex(
        (c) => c.id == payload.data.convo_id
      )

      if (convoIndex > -1) {
        if (conversationStore.convoDisplays[convoIndex].sender.user_id == payload.data.sender_id) {
          console.log('the typing user is the sender')
          return
        }

        const receiverIndex = conversationStore.convoDisplays[convoIndex].receviers.findIndex(
          (r) => r.user_id == payload.data.sender_id
        )
        if (receiverIndex > -1) {
          conversationStore.convoDisplays[convoIndex].receviers[receiverIndex].is_typing =
            payload.is_typing
        }

        if (conversationStore.convoDisplay?.id == payload.data.convo_id) {
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

  const sendTyping = (data: { convo_id: number; sender_id: number }, is_typing: boolean) => {
    if (!socket.value) {
      console.log('Lost connection to the server')
      return
    }
    socket.value.emit('typing', { data, is_typing })
  }

  return {
    connect,
    sendSeen,
    disconnect,
    sendTyping,
    sendMessage
  }
}
