import { readFile } from 'fs/promises'

type DatabaseRow<Columns extends Record<string, any>> = { id: string } & Columns

interface DatabaseTable<Columns extends Record<string, any>> {
  data: DatabaseRow<Columns>[]
  select: <U extends keyof Columns = keyof Columns>(
    keys: U | U[] | '*'
  ) => Pick<DatabaseRow<Columns>, U>[]
}

interface Database {
  from: (table: string) => Promise<DatabaseTable<any>>
}

// const config = database
//   .from('general')
//   .select('updated_at')

// export function createDatabase(): Database {
//   const FILE_DIR = '~/assets/database/' as const
//   class FileDatabase implements Database {
//     directory = FILE_DIR
//     constructor () {}
//     async from (table: string) {
//       const data = this.readDBFile(table)
//       return {
//         select:
//       }
//     }
//     private
//     private async readDBFile(name: string): Promise<Record<string, any>> {
//       try {
//         const data = await readFile(`${this.directory}${name}.json`)
//         return JSON.parse(data.toString()) as Record<string, any>
//       } catch (e) {
//         throw new Error(`Could not find table named "${name}" in the database.`)
//       }
//     }
//   }
// }

type CollectionItem<T> = {
  id: string
} & T

class DbCollection<T> {
  data: CollectionItem<T>[]
  constructor(data: CollectionItem<T>[]) {
    this.data = data
  }
  select<U extends Exclude<keyof CollectionItem<T>, 'id'>>(
    key: U | U[] | '*' = '*'
  ): DbCollection<Pick<T, U>> {
    if (key === '*') return this
    const keys = Array.isArray(key) ? key : [key]
    return new DbCollection(
      this.data.map((row) => ({ id: row.id, ...pick(row, keys) }))
    )
  }
}

const test = new DbCollection([
  { id: '123', labas: 'sasa', ate: 'viso gero', reiksme: 1255 },
  { id: '124', labas: 'sasa', ate: 'viso gero', reiksme: 355 },
  { id: '125', labas: 'sasa', ate: 'viso gero', reiksme: 244 },
])

const data = test.select('*')
// class FileDBTable<T extends Record<string, any>> implements DatabaseTable<DatabaseRow<T>> {
//   data: T[]
//   constructor(data: T[]) {
//     this.data = data
//   }
//   select<U extends keyof T>(keys: '*' | U | U[]) {
//     if (keys === '*') return this.data
//     return new FileDBTable(this.data.map((row) => pick(row, keys)))
//   }
// }

function pick<T extends Record<string, any>, U extends keyof T>(
  data: T,
  columns: U[]
): Pick<T, U> {
  const _columns: U[] = Array.isArray(columns) ? columns : [columns]
  return _columns.reduce((sum, col) => {
    sum[col] = data[col]
    return sum
  }, {} as Pick<T, U>)
}
