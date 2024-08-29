import process from 'node:process'
import { cleanOutDir } from './features/clean'
import { watchBuild } from './features/watch'
import {
  normalizeOptions,
  type Options,
  type OptionsWithoutConfig,
} from './options'
import { rolldownEngine } from './rolldown'
import { rsbuildEngine } from './rsbuild'
import { logger } from './utils/logger'
import { readPackageJson } from './utils/package'
import { getElapsedTime, updateStartTime } from './utils/time'
import type { CleanupCallback, WatchCallback } from './utils/types'

/**
 * Build with tsdown.
 */
export async function build(
  userOptions: Omit<Options, 'silent'> = {},
): Promise<void> {
  updateStartTime()
  const resolved = await normalizeOptions(userOptions)
  const { outDir, clean, watch, engine } = resolved

  if (clean) await cleanOutDir(outDir, clean)
  const pkg = await readPackageJson(process.cwd())

  let callback: WatchCallback | CleanupCallback | undefined
  if (engine === 'rsbuild') {
    callback = await rsbuildEngine(resolved, pkg)
  } else {
    callback = await rolldownEngine(resolved, pkg)
  }
  logger.success(`Build complete in ${getElapsedTime()}ms`)

  if (callback)
    if (watch) {
      await watchBuild(resolved, () => {
        logger.success(`Rebuild complete in ${getElapsedTime()}ms`)
        callback()
      })
    } else {
      await callback()
    }
}

/**
 * Defines the configuration for tsdown.
 */
export function defineConfig(
  options: OptionsWithoutConfig,
): OptionsWithoutConfig {
  return options
}

export { logger }
export type { Options, OptionsWithoutConfig }
