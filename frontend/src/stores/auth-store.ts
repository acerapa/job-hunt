import { defineStore } from "pinia";
import { ref } from "vue";
import type { ApiResponse, LoginResponseData, UserCred } from '@shared/pack'
import { api, Method } from "@/api";

export const useAuthStore = defineStore('auth', function () {
  const access = ref("");
  const refresh = ref("");

  const signIn = async (credential: UserCred) => {
    const res: ApiResponse<LoginResponseData> = await api('/auth/login', Method.POST, credential);

    if (res.data.authenticated) {
      access.value = res.data.access;
      refresh.value = res.data.refresh;
    }

    return res.data.authenticated;
  }

  return {
    access,
    refresh,
    signIn
  }
});
