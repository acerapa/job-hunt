<template>
  <div class="flex gap-3 items-end" :class="isCurrent ? 'flex-row-reverse' : ''" v-if="authUser">
    <img
      src="https://images.unsplash.com/photo-1611200945005-403b70229452?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="sender_profile_pic"
      class="w-7 h-7 rounded-full object-cover"
    />
    <div
      class="wrap !pb-8 min-w-[100px] max-w-[70%] relative"
      :class="isCurrent ? '!bg-pale-green' : '!bg-pale-blue'"
    >
      <p class="tracking-wide">{{ props.message.message }}</p>
      <small class="text-[10px] font-semibold absolute bottom-2 right-2 text-gray-strong">
        {{ props.message.created_at.toLocaleTimeString() }} &nbsp;&nbsp;
        <span class="font-bold">&check;</span>
      </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth-store'
import type { Message, User } from '@shared/pack'
import { computed, onMounted, ref } from 'vue'

interface Props {
  message: Message<Object, User>
}

const authStore = useAuthStore()
const authUser = ref<User | null>()

const props = defineProps<Props>()

const isCurrent = computed(() => {
  return props.message.sender.id == authUser.value?.id
})

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
})
</script>

<style scoped></style>
