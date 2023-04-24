import axios from 'axios'

const SKYTECH = {
  CREATE: () => axios.create({ baseURL: 'https://www.skytech.lt' }),
  PRICE_HISTORY: (id: string) => `/ajax.php?a=price-history&p=${id}`,
} as const

/**
 * first string is date, second string is value in euros.
 */
type SPriceHistory = [date: string, price: string, unknown: number]

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string
  const $http = SKYTECH.CREATE()
  const hist = await $http.get<{ status: string; data: SPriceHistory[] }>(
    SKYTECH.PRICE_HISTORY(id)
  )
  console.log(hist)
  return { data: hist.data.data }
})
