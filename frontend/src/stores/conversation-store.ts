import { api, Method } from '@/api'
import type { Convo, ConvoMember } from '@/types'
import type { ApiResponse, Conversation, Message, User } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth-store'

export const useConversationStore = defineStore('conversation', () => {
  const messages = ref<Partial<Message<Object, User>[]>>([])
  const conversations = ref<Conversation<User, Message>[]>([])
  const conversation = ref<Conversation<User, Message> | null>()

  const convoDisplays = ref<Convo[]>([])
  const convoDisplay = ref<Convo | null>(null)

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

  const getConvoDisplays = async (sender_id: number) => {
    const authStore = useAuthStore()
    const authUser = await authStore.getAuthUser()

    convoDisplays.value = conversations.value.map((convo): Convo => {
      const convoMembers: ConvoMember[] = convo.members.map((member): ConvoMember => {
        return {
          user: member,
          user_id: member.id,
          full_name: `${member.first_name} ${member.last_name}`,
          is_active: member.is_active
        }
      })

      const receivers = convoMembers.filter((member) => member.user_id !== sender_id)
      const sender = convoMembers.find((member) => member.user_id === sender_id)

      return {
        id: convo.id,
        receviers: receivers,
        is_pinned: convo.is_pinned,
        sender: sender as ConvoMember,
        messages: convo.messages as Message<Object, User>[],
        last_message:
          convo.messages && convo.messages.length
            ? (convo.messages[0] as Message<Object, User>)
            : undefined,
        unread_messages:
          convo.messages && convo.messages.length
            ? (convo.messages as Message<Object, User>[]).filter(
                (msg) => !msg.is_seen && msg.sender.id !== authUser?.id
              )
            : [],
        unread_messages_number:
          convo.messages && convo.messages.length
            ? (convo.messages as Message<Object, User>[]).filter(
                (msg) => !msg.is_seen && msg.sender.id !== authUser?.id
              ).length
            : 0
      }
    })
  }

  const getConvoDisplayById = (convo_id: number) => {
    convoDisplay.value = convoDisplays.value.find((c) => c.id == convo_id) as Convo
    return convoDisplay.value
  }

  const setActiveStatus = (convo_id: number, user_id: number, is_active: boolean) => {
    if (!convoDisplays.value.length) return
    const convo = convoDisplays.value.find((c: Convo) => c.id == convo_id)
    if (convo) {
      const ndx = convo.receviers.findIndex((r) => r.user_id == user_id)
      if (ndx > -1) {
        convo.receviers[ndx].is_active = is_active
      }
    }
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
    }

    return msg
  }

  const updateMessage = async (message_id: number, message: Partial<Message>) => {
    const res: ApiResponse<Message<Object, User>> = await api(
      `conversations/messages/${message_id}/update`,
      Method.POST,
      message
    )

    return res.status < 400
  }

  const readMessages = async () => {
    const messages = convoDisplay.value?.unread_messages || []
    await Promise.all(messages.map(async (msg) => updateMessage(msg.id, { is_seen: true })))
  }

  return {
    // state
    messages,
    conversation,
    convoDisplay,
    conversations,
    convoDisplays,

    // actions
    saveMessage,
    readMessages,
    updateMessage,
    fetchMessages,
    setActiveStatus,
    getConversations,
    getConvoDisplays,
    startConversation,
    fetchConversations,
    getConversationById,
    getConvoDisplayById,
    getConversationByMembers
  }
})
