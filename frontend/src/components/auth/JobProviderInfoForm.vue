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
    <div v-if="!isAddressShowing">
      <p class="text-sm font-semibold text-left text-main">Representative Info</p>
      <div class="flex flex-col gap-5">
        <div class="flex gap-6">
          <InputComponent
            type="text"
            class="flex-1"
            name="first_name"
            input-class="w-full"
            placeholder="First name *"
            v-model="userModel.user.first_name"
            :error-message="modelErrors.first_name"
            @input="
              setupErrors(
                'first_name',
                RequiredUserInfoSchema.shape.first_name,
                userModel.user.first_name
              )
            "
          />
          <InputComponent
            name="last_name"
            class="flex-1"
            input-class="w-full"
            type="text"
            placeholder="Last name *"
            :error-message="modelErrors.last_name"
            v-model="userModel.user.last_name"
            @input="
              setupErrors(
                'last_name',
                RequiredUserInfoSchema.shape.last_name,
                userModel.user.last_name
              )
            "
          />
        </div>
        <div class="flex gap-6">
          <InputComponent
            name="mobile_number"
            class="flex-1"
            input-class="w-full"
            type="text"
            placeholder="Contact Number *"
            :error-message="modelErrors.mobile_number"
            v-model="userModel.user.mobile_number"
            @input="
              setupErrors(
                'mobile_number',
                RequiredUserInfoSchema.shape.mobile_number,
                userModel.user.mobile_number
              )
            "
          />
          <InputComponent
            name="email"
            class="flex-1"
            input-class="w-full"
            type="email"
            placeholder="Email *"
            :error-message="modelErrors.email"
            v-model="userModel.user.email"
            @input="setupErrors('email', RequiredUserInfoSchema.shape.email, userModel.user.email)"
          />
        </div>
        <div class="flex gap-6">
          <InputComponent
            name="position"
            class="flex-1"
            type="text"
            placeholder="Position *"
            v-model="companyModel.rep.position"
            :error-message="modelErrors.position"
            @input="
              setupErrors('position', CompanyRepSchema.shape.position, companyModel.rep.position)
            "
          />
        </div>
      </div>
    </div>
    <div v-if="!isAddressShowing">
      <p class="text-sm font-semibold text-left text-main">Company Info</p>
      <div class="flex flex-col gap-5">
        <div class="flex gap-6">
          <InputComponent
            name="name"
            type="text"
            class="flex-1"
            input-class="w-full"
            placeholder="Company name *"
            :error-message="modelErrors.name"
            v-model="companyModel.company.name"
            @input="setupErrors('name', CompanySchema.shape.name, companyModel.company.name)"
          />
          <InputComponent
            name="employee_range"
            type="text"
            class="flex-1"
            input-class="w-full"
            placeholder="Employee Range *"
            :error-message="modelErrors.employee_range"
            v-model="companyModel.company.employee_range"
            @input="
              setupErrors(
                'employee_range',
                CompanySchema.shape.employee_range,
                companyModel.company.employee_range
              )
            "
          />
        </div>
        <div class="flex">
          <InputComponent
            type="text"
            placeholder="Site url"
            name="site_url"
            :error-message="modelErrors.site_url"
            v-model="companyModel.company.site_url"
            @input="
              setupErrors('site_url', CompanySchema.shape.site_url, companyModel.company.site_url)
            "
          />
        </div>
        <InputComponent
          name="prof_summary"
          type="textarea"
          :rows="4"
          class="w-full"
          input-class="w-full"
          placeholder="Company description (Description, site, vision, mission, etc) *"
          :error-message="modelErrors.description"
          v-model="companyModel.company.description"
          @input="
            setupErrors(
              'description',
              CompanySchema.shape.description,
              companyModel.company.description
            )
          "
        />
      </div>
    </div>

    <div class="flex flex-col gap-6" v-if="isAddressShowing">
      <div class="flex flex-col gap-1">
        <p class="text-sm font-semibold text-left text-main">Rep Address</p>
        <AddressComponent
          :prefix="userAddressPrefix"
          :model-errors="modelErrors"
          v-model="userModel.address"
          @on-change="setupErrors"
          class="[&>div]:gap-6 flex flex-col gap-5"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-sm font-semibold text-left text-main">Company Address</p>
        <AddressComponent
          :prefix="companyAddressPrefix"
          :model-errors="modelErrors"
          v-model="companyModel.address"
          @on-change="setupErrors"
          class="[&>div]:gap-6 flex flex-col gap-5"
        />
      </div>
    </div>

    <button
      class="btn w-fit mx-auto"
      @click="isAddressShowing = isValidComAndRep()"
      v-if="!isAddressShowing"
    >
      Next
    </button>
    <div class="flex gap-3" v-if="isAddressShowing">
      <button class="btn-outline w-fit mx-auto" @click="isAddressShowing = false">Back</button>
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
  type UserUpdate,
  z,
  validate,
  ZodSchema,
  AddressSchema,
  CompanySchema,
  CompanyRepSchema,
  type CompanyCreation,
  type Address
} from '@shared/pack'
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const companyStore = useCompanyStore()

