export const enum SlideDirection {
  LEFT,
  RIGHT
}

export const enum AlertStatus {
  SUCCESS = 1,
  FAILED = 2
}

export const enum SkillType {
  TECHNICAL = 1,
  SOFT = 2
}

export const enum Gender {
  MALE = 1,
  FEMALE = 2
}

export const enum JobStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
  CLOSED = 'closed'
}

export const enum WorkSetup {
  REMOTE = 'remote',
  HYBRID = 'hybrid',
  ONSITE = 'onsite'
}

export const enum WorkType {
  FULLTIME = 'fulltime',
  PARTTIME = 'parttime',
  INTERNSHIP = 'internship'
}

export const enum ApplicationStatus {
  UNREVIEWED = 'unreviewed',
  REVIEWED = 'reviewed',
  INTERVIEWING = 'interviewing',
  OFFERED = 'offered',
  DECLINED = 'declined'
}

export const enum CompanyType {
  STARTUP = 'startup',
  CORPORATION = 'corporation',
  NON_PROFIT = 'non-profit',
  GOVERNMENT = 'government',
  OTHERS = 'others'
}

export const enum QuestionType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE = 'date',
  TIME = 'time',
  NUMBER = 'number'
}

export const ApplicationStatusMap = {
  [ApplicationStatus.UNREVIEWED]: {
    class: 'pending-status',
    text: 'pending'
  },
  [ApplicationStatus.REVIEWED]: {
    class: 'reviewed-status',
    text: 'reviewed'
  },
  [ApplicationStatus.INTERVIEWING]: {
    class: 'interviewing-status',
    text: 'interviewing'
  },
  [ApplicationStatus.DECLINED]: {
    class: 'declined-status',
    text: 'declined'
  },
  [ApplicationStatus.OFFERED]: {
    class: 'offered-status',
    text: 'offered'
  }
}
