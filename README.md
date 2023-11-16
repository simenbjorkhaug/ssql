# ssql

ssql is a simple template literal wrapper for SQL queries for Deno and Node.js.\
It is meant to be used with a library, not directly for any driver.

## Usage

---

```typescript
import { sql } from '@bjorkhaug/ssql'

const [query, params] = sql`SELECT * FROM Users WHERE id = ${1}`
```
