<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  LineController,
  PointElement,
} from 'chart.js'

export interface SingleDataset {
  /**
   * Dataset label. Could be the name of the data. Eg. Apples Count, and data is number of apples.
   */
  label: string
  /**
   * y axis values.
   */
  data: (number | string)[]
}

export interface Dataset {
  /**
   * labels that will be represented on x axis.
   */
  labels: string[]
  datasets: SingleDataset[]
}

interface Props {
  dataset: Dataset
  options: any
}

Chart.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  LineController,
  PointElement
)
const props = defineProps<Props>()
const canvas = ref<HTMLCanvasElement | null>(null)
const chartjs = shallowRef<Chart | null>(null)

watch([() => props.dataset, () => props.options], () => {
  console.log('changed')
  if (chartjs.value) {
    console.log('updating')
    chartjs.value.update()
  }
})

onMounted(() => {
  if (canvas.value || !chartjs.value) {
    chartjs.value = new Chart(canvas.value, {
      type: 'line',
      data: props.dataset,
      options: {
        layout: {
          padding: '48px',
        },
        plugins: {
          colors: { enabled: true },
        },
      },
    })
  }
})
</script>
