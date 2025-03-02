<template>
  <div class="bg-sub h-screen flex">
    <div class="sign-in-wrapper">
      <div class="w-[70%] mx-auto">
        <div class="flex flex-col items-center">
          <p class="text-main text-base">Sign in to</p>
          <p class="text-main text-[32px] font-bold">Job Hunt</p>
        </div>
        <form
          class="flex flex-col gap-5 mt-6"
          @submit.prevent="onSignin"
          method="post"
          @click="invalidCredential = false"
        >
          <p v-if="invalidCredential" class="text-red-500 text-center">Invalid Credentials</p>
          <InputComponent
            type="text"
            name="usercred"
            input-class="w-full"
            v-model="model.usercred"
            placeholder="Username or Email"
            :error-message="modelErrors.usercred"
            @input="setupErrors('usercred', UserAuthSchema.shape.usercred, model.usercred)"
          />
          <div class="flex flex-col items-end gap-4">
            <InputComponent
              class="w-full"
              name="password"
              input-class="w-full"
              placeholder="Password"
              v-model="model.password"
              :error-message="modelErrors.password"
              :type="showPassword ? 'text' : 'password'"
              @input="setupErrors('password', UserAuthSchema.shape.password, model.password)"
            />
            <div class="flex gap-1 items-center">
              <input type="checkbox" class="input w-4 h-4" v-model="showPassword" />
              <p class="text-xs">Show password</p>
            </div>
          </div>
          <button type="submit" class="btn block mx-auto !px-4 !py-2">Sign in</button>
        </form>

        <div class="flex flex-col gap-4 mt-5">
          <p class="text-main text-base mx-auto">or Sign in with</p>
          <div class="flex gap-2 max-[820px]:flex-col">
            <button type="button" class="social-link max-[820px]:justify-center">
              <img src="@/assets/icons/google.svg" alt="google" />
              <p class="text-sm">Google</p>
            </button>
            <button type="button" class="social-link max-[820px]:justify-center">
              <img src="@/assets/icons/linkedin.svg" alt="linkedin" />
              <p class="text-sm">LinkedIn</p>
            </button>
            <button type="button" class="social-link max-[820px]:justify-center">
              <img src="@/assets/icons/github.svg" alt="github" />
              <p class="text-sm">GitHub</p>
            </button>
          </div>
          <p class="text-main text-base mx-auto">
            No account yet?
            <RouterLink :to="{ name: 'signup' }" class="text-blue-500 underline"
              >Sign up here!</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
    <div class="w-full h-full bg-green-100 flex items-center max-[700px]:hidden">
      <img
        class="w-full h-full object-cover"
        src="@/assets/images/sign-in-cover-photo.png"
        alt="sign-in-cover-photo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import {
  validate,
  UserAuthSchema,
  type UserCred,
  ZodSchema,
  type User,
  UserType
} from '@shared/pack'
import { ref } from 'vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import { useRouter } from 'vue-router'
import { useSocket } from '@/composable/useSocket'
import { useConversationStore } from '@/stores/conversation-store'

const showPassword = ref(false)
const invalidCredential = ref(false)
const model = ref<Partial<UserCred>>({})
const modelErrors = ref<Partial<UserCred>>({})
const router = useRouter()

const socket = useSocket()
const authStore = useAuthStore()
const conversationStore = useConversationStore()

const onSignin = async () => {
  const { valid, errors } = validate(UserAuthSchema, model.value)
  if (!valid && errors) {
    modelErrors.value = errors as Partial<UserCred>
    return
  }

  await authStore.signIn(model.value as UserCred)
  const authUser: User | null = await authStore.getAuthUser()
  if (authUser) {
    // connect to socket and initialize socket service
    socket.connect(authUser.id)
    await conversationStore.getConversations()
    await conversationStore.getConvoDisplays(authUser.id)

    if (authUser.type == UserType.HUNTER) {
      router.push({
        name: 'hunter'
      })
    } else if (authUser.type == UserType.PROVIDER) {
      router.push({
        name: 'provider'
      })
    } else if (authUser.type == null) {
      router.push({
        name: 'user-type'
      })
    }
  } else {
    invalidCredential.value = true
    model.value.password = ''
  }
}

const setupErrors = (field: string, schema: ZodSchema, value: any) => {
  let fieldErrors: Record<string, string> = modelErrors.value
  const { errors } = validate(schema, value)
  fieldErrors[field] = errors ? (errors as string) : ''
  modelErrors.value = fieldErrors as Partial<UserCred>
}
</script>

<style scoped>
.sign-in-wrapper {
  @apply min-w-[150px] w-full min-[700px]:max-w-[450px] bg-white h-full flex items-center overflow-y-auto;
}

@media screen and (max-height: 550px) {
  .sign-in-wrapper > div {
    max-height: 550px;
  }

  .sign-in-wrapper {
    align-items: start;
    padding: 3.9375rem 0;
  }
}
</style>
