import { WorkSetup, WorkType } from './enums'

export const WorkTypeMap = {
  [WorkType.FULLTIME]: {
    text: 'Full-time',
    value: WorkType.FULLTIME
  },
  [WorkType.PARTTIME]: {
    text: 'Part-time',
    value: WorkType.PARTTIME
  },
  [WorkType.INTERNSHIP]: {
    text: 'Internship',
    value: WorkType.INTERNSHIP
  }
}

export const WorkSetupMap = {
  [WorkSetup.HYBRID]: {
    text: 'Hybrid',
    value: WorkSetup.HYBRID
  },
  [WorkSetup.ONSITE]: {
    text: 'On-site',
    value: WorkSetup.ONSITE
  },
  [WorkSetup.REMOTE]: {
    text: 'Remote',
    value: WorkSetup.REMOTE
  }
}
