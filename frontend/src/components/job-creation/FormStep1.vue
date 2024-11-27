<template>
  <div class="step-1 flex flex-col gap-5" v-if="jobModel && modelErrors">
    <InputComponent
      type="text"
      class="w-fit"
      name="title"
      label="Job Title"
      input-class="text-sm"
      label-css="font-medium"
      v-model="jobModel.title"
      placeholder="Enter job title"
      :error-message="modelErrors.title"
    />
    <div class="flex flex-col gap-0">
      <p class="font-medium">Available working hours</p>
      <div class="flex gap-1">
        <CheckButtonComponent
          label="Full-time"
          id="full-time"
          name="full-time"
          :value="WorkType.FULLTIME"
          v-model="jobModel.work_type"
        />
        <CheckButtonComponent
          label="Part-time"
          id="part-time"
          name="part-time"
          :value="WorkType.PARTTIME"
          v-model="jobModel.work_type"
        />
        <CheckButtonComponent
          label="Internship"
          id="internship"
          name="internship"
          :value="WorkType.INTERNSHIP"
          v-model="jobModel.work_type"
        />
      </div>
      <div class="px-3 mt-4 flex flex-col gap-2">
        <InputComponent
          type="checkbox"
          id="flexible-hours"
          name="flexible-hours"
          label="Flexible hours"
          input-class="!w-fit text-sm"
          class="flex items-center !flex-row-reverse justify-end gap-2"
        />

        <div>
          <p>Add availble shifts</p>
          <div class="flex gap-1 flex-wrap">
            <CheckButtonComponent label="Morning" id="morning" name="morning" value="morning" />
            <CheckButtonComponent
              label="Afternoon"
              id="afternoon"
              name="afternoon"
              value="afternoon"
            />
            <CheckButtonComponent label="Evening" id="evening" name="evening" value="evening" />
            <CheckButtonComponent
              label="Grave yard"
              id="grave-ward"
              name="grave-ward"
              value="grave-ward"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-0">
      <p class="font-medium">Available work setup</p>
      <div class="flex gap-1">
        <CheckButtonComponent
          label="On-site"
          id="on-site"
          name="on-site"
          :value="WorkSetup.ONSITE"
          v-model="jobModel.work_setup"
        />
        <CheckButtonComponent
          label="Remote"
          id="remote"
          name="remote"
          :value="WorkSetup.REMOTE"
          v-model="jobModel.work_setup"
        />
        <CheckButtonComponent
          label="Hybrid"
          id="hybrid"
          name="hybrid"
          :value="WorkSetup.HYBRID"
          v-model="jobModel.work_setup"
        />
      </div>
      <div
        class="px-3 mt-4 flex flex-col gap-2"
        v-if="jobModel.work_setup?.includes(WorkSetup.ONSITE)"
      >
        <InputComponent
          type="checkbox"
          id="same-as-account"
          name="same_as_account"
          label="Same as account"
          @change="onSameAsAccount"
          input-class="!w-fit text-sm"
          v-model="jobModel.same_address"
          class="flex items-center !flex-row-reverse justify-end gap-2"
        />
        <div>
          <p>Enter custom address</p>
          <AddressComponent
            :has-label="true"
            v-model="jobModel.address"
            class="flex flex-col gap-3"
            :model-errors="modelErrors"
            :disabled="jobModel.same_address"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-0">
      <p class="font-medium">Enter Salary Range</p>
      <InputComponent
        type="checkbox"
        name="show-salary"
        label="Show salary"
        v-model="showSalary"
        input-class="!w-fit text-sm"
        class="flex items-center !flex-row-reverse justify-end gap-2 [&>input]:w-fit mt-1"
      />
      <div class="flex gap-3">
        <InputComponent
          name="min"
          label="Min"
          type="number"
          v-model="min"
          class="flex-1"
          label-css="text-sm"
          input-class="text-sm"
          placeholder="Enter min"
        />
        <InputComponent
          name="max"
          label="Max"
          v-model="max"
          type="number"
          class="flex-1"
          label-css="text-sm"
          input-class="text-sm"
          placeholder="Enter max"
        />
      </div>
    </div>
    <InputComponent
      type="text"
      id="application_url"
      name="application_url"
      input-class="text-sm"
      label="Application URL"
      label-css="font-medium"
      v-model="jobModel.application_url"
      :error-message="modelErrors.application_url"
      placeholder="Ex. https://www.example.com/apply/job/123"
    />
    <div class="flex flex-col gap-0">
      <!-- TODO: need to add a wysiwyg editor -->
      <p class="font-medium">Job Description</p>
      <InputComponent
        type="textarea"
        name="description"
        input-class="text-sm"
        v-model="jobModel.description"
        placeholder="Enter job description"
        :error-message="modelErrors.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import AddressComponent from '../shared/AddressComponent.vue'
import CheckButtonComponent from '@/components/shared/CheckButtonComponent.vue'
import {
  type Skill,
  WorkSetup,
  WorkType,
  type Address,
  type Company,
  type Job,
  type Profile,
  type User
} from '@shared/pack'
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth-store'

const showSalary = ref<boolean>(true)
const jobModel = defineModel<Partial<Job<Skill, Partial<Address>>>>()
const modelErrors = defineModel<Partial<Job & Address>>('modelErrors')
const min = ref<number>(0)
const max = ref<number>(0)

const authUser = ref<User<Profile, Company> | null>(null)
const authStore = useAuthStore()

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
})

const onSameAsAccount = () => {
  if (jobModel.value) {
    if (jobModel.value.same_address && authUser.value) {
      jobModel.value.address = authUser.value.company?.address
    } else {
      jobModel.value.address = {}
    }
  }
}

watch(
  () => [min.value, max.value],
  () => {
    if (jobModel.value) {
      jobModel.value.salary_range = `${min.value}k - ${max.value}k`
    }
  }
)

watch(
  () => jobModel.value?.salary_range,
  () => {
    if (jobModel.value && jobModel.value.salary_range) {
      const salaryRange = jobModel.value.salary_range.replace('k', '').replace('k', '').split(' - ')

      if (salaryRange.length === 2) {
        min.value = parseInt(salaryRange[0])
        max.value = parseInt(salaryRange[1])
      }
    }
  }
)
</script>
