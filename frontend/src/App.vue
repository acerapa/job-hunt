<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth-store'
import { Event } from './event'

const authStore = useAuthStore()

onMounted(async () => {
  if (localStorage.getItem('current_user')) {
    await authStore.fetchAuthUser()
  }
})

// setup click outside event
window.addEventListener('click', function () {
  Event.emit('window-click')
})

// global setup to add new dropdown component
Event.on('new-dropdown', function (data: any) {
  console.log('New dropdown added!!!')
})
</script>
