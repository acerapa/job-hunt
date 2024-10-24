import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('messages', function () {
  const conversations = ref([
    {
      unread: 5,
      is_pinned: true,
      active_convo: false,
      receiver: {
        name: 'Emily Johnson',
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
          text: 'Hello!, This is a long long message man',
          time: new Date()
        },
        {
          from: 4,
          text: 'Hey man',
          time: new Date()
        }
      ]
    },
    {
      unread: 6,
      is_pinned: false,
      active_convo: false,
      receiver: {
        name: 'Michael Smith',
        is_active: true,
        id: 5,
        image:
          'https://images.unsplash.com/photo-1611200945005-403b70229452?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      sender: {
        name: 'Jane Doe',
        is_active: true,
        id: 4
      },
      messages: [
        {
          from: 5,
          text: 'Hello !',
          time: new Date()
        },
        {
          from: 4,
          text: 'Hey man',
          time: new Date()
        }
      ]
    },
    {
      unread: 0,
      is_pinned: false,
      active_convo: false,
      receiver: {
        name: 'Sarah Brown',
        is_active: true,
        id: 3,
        image:
          'https://plus.unsplash.com/premium_photo-1729581091962-8da050639694?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
