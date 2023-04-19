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
