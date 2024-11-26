<template>
  <div class="w-screen h-screen flex flex-col gap-4 items-center justify-center relative">
    <LoadingComponent v-if="isLoading" />
    <div class="text-center">
      <p class="text-main text-xl font-semibold">Are you a ...</p>
      <p class="text-sm font-light italic">*(Please select one)*</p>
    </div>
    <div class="flex gap-3 max-[490px]:flex-col">
      <div
        class="user-types"
        :class="type == UserType.HUNTER ? 'user-type-active' : ''"
        @click="type = UserType.HUNTER"
      >
        <img
          class="mx-auto"
          src="@/assets/images/jim-trollhunters-sword.png"
          alt="jim-trollhunters-sword"
        />
        <p class="text-main text-base font-extrabold">Job Hunter</p>

        <p class="mt-3 text-xs">
          <span class="text-xs font-bold">Job hunters:</span> Actively hunt jobs, honing skills and
          acquiring high level stats in order to face formidable
          <span class="text-xs font-bold">Jobs</span> they desire.
        </p>
      </div>
      <div
        class="user-types"
        :class="type == UserType.PROVIDER ? 'user-type-active' : ''"
        @click="type = UserType.PROVIDER"
      >
        <img class="mx-auto" src="@/assets/images/hammer-and-anvil.png" alt="hammer-and-anvil" />
        <p class="text-main text-base font-extrabold">Job Provider</p>

        <p class="mt-3 text-xs">
          <span class="text-xs font-bold">Job Providers</span>
          <span class="italic">(also know as Craftsman)</span>: Actively crafting different types
          and benefits of <span class="text-xs font-bold">Jobs</span> that can captivate the eyes of
          hunters
        </p>
      </div>
    </div>
    <button class="btn" @click="onSubmit">Continue</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserType, type ApiResponse, type User } from '@shared/pack/index'
import LoadingComponent from '@/components/shared/LoadingComponent.vue'
import { useAuthStore } from '@/stores/auth-store'
import { useUserStore } from '@/stores/user-store'

const isLoading = ref<boolean>(false)

const type = ref<UserType>()
const router = useRouter()
const authStore = useAuthStore()
const authUser = ref<User | null>()
const userStore = useUserStore()

onMounted(async () => {
  isLoading.value = false

  // validations
  authUser.value = await authStore.getAuthUser()

  if (!authUser.value) {
    router.push({
      name: 'signin'
    })
  } else if (authUser.value.type != null) {
    if (authUser.value.type == UserType.HUNTER) {
      router.push({
        name: 'hunter'
      })
    } else if (authUser.value.type == UserType.PROVIDER) {
      router.push({
        name: 'provider'
      })
    }
  }
})

const onSubmit = async () => {
  if (authUser.value == null) {
    return
  }
  const res: ApiResponse = await userStore.updateUser(
    {
      type: type.value
    },
    authUser.value.id
  )

  await authStore.fetchAuthUser()

  if (res.status == 200) {
    router.push({
      name: 'user-info',
      params: {
        type: type.value
      }
    })
  }
}
</script>

<style scoped>
.user-types {
  @apply w-56 p-4 text-center rounded cursor-pointer hover:border-main border-2;
}

.user-type-active {
  @apply border-2 !border-main;
}
</style>
