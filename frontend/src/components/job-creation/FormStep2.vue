<template>
  <div class="flex flex-col gap-3" v-if="jobModel && modelErrors">
    <InputComponent
      type="textarea"
      label-css="font-medium"
      name="key-responsibility"
      label="Key Responsibility"
      v-model="jobModel.responsibilities"
      placeholder="Enter key responsibility"
      :error-message="modelErrors.responsibilities"
    />

    <InputComponent
      type="textarea"
      label-css="font-medium"
      name="qualification"
      label="Qualifications"
      v-model="jobModel.qualifications"
      placeholder="Enter qualifications"
      :error-message="modelErrors.qualifications"
    />

    <InputComponent
      type="textarea"
      label-css="font-medium"
      name="what-we-offer"
      label="What we offer"
      placeholder="Enter offers"
      v-model="jobModel.what_we_offer"
      :error-message="modelErrors.what_we_offer"
    />

    <InputComponent
      name="others"
      label="Others"
      type="textarea"
      placeholder="others"
      label-css="font-medium"
      v-model="jobModel.others"
      :error-message="modelErrors.others"
    />
  </div>
</template>

<script setup lang="ts">
import type { Job } from '@shared/pack'
import InputComponent from '../shared/InputComponent.vue'

const jobModel = defineModel<Partial<Job>>()
const modelErrors = defineModel<Partial<Job>>('modelErrors')
</script>
