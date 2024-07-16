<template>
  <div class="max-w-7xl mx-auto py-14 flex flex-col gap-14">
    <div class="search-wrapper">
      <p class="text-2xl font-bold text-main">Hunt, Check and Apply</p>
      <input type="search" class="input search w-1/2" placeholder="Start your hunting" />
    </div>
    <div class="mx-auto flex flex-col gap-6">
      <p class="text-xl font-bold text-main mx-auto">Popular tags now</p>
      <div class="flex gap-2">
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
    <div class="mx-auto">
      <p class="text-xl font-bold text-main mx-auto">Jobs you might like to hunt</p>
      <code>Needs to create a slider component</code>
    </div>
    <div class="mx-auto flex flex-col gap-6">
      <p class="text-xl font-bold text-main mx-auto">Beast Features</p>
      <div class="flex gap-2">
        <div class="flex-1 flex flex-col gap-5">
          <div class="flex flex-col gap-1 items-center">
            <img src="@/assets/images/business.png" class="w-10 h-10" alt="business" />
            <p class="text-lg text-main font-semibold">Over a thousand plus Jobs</p>
          </div>
          <p class="text-base text-center">
            Wide diversity of Jobs to apply and it's growing each day. Feel free to find what best
            suits you.
          </p>
        </div>
        <div class="flex-1 flex flex-col gap-5">
          <div class="flex flex-col gap-1 items-center">
            <img src="@/assets/images/cannon.png" class="w-10 h-10" alt="cannon" />
            <p class="text-lg text-main font-semibold">Fun and exciting to apply</p>
          </div>
          <p class="text-base text-center">
            We intent to take some concepts from games and implement it in the platform to have a
            fun experience. (<span class="italic">Pretty exciting right?</span>)
          </p>
        </div>
        <div class="flex-1 flex flex-col gap-5">
          <div class="flex flex-col gap-1 items-center">
            <img src="@/assets/images/easy.png" class="w-10 h-10" alt="easy" />
            <p class="text-lg text-main font-semibold">Easy to apply</p>
          </div>
          <p class="text-base text-center">
            Aside from fun to add up a really good experience we develop a way to easily apply
            (<span class="italic">Hunt</span>) jobs for you.
          </p>
        </div>
        <div class="flex-1 flex flex-col gap-5">
          <div class="flex flex-col gap-1 items-center">
            <img src="@/assets/images/protected.png" class="w-10 h-10" alt="protected" />
            <p class="text-lg text-main font-semibold">Safe and Protected</p>
          </div>
          <p class="text-base text-center">
            We assure you that any information you given to as will not be exposed and will only
            stay hidden and event to us.
          </p>
        </div>
      </div>
    </div>
    <div class="mx-auto">
      <p class="text-xl font-bold text-main mx-auto">Reviews and Comments</p>
      <code>Needs to create a slider component</code>
    </div>
  </div>
</template>
<script setup lang="ts">
const jobs = [
  {
    title: 'PHP Developer',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dignissimos perspiciatis, accusantium alias facilis assumenda corrupti cumque ratione fugiat quidem ipsum labore eum fuga aperiam illo natus veniam nisi quod.',
    company: {
      name: 'Job Provider',
      rating: 4
    },
    tags: ['Software Development', 'PHP', 'Web Development']
  }
]
console.log(jobs)
</script>

<style scoped>
.search-wrapper {
  @apply px-3 py-14 text-center flex flex-col gap-3 items-center bg-light-blue rounded-xl;
}

.popular-tags {
  @apply flex gap-1 items-center text-main border border-main rounded-lg py-2 px-3;
}
</style>
