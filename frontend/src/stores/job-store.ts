import { api, Method } from '@/api'
import { type Applicant, ApplicantStatus } from '@/types'
import type { Address, ApiResponse, Application, Company, Job, Skill } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJobStore = defineStore('job', function () {
  const jobs = ref<Job<Application>[]>([])
  const job = ref<Job<Skill, Address> | null>(null)
  const publishedJobs = ref<Job<Skill, Company, Application>[]>([])

  const applicants = ref<Applicant[]>([
    {
      name: 'John Doe',
      job: 'PHP Developer',
      status: ApplicantStatus.PENDING,
      applied_on: new Date()
    },
    {
      name: 'Jane Doe',
      job: 'Frontend Developer',
      status: ApplicantStatus.REVIEWED,
      applied_on: new Date()
    },
    {
      name: 'Tim Scott',
      job: 'Backend Developer',
      status: ApplicantStatus.INTERVIEWING,
      applied_on: new Date()
    },
    {
      name: 'Bob Smith',
      job: 'Backend Developer',
      status: ApplicantStatus.DECLINED,
      applied_on: new Date()
    },
    {
      name: 'Jack  Smith',
      job: 'Fullstack Developer',
      status: ApplicantStatus.OFFERED,
      applied_on: new Date()
    }
  ])

  const createJob = async (job: Partial<Job<Skill, Partial<Address>>>, company_id: number) => {
    const res = await api(`users/company/${company_id}/jobs/create`, Method.POST, job)

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
    const res: ApiResponse<Job<Skill, Address>> = await api(`users/company/jobs/${job_id}`)

    if (res.status === 200) {
      job.value = res.data
    }
  }

  const getJobById = async (job_id: number): Promise<Job<Skill, Address> | null> => {
    if (!job.value) {
      await fetchJobById(job_id)
    }

    return job.value
  }

  return {
    jobs,
    applicants,
    publishedJobs,

    getJobs,
    createJob,
    fetchJobs,
    getJobById,
    fetchJobById,
    getPublishedJobs,
    fetchPublishedJobs
  }
})
