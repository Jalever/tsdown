import path from 'node:path'
import process from 'node:process'
import {
  createRsbuild,
  rspack,
  type RsbuildConfig,
  type RsbuildEntry,
} from '@rsbuild/core'
import { IsolatedDecl } from 'unplugin-isolated-decl'
import { ExternalPlugin, getProductionDeps } from './features/external'
import { resolveOutputExtension } from './features/output'
import { toArray } from './utils/general'
import type { ResolvedOptions } from './options'
import type { CleanupCallback, WatchCallback } from './utils/types'
import type { PackageJson } from 'pkg-types'

export async function rsbuildEngine(
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
    minify = false,
    watch,
  } = resolved

  const deps = pkg ? Array.from(getProductionDeps(pkg)) : []
  const rsbuildConfig: RsbuildConfig = {
    source: {
      entry: normalizeEntry(entry),
      alias,
    },
    output: {
      target: platform === 'node' ? 'node' : 'web',
      externals: [...deps, ...((external || []) as any)],
      minify,
      distPath: { root: path.resolve(outDir) },
      sourceMap: { js: sourcemap ? 'source-map' : false },
    },
    mode: watch ? 'development' : 'production',

    // input: entry,
    // external,
    // resolve: { alias },
    // treeshake,
    // plugins: [
    //   ExternalPlugin(pkg, platform),
    //   dts && IsolatedDecl.rolldown(dts === true ? {} : dts),
    //   ...plugins,
    // ].filter((plugin) => !!plugin),
    // ...resolved.inputOptions,
  }

  const rsbuild = await createRsbuild({
    rsbuildConfig,
  })
  await rsbuild.build()

  // instance.build()
  // await writeBundle()

  // if (watch) {
  //   return writeBundle
  // } else {
  //   return async () => {
  //     await build.destroy()
  //     // FIXME https://github.com/rolldown/rolldown/issues/1274
  //     process.exit(0)
  //   }
  // }

  // async function writeBundle() {
  //   await Promise.all(
  //     format.map(async (format) => {
  //       const extension = resolveOutputExtension(pkg, format)
  //       const outputOptions = {
  //         format,
  //         sourcemap,
  //         dir: outDir,
  //         minify,
  //         entryFileNames: `[name].${extension}`,
  //         chunkFileNames: `[name]-[hash].${extension}`,
  //       }
  //       const userOutputOptions =
  //         typeof resolved.outputOptions === 'function'
  //           ? await resolved.outputOptions(outputOptions, format)
  //           : resolved.outputOptions

  //       return await build.write({
  //         ...outputOptions,
  //         ...userOutputOptions,
  //       })
  //     }),
  //   )
  // }
}
function normalizeEntry(
  entry: string | string[] | Record<string, string>,
): RsbuildEntry {
  if (typeof entry === 'string' || Array.isArray(entry)) {
    return {
      main: toArray(entry).map((file) => path.resolve(file)),
    }
  }
  return Object.fromEntries(
    Object.entries(entry).map(([key, value]) => [
      key,
      toArray(value).map((file) => path.resolve(file)),
    ]),
  )
}
