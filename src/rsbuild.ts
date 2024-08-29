import path from 'node:path'
import {
  createRsbuild,
  type EnvironmentConfig,
  type RsbuildConfig,
  type RsbuildEntry,
  type Rspack,
} from '@rsbuild/core'
import { getProductionDeps } from './features/external'
import { toArray } from './utils/general'
import type { Format, ResolvedOptions } from './options'
import type { CleanupCallback, WatchCallback } from './utils/types'
import type { PackageJson } from 'pkg-types'

export async function rsbuildEngine(
  resolved: ResolvedOptions,
  pkg?: PackageJson,
): Promise<WatchCallback | CleanupCallback> {
  const {
    entry,
    external,
    // plugins,
    outDir,
    format,
    platform,
    alias,
    // treeshake,
    sourcemap,
    // dts,
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
      sourceMap: { js: resolveSourceMap(sourcemap) },
    },
    mode: watch ? 'development' : 'production',

    environments: Object.fromEntries(
      format.map((format): [string, EnvironmentConfig] => {
        format = normalizeFormat(format)
        return [
          format,
          {
            tools: {
              rspack: {
                output: {
                  module: format === 'module',
                  chunkFormat: format,
                  library: {
                    type: format === 'module' ? 'modern-module' : format,
                  },
                },
              },
            },
          },
        ]
      }),
    ),

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

  return () => {}

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

function normalizeFormat(format: Format): 'module' | 'commonjs' {
  switch (format) {
    case 'cjs':
    case 'commonjs':
      return 'commonjs'
    case 'esm':
    case 'es':
    case 'module':
      return 'module'
  }
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

function resolveSourceMap(
  sourceMap: ResolvedOptions['sourcemap'],
): Rspack.Configuration['devtool'] {
  // if (!sourceMap) return false
  // if (sourceMap === true) return 'source-map'
  switch (sourceMap) {
    case true:
      return 'source-map'
    case 'inline':
      return 'inline-source-map'
    case 'hidden':
      return 'hidden-source-map'
  }
}
