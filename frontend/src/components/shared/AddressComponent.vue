<template>
  <div>
    <div class="flex flex-col gap-3">
      <InputComponent
        name="address1"
        id="address1"
        type="text"
        class="w-full"
        input-class="w-full"
        placeholder="Address 1 *"
        @input="emit('on-change', 'address1', AddressSchema.shape.address1, address.address1)"
        v-model="address.address1"
        :error-message="props.modelErrors?.address1 ? props.modelErrors?.address1 : ''"
      />
      <InputComponent
        name="address2"
        id="address2"
        type="text"
        class="w-full"
        input-class="w-full"
        placeholder="Address 2"
        @input="emit('on-change', 'address2', AddressSchema.shape.address2, address.address2)"
        v-model="address.address2"
        :error-message="props.modelErrors?.address2 ? props.modelErrors?.address2 : ''"
      />
    </div>
    <div class="flex gap-3">
      <InputComponent
        name="city"
        id="city"
        type="text"
        class="w-full"
        placeholder="City *"
        v-model="address.city"
        @input="emit('on-change', 'city', AddressSchema.shape.city, address.city)"
        :error-message="props.modelErrors?.city ? props.modelErrors?.city : ''"
      />
      <InputComponent
        name="postal"
        id="postal"
        type="text"
        class="w-full"
        placeholder="Postal *"
        v-model="address.postal"
        @input="emit('on-change', 'postal', AddressSchema.shape.postal, address.postal)"
        :error-message="props.modelErrors?.postal ? props.modelErrors?.postal : ''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputComponent from './InputComponent.vue'
import { type Address } from '@shared/pack'
import { AddressSchema } from '@shared/pack'

const emit = defineEmits(['on-change'])

export interface Props {
  modelErrors: Partial<Address> | undefined
}

const props = defineProps<Props>()

const address = ref<Partial<Address>>({
  id: 0,
  address1: '',
  address2: '',
  city: '',
  postal: ''
})
</script>
