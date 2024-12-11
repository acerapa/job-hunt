import { api, Method } from '@/api'
import type { ApiResponse, Conversation, Message, User } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConversationStore = defineStore('conversation', () => {
  const messages = ref<Partial<Message<Object, User>[]>>([])
  const conversation = ref<Conversation<User, Message> | null>()
  const conversations = ref<Conversation<User, Message>[]>([])

  const startConversation = async (convo: Partial<Conversation>) => {
    const res: ApiResponse<Conversation<User, Message>> = await api(
      `conversations/create`,
      Method.POST,
      convo
    )

    if (res.status < 400) {
      conversation.value = res.data
    }

    return res.status < 400
  }

  const fetchConversations = async () => {
    const res: ApiResponse<Conversation<User, Message>[]> = await api(`conversations/all`)

    if (res.status < 400) {
      conversations.value = res.data
    }
  }

  const getConversations = async () => {
    if (!conversations.value.length) {
      await fetchConversations()
    }

    return conversations.value
  }

  const getConversationByMembers = (members: number[]) => {
    const convo = conversations.value.find((convo) => {
      const membersId = convo.members.map((member) => member.id)
      return members.every((id) => membersId.includes(id))
    })

    if (convo) {
      conversation.value = convo
    }

    return conversation.value
  }

  const getConversationById = async (id: number) => {
    if (!conversation.value || conversation.value.id !== id) {
      const convo = conversations.value.find((convo) => convo.id === id)
      if (convo) {
        conversation.value = convo
      } else {
        await fetchConversations()
        conversation.value = conversations.value.find((convo) => convo.id === id)
      }
    }

    return conversation.value
  }

  const fetchMessages = async (conversation_id: number) => {
    const res: ApiResponse<Message<Object, User>[]> = await api(
      `conversations/${conversation_id}/messages`
    )

    if (res.status < 400) {
      messages.value = res.data

      if (conversation.value && conversation.value.id !== conversation_id) {
        conversation.value.messages = res.data
      }
    }
  }

  const saveMessage = async (message: Partial<Message>) => {
    const res: ApiResponse<Message<Object, User>> = await api(
      `conversations/messages/create`,
      Method.POST,
      message
    )

    let msg: Message<Object, User> | null = null

    if (res.status < 400) {
      msg = res.data
      messages.value.push(msg)
    }

    return msg
  }

  return {
    // state
    messages,
    conversation,
    conversations,

    // actions
    saveMessage,
    fetchMessages,
    getConversations,
    startConversation,
    fetchConversations,
    getConversationById,
    getConversationByMembers
  }
})
