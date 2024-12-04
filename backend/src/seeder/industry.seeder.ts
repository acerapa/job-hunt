import { instanceToPlain } from 'class-transformer'
import { Industry } from '../entities/Industry'
import type { Industry as IIndustry } from '@shared/pack/dist'
import { exit } from 'process'

const defaultIndustries: IIndustry[] = [
  {
    name: 'Cybersecurity'
  },
  {
    name: 'Software Development'
  },
  {
    name: 'Data Science'
  },
  {
    name: 'Hardware and Equipment'
  },
  {
    name: 'Business and Finance'
  },
  {
    name: 'Artificial Intelligence'
  },
  {
    name: 'Cloud Computing'
  },
  {
    name: 'Education and Training'
  },
  {
    name: 'Healthcare and Medical'
  },
  {
    name: 'Telecommunications'
  },
  {
    name: 'Robotics'
  },
  {
    name: 'Research and Development'
  },
  {
    name: 'Game Development'
  },
  {
    name: 'Energy and Utilities'
  }
]

export const run = async () => {
  const industries = Industry.create(instanceToPlain(defaultIndustries))
  await Industry.save(industries)

  console.log('Seeded industries')
  exit(0)
}
