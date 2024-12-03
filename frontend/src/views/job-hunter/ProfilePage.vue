<template>
  <div class="wrap flex justify-between mb-4">
    <p class="text-lg font-semibold">Profile Page</p>
    <button class="btn-outline" @click="router.back()">&longleftarrow; Back</button>
  </div>
  <div class="flex gap-4" v-if="authUser">
    <div class="max-w-[350px] w-full h-fit sticky top-[70px] flex flex-col gap-4">
      <div class="wrap !px-8 !py-6 !bg-green-bright text-white">
        <div class="flex gap-3 items-center">
          <img
            src="@/assets/images/default.png"
            alt="default.png"
            class="w-20 h-20 rounded-full ring ring-white"
          />
          <div>
            <p class="font-semibold">
              {{ `${authUser.first_name || ''} ${authUser.last_name || ''}` }}
              <span class="font-normal text-blue-100">@{{ authUser.username }}</span>
            </p>
            <span class="text-blue-300 text-sm font-semibold">Web Developer</span>
          </div>
        </div>
        <div class="wrap !bg-pale-green mt-5 flex flex-col gap-3">
          <div class="flex gap-2 items-center" v-if="stringAddress">
            <img src="@/assets/icons/map-pin.png" class="brightness-0" alt="map-pin.png" />
            <span class="text-sm text-black">{{ stringAddress }}</span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/email.png" class="brightness-0" alt="email.png" />
            <span class="text-sm text-black"> {{ authUser.email }} </span>
          </div>
          <div class="flex gap-2 items-center" v-if="authUser.phone">
            <img src="@/assets/icons/phone.png" alt="phone.png" />
            <span class="text-sm text-black"> {{ authUser.phone }} </span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/icons/money-bag.png" class="brightness-0" alt="money-bag.png" />
            <span class="text-sm text-black"> 20k to 50k </span>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-y-auto thin-scrollbar flex-1 flex flex-col gap-4">
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-main">Personal Information</p>
          <button
            class="btn-outline"
            v-if="!sectionFormState.personalSkill"
            @click="sectionFormState.personalSkill = true"
          >
            Edit
          </button>
          <div class="flex gap-3" v-if="sectionFormState.personalSkill">
            <button class="btn-outline" @click="sectionFormState.personalSkill = false">
              Cancel
            </button>
            <button
              class="btn"
              @click="
                () => {
                  sectionFormState.personalSkill = false
                  onUpdateUser()
                }
              "
            >
              Save
            </button>
          </div>
        </div>
        <div class="flex gap-3">
          <InputComponent
            label="First Name"
            type="text"
            name="first_name"
            placeholder="First Name"
            label-css="text-sm"
            input-class="text-sm"
            v-model="userModel.first_name"
            :disabled="!sectionFormState.personalSkill"
          />
          <InputComponent
            label="Last Name"
            type="text"
            name="last_name"
            placeholder="Last Name"
            label-css="text-sm"
            input-class="text-sm"
            v-model="userModel.last_name"
            :disabled="!sectionFormState.personalSkill"
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
            v-model="userModel.email"
            :disabled="!sectionFormState.personalSkill"
          />
          <InputComponent
            type="text"
            name="phone_number"
            label-css="text-sm"
            label="Phone number"
            input-class="text-sm"
            placeholder="Phone number"
            v-model="userModel.phone"
            :disabled="!sectionFormState.personalSkill"
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
                value: Gender.MALE
              },
              {
                text: 'Female',
                value: Gender.FEMALE
              }
            ]"
            v-model="userModel.gender"
            :disabled="!sectionFormState.personalSkill"
          />
        </div>
      </div>
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-main">Address</p>
          <button
            class="btn-outline"
            v-if="!sectionFormState.address"
            @click="sectionFormState.address = true"
          >
            Edit
          </button>
          <div class="flex gap-3" v-if="sectionFormState.address">
            <button class="btn-outline" @click="sectionFormState.address = false">Cancel</button>
            <button
              class="btn"
              v-if="sectionFormState.address"
              @click="
                () => {
                  onUpdateProfileAddress()
                  sectionFormState.address = false
                }
              "
            >
              Save
            </button>
          </div>
        </div>
        <div class="flex gap-3">
          <InputComponent
            label="Address 1"
            name="address1"
            type="text"
            placeholder="Ex. 1234 Main St"
            label-css="text-sm"
            input-class="text-sm"
            v-model="addressModel.address1"
            :disabled="!sectionFormState.address"
          />
          <InputComponent
            label="Address 2"
            name="address2"
            type="text"
            placeholder="Ex. Apt. 7B"
            label-css="text-sm"
            input-class="text-sm"
            v-model="addressModel.address2"
            :disabled="!sectionFormState.address"
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
            v-model="addressModel.city"
            :disabled="!sectionFormState.address"
          />
          <InputComponent
            label="Postal Code"
            name="postal_code"
            type="text"
            placeholder="Postal Code"
            label-css="text-sm"
            input-class="text-sm"
            v-model="addressModel.postal"
            :disabled="!sectionFormState.address"
          />
          <InputComponent
            label="Province"
            type="text"
            name="province"
            placeholder="Province"
            label-css="text-sm"
            input-class="text-sm"
            v-model="addressModel.province"
            :disabled="!sectionFormState.address"
          />
          <InputComponent
            label="Country"
            type="text"
            name="country"
            placeholder="Country"
            label-css="text-sm"
            input-class="text-sm"
            v-model="addressModel.country"
            :disabled="!sectionFormState.address"
          />
        </div>
      </div>
      <!-- TODO: Need to add education and work experience -->
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-main">Social and Community Links</p>
          <button
            class="btn-outline"
            v-if="!sectionFormState.social"
            @click="sectionFormState.social = true"
          >
            Edit
          </button>
          <div class="flex gap-3" v-if="sectionFormState.social">
            <button class="btn-outline" @click="sectionFormState.social = false">Cancel</button>
            <button class="btn" v-if="sectionFormState.social" @click="onUpdateProfile">
              Save
            </button>
          </div>
        </div>
        <div class="flex gap-3">
          <InputComponent
            label="Website/Porrtfolio"
            type="text"
            name="website"
            placeholder="Website/Portfolio"
            label-css="text-sm"
            input-class="text-sm"
            v-model="profileModel.website"
            :disabled="!sectionFormState.social"
          />
          <InputComponent
            label="LinkedIn"
            type="text"
            name="linkedin"
            placeholder="LinkedIn"
            label-css="text-sm"
            input-class="text-sm"
            v-model="profileModel.linkedin"
            :disabled="!sectionFormState.social"
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
          v-model="profileModel.github"
          :disabled="!sectionFormState.social"
        />
      </div>
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between">
          <p class="font-bold text-main">Technical Skills</p>
          <button class="btn-outline">Edit</button>
        </div>

        <div class="flex gap-3 mt-3 flex-wrap">
          <TagComponent text="HTML" />
          <TagComponent text="CSS3" />
          <TagComponent text="Python" />
          <TagComponent text="JavaScript" />
          <TagComponent text="MySQL" />
          <TagComponent text="MSSQL" />
        </div>
      </div>
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between">
          <p class="font-bold text-main">Soft Skills</p>
          <button class="btn-outline">Edit</button>
        </div>
        <div class="flex gap-3 mt-3 flex-wrap">
          <TagComponent text="English Proficiency" />
          <TagComponent text="Communication" />
          <TagComponent text="Time Management" />
          <TagComponent text="Problem Solving" />
          <TagComponent text="Creativity" />
          <TagComponent text="Teamwork" />
        </div>
      </div>
      <div class="wrap flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-main">Job hunter Specific Information</p>
          <button
            class="btn-outline"
            v-if="!sectionFormState.jobHunter"
            @click="sectionFormState.jobHunter = true"
          >
            Edit
          </button>
          <div class="flex gap-3" v-if="sectionFormState.jobHunter">
            <button class="btn-outline" @click="sectionFormState.jobHunter = false">Cancel</button>
            <button class="btn" v-if="sectionFormState.jobHunter" @click="onUpdateProfile">
              Save
            </button>
          </div>
        </div>
        <InputComponent
          label="Cover Letter"
          type="textarea"
          name="cover_letter"
          class="w-1/2"
          placeholder="Cover Letter"
          label-css="text-sm"
          input-class="text-sm"
          v-model="profileModel.cover_letter"
          :disabled="!sectionFormState.jobHunter"
        />
        <!-- TODO: Need to add a file uploader type of InputComponent -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagComponent from '@/components/shared/TagComponent.vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import { Gender, type Address, type Profile, type User } from '@shared/pack'
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'vue-router'

