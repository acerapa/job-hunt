import { api, Method } from '@/api'
import { type Applicant, ApplicantStatus } from '@/types'
import type { Address, Job } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJobStore = defineStore('job', function () {
  const createJob = async (job: Partial<Job<Address>>, company_id: number) => {
    const res = await api(`users/company/${company_id}/jobs/create`, Method.POST, job)

    return res.status
  }

  const jobs = ref<Job[]>([
    {
      title: 'PHP Developer',
      company: {
        name: 'ABC Company',
        image:
          'https://plus.unsplash.com/premium_photo-1663127721165-f29d5bbd3da1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 5,
        address: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401'
      },
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, dolor pariatur sint illo quae, vitae ullam facere ipsum inventore voluptatem error! Sunt quo blanditiis porro laboriosam necessitatibus aut fuga neque.',
      work_type: 'Full-Time',
      exp_level: 'Entry Level',
      work_setup: 'Remote',
      posted_on: 'Mar 28, 2024',
      tags: ['Software development', 'PHP', 'Python']
    },
    {
      title: 'Python Developer',
      company: {
        name: 'ABC Company',
        image:
          'https://plus.unsplash.com/premium_photo-1663127721165-f29d5bbd3da1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 5,
        address: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401'
      },
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, dolor pariatur sint illo quae, vitae ullam facere ipsum inventore voluptatem error! Sunt quo blanditiis porro laboriosam necessitatibus aut fuga neque.',
      work_type: 'Full-Time',
      exp_level: 'Entry Level',
      work_setup: 'Remote',
      posted_on: 'Mar 28, 2024',
      tags: ['Software development', 'PHP', 'Python']
    },
    {
      title: 'Java Developer',
      company: {
        name: 'ABC Company',
        image:
          'https://plus.unsplash.com/premium_photo-1663127721165-f29d5bbd3da1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 5,
        address: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401'
      },
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, dolor pariatur sint illo quae, vitae ullam facere ipsum inventore voluptatem error! Sunt quo blanditiis porro laboriosam necessitatibus aut fuga neque.',
      work_type: 'Full-Time',
      exp_level: 'Entry Level',
      work_setup: 'Remote',
      posted_on: 'Mar 28, 2024',
      tags: ['Software development', 'PHP', 'Python']
    }
  ])

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

  return {
    jobs,
    applicants,
    createJob
  }
})
