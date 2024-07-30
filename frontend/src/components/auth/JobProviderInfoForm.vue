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
    <div>
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
            v-model="repModel.position"
            :error-message="modelErrors.position"
            @input="setupErrors('position', PositionSchema, repModel.position)"
          />
        </div>
      </div>
    </div>
    <div>
      <p class="text-sm font-semibold text-left text-main">Company Info</p>
      <div class="flex flex-col gap-5">
        <div class="flex gap-6">
          <InputComponent
            name="company_name"
            type="text"
            class="flex-1"
            input-class="w-full"
            placeholder="Company name *"
          />
          <InputComponent
            name="employee_range"
            type="text"
            class="flex-1"
            input-class="w-full"
            placeholder="Employee Range *"
          />
        </div>
        <div class="flex">
          <InputComponent type="text" placeholder="Site url" name="site_url" />
        </div>
        <InputComponent
          name="prof_summary"
          type="textarea"
          :rows="4"
          class="w-full"
          input-class="w-full"
          placeholder="Company description (Description, site, vision, mission, etc) *"
        />
      </div>
    </div>
    <button class="btn w-fit mx-auto" @click="onSubmit">Finish</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InputComponent from '../shared/InputComponent.vue'
import { useCompanyStore } from '@/stores/company-store'
import {
  UserUpdateSchema,
  type UserUpdate,
  z,
  validate,
  ZodSchema,
  type CompanyRep
} from '@shared/pack'
import { useUserStore } from '@/stores/user-store'

const companyStore = useCompanyStore()
const userStore = useUserStore()

const userUpdateModel: UserUpdate = {
  id: 0,
  user: {
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: ''
  },
  user_registration: {
    is_completed: false
  }
}

const companyRepModel: Pick<CompanyRep, 'position'> = {
  position: ''
}

const modelErrors = ref({
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  position: ''
})

const RequiredUserInfoSchema = UserUpdateSchema.extend({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  mobile_number: z.string().min(1, 'Contact number is required')
})

const PositionSchema = z.string().min(1, 'Position is required')

const userModel = ref<UserUpdate>(userUpdateModel)
const repModel = ref<Pick<CompanyRep, 'position'>>(companyRepModel)

onMounted(async () => {
  await companyStore.fetchCompanies()
  if (userStore.user) {
    userModel.value.user.email = userStore.user.email
    userModel.value.id = userStore.user.id
  }
})

const onSubmit = async () => {
  let validationFailed = false
  const userValidated = validate(RequiredUserInfoSchema, userModel.value.user)
  if (!userValidated.valid) {
    modelErrors.value = Object.assign(modelErrors.value, userValidated.errors)
    validationFailed = true
  }
  if (!setupErrors('position', PositionSchema, repModel.value.position)) {
    validationFailed = true
  }

  if (validationFailed) return
}

const setupErrors = (field: string, schema: ZodSchema, value: any) => {
  const { valid, errors } = validate(schema, value)
  const fieldError: Record<string, string> = {}
  fieldError[field] = !valid ? (errors as string) : ''
  modelErrors.value = Object.assign(modelErrors.value, fieldError)
  return valid
}
</script>