const router = useRouter()
const authUser = ref<User<Profile> | null>()
const authStore = useAuthStore()
const userStore = useUserStore()

const sectionFormState = reactive<{
  technicalSkill: boolean
  softSkill: boolean
  personalSkill: boolean
  address: boolean
  social: boolean
  jobHunter: boolean
}>({
  technicalSkill: false,
  softSkill: false,
  personalSkill: false,
  address: false,
  social: false,
  jobHunter: false
})

const userModel = ref<Partial<User>>({})
const profileModel = ref<Partial<Profile>>({})
const addressModel = ref<Partial<Address>>({})

const stringAddress = computed(() => {
  let addressStr = ''
  if (authUser.value && authUser.value.profile && authUser.value.profile.address) {
    addressStr = `
      ${authUser.value.profile.address.address1 + ' '}
      ${authUser.value.profile.address.address2 || ''}
      ${authUser.value.profile.address.city + ' '},
      ${authUser.value.profile.address.province + ' '},
      ${authUser.value.profile.address.postal + ''}
      ${authUser.value.profile.address.country}
    `
  }
  return addressStr
})

const onUpdateUser = async () => {
  if (authUser.value) {
    await userStore.updateUser(userModel.value, authUser.value.id)
  }
}

const onUpdateProfile = async () => {
  if (authUser.value && authUser.value.profile) {
    await userStore.updateProfile(profileModel.value, authUser.value.profile.id)
  }
}

const onUpdateProfileAddress = async () => {
  if (authUser.value && authUser.value.profile) {
    await userStore.updateProfileAddress(addressModel.value, authUser.value.profile.id)
  }
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()

  if (authUser.value) {
    userModel.value = authUser.value
    if (authUser.value.profile) {
      profileModel.value = authUser.value.profile

      if (authUser.value.profile.address) {
        addressModel.value = authUser.value.profile.address
      }
    }
  }
})
</script>
