<template>
  <div class="wrap !pt-0">
    <div class="flex justify-between items-center sticky top-0 bg-white pt-4">
      <div>
        <span class="text-xl block font-bold">PHP Developer</span>
        <div class="flex gap-2 items-center">
          <span class="text-sm text-gray-strong font-medium">ABC Company</span>
          <div class="flex gap-1">
            <img src="@/assets/icons/pixel-star.svg" alt="pixel-star" v-for="ndx in 5" :key="ndx" />
          </div>
        </div>
      </div>
      <button
        class="btn !bg-blue-bright font-bold hover:text-blue-bright hover:border-blue-bright hover:!bg-white"
        @click="onApply(1)"
      >
        Apply now
      </button>
    </div>
    <div class="px-2 mt-3 flex flex-col gap-3">
      <div class="flex gap-2 items-center">
        <img src="@/assets/icons/map-pin.png" alt="map-pin.png" />
        <span class="text-xs text-gray-strong">
          Tech Solutions Inc., 1234 Technology Way, San Francisco, CA 94103, USA
        </span>
      </div>
      <div class="flex gap-2 items-center">
        <img src="@/assets/icons/clock.png" alt="clock.png" />
        <span class="text-xs text-gray-strong">Full-Time</span>
      </div>
      <div class="flex gap-2 items-center">
        <img src="@/assets/icons/office.png" alt="office.png" />
        <span class="text-xs text-gray-strong">Remote</span>
      </div>
      <div class="flex gap-2 items-center">
        <img src="@/assets/icons/money-bag.png" alt="money-bag.png" />
        <span class="text-xs text-gray-strong">30k to 60k</span>
      </div>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">Job Description</p>
      <p class="mt-4 font-normal text-sm text-justify">
        We are seeking a passionate and skilled PHP Developer to join our growing development team.
        In this role, you will be responsible for designing, developing, and maintaining web
        applications that deliver exceptional user experiences. You will work closely with project
        managers, UX/UI designers, and other developers to implement new features, optimize
        performance, and troubleshoot issues.
      </p>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">Key Responsibilities</p>
      <ul class="pl-8 text-sm flex flex-col gap-3">
        <li class="list-disc">
          <b>Application Development:</b> Design and build robust, scalable web applications using
          PHP and associated frameworks (e.g., Laravel, Symfony). Ensure high performance and
          responsiveness of applications.
        </li>
        <li class="list-disc">
          <b>Collaborative Problem Solving:</b> Work closely with cross-functional teams to gather
          and analyze requirements, providing technical solutions that align with business goals.
        </li>
        <li class="list-disc">
          <b>Code Quality:</b> Write clean, maintainable code following best practices and coding
          standards. Conduct regular code reviews to ensure quality and share knowledge among team
          members.
        </li>
        <li class="list-disc">
          <b>Database Management:</b> Design and optimize database structures using MySQL or
          PostgreSQL. Write complex SQL queries for data manipulation and retrieval.
        </li>
        <li class="list-disc">
          <b>Continuous Learning:</b> Stay up-to-date with emerging trends in web development, PHP
          frameworks, and technologies. Actively participate in team discussions and contribute
          ideas for improvements and innovation.
        </li>
        <li class="list-disc">
          <b>Documentation:</b> Maintain comprehensive documentation for code, processes, and
          systems to facilitate knowledge sharing within the team.
        </li>
      </ul>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">Qualifications</p>
      <ul class="pl-8 text-sm flex flex-col gap-3">
        <li class="list-disc">
          <b>Educational Background:</b> Bachelor's degree in Computer Science, Software
          Engineering, or a related field, or equivalent practical experience.
        </li>
        <li class="list-disc">
          <b>Experience:</b> 3+ years of professional experience in PHP development, with a strong
          understanding of web application architecture and design patterns.
        </li>
        <li class="list-disc">
          <b>Technical Skills:</b> Proficient in PHP and familiar with popular PHP frameworks (e.g.,
          Laravel, Symfony). Experience with front-end technologies (HTML, CSS, JavaScript) is a
          plus.
        </li>
        <li class="list-disc">
          <b>Database Knowledge:</b> Solid understanding of relational databases and experience with
          MySQL or PostgreSQL. Familiarity with ORM tools is advantageous.
        </li>
        <li class="list-disc">
          <b>Version Control:</b> Experience with Git or other version control systems to manage
          code changes and collaborate with team members effectively.
        </li>
        <li class="list-disc">
          <b>Soft Skills:</b> Strong problem-solving abilities, attention to detail, and a proactive
          attitude. Excellent communication skills and the ability to work collaboratively in a team
          environment.
        </li>
      </ul>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">What we offer</p>
      <ul class="pl-8 text-sm flex flex-col gap-3">
        <li class="list-disc">
          <b>Competitive Salary:</b> A salary that reflects your experience and skills.
        </li>
        <li class="list-disc">
          <b>Flexible Work Environment:</b> Work from home or choose to work from our office as per
          your preference.
        </li>
        <li class="list-disc">
          <b>Professional Development:</b> Opportunities for training, certifications, and career
          advancement.
        </li>
        <li class="list-disc">
          <b>Comprehensive Benefits:</b> Health insurance, retirement plans, paid time off, and
          other perks.
        </li>
        <li class="list-disc">
          <b>Version Control:</b> Experience with Git or other version control systems to manage
          code changes and collaborate with team members effectively.
        </li>
        <li class="list-disc">
          <b>Inclusive Culture:</b> A diverse and welcoming workplace that values your
          contributions.
        </li>
      </ul>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">Others</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Job } from '@/types'
import { useRouter } from 'vue-router'

interface Props {
  job: Job
}
const props = defineProps<Props>()
const router = useRouter()

const onApply = (job_id: number) => {
  router.push({
    name: 'application-form',
    params: {
      job_id: job_id
    }
  })
}
</script>
