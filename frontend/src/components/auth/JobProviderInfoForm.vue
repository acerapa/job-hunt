<template>
  <div class="w-screen h-screen flex flex-col gap-6 items-center justify-center">
    <div class="flex flex-col gap-2">
      <img
        src="@/assets/images/hammer-and-anvil-large.png"
        class="w-[70px] h-[70px] block mx-auto"
        alt="jim-trollhunters-sword"
      />
      <p class="text-[28px] font-semibold text-main">Welcome Job Provider</p>
    </div>
    <p class="italic text-sm font-light">*(Please fill forms to finish your registration)*</p>
    <div>
      <p class="text-sm font-semibold text-left text-main">Representative Info</p>
      <div class="flex flex-col gap-5">
        <div class="flex gap-6">
          <input
            type="text"
            placeholder="First name *"
            class="input flex-1"
            name="first_name"
            id="first_name"
          />
          <input
            type="text"
            placeholder="Last name *"
            class="input flex-1"
            name="last_name"
            id="last_name"
          />
        </div>
        <div class="flex gap-6">
          <input
            type="text"
            placeholder="Contact Number *"
            class="input flex-1"
            name="contact_number"
            id="contact_number"
          />
          <input type="text" placeholder="Email *" class="input flex-1" name="email" id="email" />
        </div>
        <div class="flex">
          <input type="text" class="input" placeholder="Position *" name="positio" id="position" />
        </div>
      </div>
    </div>
    <div>
      <p class="text-sm font-semibold text-left text-main">Company Info</p>
      <div class="flex flex-col gap-5">
        <div class="flex gap-6">
          <input
            type="text"
            placeholder="Company name *"
            class="input flex-1"
            name="company_name"
            id="company_name"
          />
          <input
            type="text"
            placeholder="Employee Range *"
            class="input flex-1"
            name="employee_range"
            id="employee_range"
          />
        </div>
        <textarea
          name="prof_summary"
          id="prof_summary"
          class="input"
          rows="4"
          placeholder="Company description (Description, site, vision, mission, etc) *"
        ></textarea>
        <button class="btn w-fit mx-auto">Finish</button>
      </div>
    </div>
  </div>
</template>
