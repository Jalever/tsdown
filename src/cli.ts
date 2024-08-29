import process from 'node:process'
import { version as rsbuildVersion } from '@rsbuild/core/package.json'
import { cac } from 'cac'
import pc from 'picocolors'
import { version as rolldownVersion } from '../node_modules/rolldown/package.json'
import { version } from '../package.json'
import { logger } from './utils/logger'
import type { Options } from './options'

export async function runCLI(): Promise<void> {
  const cli = cac('tsdown')

  cli
    .command('[...files]', 'Bundle files', {
      ignoreOptionDefaultValue: true,
    })
    .option('-c, --config <filename>', 'Use a custom config file')
    .option('--no-config', 'Disable config file')
    .option('--format <format>', 'Bundle format: esm, cjs, iife', {
      default: 'esm',
    })
    .option('--clean', 'Clean output directory')
    .option('--minify', 'Minify output')
    .option('--silent', 'Suppress non-error logs')
    .option('-d, --out-dir <dir>', 'Output directory', { default: 'dist' })
    .option('--treeshake', 'Tree-shake bundle', { default: true })
    .option('--sourcemap', 'Generate source map', { default: false })
    .option('--platform <platform>', 'Target platform', {
      default: 'node',
    })
    .option('--watch', 'Watch mode')
    .option('--engine <engine>', 'Bundler engine: rolldown, rslib', {
      default: 'rolldown',
    })
    .action(async (input: string[], flags: Options) => {
      logger.level = flags.silent
        ? 0 // Fatal and Error
        : 3 // Informational logs, success, fail, ready, start, ...

      let engineText: string = ''
      if (flags.engine === 'rsbuild') {
        engineText = `@rsbuild/core ${pc.dim(`v${rsbuildVersion}`)}`
      } else {
        engineText = `rolldown ${pc.dim(`v${rolldownVersion}`)}`
      }
      logger.info(`tsdown ${pc.dim(`v${version}`)} powered by ${engineText}`)

      const { build } = await import('./index')
      if (input.length > 0) flags.entry = input
      await build(flags)
    })

  cli.help()
  cli.version(version)
  cli.parse(process.argv, { run: false })

  try {
    await cli.runMatchedCommand()
  } catch (error) {
    logger.fatal(error)
    process.exit(1)
  }
}
