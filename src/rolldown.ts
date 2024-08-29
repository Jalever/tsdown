import process from 'node:process'
import { rolldown, type InputOptions } from 'rolldown'
import { IsolatedDecl } from 'unplugin-isolated-decl'
import { ExternalPlugin } from './features/external'
import { resolveOutputExtension } from './features/output'
import type { ResolvedOptions } from './options'
import type { CleanupCallback, WatchCallback } from './utils/types'
import type { PackageJson } from 'pkg-types'

export async function rolldownEngine(
  resolved: ResolvedOptions,
  pkg?: PackageJson,
): Promise<WatchCallback | CleanupCallback> {
  const {
    entry,
    external,
    plugins,
    outDir,
    format,
    platform,
    alias,
    treeshake,
    sourcemap,
    dts,
    minify,
    watch,
  } = resolved

  const inputOptions: InputOptions = {
    input: entry,
    external,
    resolve: { alias },
    treeshake,
    plugins: [
      ExternalPlugin(pkg, platform),
      dts && IsolatedDecl.rolldown(dts === true ? {} : dts),
      ...plugins,
    ].filter((plugin) => !!plugin),
    ...resolved.inputOptions,
  }
  const build = await rolldown(inputOptions)
  await writeBundle()

  if (watch) {
    return writeBundle
  } else {
    return async () => {
      await build.destroy()
      // FIXME https://github.com/rolldown/rolldown/issues/1274
      process.exit(0)
    }
  }

  async function writeBundle() {
    await Promise.all(
      format.map(async (format) => {
        const extension = resolveOutputExtension(pkg, format)
        const outputOptions = {
          format,
          sourcemap,
          dir: outDir,
          minify,
          entryFileNames: `[name].${extension}`,
          chunkFileNames: `[name]-[hash].${extension}`,
        }
        const userOutputOptions =
          typeof resolved.outputOptions === 'function'
            ? await resolved.outputOptions(outputOptions, format)
            : resolved.outputOptions

        return await build.write({
          ...outputOptions,
          ...userOutputOptions,
        })
      }),
    )
  }
}
