import socket from '@/socket'
import type { Message } from '@shared/pack'
import { ref } from 'vue'

export function useSocket() {
  const messages = ref([])

  const sendMessage = (message: Partial<Message>) => {
    socket.emit('message', message)
  }

  return {
    messages,
    sendMessage
  }
}
