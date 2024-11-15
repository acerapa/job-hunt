<template>
  <div v-if="address">
    <div class="flex flex-col gap-3">
      <InputComponent
        name="address1"
        id="address1"
        type="text"
        class="w-full"
        input-class="w-full"
        placeholder="Address 1 *"
        :disabled="props.disabled"
        :label-css="props.labelCss"
        :label="props.hasLabel ? 'Address 1 *' : ''"
        @input="
          emit('on-change', getPrefix('address1'), AddressSchema.shape.address1, address.address1)
        "
        v-model="address.address1"
        :error-message="getModelErrs(getPrefix('address1'))"
      />
      <InputComponent
        name="address2"
        id="address2"
        type="text"
        class="w-full"
        input-class="w-full"
        placeholder="Address 2"
        :disabled="props.disabled"
        :label-css="props.labelCss"
        :label="props.hasLabel ? 'Address 2' : ''"
        @input="
          emit('on-change', getPrefix('address2'), AddressSchema.shape.address2, address.address2)
        "
        v-model="address.address2"
        :error-message="getModelErrs(getPrefix('address2'))"
      />
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex gap-3">
        <InputComponent
          name="city"
          id="city"
          type="text"
          class="w-full"
          placeholder="City *"
          v-model="address.city"
          :disabled="props.disabled"
          :label-css="props.labelCss"
          :label="props.hasLabel ? 'City *' : ''"
          @input="emit('on-change', getPrefix('city'), AddressSchema.shape.city, address.city)"
          :error-message="getModelErrs(getPrefix('city'))"
        />
        <InputComponent
          name="country"
          id="postal"
          type="text"
          class="w-full"
          placeholder="Postal *"
          v-model="address.postal"
          :disabled="props.disabled"
          :label-css="props.labelCss"
          :label="props.hasLabel ? 'Postal *' : ''"
          @input="
            emit('on-change', getPrefix('postal'), AddressSchema.shape.postal, address.postal)
          "
          :error-message="getModelErrs(getPrefix('postal'))"
        />
      </div>
      <div class="flex gap-3">
        <InputComponent
          name="province"
          id="province"
          type="text"
          class="w-full"
          placeholder="province *"
          v-model="address.province"
          :disabled="props.disabled"
          :label-css="props.labelCss"
          :label="props.hasLabel ? 'Province *' : ''"
          @input="
            emit('on-change', getPrefix('province'), AddressSchema.shape.province, address.province)
          "
          :error-message="getModelErrs(getPrefix('province'))"
        />
        <InputComponent
          name="country"
          id="country"
          type="text"
          class="w-full"
          placeholder="country *"
          v-model="address.country"
          :disabled="props.disabled"
          :label-css="props.labelCss"
          :label="props.hasLabel ? 'Country *' : ''"
          @input="
            emit('on-change', getPrefix('country'), AddressSchema.shape.country, address.country)
          "
          :error-message="getModelErrs(getPrefix('country'))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from './InputComponent.vue'
import { type Address } from '@shared/pack'
import { AddressSchema } from '@shared/pack'

const emit = defineEmits(['on-change'])

export interface Props {
  modelErrors: Record<string, any> | undefined
  prefix?: string
  hasLabel?: boolean
  labelCss?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasLabel: false,
  disabled: false
})

const address = defineModel<Partial<Address>>()

const getPrefix = (field: string) => {
  return props.prefix ? `${props.prefix}_${field}` : field
}

const getModelErrs = (key: string) => {
  let err = ''
  if (props.modelErrors) {
    if (props.modelErrors[key]) {
      err = props.modelErrors[key]
    } else {
      err = ''
    }
  }

  return err
}
</script>
