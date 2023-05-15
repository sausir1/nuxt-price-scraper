import { write, writeFile } from 'fs'

export function arrToObj<T extends readonly any[]>(
  input: T
): { readonly [P in T[number]]: P } {
  return input.reduce((sum, curr) => {
    sum[curr] = curr
  }, {})
}

export const clean = (input: string | undefined) => {
  if (!input) return ''
  return input.trim().replace(/\n/g, '')
}

export const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export function exclude<
  TObj extends Record<string, unknown>,
  UKeys extends keyof TObj = keyof TObj
>(obj: TObj, toExclude: UKeys[]) {
  return Object.entries(obj).reduce((sum, [key, val]) => {
    if (toExclude.includes(key as any)) return sum
    sum[key] = val
    return sum
  }, {} as Record<string, any>) as Pick<TObj, Exclude<keyof TObj, UKeys>>
}

export async function writeToFile<T extends any[] | Record<string, any>>(
  path: string,
  content: T
) {
  const _content = JSON.stringify(content, null, 2)
  writeFile('', _content, { flag: 'wx' }, (error) => {
    if (error) throw error
    console.log(`Written to ${path} successfully!`)
  })
}
