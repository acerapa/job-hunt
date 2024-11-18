<template>
  <div class="w-full h-screen flex flex-col gap-6 items-center justify-center">
    <div class="flex flex-col gap-2">
      <img
        src="@/assets/images/hammer-and-anvil-large.png"
        class="w-[70px] h-[70px] block mx-auto"
        alt="jim-trollhunters-sword"
      />
      <p class="text-[28px] font-semibold text-main">Welcome Job Provider</p>
    </div>
    <p class="italic text-sm font-light">*(Please fill forms to finish your registration)*</p>

    <div class="flex flex-col gap-10" v-if="!isCompanyShow">
      <div>
        <p class="text-base font-semibold text-left text-main">Account Info</p>
        <div class="flex flex-col gap-4 mt-3">
          <div class="flex gap-6">
            <InputComponent
              type="text"
              class="flex-1"
              name="first_name"
              label="First Name"
              input-class="w-full"
              placeholder="First name *"
              v-model="userModel.first_name"
              label-css="text-sm font-medium"
              :error-message="modelErrors.first_name"
              @input="
                setupErrors(
                  'first_name',
                  RequiredUserInfoSchema.shape.first_name,
                  userModel.first_name
                )
              "
            />
            <InputComponent
              type="text"
              class="flex-1"
              name="last_name"
              label="Last Name"
              input-class="w-full"
              placeholder="Last name *"
              v-model="userModel.last_name"
              label-css="text-sm font-medium"
              :error-message="modelErrors.last_name"
              @input="
                setupErrors(
                  'last_name',
                  RequiredUserInfoSchema.shape.last_name,
                  userModel.last_name
                )
              "
            />
          </div>
          <div class="flex gap-6">
            <InputComponent
              type="text"
              class="flex-1"
              name="phone"
              input-class="w-full"
              label="Phone Number"
              v-model="userModel.phone"
              placeholder="Contact Number *"
              label-css="text-sm font-medium"
              :error-message="modelErrors.phone"
              @input="setupErrors('phone', RequiredUserInfoSchema.shape.phone, userModel.phone)"
            />
            <InputComponent
              name="email"
              type="email"
              class="flex-1"
              label="Email"
              :disabled="true"
              input-class="w-full"
              placeholder="Email"
              v-model="userModel.email"
              label-css="text-sm font-medium"
              :error-message="modelErrors.email"
              @input="setupErrors('email', RequiredUserInfoSchema.shape.email, userModel.email)"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-base font-semibold text-left text-main">Address</p>
        <AddressComponent
          :has-label="true"
          v-model="profileAddress"
          @on-change="setupErrors"
          :model-errors="modelErrors"
          :prefix="userAddressPrefix"
          label-css="text-sm font-medium"
          class="[&>div]:gap-4 flex flex-col gap-5"
        />
      </div>
    </div>

    <div class="flex flex-col gap-6" v-if="isCompanyShow">
      <div>
        <p class="text-base font-semibold text-left text-main">Company Info</p>
        <div class="flex flex-col gap-4 mt-3">
          <div class="flex gap-6">
            <InputComponent
              name="name"
              type="text"
              class="flex-1"
              input-class="w-full"
              label="Company Name"
              placeholder="Company name *"
              label-css="text-sm font-medium"
              :error-message="modelErrors.name"
              v-model="companyModel.name"
              @input="setupErrors('name', CompanySchema.shape.name, companyModel.name)"
            />
            <InputComponent
              type="text"
              name="website"
              class="flex-1"
              label="Website"
              input-class="w-full"
              placeholder="Website"
              label-css="text-sm font-medium"
              :error-message="modelErrors.website"
              v-model="companyModel.website"
              @input="setupErrors('website', CompanySchema.shape.website, companyModel.website)"
            />
          </div>
          <InputComponent
            :rows="4"
            type="textarea"
            class="w-full"
            name="prof_summary"
            input-class="w-full"
            label="Company Description"
            label-css="text-sm font-medium"
            placeholder="Company description (Description, site, vision, mission, etc) *"
            :error-message="modelErrors.description"
            v-model="companyModel.description"
            @input="
              setupErrors('description', CompanySchema.shape.description, companyModel.description)
            "
          />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-base font-semibold text-left text-main">Company Address</p>
        <AddressComponent
          :prefix="companyAddressPrefix"
          :model-errors="modelErrors"
          v-model="companyAddress"
          @on-change="setupErrors"
          class="[&>div]:gap-6 flex flex-col gap-5"
        />
      </div>
    </div>

    <button
      class="btn w-fit mx-auto"
      @click="
        isCompanyShow = isValidModelAndAddress(
          userModel,
          RequiredUserInfoSchema,
          profileAddress,
          AddressSchema,
          userAddressPrefix
        )
      "
      v-if="!isCompanyShow"
    >
      Next
    </button>
    <div class="flex gap-3" v-if="isCompanyShow">
      <button class="btn-outline w-fit mx-auto" @click="isCompanyShow = false">Back</button>
      <button class="btn w-fit mx-auto" @click="onSubmit">Finish</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InputComponent from '../shared/InputComponent.vue'
