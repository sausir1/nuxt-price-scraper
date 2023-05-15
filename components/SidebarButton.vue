<template>
  <div
    class="flex px-3 py-2.5 rounded-lg items-center gap-3 hover:text-gray-100 hover:bg-neutral-800/90"
    :class="{
      'bg-neutral-800 text-gray-100': active,
      'text-gray-300': !active,
    }"
  >
    <HomeIcon class="w-5 h-5"></HomeIcon>
    <slot></slot>
    <ChevronUpIcon class="w-5 h-5 ml-auto"></ChevronUpIcon>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
interface Props {
  active: boolean
}
const props = defineProps<Props>()
</script>
