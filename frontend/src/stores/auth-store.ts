import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApiResponse, LoginResponseData, User, UserCred } from '@shared/pack'
import { api, Method } from '@/api'
import { useUserStore } from './user-store'
import { getAuthUserLocalSt, LocalStorageKeys } from '@/const'

export const useAuthStore = defineStore('auth', function () {
  const userStore = useUserStore()
  const authUser = ref<User | null>()
  const access = ref('')
  const refresh = ref('')

  const signIn = async (credential: UserCred) => {
    const res: ApiResponse<LoginResponseData> = await api('/auth/login', Method.POST, credential)

    if (res.data.authenticated) {
      access.value = res.data.access
      refresh.value = res.data.refresh

      // persist tokens to localstorage
      localStorage.setItem(LocalStorageKeys.ACCESS, access.value)
      localStorage.setItem(LocalStorageKeys.REFRESH, refresh.value)
      localStorage.setItem(LocalStorageKeys.CURRENT_USER, res.data.user_id)
      localStorage.setItem(LocalStorageKeys.CURRENT_USER_OBJECT, JSON.stringify(res.data.user))
    }

    return res.data.authenticated
  }

  const signOut = async () => {
    localStorage.removeItem(LocalStorageKeys.ACCESS)
    localStorage.removeItem(LocalStorageKeys.REFRESH)
    localStorage.removeItem(LocalStorageKeys.CURRENT_USER)
    localStorage.removeItem(LocalStorageKeys.CURRENT_USER_OBJECT)

    // TODO: call api to revoke the tokes (access & refresh)
  }

  const fetchAuthUser = async (isForce: boolean = false) => {
    if (!localStorage.getItem(LocalStorageKeys.CURRENT_USER)) return
    try {
      if (!isForce) {
        authUser.value = getAuthUserLocalSt()
          ? getAuthUserLocalSt()
          : await userStore.fetchOneUser(
              localStorage.getItem(LocalStorageKeys.CURRENT_USER) as string
            )
      }

      authUser.value = await userStore.fetchOneUser(
        localStorage.getItem(LocalStorageKeys.CURRENT_USER) as string
      )

      localStorage.setItem(LocalStorageKeys.CURRENT_USER_OBJECT, JSON.stringify(authUser.value))
    } catch (error) {
      console.error(error)
    }
  }

  return {
    access,
    refresh,
    authUser,
    signIn,
    signOut,
    fetchAuthUser
  }
})
