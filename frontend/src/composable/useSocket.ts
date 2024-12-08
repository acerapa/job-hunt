import socket from '@/socket'
import { ref } from 'vue'

export function useSocket() {
  const messages = ref([])

  const sendMessage = (message: string) => {
    socket.emit('message', message)
  }

  return {
    messages,
    sendMessage
  }
}
