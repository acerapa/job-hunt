<template>
  <div class="flex flex-col gap-3">
    <InputComponent
      type="textarea"
      label-css="font-medium"
      name="key-responsibility"
      label="Key Responsibility"
      placeholder="Enter key responsibility"
    />

    <InputComponent
      type="textarea"
      label-css="font-medium"
      name="qualification"
      label="Qualifications"
      placeholder="Enter qualifications"
    />

    <InputComponent
      type="textarea"
      label-css="font-medium"
      name="what-we-offer"
      label="What we offer"
      placeholder="Enter offers"
    />

    <InputComponent
      name="others"
      label="Others"
      type="textarea"
      placeholder="others"
      label-css="font-medium"
    />
  </div>
</template>

<script setup lang="ts">
import InputComponent from '../shared/InputComponent.vue'
</script>
