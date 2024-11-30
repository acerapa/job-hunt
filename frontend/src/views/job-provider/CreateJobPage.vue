<template>
  <ModelComponent
    title="Add Question"
    v-model="showQuestionModal"
    v-if="showQuestionModal"
    @save="onSaveQuestion"
  >
    <div class="flex flex-col gap-3 min-w-[400px]">
      <InputComponent
        name="question"
        id="question"
        type="text"
        label="Question"
        placeholder="Question"
        v-model="question.question"
      />
      <InputComponent
        type="checkbox"
        name="required"
        id="required"
        label="Is Required"
        input-class="!w-4"
        v-model="question.is_required"
        class="flex !flex-row-reverse gap-3 justify-end"
      />
    </div>
  </ModelComponent>

  <div class="flex gap-4">
    <div class="w-full h-full flex flex-col gap-4">
      <div class="wrap text-white !bg-green-bright sticky top-0 flex justify-between items-center">
        <p class="text-xl font-medium">Create Job Posting</p>
        <button class="btn-white-outline shadow shadow-white" @click="router.back()">Back</button>
      </div>
      <div class="wrap flex flex-col gap-3 h-full overflow-y-auto thin-scrollbar">
        <p class="font-bold text-lg">Job Informations</p>
        <div class="px-3">
          <FormStep1 v-model="jobModel" v-model:model-errors="modelErrors" />
          <FormStep2 v-model="jobModel" v-model:model-errors="modelErrors" />
        </div>
        <div class="flex gap-4 items-center">
          <p class="text-lg font-bold">Your Questions</p>
          <button class="btn w-fit" @click="showQuestionModal = true">Add questions</button>
        </div>
        <div class="px-3">
          <div class="flex flex-col gap-3" v-if="questions.length">
            <div v-for="(q, ndx) in questions" :key="ndx" class="question-list">
              <p>{{ q.question }}</p>
              <p
                class="w-fit px-2 rounded-md font-bold text-sm text-green-bright border-2 border-green-bright"
                v-if="q.is_required"
              >
                Required
              </p>
              <div class="question-actions">
                <button type="button" class="text-blue-500" @click="editQuestion(ndx)">
                  &#128394;
                </button>
                <button type="button" class="text-red-500" @click="removeQuestion(ndx)">
                  &#x2A09;
                </button>
              </div>
            </div>
          </div>
          <p v-else class="text-center text-sm">No questions added!</p>
        </div>

        <div class="flex gap-3 justify-center sticky bottom-0 bg-white py-3">
          <button class="btn-outline" @click="onCancel">Cancel</button>
          <button class="btn-outline">Save as draft</button>
          <button class="btn" @click="onSubmit">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- // TODO: -->
  <code class="pb-5">
    Here are the remaing todos for this page:
    <br />
    <input type="checkbox" disabled /> Add validation to the form
    <br />
    <input type="checkbox" disabled /> Add inputs to add questions to be asnwered by applicants
    <br />
    <input type="checkbox" disabled /> Need to rethink of removing the preview while creating the
    job
  </code>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import ModelComponent from '@/components/shared/ModelComponent.vue'
import FormStep1 from '@/components/job-creation/FormStep1.vue'
import FormStep2 from '@/components/job-creation/FormStep2.vue'
import { onMounted, ref } from 'vue'
import {
  JobStatus,
  type Address,
  type Company,
  type Job,
  type Profile,
  type Question,
  type Shift,
  type Skill,
  type User
} from '@shared/pack'
import { useJobStore } from '@/stores/job-store'
import { useAuthStore } from '@/stores/auth-store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()
const authStore = useAuthStore()

const showQuestionModal = ref(false)
const questionEdit = ref<boolean>(false)
const questions = ref<Partial<Question>[]>([])
const question = ref<Partial<Question>>({})
const modelErrors = ref<Partial<Job & Address>>({})
const authUser = ref<User<Profile, Company> | null>(null)
const jobModel = ref<Partial<Job<Skill, Partial<Address>>>>({
  work_setup: [],
  work_type: [],
  address: {},
  shifts: [],
  status: JobStatus.ACTIVE
})

const onCancel = () => {
  router.back()
}

const onSubmit = async () => {
  // data modification
  if (jobModel.value.status === JobStatus.ACTIVE) {
    jobModel.value.posted_on = new Date()
  }

  jobModel.value.questions = questions.value

  if (authUser.value && authUser.value.company) {
    const res = await jobStore.createJob(jobModel.value, authUser.value.company.id)

    if (res == 200) {
      await jobStore.fetchJobs(authUser.value.company.id)
      router.push({ name: 'provider-jobs' })
    }
  }

  // TODO: Upon receiving error when creating show a toast message
  // might need to create your own toast component
}

const removeQuestion = (indexed: number) => {
  questions.value = questions.value.filter((q, i) => i !== indexed)
}

const editQuestion = (index: number) => {
  question.value = questions.value[index]
  showQuestionModal.value = true
  questionEdit.value = true
}

const onSaveQuestion = () => {
  //TODO: needs to add validations

  if (!questionEdit.value) {
    questions.value.push(question.value)
  }

  // set question edit to false
  questionEdit.value = false

  // clear question model and close modal
  question.value = {}
  showQuestionModal.value = false
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()

  if (route.params.id) {
    const job: Job<Skill, Address, Shift> | null = await jobStore.getJobById(
      parseInt(route.params.id.toString())
    )

    if (job) {
      jobModel.value = job
      if (job.questions && job.questions.length) {
        questions.value = job.questions
      }

      if (job.shifts && job.shifts.length) {
        jobModel.value.shifts = job.shifts.map((shift) => shift.id) as number[]
      }
    }
  }
})
</script>

<style scoped>
.step-item {
  @apply text-main border border-main w-8 h-8 rounded-full;
}

.active-item {
  @apply !text-white !bg-main;
}

.question-list {
  @apply flex gap-3 cursor-pointer items-center;
}

.question-actions {
  @apply hidden gap-3 font-bold;
}

.question-list button {
  aspect-ratio: 1;
}

.question-list:hover .question-actions {
  @apply !flex;
}
</style>
