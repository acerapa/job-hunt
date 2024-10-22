import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('messages', function () {
  const conversations = ref([
    {
      receiver: {
        name: 'John Doe',
        is_active: true,
        id: 3,
        image:
          'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      sender: {
        name: 'Jane Doe',
        is_active: true,
        id: 4
      },
      messages: [
        {
          from: 3,
          text: 'Hello !',
          time: new Date()
        },
        {
          from: 4,
          text: 'Hey man',
          time: new Date()
        }
      ]
    }
  ])

  return {
    conversations
  }
})
