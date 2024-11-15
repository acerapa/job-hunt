<template>
  <div v-if="authUser" class="flex flex-col gap-3 mb-8">
    <div class="wrap flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <p class="font-semibold text-main tracking-wide">Account Information</p>
        <button
          class="btn-outline"
          v-if="!sectionFormState.account"
          @click="sectionFormState.account = true"
        >
          Edit
        </button>
        <div class="flex gap-3" v-if="sectionFormState.account">
          <button class="btn-outline" @click="sectionFormState.account = false">Cancel</button>
          <button class="btn" @click="onUpdateUser">Save</button>
        </div>
      </div>

      <div class="flex gap-10">
        <InputComponent
          type="text"
          name="first_name"
          label="First Name"
          placeholder="First Name"
          v-model="userModel.first_name"
          label-css="text-sm font-medium"
          :disabled="!sectionFormState.account"
        />
        <InputComponent
          type="text"
          name="last_name"
          label="Last Name"
          placeholder="Last Name"
          v-model="userModel.last_name"
          label-css="text-sm font-medium"
          :disabled="!sectionFormState.account"
        />
      </div>
      <div class="flex gap-10">
        <InputComponent
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          v-model="userModel.email"
          label-css="text-sm font-medium"
          :disabled="!sectionFormState.account"
        />
        <InputComponent
          name="phone"
          type="text"
          label="Phone"
          placeholder="Phone Number"
          v-model="userModel.phone"
          label-css="text-sm font-medium"
          :disabled="!sectionFormState.account"
        />
        <InputComponent
          name="gender"
          type="select"
          :options="[
            {
              text: 'Male',
              value: Gender.MALE
            },
            {
              text: 'Female',
              value: Gender.FEMALE
            }
          ]"
          label="Gender"
          placeholder="Gender"
          v-model="userModel.gender"
          label-css="text-sm font-m xedium"
          :disabled="!sectionFormState.account"
        />
      </div>
    </div>
    <div class="wrap">
      <div class="flex justify-between items-center">
        <p class="font-semibold text-main tracking-wide">Address Information</p>
        <button
          class="btn-outline"
          v-if="!sectionFormState.address"
          @click="sectionFormState.address = true"
        >
          Edit
        </button>
        <div class="flex gap-3" v-if="sectionFormState.address">
          <button class="btn-outline" @click="sectionFormState.address = false">Cancel</button>
          <button class="btn-outline" @click="onUpdateAddress">Save</button>
        </div>
      </div>
      <AddressComponent
        :has-label="true"
        v-model="addressModel"
        :model-errors="{}"
        class="address-component"
        :disabled="!sectionFormState.address"
      />
    </div>
    <div class="wrap">
      <p class="font-semibold">Delete Account</p>
      <div class="bg-red-300 w-fit px-3 rounded">
        <small class="text-white tracking-wide">Note: This action is irreversible</small>
      </div>
      <div class="flex gap-3 items-end">
        <InputComponent
          type="email"
          name="email"
          class="w-fit mt-4"
          label="Please input email for confirmation"
          placeholder="Email"
        />
        <button class="btn !px-4 !py-2.5">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import type { Address, Profile, User } from '@shared/pack'
import { Gender } from '@shared/pack'
import { onMounted, ref } from 'vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import AddressComponent from '@/components/shared/AddressComponent.vue'
import { useUserStore } from '@/stores/user-store'

const authStore = useAuthStore()
const userStore = useUserStore()
const authUser = ref<User<Profile> | null>()

const userModel = ref<Partial<User>>({})
const addressModel = ref<Partial<Address>>({})

const sectionFormState = ref<{
  account: boolean
  address: boolean
}>({
  account: false,
  address: false
})

const onUpdateUser = async () => {
  if (authUser.value) {
    await userStore.updateUser(userModel.value, authUser.value.id)
  }

  sectionFormState.value.account = false
}

const onUpdateAddress = async () => {
  if (authUser.value && authUser.value.profile) {
    await userStore.updateProfileAddress(addressModel.value, authUser.value.profile.id)
  }

  sectionFormState.value.address = false
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()

  if (authUser.value) {
    userModel.value = authUser.value
    if (authUser.value.profile && authUser.value.profile.address) {
      addressModel.value = authUser.value.profile.address
    }
  }
})
</script>

<style>
.address-component {
  @apply mt-4
    flex
    gap-4
    flex-col
    [&>div:first-child]:flex-row
    [&>div:nth-child(2)]:flex
    [&>div:nth-child(2)]:flex-row
    [&>div:nth-child(2)]:gap-4
    [&>div:nth-child(2)>div]:flex-1;
}
</style>
