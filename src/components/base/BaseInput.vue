<template>
  <div class="space-y-3">
    <label v-if="label" class="block text-white text-xl mb-3 font-['Lora']">{{ label }}</label>
    <component
      :is="tag"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-6 py-3 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none text-lg font-['Lora']"
      :class="{ 'border-red-500': error }"
      v-bind="$attrs"
    />
    <p v-if="error" class="text-red-500 text-lg mt-3 font-['Lora']">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'input',
      validator: value => ['input', 'textarea', 'select'].includes(value)
    }
  },
  emits: ['update:modelValue']
}
</script> 