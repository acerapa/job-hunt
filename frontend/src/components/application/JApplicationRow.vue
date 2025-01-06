<template>
  <div
    class="grid grid-cols-6 gap-3 odd:bg-tint-green px-4 py-3 items-center"
    @mouseenter="isRowFocused = true"
    @mouseleave="updateRowState"
  >
    <p class="col-span-2">{{ props.row.job.title }}</p>
    <p class="col-span-2">{{ props.row.job.company.name }}</p>
    <div class="col-span-1">
      <p class="col-span-1" :class="ApplicationStatusMap[props.row.status].class">
        {{ ApplicationStatusMap[props.row.status].text }}
      </p>
    </div>
    <div class="col-span-1 flex gap-2 relative">
      <button @click="isShowMenu = true" class="col-span-1 w-fit ml-4">
        <img src="@/assets/icons/menu.png" alt="menu.png" />
      </button>
      <div
        class="wrap shadow-lg w-fit absolute top-1/2 -left-16 z-20 flex flex-col gap-1 !px-0"
        v-if="isRowFocused && isShowMenu"
      >
        <RouterLink :to="'#'" class="py-1 font-medium hover:bg-blue-50 px-4">
          View Application
        </RouterLink>
        <button @click="gotoConversation" class="py-1 font-medium hover:bg-blue-50 px-4">
          Send Message
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { useCompanyStore } from '@/stores/company-store'
import { useConversationStore } from '@/stores/conversation-store'
import {
  ApplicationStatusMap,
  type Application,
  type Company,
  type Job,
  type Profile,
  type User
} from '@shared/pack'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  row: Application<Job<Object, Company<User>>, Profile>
}

const isShowMenu = ref(false)
const isRowFocused = ref(false)
const authUser = ref<User | null>()

const router = useRouter()
const authStore = useAuthStore()
const companyStore = useCompanyStore()
const conversationStore = useConversationStore()

const updateRowState = () => {
  isShowMenu.value = false
  isRowFocused.value = false
}

const props = defineProps<Props>()

const gotoConversation = async () => {
  if (!authUser.value) return

  await companyStore.fetchCompanyById(props.row.job.company.id)
  // check if has conversation already
  if (companyStore.company && companyStore.company.user) {
    conversationStore.getConversationByMembers([authUser.value.id, companyStore.company.user.id])

    // if conversation did not exist, create one
    if (!conversationStore.conversation) {
      if (!companyStore.company) return
      const data = {
        members: [authUser.value.id, companyStore.company.user.id],
        is_pinned: false
      }
      const res = await conversationStore.startConversation(data)

      if (res) {
        await conversationStore.fetchConversations()
        conversationStore.getConversationByMembers([
          authUser.value.id,
          companyStore.company.user.id
        ])
      }
    }
  }

  // navigate to conversation
  if (conversationStore.conversation) {
    router.push({
      name: 'messages',
      query: {
        id: conversationStore.conversation.id
      }
    })
  }
}

onMounted(async () => {
  await conversationStore.getConversations()
  authUser.value = await authStore.getAuthUser()
})
</script>
