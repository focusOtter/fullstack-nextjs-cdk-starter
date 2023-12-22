/* eslint-disable */
import { build } from 'esbuild'
import { glob } from 'glob'
const files = await glob('lib/api/TS_functions/**/*.ts')
console.log(files)

await build({
	sourcemap: 'inline',
	sourcesContent: false,
	format: 'esm',
	target: 'esnext',
	platform: 'node',
	external: ['@aws-appsync/utils'],
	outdir: 'lib/api/JS_functions',
	entryPoints: files,
	bundle: true,
})
