<template>
  <div class="step-1 flex flex-col gap-3">
    <InputComponent
      type="text"
      name="title"
      label="Job Title"
      label-css="font-medium"
      placeholder="Enter job title"
    />
    <div class="flex flex-col gap-0">
      <p class="font-medium">Available work setup</p>
      <div class="flex gap-4">
        <CheckButtonComponent label="On-site" id="on-site" name="on-site" value="on-site" />
        <CheckButtonComponent label="Remote" id="remote" name="remote" value="remote" />
        <CheckButtonComponent label="Hybrid" id="hybrid" name="hybrid" value="hybrid" />
      </div>
      <div class="px-3 mt-4 flex flex-col gap-2">
        <InputComponent
          type="checkbox"
          input-class="!w-fit"
          id="same-as-account"
          name="same_as_account"
          label="Same as account"
          class="flex items-center flex-row-reverse justify-end gap-2"
        />
        <InputComponent type="text" name="location" label="Location" placeholder="Enter location" />
      </div>
    </div>
    <div class="flex flex-col gap-0">
      <p class="font-medium">Available working hours</p>
      <div class="flex gap-4">
        <CheckButtonComponent label="Full-time" id="full-time" name="full-time" value="full-time" />
        <CheckButtonComponent label="Part-time" id="part-time" name="part-time" value="part-time" />
      </div>
      <div class="px-3 mt-4 flex flex-col gap-2">
        <InputComponent
          type="checkbox"
          input-class="!w-fit"
          id="flexible-hours"
          name="flexible-hours"
          label="Flexible hours"
          class="flex items-center flex-row-reverse justify-end gap-2"
        />

        <div>
          <p>Add availble shifts</p>
          <div class="flex gap-4 flex-wrap">
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
      <p class="font-medium">Enter Salary Range</p>
      <div class="flex gap-3">
        <InputComponent
          name="min"
          label="Min"
          type="number"
          class="flex-1"
          label-css="text-sm"
          placeholder="Enter min"
        />
        <InputComponent
          name="max"
          label="Max"
          type="number"
          class="flex-1"
          label-css="text-sm"
          placeholder="Enter max"
        />
      </div>
    </div>
    <div class="flex flex-col gap-0">
      <!-- TODO: need to add a wysiwyg editor -->
      <p class="font-medium">Job Description</p>
      <InputComponent type="textarea" name="description" placeholder="Enter job description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import CheckButtonComponent from '@/components/shared/CheckButtonComponent.vue'
</script>
