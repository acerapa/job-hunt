import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApiResponse, Application, Company, Profile, User, UserCred } from '@shared/pack'
import { api, Method } from '@/api'
import { SocketService } from '@/socket'

export const useAuthStore = defineStore('auth', function () {
  const authUser = ref<User<Profile<Object, Object, Application>, Company> | null>(null)

  const signIn = async (credential: UserCred) => {
    const loginResponse: ApiResponse<User> = await api('auth/login', Method.POST, credential)

    if (loginResponse.status == 200) {
      await fetchAuthUser()
    }
  }

  const signOut = async () => {
    // TODO: disconnect active socket connection
    await getAuthUser()
    if (authUser.value) {
      const socket = new SocketService(authUser.value.id)
      socket.getSocket().disconnect()
    }

    return await api(`auth/sign-out`)
  }

  const fetchAuthUser = async () => {
    const res: ApiResponse<User<Profile<Object, Object, Application>, Company>> =
      await api(`auth/authenticated`)

    if (res.status == 200) {
      authUser.value = res.data
    }
  }

  const getAuthUser = async (): Promise<User<Profile, Company> | null> => {
    if (!authUser.value) {
      await fetchAuthUser()
    }

    return authUser.value
  }

  return {
    signIn,
    signOut,
    getAuthUser,
    fetchAuthUser
  }
})
