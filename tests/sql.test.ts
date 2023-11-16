import { assertEquals } from 'https://deno.land/std@0.206.0/assert/assert_equals.ts'
import { createSqlFunction, sql } from '../mod.ts'

Deno.test('sql', () => {
  assertEquals(sql`SELECT * FROM Users WHERE id = (${1})`, [
    'SELECT * FROM Users WHERE id = (?)',
    [1],
  ])
})

Deno.test('sql with multiple parameters', () => {
  assertEquals(
    sql`SELECT * FROM Users WHERE id = (${1}) AND name = (${'John'})`,
    [
      'SELECT * FROM Users WHERE id = (?) AND name = (?)',
      [1, 'John'],
    ],
  )
})

Deno.test('createSqlFunction with different replace value', () => {
  const sql = createSqlFunction('##')
  assertEquals(sql`SELECT * FROM Users WHERE id = (${1})`, [
    'SELECT * FROM Users WHERE id = (##)',
    [1],
  ])
})

Deno.test('createSqlFunction with another replace value', () => {
  const sql = createSqlFunction('@@')
  assertEquals(sql`SELECT * FROM Users WHERE id = (${2})`, [
    'SELECT * FROM Users WHERE id = (@@)',
    [2],
  ])
})
