<template>
  <div v-if="authUser" class="flex flex-col gap-3">
    <div class="wrap !p-0">
      <div class="wrap !rounded-b-none !bg-green-bright h-24"></div>
      <div class="wrap !rounded-t-none flex justify-between items-start">
        <div class="flex gap-3 items-center -mt-8">
          <img
            src="@/assets/images/default.png"
            alt="default.png"
            class="w-20 h-20 rounded-full border-2 border-white bg-gray-700"
          />
          <div class="flex flex-col gap-0">
            <p class="font-semibold text-base">Harvey Aparece</p>
            <a href="#" class="text-sm font-semibold text-pale-gray"
              >&#128279; &lcub;&lcub; website_link &rcub;&rcub;</a
            >
          </div>
        </div>
        <button class="btn-outline">Preview</button>
      </div>
    </div>
    <div class="wrap">
      <div class="flex justify-between items-center">
        <p class="font-semibold text-main tracking-wide">Basic Information</p>
        <button class="btn-outline">Edit</button>
      </div>
      <div class="mt-4 flex gap-10">
        <div class="flex flex-col gap-3">
          <InputComponent
            type="text"
            name="company_name"
            label="Company Name"
            placeholder="Ex. ABC Company"
            label-css="text-sm font-medium"
          />
          <InputComponent
            type="select"
            :options="[]"
            name="company_type"
            label="Company Type"
            placeholder="Ex. ABC Company"
            label-css="text-sm font-medium"
          />
          <div class="flex flex-col gap-0">
            <p class="text-sm font-medium">Industry</p>
            <div class="flex gap-4 flex-wrap">
              <CheckButtonComponent
                id="information_technology"
                name="information_technology"
                value="information_technology"
                label="Information Technology"
              />
              <CheckButtonComponent
                id="software_development"
                name="software_development"
                label="Software Development"
                value="software_development"
              />
              <CheckButtonComponent
                id="robotics"
                name="robotics"
                label="Robotics"
                value="robotics"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <p class="text-sm font-medium">Employee Range</p>
            <div class="flex gap-3 items-center">
              <InputComponent name="min" type="number" class="max-w-28" placeholder="Min" />
              <span>to</span>
              <InputComponent name="max" type="number" class="max-w-28" placeholder="Max" />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-sm font-medium">Company Logo</p>
            <div class="flex gap-3 items-start">
              <img
                alt="default.png"
                src="@/assets/images/default.png"
                class="w-14 h-14 rounded-full bg-gray-700"
              />
              <input type="file" />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-sm font-medium">Company Cover Photo</p>
            <div class="flex gap-3 items-start">
              <img
                alt="default.png"
                src="@/assets/images/default.png"
                class="w-14 h-14 rounded-full bg-gray-700"
              />
              <input type="file" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import type { User } from '@shared/pack'
import { onMounted, ref } from 'vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import CheckButtonComponent from '@/components/shared/CheckButtonComponent.vue'

const authStore = useAuthStore()
const authUser = ref<User | null>(null)

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
})
</script>