const isLoading = defineModel<boolean>()

const userAddressPrefix = 'user'
const isAddressShowing = ref(false)
const companyAddressPrefix = 'company'
const userUpdateModel: UserUpdate = {
  id: 0,
  user: {
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: ''
  },
  user_registration: {
    is_completed: true
  },
  address: {
    address1: '',
    address2: '',
    city: '',
    postal: ''
  }
}

const modelErrors = ref({
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  position: '',
  name: '',
  employee_range: '',
  description: '',
  site_url: ''
})

const RequiredUserInfoSchema = UserUpdateSchema.extend({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  mobile_number: z.string().min(1, 'Contact number is required')
})

const userModel = ref<UserUpdate>(userUpdateModel)

const companyModel = ref<CompanyCreation>({
  company: {
    name: '',
    description: '',
    employee_range: '',
    site_url: ''
  },
  rep: {
    position: '',
    user_id: 0
  },
  address: {
    address1: '',
    address2: '',
    city: '',
    postal: ''
  }
})

onMounted(async () => {
  if (userStore.user) {
    userModel.value.user.email = userStore.user.email
    userModel.value.id = userStore.user.id
    companyModel.value.rep.user_id = userStore.user.id
  }
})

const onSubmit = async () => {
  let isValid = isValidComAndRep()
  isValid = isValidAddresses(userModel.value.address, userAddressPrefix)
  isValid = isValidAddresses(companyModel.value.address, companyAddressPrefix)

  if (!isValid) {
    return
  }

  isLoading.value = true
  const userUpdateRes = await userStore.updateUser(userModel.value)
  if (userUpdateRes.status == 200) {
    const companyCreateRes = await companyStore.registerCompany(companyModel.value)
    if (companyCreateRes.status == 200) {
      router.push({
        name: 'dashboard'
      })
    }
  }
  isLoading.value = false
}

const isValidComAndRep = (): boolean => {
  let isValid = true
  const userValidated = validate(RequiredUserInfoSchema, userModel.value.user)
  if (!userValidated.valid) {
    modelErrors.value = Object.assign(modelErrors.value, userValidated.errors)
    isValid = false
  }

  if (!setupErrors('position', CompanyRepSchema.shape.position, companyModel.value.rep.position)) {
    isValid = false
  }
  const companyValidated = validate(CompanySchema, companyModel.value.company)
  if (!companyValidated.valid) {
    modelErrors.value = Object.assign(modelErrors.value, companyValidated.errors)
    isValid = false
  }

  return isValid
}

const isValidAddresses = (model: Partial<Address>, prefix: string): boolean => {
  let isValid = true

  const userAddressValidate = validate(AddressSchema, model)
  if (!userAddressValidate.valid) {
    const userAddValidate: Record<string, string> = {}
    if (userAddressValidate.errors) {
      Object.keys(userAddressValidate.errors).forEach((key) => {
        userAddValidate[`${prefix}_${key}`] = (
          userAddressValidate.errors as Record<string, string>
        )[key]
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
</script>
