import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserCreation, User } from '@shared/pack'
import { authenticatedApi, Method } from '@/api'
import type { ApiResponse } from '@acerapa/job-hunt-shared-types'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>()
  const user = ref<User>()

  const createUser = async (user: UserCreation) => {
    const res: ApiResponse<Record<string, number>> = await authenticatedApi('users/register', Method.POST, user);
    return res;
  }

  const fetchOneUser = async (id: string ) => {
    const res: ApiResponse<{user: User}> = await authenticatedApi(`users/${id}`)
    if (res.status) {
      user.value = res.data.user
      return user.value
    }
    return
  }

  const updateUser = async (data: any) => {
    const res = await authenticatedApi('users/update', Method.POST, data)
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
