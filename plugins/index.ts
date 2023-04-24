import { Pinia } from 'pinia'
import { useProductStore } from '~/store/productStore'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useProductStore($pinia as Pinia),
    },
  }
})
