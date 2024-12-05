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
            <p class="font-semibold text-base">{{ companyModel.name }}</p>
            <a
              :href="companyModel.website"
              target="_blank"
              class="text-sm font-semibold text-pale-gray"
              >&#128279; {{ companyModel.website }}</a
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
        <div class="flex flex-col gap-3 flex-1">
          <InputComponent
            type="text"
            name="company_name"
            label="Company Name"
            placeholder="Ex. ABC Company"
            label-css="text-sm font-medium"
            v-model="companyModel.name"
            :disabled="!sectionFormState.basic"
          />
          <InputComponent
            type="select"
            name="company_type"
            label="Company Type"
            :options="companyTypeOptions"
            placeholder="Ex. ABC Company"
            label-css="text-sm font-medium"
            v-model="companyModel.type"
            :disabled="!sectionFormState.basic"
          />
          <InputComponent
            type="select"
            v-if="companyModel.industry"
            :options="industryOptions"
            name="industry"
            label="Industry"
            label-css="text-sm font-medium"
            v-model="companyModel.industry.id"
            :disabled="!sectionFormState.basic"
          />
        </div>
        <div class="flex flex-col gap-3 flex-1">
          <div class="flex flex-col gap-1">
            <p class="text-sm font-medium">Employee Range</p>
            <div class="flex gap-3 items-center">
              <InputComponent
                name="min"
                type="number"
                class="max-w-28"
                placeholder="Min"
                v-model="min"
                :disabled="!sectionFormState.basic"
              />
              <span>to</span>
              <InputComponent
                name="max"
                type="number"
                class="max-w-28"
                placeholder="Max"
                v-model="max"
                :disabled="!sectionFormState.basic"
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
              <input type="file" :disabled="!sectionFormState.basic" />
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
              <input type="file" :disabled="!sectionFormState.basic" />
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
        :disabled="!sectionFormState.address"
      />
    </div>
    <div class="wrap">
      <div class="flex justify-between items-center">
        <p class="font-semibold text-main tracking-wide">Overview</p>
        <button
          class="btn-outline"
          v-if="!sectionFormState.overview"
          @click="sectionFormState.overview = true"
        >
          Edit
        </button>
        <div class="flex gap-3" v-if="sectionFormState.overview">
          <button class="btn-outline" @click="sectionFormState.overview = false">Cancel</button>
          <button class="btn" @click="onUpdateCompany()">Save</button>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <InputComponent
          type="textarea"
          name="description"
          label="Description"
          placeholder="Description"
          label-css="text-sm font-medium"
          v-model="companyModel.description"
          :disabled="!sectionFormState.overview"
        />
        <InputComponent
          type="textarea"
          name="mission"
          label="Mission"
          placeholder="Mission"
          v-model="companyModel.mission"
          label-css="text-sm font-medium"
          :disabled="!sectionFormState.overview"
        />
        <InputComponent
          type="textarea"
          name="vision"
          label="Vision"
          placeholder="Vision"
          v-model="companyModel.vision"
          label-css="text-sm font-medium"
          :disabled="!sectionFormState.overview"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import {
  CompanyTypeMap,
  type Address,
  type Company,
  type Industry,
  type Job,
  type Profile,
  type User
} from '@shared/pack'
import { computed, onMounted, ref } from 'vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import AddressComponent from '@/components/shared/AddressComponent.vue'
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

const companyModel = ref<Partial<Company<Object, Job, Object, Partial<Industry>>>>({
  industry: { id: 0 }
})

const addressModel = ref<Partial<Address>>({})

const onUpdateAddress = async () => {
  if (authUser.value && authUser.value.company) {
    await companyStore.updateComapnyAddress(addressModel.value, authUser.value.company.id)
  }

  sectionFormState.value.address = false
}

const employeeRange = computed(() => {
  return [min.value, max.value].join(' - ')
})

const companyTypeOptions = computed(() => {
  return Object.values(CompanyTypeMap)
})

const industryOptions = computed(() => {
  return companyStore.industries.map((i) => {
    return {
      text: i.name,
      value: i.id as number
    }
  })
})

const onUpdateCompany = async () => {
  // minimal modifications
  companyModel.value.employee_range = employeeRange.value

  if (authUser.value && authUser.value.company) {
    await companyStore.updateCompany(companyModel.value, authUser.value.company.id)
  }
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()

  // get industries
  await companyStore.getIndustries()

  if (authUser.value && authUser.value.company) {
    let company = await companyStore.getCompanyById(authUser.value.company.id)
    if (company) {
      companyModel.value = company

      if (company.address) {
        addressModel.value = company.address
      }
      // few modifications
      const [minValue, maxValue] = company.employee_range.split(' - ')
      min.value = parseInt(minValue)
      max.value = parseInt(maxValue)

      if (company.industry) {
        companyModel.value.industry = company.industry
      }
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
