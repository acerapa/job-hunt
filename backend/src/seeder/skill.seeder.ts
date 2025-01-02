import { Skill as ISkill, SkillType } from '@shared/pack/dist'
import { Skill } from '../entities/Skill'
import { instanceToPlain } from 'class-transformer'

const defualtSkills: Partial<ISkill>[] = [
  {
    name: 'JavaScript',
    type: SkillType.TECHNICAL
  },
  {
    name: 'TypeScript',
    type: SkillType.TECHNICAL
  },
  {
    name: 'React',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Node.js',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Express',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Next.js',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Nest.js',
    type: SkillType.TECHNICAL
  },
  {
    name: 'MongoDB',
    type: SkillType.TECHNICAL
  },
  {
    name: 'PostgreSQL',
    type: SkillType.TECHNICAL
  },
  {
    name: 'MySQL',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Redis',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Docker',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Kubernetes',
    type: SkillType.TECHNICAL
  },
  {
    name: 'AWS',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Azure',
    type: SkillType.TECHNICAL
  },
  {
    name: 'CSS',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Wordpress',
    type: SkillType.TECHNICAL
  },
  {
    name: 'English Proficiency',
    type: SkillType.SOFT
  },
  {
    name: 'Communication',
    type: SkillType.SOFT
  },
  {
    name: 'Web design',
    type: SkillType.TECHNICAL
  },
  {
    name: 'Time Management',
    type: SkillType.SOFT
  },
  {
    name: 'Problem Solving',
    type: SkillType.SOFT
  },
  {
    name: 'Creativity',
    type: SkillType.SOFT
  },
  {
    name: 'Team Work',
    type: SkillType.SOFT
  }
]

export const run = async () => {
  const skills = Skill.create(instanceToPlain(defualtSkills))
  await Skill.save(skills)

  console.log('Seeded skills')
  process.exit(0)
}