import AddressComponent from '../shared/AddressComponent.vue'
import { useCompanyStore } from '@/stores/company-store'
import {
  UserUpdateSchema,
  z,
  validate,
  ZodSchema,
  AddressSchema,
  CompanySchema,
  type Address,
  type User,
  type Profile,
  type Company
} from '@shared/pack'
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'

const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()
const authUser = ref<User<Profile> | null>()
const companyStore = useCompanyStore()

const isLoading = defineModel<boolean>()

const userAddressPrefix = 'user'
const isCompanyShow = ref(false)
const companyAddressPrefix = 'company'

const modelErrors = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  position: '',
  name: '',
  description: '',
  website: ''
})

const RequiredUserInfoSchema = UserUpdateSchema.extend({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  phone: z.string().min(1, 'Contact number is required')
})

const userModel = ref<Partial<User>>({})
const profileAddress = ref<Partial<Address>>({})
const companyAddress = ref<Partial<Address>>({})
const companyModel = ref<Partial<Company>>({})

const onSubmit = async () => {
  let isValid = isValidModelAndAddress(
    userModel.value,
    RequiredUserInfoSchema,
    profileAddress.value,
    AddressSchema,
    userAddressPrefix
  )

  isValid = isValidModelAndAddress(
    companyModel.value,
    CompanySchema,
    companyAddress.value,
    AddressSchema,
    companyAddressPrefix
  )

  if (!isValid) {
    return
  }

  isLoading.value = true
  if (authUser.value) {
    const userUpdateRes = await userStore.updateUser(userModel.value, authUser.value.id)
    if (userUpdateRes.status == 200) {
      const companyCreateRes = await companyStore.registerCompany(
        companyModel.value,
        authUser.value.id
      )
      // TODO: Need to save the address of the company too
      if (companyCreateRes.status == 200) {
        await authStore.fetchAuthUser()
        router.push({
          name: 'provider'
        })
      }
    }
  }
  isLoading.value = false
}

const isValidModelAndAddress = (
  model: Object,
  schema: ZodSchema,
  addressModel: object,
  addressSchema: ZodSchema,
  prefix: string
): boolean => {
  let isValid = true
  const validated = validate(schema, model)
  if (!validated.valid) {
    modelErrors.value = Object.assign(modelErrors.value, validated.errors)
    isValid = false
  }

  const addressValidate = validate(addressSchema, addressModel)
  if (!addressValidate.valid) {
    const userAddValidate: Record<string, string> = {}
    if (addressValidate.errors) {
      Object.keys(addressValidate.errors).forEach((key) => {
        userAddValidate[`${prefix}_${key}`] = (addressValidate.errors as Record<string, string>)[
          key
        ]
      })
      modelErrors.value = Object.assign(modelErrors.value, userAddValidate)
    }
    isValid = false
  }

  return isValid
}

const setupErrors = (field: string, schema: ZodSchema, value: any) => {
  const { valid, errors } = validate(schema, value)
  const fieldError: Record<string, string> = {}
  fieldError[field] = !valid ? (errors as string) : ''
  modelErrors.value = Object.assign(modelErrors.value, fieldError)
  return valid
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()

  if (authUser.value) {
    userModel.value = authUser.value

    if (authUser.value.profile && authUser.value.profile.address) {
      profileAddress.value = authUser.value.profile.address
    }

    if (authUser.value.company) {
      companyModel.value = authUser.value.company
    }
  }
})
</script>
