<template>
  <div class="flex gap-4">
    <div class="w-full max-w-[450px]">
      <div class="wrap !bg-green-bright text-white flex gap-3 items-center">
        <img src="@/assets/icons/high-importance.png" alt="high-importance.png" />
        <div>
          <span class="block font-bold">Keep your profile updated</span>
          <p class="text-sm leading-4">
            This is to make sure that the information your sending is complete and accurate
          </p>
        </div>
      </div>
      <div class="wrap mt-1 flex gap-3 items-center">
        <img src="@/assets/images/default.png" alt="default.png" />
        <div>
          <button class="btn-outline float-right">Update</button>
          <div class="flex flex-col gap-0">
            <p class="font-bold">Harvey Aparece</p>
            <span class="text-sm">Web Developer</span>
          </div>
          <p>Nasipit Rd, Talamban Cebu City, Philippines</p>
          <p>09508605332</p>
          <p>harvey.aparece.work@gmail.com</p>
        </div>
      </div>

      <div class="wrap !bg-green-bright text-white mt-4 flex gap-3 items-center">
        <img src="@/assets/icons/high-importance.png" alt="high-importance.png" />
        <div>
          <span class="block font-bold">You are applying this position </span>
          <p class="text-sm leading-4">
            Please verify your information to make sure atmost accuracy
          </p>
        </div>
      </div>
      <div class="wrap mt-1">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-2xl font-bold">PHP Developer</p>
            <div class="flex gap-2 items-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1663127721165-f29d5bbd3da1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="company"
                class="w-10 h-10 rounded-full object-contain bg-gray-950"
              />
              <p class="text-gray-strong font-medium text-sm">ABC Company</p>
              <div class="flex gap-1">
                <img
                  src="@/assets/images/star-filled.png"
                  alt="star-filled.png"
                  v-for="ndx in 5"
                  :key="ndx"
                />
              </div>
            </div>
          </div>
          <button type="button" class="btn detail-btn">Details</button>
        </div>
        <div class="px-2 mt-3 flex flex-col gap-3">
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/map-pin.png" alt="map-pin.png" />
            <span class="text-xs text-gray-strong">
              Tech Solutions Inc., 1234 Technology Way, San Francisco, CA 94103, USA
            </span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/clock.png" alt="clock.png" />
            <span class="text-xs text-gray-strong">Full-Time</span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/office.png" alt="office.png" />
            <span class="text-xs text-gray-strong">Remote</span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/money-bag.png" alt="money-bag.png" />
            <span class="text-xs text-gray-strong">30k to 60k</span>
          </div>
        </div>
        <div class="mt-10">
          <p class="text-sm font-medium">Job Description</p>
          <p class="mt-4 font-normal text-sm text-justify">
            We are seeking a passionate and skilled PHP Developer to join our growing development
            team. In this role, you will be responsible for designing, developing, and maintaining
            web applications that deliver exceptional user experiences. You will work closely with
            project managers, UX/UI designers, and other developers to implement new features,
            optimize performance, and troubleshoot issues.
          </p>
        </div>
      </div>
    </div>
    <div class="wrap flex-1 !p-5">
      <div class="flex justify-between items-center">
        <p class="font-bold text-base">Employer Specific Questions</p>
        <button class="btn font-bold">Submit Application</button>
      </div>
      <div class="flex flex-col gap-4 mt-5">
        <InputComponent
          name="q1"
          type="text"
          placeholder="Question 1"
          class="w-4/5"
          label="How many years you have experience in Python only in working professionally? *"
          label-css="text-sm font-semibold"
        />
        <InputComponent
          name="q2"
          type="textarea"
          placeholder="Question 2"
          class="w-4/5"
          label="How will you manage stress?"
          label-css="text-sm font-semibold"
        />
        <InputComponent
          name="q2"
          type="textarea"
          placeholder="Question 2"
          class="w-4/5"
          label="Describe a challenging situation you faced at work and how you handled it."
          label-css="text-sm font-semibold"
        />
        <InputComponent
          name="q2"
          type="textarea"
          placeholder="Question 2"
          class="w-4/5"
          label="Can you describe a project you worked on that is relevant to this position?"
          label-css="text-sm font-semibold"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
</script>

<style scoped>
.detail-btn {
  @apply !bg-green-weak font-bold !py-2 !px-3 hover:border-green-weak hover:!bg-white hover:!text-green-weak;
}
</style>
