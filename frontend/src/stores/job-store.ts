import { api, Method } from '@/api'
import type {
  Address,
  ApiResponse,
  Application,
  Company,
  Job,
  Profile,
  Question,
  Shift,
  Skill,
  Tag,
  User
} from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJobStore = defineStore('job', function () {
  const jobs = ref<Job<Application>[]>([])
  const job = ref<Job<
    Skill,
    Company,
    Shift,
    Application<object, Profile<User>>,
    Tag,
    Question
  > | null>(null)
  const publishedJobs = ref<Job<Skill, Company, Application>[]>([])

  const createJob = async (job: Partial<Job<Skill, Partial<Address>>>, company_id: number) => {
    const res = await api(`users/company/${company_id}/jobs/create`, Method.POST, job)

    return res.status
  }

  const updateJob = async (job: Partial<Job<Skill, Partial<Address>>>, job_id: number) => {
    const res = await api(`users/company/jobs/${job_id}/update`, Method.POST, job)

    return res.status
  }

  const fetchJobs = async (company_id: number) => {
    const res: ApiResponse<Job<Application>[]> = await api(`users/company/${company_id}/jobs`)

    if (res.status === 200) {
      jobs.value = res.data
    }
  }

  const getJobs = async (company_id: number): Promise<Job<Application>[]> => {
    if (!jobs.value.length) {
      await fetchJobs(company_id)
    }

    return jobs.value
  }

  const fetchPublishedJobs = async () => {
    const res: ApiResponse<Job<Skill, Company, Application>[]> = await api(`published-jobs`)

    if (res.status === 200) {
      publishedJobs.value = res.data
    }
  }

  const getPublishedJobs = async (): Promise<Job<Skill, Company, Application>[]> => {
    if (!publishedJobs.value.length) {
      await fetchPublishedJobs()
    }

    return publishedJobs.value
  }

  const fetchJobById = async (job_id: number) => {
    const res: ApiResponse<
      Job<Skill, Company, Shift, Application<object, Profile<User>>, Tag, Question>
    > = await api(`users/company/jobs/${job_id}`)

    if (res.status === 200) {
      job.value = res.data
    }
  }

  const getJobById = async (
    job_id: number
  ): Promise<Job<
    Skill,
    Company,
    Shift,
    Application<object, Profile<User>>,
    Tag,
    Question
  > | null> => {
    if (!job.value) {
      await fetchJobById(job_id)
    }

    return job.value
  }

  return {
    job,
    jobs,
    publishedJobs,

    getJobs,
    createJob,
    fetchJobs,
    updateJob,
    getJobById,
    fetchJobById,
    getPublishedJobs,
    fetchPublishedJobs
  }
})
