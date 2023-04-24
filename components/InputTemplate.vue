<template>
  <div>
    <label
      :for="id"
      class="text-gray-800 mb-2 ml-2 block"
    >
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
}
defineProps<Props>()
</script>
