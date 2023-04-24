<template>
  <div>
    <div
      class="max-w-4xl"
      v-if="!pending"
    >
      <SChart :dataset="chartData"></SChart>
    </div>
    <SSelect
      v-model="selected"
      label="test input"
      id="test"
      :options="options || undefined"
    />
    <!-- <div v-if="pending">stil pending!</div> -->
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { Dataset } from '~/components/SChart.vue'
import { ScrapeResponse } from '~/composables'
import { useProductStore } from '~/store/productStore'
const {
  getCPUs,
  getById,
  $subscribe,
  pending: storePending,
} = useProductStore()
const pending = ref(false)
$subscribe(() => (pending.value = storePending))
const data = await getCPUs()
const options = ref(
  data.map((entry) => ({
    value: entry.id,
    label: entry.name?.substring(0, 60),
  }))
)
const chartData = ref<Dataset>({
  labels: [],
  datasets: [],
})
const selected = ref('')

watch(
  () => selected.value,
  async () => {
    pending.value = true
    nextTick(() => (pending.value = false))
    const priceHist = await $fetch(
      `/api/scraper/${selected.value}/price-history`
    )
    const currentCPU = getById('cpu', selected.value)
    console.log(selected.value)
    chartData.value = {
      labels: priceHist.data.map((entry) => entry[0]),
      datasets: [
        {
          label: currentCPU!.name,
          data: priceHist.data.map((entry) => parseFloat(entry[1])),
          borderColor: '#0054a6',
        },
      ],
    }
    // const product = products.getById('cpu', selected.value)
    // product?.price
  }
)
</script>
