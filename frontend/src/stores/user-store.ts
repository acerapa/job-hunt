import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserCreation, User, ApiResponse, UserUpdate } from '@shared/pack'
import { authenticatedApi, Method } from '@/api'
import { useAuthStore } from './auth-store'
import { LocalStorageKeys } from '@/const'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  const users = ref<User[]>()
  const user = ref<User>()

  const createUser = async (user: UserCreation): Promise<ApiResponse<Record<string, string>>> => {
    const res: ApiResponse<Record<string, string>> = await authenticatedApi(
      'users/register',
      Method.POST,
      user
    )

    if (res.status == 200) {
      // set tokens
      localStorage.setItem(LocalStorageKeys.ACCESS, res.data.acces as string)
      localStorage.setItem(LocalStorageKeys.REFRESH, res.data.refresh as string)
      localStorage.setItem(LocalStorageKeys.CURRENT_USER, res.data.user_id as string)

      await authStore.fetchAuthUser()
    }

    return res
  }

  const fetchOneUser = async (id: string): Promise<User | undefined> => {
    const res: ApiResponse<{ user: User | null }> = await authenticatedApi(`users/${id}`)
    if (res.status && res.data.user) {
      user.value = res.data.user
    }
    return user.value
  }

  const updateUser = async (data: UserUpdate) => {
    const res = await authenticatedApi(`users/${data.id}/update`, Method.POST, data)
    return res
  }

  return {
    user,
    users,
    createUser,
    updateUser,
    fetchOneUser
  }
})
