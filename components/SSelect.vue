<template>
  <InputTemplate v-bind="$props">
    <div
      ref="valueDisplay"
      type="button"
      class="bg-white rounded-lg border border-gray-300 py-2.5 px-4 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1 mb-1"
      tabindex="0"
      @click="state.showOptions = !state.showOptions"
    >
      {{ selected!.label }}
    </div>
    <div
      v-show="state.showOptions"
      class="bg-white p-1 max-w-md w-fit"
    >
      <ul class="overflow-y-scroll max-h-80 flex flex-col gap-2">
        <li
          v-for="option in options"
          class="hover:bg-green-100 px-2 py-1 rounded cursor-pointer"
          @click="emits('update:modelValue', option.value)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </InputTemplate>
</template>

<script setup lang="ts">
interface SelectOption {
  value: any
  label: string
}

interface Props {
  label: string
  id: string
  modelValue: any
  options: SelectOption[] | undefined
}
const emits = defineEmits(['update:modelValue'])
const props = defineProps<Props>()
const valueDisplay = ref<HTMLButtonElement | null>(null)
const state = reactive({
  showOptions: false,
})
const selected = computed(() => {
  const _default = { value: 'undefined', label: 'No value selected' }
  if (!props.options) return _default
  const option = props.options.find(
    (option) => option.value === props.modelValue
  )
  return option || _default
})
</script>

<style scoped></style>
