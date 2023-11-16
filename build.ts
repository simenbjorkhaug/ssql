import { build, emptyDir } from 'https://deno.land/x/dnt@0.38.1/mod.ts'

await emptyDir('./npm')

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: true,
  typeCheck: false,
  package: {
    // package.json properties
    name: '@bjorkhaug/ssql',
    version: Deno.args[0],
    description:
      'Simple template literal wrapper for SQL queries for Deno and Node.js. Is meant to be used with a library, not directly for any driver.',
    license: 'MIT',
    publishConfig: {
      access: 'public',
      registry: 'https://registry.npmjs.org/',
      scope: '@bjorkhaug',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/simenbjorkhaug/ssql.git',
    },
    bugs: {
      url: 'https://github.com/simenbjorkhaug/ssql/issues',
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync('README.md', 'npm/README.md')
  },
})
