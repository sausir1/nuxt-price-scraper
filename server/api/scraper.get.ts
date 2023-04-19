import { load } from 'cheerio'
import axios from 'axios'
import { arrToObj, clean } from '../utils'
const _errors = ['NOT_FOUND'] as const
const ERRORS = arrToObj(_errors)

const SKYTECH = {
  CREATE: () => axios.create({ baseURL: 'https://www.skytech.lt' }),
  CPU: '/kompiuteriu-komponentai-procesoriai-cpu-c-86_85_584.html',
  PSU: '',
  DEFAULT_QUERY: '?pav=1&grp=0&pagesize=500',
} as const

interface ScrapeResponse {
  name: string
  id: string
  price: string
  img: string
  url: string
}

export default defineEventHandler(async () => {
  const data = [] as Partial<ScrapeResponse>[]
  const $http = SKYTECH.CREATE()
  const html = await $http.get<string>(SKYTECH.CPU + SKYTECH.DEFAULT_QUERY)
  const $ = load(html.data)
  const dataTable = $('table tr.productListing').each(function () {
    const $row = $(this)
    const url = $row.find('a').attr('href')
    const $img = $row.find('img')
    const img = $img.attr('src')
    const price = $row.children().last().prev().text()
    const [id, name] = clean($img.attr('title'))?.split('<br />')
    data.push({
      id: id.replace('MODELIS: ', ''),
      img,
      name,
      price: clean(price),
    })
  })
  return {
    data,
  }
})
