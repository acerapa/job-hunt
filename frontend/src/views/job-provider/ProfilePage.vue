<template>
  <div v-if="authUser" class="flex flex-col gap-3 mb-8">
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
        <button
          class="btn-outline"
          v-if="!sectionFormState.basic"
          @click="sectionFormState.basic = true"
        >
          Edit
        </button>
        <div class="flex gap-3" v-if="sectionFormState.basic">
          <button class="btn-outline" @click="sectionFormState.basic = false">Cancel</button>
          <button class="btn" @click="onUpdateCompany">Save</button>
        </div>
      </div>
      <div class="mt-4 flex gap-10">
        <div class="flex flex-col gap-3">
          <InputComponent
            type="text"
            name="company_name"
            label="Company Name"
            placeholder="Ex. ABC Company"
            label-css="text-sm font-medium"
            v-model="companyModel.name"
          />
          <InputComponent
            type="select"
            :options="[]"
            name="company_type"
            label="Company Type"
            placeholder="Ex. ABC Company"
            label-css="text-sm font-medium"
            v-model="companyModel.type"
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
              <InputComponent
                name="min"
                type="number"
                class="max-w-28"
                placeholder="Min"
                v-model="min"
              />
              <span>to</span>
              <InputComponent
                name="max"
                type="number"
                class="max-w-28"
                placeholder="Max"
                v-model="max"
              />
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
          <button class="btn" @click="onUpdateAddress()">Save</button>
        </div>
      </div>
      <AddressComponent
        :has-label="true"
        :model-errors="{}"
        v-model="addressModel"
        class="address-component"
      />
    </div>
    <div class="wrap">
      <div class="flex justify-between items-center">
        <p class="font-semibold text-main tracking-wide">Overview</p>
        <button class="btn-outline">Edit</button>
      </div>
      <div class="flex flex-col gap-4">
        <InputComponent
          type="textarea"
          name="description"
          label="Description"
          placeholder="Description"
          label-css="text-sm font-medium"
          v-model="companyModel.description"
        />
        <InputComponent
          type="textarea"
          name="mission"
          label="Mission"
          placeholder="Mission"
          label-css="text-sm font-medium"
        />
        <InputComponent
          type="textarea"
          name="vision"
          label="Vision"
          placeholder="Vision"
          label-css="text-sm font-medium"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import type { Address, Company, Profile, User } from '@shared/pack'
import { onMounted, ref } from 'vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import AddressComponent from '@/components/shared/AddressComponent.vue'
import CheckButtonComponent from '@/components/shared/CheckButtonComponent.vue'
import { useCompanyStore } from '@/stores/company-store'

const min = ref<number>()
const max = ref<number>()
const sectionFormState = ref<{ basic: boolean; address: boolean; overview: boolean }>({
  basic: false,
  address: false,
  overview: false
})

const authStore = useAuthStore()
const companyStore = useCompanyStore()
const authUser = ref<User<Profile, Company> | null>(null)

const companyModel = ref<Partial<Company>>({})

const addressModel = ref<Partial<Address>>({})

const onUpdateAddress = async () => {
  if (authUser.value && authUser.value.company) {
    await companyStore.updateComapnyAddress(addressModel.value, authUser.value.company.id)
  }

  sectionFormState.value.address = false
}

const onUpdateCompany = async () => {
  if (authUser.value && authUser.value.company) {
    await companyStore.updateCompany(companyModel.value, authUser.value.company.id)
  }
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()

  if (authUser.value && authUser.value.company) {
    companyModel.value = authUser.value.company
    if (authUser.value.company.address) {
      addressModel.value = authUser.value.company.address
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
