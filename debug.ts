import { sql } from './mod.ts'

const output = sql`SELECT * FROM Users WHERE id = ${1}`

console.log(output)
