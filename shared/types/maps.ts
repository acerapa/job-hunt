import { CompanyType, QuestionType, WorkSetup, WorkType } from './enums'

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

export const QuestionMap = {
  [QuestionType.TEXT]: 'Text',
  [QuestionType.TEXTAREA]: 'Textarea',
  [QuestionType.CHECKBOX]: 'Checkbox',
  [QuestionType.RADIO]: 'Radio',
  [QuestionType.SELECT]: 'Select',
  [QuestionType.DATE]: 'Date',
  [QuestionType.TIME]: 'Time',
  [QuestionType.NUMBER]: 'Number'
}

export const CompanyTypeMap = {
  [CompanyType.STARTUP]: {
    text: 'Startup',
    value: CompanyType.STARTUP
  },
  [CompanyType.CORPORATION]: {
    text: 'Corporation',
    value: CompanyType.CORPORATION
  },
  [CompanyType.NON_PROFIT]: {
    text: 'Non-profit',
    value: CompanyType.NON_PROFIT
  },
  [CompanyType.GOVERNMENT]: {
    text: 'Government',
    value: CompanyType.GOVERNMENT
  },
  [CompanyType.OTHERS]: {
    text: 'Others',
    value: CompanyType.OTHERS
  }
}
