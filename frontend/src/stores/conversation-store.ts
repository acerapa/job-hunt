import { api, Method } from '@/api'
import type { ApiResponse, Conversation, Message, User } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConversationStore = defineStore('message', () => {
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

  return {
    conversation,
    conversations,
    getConversations,
    startConversation,
    fetchConversations,
    getConversationByMembers
  }
})
