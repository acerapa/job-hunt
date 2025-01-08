<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth-store'
import { useSocket } from './composable/useSocket'
import { useConversationStore } from './stores/conversation-store'

const authStore = useAuthStore()
const { connect } = useSocket()
const conversationStore = useConversationStore()

onMounted(async () => {
  const authUser = await authStore.getAuthUser()
  await conversationStore.getConversations()

  if (authUser) {
    await conversationStore.getConvoDisplays(authUser.id)
    connect(authUser.id)
  }
})
</script>
