import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserCreation } from '@shared/pack'
import { authenticatedApi, Method } from '@/api'

export const useUserStore = defineStore('user', () => {
  const users = ref()

  const createUser = async (user: UserCreation) => {
    const res = await authenticatedApi('users/register', Method.POST, user);
    return res;
  }

  return {
    users,
    createUser
  }
})
