<template>
  <div class="flex flex-col gap-5">
    <div class="wrap flex flex-col gap-3">
      <div class="flex justify-between items-start">
        <p class="font-bold text-lg text-green-bright">Job your applying for:</p>
        <div class="flex gap-3">
          <button class="w-fit btn-outline" @click="router.back()">&longleftarrow; Back</button>
          <button class="btn-success whitespace-nowrap">More Details</button>
        </div>
      </div>

      <div class="flex flex-col px-4" v-if="job">
        <p class="text-xl font-bold">{{ job.title }}</p>

        <div class="flex gap-2 items-center" v-if="currentCompany">
          <img class="w-10 h-10" src="@/assets/images/default.png" alt="default.png" />
          <p class="font-semibold text-gray-strong">{{ currentCompany.name }}</p>
          <div class="flex">
            <img
              src="@/assets/images/star-filled.png"
              alt="star-filled.png"
              class="w-4 h-4"
              v-for="ndx in 5"
              :key="ndx"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1 mt-5">
          <p class="font-medium">Job Description</p>
          <p class="font-normal text-base text-justify text-gray-strong">{{ job.description }}</p>
        </div>
      </div>
    </div>

    <div class="wrap flex flex-col gap-5" v-if="authUser">
      <div class="flex justify-between items-start">
        <p class="font-bold text-lg text-green-bright">Hunter Informations</p>
        <div class="flex gap-3">
          <RouterLink :to="{ name: 'profile' }" class="btn-outline">Edit Informations</RouterLink>
          <button class="btn-success" @click="onSubmitApplication">Submit Application</button>
        </div>
      </div>

      <div class="px-4 flex flex-col gap-3 max-w-[60%]">
        <div>
          <p class="font-semibold text-gray-strong">Personal Information:</p>
          <div class="flex gap-5">
            <InputComponent
              type="text"
              label="First Name"
              name="first_name"
              :disabled="true"
              class="w-fit flex-1"
              v-model="authUser.first_name"
            />
            <InputComponent
              type="text"
              label="Last Name"
              name="last_name"
              :disabled="true"
              class="w-fit flex-1"
              v-model="authUser.last_name"
            />
          </div>
          <div class="flex gap-5 mt-3">
            <InputComponent
              type="email"
              label="Email"
              name="email"
              :disabled="true"
              class="w-fit flex-1"
              v-model="authUser.email"
            />
            <InputComponent
              type="text"
              label="Phone"
              name="phone"
              :disabled="true"
              class="w-fit flex-1"
              v-model="authUser.phone"
            />
          </div>
        </div>
        <div v-if="authUser.profile">
          <p class="font-semibold text-gray-strong">Social links:</p>
          <div class="flex gap-5">
            <InputComponent
              type="text"
              label="LinkedIn"
              name="linkedin"
              :disabled="true"
              class="w-fit flex-1"
              v-model="authUser.profile.linkedin"
            />
            <InputComponent
              type="text"
              label="Github"
              name="github"
              :disabled="true"
              class="w-fit flex-1"
              v-model="authUser.profile.github"
            />
          </div>
          <InputComponent
            type="text"
            name="website"
            :disabled="true"
            class="w-fit flex-1 mt-3"
            label="Website/Portfolio"
            v-model="authUser.profile.website"
          />
        </div>
      </div>
    </div>

    <div class="wrap flex flex-col gap-4">
      <p class="font-bold text-lg text-green-bright">Employer Specific questions</p>

      <div class="flex flex-col gap-4 mt-5 px-4 max-w-[60%]" v-if="job?.questions?.length">
        <InputComponent
          v-for="question in job.questions"
          :key="question.id"
          :name="`question-${question.id}`"
          :type="question.type"
          placeholder="Ans"
          class="flex-1"
          :label="`${question.question} ${question.is_required ? '*' : ''}`"
          label-css="text-sm font-semibold"
        />
      </div>
    </div>
  </div>
  <!-- // TODO: -->
  <code>
    <input type="checkbox" disabled />
    <code class="ml-3">Need to figure out the title specified in Job hunters</code>
    <br />
  </code>
</template>
<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import { useAuthStore } from '@/stores/auth-store'
import { useJobStore } from '@/stores/job-store'
import { useUserStore } from '@/stores/user-store'
import {
  ApplicationStatus,
  type Answer,
  type Application,
  type Company,
  type Job,
  type Profile,
  type Question,
  type User
} from '@shared/pack'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const authUser = ref<User<Profile> | null>(null)
const currentCompany = ref<Company | null>(null)
const application = ref<Partial<Application<Object, Object, Partial<Answer>>>>({ answers: [] })
const job = ref<Job<Object, Company, Object, Object, Object, Question> | null>(null)

const jobStore = useJobStore()
const authStore = useAuthStore()

const onSubmitApplication = async () => {
  const res = await userStore.submitApplication(application.value)

  // TODO: After a successful submission, navigate to the application page
  // Next is it will create a notification for the providers
}

onMounted(async () => {
  if (route.params.job_id) {
    await jobStore.fetchJobById(parseInt(route.params.job_id as string))
    job.value = await jobStore.getJobById(parseInt(route.params.job_id as string))

    if (job.value && job.value.company) {
      currentCompany.value = job.value.company
    }
  }

  authUser.value = await authStore.getAuthUser()

  if (job.value) {
    application.value.job_id = job.value.id

    // add answers
    if (job.value.questions) {
      job.value.questions.forEach((question) => {
        let ans: Partial<Answer> = {
          question_id: question.id
        }
        application.value.answers?.push(ans)
      })
    }
  }

  // assigning of the application values
  application.value.job_id = job.value?.id
  application.value.profile_id = authUser.value?.profile?.id
  application.value.status = ApplicationStatus.UNREVIEWED
})
</script>

<style scoped>
.detail-btn {
  @apply !bg-green-weak font-bold !py-2 !px-3 hover:border-green-weak hover:!bg-white hover:!text-green-weak;
}
</style>
