<template>
  <div class="w-screen h-screen flex flex-col gap-4 items-center justify-center">
    <div class="text-center">
      <p class="text-main text-xl font-semibold">Are you a ...</p>
      <p class="text-sm font-light italic">*(Please select one)*</p>
    </div>
    <div class="flex gap-3 max-[490px]:flex-col">
      <div class="user-types" :class="type == 1 ? 'user-type-active' : ''" @click="type = 1">
        <img
          class="mx-auto"
          src="@/assets/images/jim-trollhunters-sword.png"
          alt="jim-trollhunters-sword"
        />
        <p class="text-main text-base font-extrabold">Job Hunter</p>

        <p class="mt-3 text-xs">
          <span class="text-xs font-bold">Job hunters:</span> Actively hunt jobs, honing skills and
          acquiring high level stats in order to face formidable
          <span class="text-xs font-bold">Jobs</span> they desire.
        </p>
      </div>
      <div class="user-types" :class="type == 2 ? 'user-type-active' : ''" @click="type = 2">
        <img class="mx-auto" src="@/assets/images/hammer-and-anvil.png" alt="hammer-and-anvil" />
        <p class="text-main text-base font-extrabold">Job Provider</p>

        <p class="mt-3 text-xs">
          <span class="text-xs font-bold">Job Providers</span>
          <span class="italic">(also know as Craftsman)</span>: Actively crafting different types
          and benefits of <span class="text-xs font-bold">Jobs</span> that can captivate the eyes of
          hunters
        </p>
      </div>
    </div>
    <button class="btn" @click="onSubmit">Continue</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserType } from '@shared/pack'

// TODO: If the user is not yet finish setting up this info, well redirect them here to finish this setups.
const type = ref<UserType>()

const router = useRouter()
const onSubmit = () => {
  router.push({
    name: 'user-info',
    params: {
      id: 1,
      type: type.value
    }
  })
}
</script>

<style scoped>
.user-types {
  @apply w-56 p-4 text-center rounded cursor-pointer hover:border-main border-2;
}

.user-type-active {
  @apply border-2 !border-main;
}
</style>
