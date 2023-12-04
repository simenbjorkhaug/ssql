const SQL_LITERAL = Symbol('SQL_LITERAL')

export function literal(value: string) {
  return { [SQL_LITERAL]: value }
}

export function createSqlFunction(
  parameter_replace_value: string,
  use_index = false,
  start_at_index = 1,
) {
  const sql_placeholder = parameter_replace_value
  return function sql(args: TemplateStringsArray, ...params: unknown[]) {
    let query = ''

    const params_shallow_copy = [...params]

    for (let i = 0; i < args.length; i++) {
      const param = params[i]

      query += args[i]
      if (i < params.length) {
        if (param && typeof param === 'object' && SQL_LITERAL in param) {
          query += param[SQL_LITERAL]
          params_shallow_copy.splice(i, 1)
        } else {
          query += sql_placeholder

          if (use_index) {
            query += i + start_at_index
          }
        }
      }
    }

    return [query.trim().replace(/\s*\n\s*/g, '\n'), params_shallow_copy]
  }
}

export const sql = createSqlFunction('?')
