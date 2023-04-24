import { defineStore } from 'pinia'
import { ScrapeResponse } from '~/composables'

export const useProductStore = defineStore('products', {
  state: () => ({
    cpu: [] as ScrapeResponse[],
    psu: [] as ScrapeResponse[],
    mobo: [] as ScrapeResponse[],
    gpu: [] as ScrapeResponse[],
    pending: false,
  }),
  getters: {
    getById: (state) => {
      return (product: Exclude<keyof typeof state, 'pending'>, id: string) =>
        state[product].find((value) => value.id === id)
    },
  },
  actions: {
    async getCPUs() {
      const { data } = await useFetch('/api/scraper', { key: 'cpu_products' })
      if (!data.value?.data) throw new Error('Failed to load CPU data')
      this.cpu = data.value?.data as ScrapeResponse[]
      return this.cpu
    },
  },
})
