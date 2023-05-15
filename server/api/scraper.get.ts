import { capitalize, exclude } from './../utils/index'
import { Cheerio, load, Element, CheerioAPI } from 'cheerio'
import axios, { AxiosResponse } from 'axios'
import { arrToObj, clean, writeToFile } from '../utils'
const _errors = ['NOT_FOUND'] as const
const ERRORS = arrToObj(_errors)

const SKYTECH = {
  CREATE: () => axios.create({ baseURL: 'https://www.skytech.lt' }),
  CPU: '/kompiuteriu-komponentai-procesoriai-cpu-c-86_85_584.html',
  PSU: '',
  DEFAULT_QUERY: '?pav=1&grp=0&pagesize=500',
} as const

type ProductScrape = {
  basePath: string
  basePluck: (
    element: CheerioAPI,
    extras: { toSiteUri: (path: string) => string }
  ) => ScrapeResponse[]
  deepPluck?: (element: CheerioAPI) => Record<string, any>
}

type ScraperOptions = {
  baseUrl: string
  delay: number
  defaultQuery?: string
  cpu?: ProductScrape
  gpu?: ProductScrape
  mobos: ProductScrape
}
interface ScrapeResponse {
  id: string | number
  name: string
  product_id: string
  price: string
  img: string
  url: string
  in_stock: boolean
  details?: Record<string, any>
}

const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

interface ScrapeOptions {
  baseUrl: string
  cpus?: string
  psus?: string
  defaultQuery?: string
}

const useProductScraper = (options: ScrapeOptions) => {
  const _url = options.baseUrl
  const _http = axios.create({ baseURL: _url })
  function toSiteUri(path: string | undefined) {
    if (path) {
      return path.startsWith('/') ? _url + path : _url + '/' + path
    }
    return ERRORS.NOT_FOUND
  }
  type Methods = Exclude<keyof ScrapeOptions, 'defaultQuery' | 'baseUrl'>
  const methods = Object.entries(options)
    .filter(([key]) => !['baseUrl', 'defaultQuery'].includes(key))
    .reduce((sum, [key, resourcePath]) => {
      sum[`get${key as Methods}`] = () =>
        _http.get(resourcePath + options.defaultQuery)
      return sum
    }, {} as Record<`get${Methods}`, <T, U = any>() => Promise<AxiosResponse<T, U>>>)
  return {
    toSiteUri,
    http: _http,
    ...methods,
  }
}

export default defineEventHandler(async () => {
  const data = [] as ScrapeResponse[]
  const scraper = useProductScraper({
    baseUrl: 'https://www.skytech.lt',
    cpus: '/kompiuteriu-komponentai-procesoriai-cpu-c-86_85_584.html',
    defaultQuery: '?pav=1&grp=0&pagesize=500',
  })
  const html = await scraper.getcpus<string>()
  const $ = load(html.data)
  $('table tr.productListing').each(function () {
    const $row = $(this)
    const url = scraper.toSiteUri($row.find('a').attr('href'))
    const id = url.split('-').at(-1)?.replace('.html', '') as string
    const $img = $row.find('img')
    const img = scraper.toSiteUri($img.attr('src'))
    const in_stock = !$row.hasClass('nostock')
    const price = $row.children().last().prev().text()
    const [productId, name] = clean($img.attr('title'))?.split('<br />')
    data.push({
      id,
      in_stock,
      product_id: productId.replace('MODELIS: ', ''),
      img,
      name,
      price: clean(price),
      url,
    })
  })

  writeToFile('~/assets/statics/skytech.json', data)
  return {
    data,
  }
})
