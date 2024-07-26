import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserCreation, User, ApiResponse } from '@shared/pack'
import { authenticatedApi, Method } from '@/api'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>()
  const user = ref<User>()

  const createUser = async (user: UserCreation): Promise<ApiResponse<Record<string, number>>>  => {
    const res: ApiResponse<Record<string, number>> = await authenticatedApi('users/register', Method.POST, user);
    return res;
  }

  const fetchOneUser = async (id: string ): Promise<User | undefined> => {
    const res: ApiResponse<{user: User | null}> = await authenticatedApi(`users/${id}`)
    if (res.status && res.data.user) {
      user.value = res.data.user
    }
    return user.value
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
