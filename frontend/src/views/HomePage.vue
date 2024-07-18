<template>
  <div class="max-w-7xl mx-auto pt-4 px-4 flex flex-col gap-14">
    <div class="search-wrapper">
      <p class="text-2xl font-bold text-main">Hunt, Check and Apply</p>
      <input
        type="search"
        class="input search w-1/2 max-md:w-4/5 max-sm:w-11/12"
        placeholder="Start your hunting"
      />
    </div>
    <div class="mx-auto flex flex-col gap-6">
      <p class="heading-2">Popular tags now</p>
      <div class="flex gap-2 flex-wrap justify-center">
        <button class="popular-tags">
          <img src="@/assets/images/tag.png" alt="tag" />
          Software Development
        </button>
        <button class="popular-tags">
          <img src="@/assets/images/tag.png" alt="tag" />
          Virtual Assistant
        </button>
        <button class="popular-tags">
          <img src="@/assets/images/tag.png" alt="tag" />
          Web Development
        </button>
        <button class="popular-tags">
          <img src="@/assets/images/tag.png" alt="tag" />
          ESL Teachers
        </button>
        <button class="popular-tags">
          <img src="@/assets/images/tag.png" alt="tag" />
          Project Managers
        </button>
      </div>
    </div>
    <div class="mx-auto flex flex-col gap-6 w-full">
      <p class="heading-2 text-center">Jobs you might like to hunt</p>
      <SliderComponent
        :panel="3"
        :slide-component="JobComponent"
        :data="jobs"
        :is-infinity="true"
        class="w-full"
      />
    </div>
    <div class="mx-auto flex flex-col gap-6">
      <p class="heading-2">Beast Features</p>
      <div class="flex gap-2 max-md:flex-col max-md:!gap-y-4 max-sm:w-11/12 mx-auto">
        <div class="flex gap-2 max-sm:flex-col max-md:!gap-y-4">
          <div class="flex-1 flex flex-col gap-5">
            <div class="flex flex-col gap-1 items-center">
              <img src="@/assets/images/business.png" class="w-10 h-10" alt="business" />
              <p class="text-lg text-main font-semibold text-center">Over a thousand plus Jobs</p>
            </div>
            <p class="text-base text-center">
              Wide diversity of Jobs to apply and it's growing each day. Feel free to find what best
              suits you.
            </p>
          </div>
          <div class="flex-1 flex flex-col gap-5">
            <div class="flex flex-col gap-1 items-center">
              <img src="@/assets/images/cannon.png" class="w-10 h-10" alt="cannon" />
              <p class="text-lg text-main font-semibold text-center">Fun and exciting to apply</p>
            </div>
            <p class="text-base text-center">
              We intent to take some concepts from games and implement it in the platform to have a
              fun experience. (<span class="italic">Pretty exciting right?</span>)
            </p>
          </div>
        </div>
        <div class="flex gap-2 max-sm:flex-col max-md:!gap-y-4">
          <div class="flex-1 flex flex-col gap-5">
            <div class="flex flex-col gap-1 items-center">
              <img src="@/assets/images/easy.png" class="w-10 h-10" alt="easy" />
              <p class="text-lg text-main font-semibold text-center">Easy to apply</p>
            </div>
            <p class="text-base text-center">
              Aside from fun to add up a really good experience we develop a way to easily apply
              (<span class="italic">Hunt</span>) jobs for you.
            </p>
          </div>
          <div class="flex-1 flex flex-col gap-5">
            <div class="flex flex-col gap-1 items-center">
              <img src="@/assets/images/protected.png" class="w-10 h-10" alt="protected" />
              <p class="text-lg text-main font-semibold text-center">Safe and Protected</p>
            </div>
            <p class="text-base text-center">
              We assure you that any information you given to as will not be exposed and will only
              stay hidden and event to us.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto flex flex-col gap-6">
      <p class="heading-2 text-center">Reviews and Comments</p>
      <SliderComponent
        :panel="1"
        :slide-component="UserReviewComponent"
        :data="reviews"
        :is-infinity="true"
        class="w-full"
      />
    </div>
    <div class="mx-auto flex flex-col gap-3 rounded-xl bg-main py-6 w-full">
      <p class="text-4xl text-white mx-auto text-center px-4">
        For Hunters: <span class="font-bold">Start the Hunt!</span> For Providers:
        <span class="font-bold">Start Providing now!</span>
      </p>
      <button class="btn !text-base font-semibold !bg-white !text-main border-main mx-auto w-fit">
        Join Now
      </button>
    </div>
    <div class="py-20 bg-main w-full"></div>
  </div>
</template>
<script setup lang="ts">
import SliderComponent from '@/components/shared/SliderComponent.vue'
import JobComponent from '@/components/shared/JobComponent.vue'
import UserReviewComponent from '@/components/reviews/UserReviewComponent.vue'
const jobs = [
  {
    title: 'PHP Developer',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dignissimos perspiciatis, accusantium alias facilis assumenda corrupti cumque ratione fugiat quidem ipsum labore eum fuga aperiam illo natus veniam nisi quod.',
    company: {
      name: 'Job Provider',
      ratings: 4
    },
    tags: ['Software Development', 'PHP', 'Web Development']
  },
  {
    title: 'Frontend Developer 1',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est porro, error autem adipisci exercitationem eos sed aliquam, natus rerum nisi id. Delectus, labore distinctio porro iste accusamus quo incidunt consectetur!',
    company: {
      name: 'Job Provider',
      ratings: 5
    },
    tags: ['Software Development', 'Frontend', 'HTML', 'Javascript']
  },
  {
    title: 'Frontend Developer 2',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est porro, error autem adipisci exercitationem eos sed aliquam, natus rerum nisi id. Delectus, labore distinctio porro iste accusamus quo incidunt consectetur!',
    company: {
      name: 'Job Provider',
      ratings: 5
    },
    tags: ['Software Development', 'Frontend', 'HTML', 'Javascript']
  },
  {
    title: 'Frontend Developer 3',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est porro, error autem adipisci exercitationem eos sed aliquam, natus rerum nisi id. Delectus, labore distinctio porro iste accusamus quo incidunt consectetur!',
    company: {
      name: 'Job Provider',
      ratings: 2
    },
    tags: ['Software Development', 'Frontend', 'HTML', 'Javascript']
  }
]

const reviews = [
  {
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum architecto doloribus quae quas recusandae voluptatem velit distinctio itaque. Corrupti similique nam et ipsam assumenda sunt porro nobis temporibus quibusdam repellendus.'
  },
  {
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum architecto doloribus quae quas recusandae voluptatem velit distinctio itaque. Corrupti similique nam et ipsam assumenda sunt porro nobis temporibus quibusdam repellendus.'
  },
  {
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum architecto doloribus quae quas recusandae voluptatem velit distinctio itaque. Corrupti similique nam et ipsam assumenda sunt porro nobis temporibus quibusdam repellendus.'
  },
  {
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum architecto doloribus quae quas recusandae voluptatem velit distinctio itaque. Corrupti similique nam et ipsam assumenda sunt porro nobis temporibus quibusdam repellendus.'
  }
]
</script>

<style scoped>
.search-wrapper {
  @apply px-3 py-14 text-center flex flex-col gap-3 items-center bg-light-blue rounded-xl;
}

.popular-tags {
  @apply flex gap-1 items-center text-main border border-main rounded-lg py-2 px-3 hover:bg-main hover:text-white;
}

.popular-tags:hover img {
  @apply brightness-0 invert;
}

.heading-2 {
  @apply text-3xl font-bold text-main mx-auto;
}
</style>
