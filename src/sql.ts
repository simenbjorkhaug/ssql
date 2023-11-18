export function sql(args: TemplateStringsArray, ...params: unknown[]) {
  let query = ''
  for (let i = 0; i < args.length; i++) {
    query += args[i]
    if (i < params.length) {
      query += '?'
    }
  }
  return [query.trim().replace(/\s*\n\s*/g, '\n'), params]
}

export function createSqlFunction(
  parameter_replace_value: string,
  use_index = false,
) {
  const sql_placeholder = parameter_replace_value
  return function sql(args: TemplateStringsArray, ...params: unknown[]) {
    let query = ''
    for (let i = 0; i < args.length; i++) {
      query += args[i]
      if (i < params.length) {
        query += sql_placeholder

        if (use_index) {
          query += i
        }
      }
    }
    return [query.trim().replace(/\s*\n\s*/g, '\n'), params]
  }
}
