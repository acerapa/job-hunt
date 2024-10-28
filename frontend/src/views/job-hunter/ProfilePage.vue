<template>
  <div class="flex gap-4">
    <div class="max-w-[400px] w-full sticky top-0 flex flex-col gap-4">
      <div class="wrap !px-8 !py-6 !bg-green-bright text-white">
        <div class="flex gap-3 items-center">
          <img
            src="@/assets/images/default.png"
            alt="default.png"
            class="w-20 h-20 rounded-full ring ring-white"
          />
          <div>
            <p class="font-semibold">Harvey Aparece</p>
            <span class="text-pale-gray text-sm font-semibold">Web Developer</span>
          </div>
        </div>
        <div class="wrap !bg-pale-green mt-5 flex flex-col gap-3">
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/map-pin.png" class="brightness-0" alt="map-pin.png" />
            <span class="text-sm text-black">
              Tech Solutions Inc., 1234 Technology Way, San Francisco, CA 94103, USA
            </span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/email.png" class="brightness-0" alt="email.png" />
            <span class="text-sm text-black"> harvey.aparece.work@gmail.com </span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/phone.png" alt="phone.png" />
            <span class="text-sm text-black"> 09508605332 </span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/money-bag.png" class="brightness-0" alt="money-bag.png" />
            <span class="text-sm text-black"> 20k to 50k </span>
          </div>
        </div>
      </div>
      <div class="wrap !p-6">
        <div>
          <p class="font-bold text-main">Technical Skills</p>
          <div class="flex gap-3 mt-3 flex-wrap">
            <TagComponent text="HTML" />
            <TagComponent text="CSS3" />
            <TagComponent text="Python" />
            <TagComponent text="JavaScript" />
            <TagComponent text="MySQL" />
            <TagComponent text="MSSQL" />
          </div>
        </div>
        <div class="mt-10">
          <p class="font-bold text-main">Soft Skills</p>
          <div class="flex gap-3 mt-3 flex-wrap">
            <TagComponent text="English Proficiency" />
            <TagComponent text="Communication" />
            <TagComponent text="Time Management" />
            <TagComponent text="Problem Solving" />
            <TagComponent text="Creativity" />
            <TagComponent text="Teamwork" />
          </div>
        </div>
      </div>
    </div>
    <div class="h-[calc(100vh_-_134px)] overflow-y-auto thin-scrollbar flex-1 flex flex-col gap-4">
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-main">Personal Information</p>
          <button class="btn-outline">Edit</button>
        </div>
        <div class="flex gap-3">
          <InputComponent
            label="First Name"
            type="text"
            name="first_name"
            placeholder="First Name"
            label-css="text-sm"
            input-class="text-sm"
            v-model="model.first_name"
          />
          <InputComponent
            label="Last Name"
            type="text"
            name="last_name"
            placeholder="Last Name"
            label-css="text-sm"
            input-class="text-sm"
            v-model="model.last_name"
          />
        </div>
        <div class="flex gap-3">
          <InputComponent
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            label-css="text-sm"
            input-class="text-sm"
            v-model="model.email"
          />
          <InputComponent
            type="text"
            name="phone_number"
            label-css="text-sm"
            label="Phone number"
            input-class="text-sm"
            placeholder="Phone number"
            v-model="model.phone_number"
          />
          <InputComponent
            type="select"
            name="gender"
            label="Gender"
            label-css="text-sm"
            placeholder="Gender"
            input-class="text-sm"
            :options="[
              {
                text: 'Male',
                value: 'male'
              },
              {
                text: 'Female',
                value: 'female'
              }
            ]"
            v-model="model.gender"
          />
        </div>
      </div>
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-main">Address</p>
          <button class="btn-outline">Edit</button>
        </div>
        <div class="flex gap-3">
          <InputComponent
            label="Address 1"
            name="address1"
            type="text"
            placeholder="Ex. 1234 Main St"
            label-css="text-sm"
            input-class="text-sm"
          />
          <InputComponent
            label="Address 2"
            name="address2"
            type="text"
            placeholder="Ex. Apt. 7B"
            label-css="text-sm"
            input-class="text-sm"
          />
        </div>
        <div class="flex gap-3">
          <InputComponent
            label="City"
            name="city"
            type="text"
            placeholder="City"
            label-css="text-sm"
            input-class="text-sm"
          />
          <InputComponent
            label="Postal Code"
            name="postal_code"
            type="text"
            placeholder="Postal Code"
            label-css="text-sm"
            input-class="text-sm"
          />
          <InputComponent
            label="Province"
            type="text"
            name="province"
            placeholder="Province"
            label-css="text-sm"
            input-class="text-sm"
          />
          <InputComponent
            label="Country"
            type="text"
            name="country"
            placeholder="Country"
            label-css="text-sm"
            input-class="text-sm"
          />
        </div>
      </div>
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-main">Social and Community Links</p>
          <button class="btn-outline">Edit</button>
        </div>
        <div class="flex gap-3">
          <InputComponent
            label="Website/Porrtfolio"
            type="text"
            name="website"
            placeholder="Website/Portfolio"
            label-css="text-sm"
            input-class="text-sm"
          />
          <InputComponent
            label="LinkedIn"
            type="text"
            name="linkedin"
            placeholder="LinkedIn"
            label-css="text-sm"
            input-class="text-sm"
          />
        </div>
        <InputComponent
          label="GitHub"
          type="text"
          name="github"
          class="w-1/2"
          placeholder="GitHub"
          label-css="text-sm"
          input-class="text-sm"
        />
      </div>
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-main">Job hunter Specific Information</p>
          <button class="btn-outline">Edit</button>
        </div>
        <InputComponent
          label="Cover Letter"
          type="textarea"
          name="cover_letter"
          class="w-1/2"
          placeholder="Cover Letter"
          label-css="text-sm"
          input-class="text-sm"
        />
        <!-- TODO: Need to add a file uploader type of InputComponent -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagComponent from '@/components/shared/TagComponent.vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import { ref } from 'vue'

const model = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  gender: ''
})
</script>
