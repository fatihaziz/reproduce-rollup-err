/**
 * Rollup Config.
 */

import rollupPluginJSON from "@rollup/plugin-json"
import rollupPluginNodeResolve from "@rollup/plugin-node-resolve"
import rollupPluginTypescript from "@rollup/plugin-typescript"
import { defineConfig, type Plugin } from "rollup"
import rollupPluginAutoExternal from "rollup-plugin-auto-external"
import rollupPluginCopy from "rollup-plugin-copy"
import rollupPluginDts from "rollup-plugin-dts"

import package_ from "./package.json"

/**
 * Get new instances of all the common plugins.
 */
function getPlugins() {
  return [
    rollupPluginAutoExternal(),
    rollupPluginNodeResolve(),
    rollupPluginTypescript({
      tsconfig: `tsconfig.build.json`,
    }),
    rollupPluginJSON({
      preferConst: true,
    }),
  ] as Plugin[]
}

const common = defineConfig({
  input: `src/index.ts`,

  output: {
    sourcemap: false,
  },

  external: [],

  treeshake: {
    annotations: true,
    moduleSideEffects: [],
    propertyReadSideEffects: false,
    unknownGlobalSideEffects: false,
  },
})

const cjs = defineConfig({
  ...common,

  output: {
    ...common.output,
    file: package_.main,
    format: `cjs`,
  },

  plugins: getPlugins(),
})

const esm = defineConfig({
  ...common,

  output: {
    ...common.output,
    file: package_.module,
    format: `esm`,
  },

  plugins: getPlugins(),
})

const dts = defineConfig({
  ...common,

  output: [
    {
      file: package_.exports.types.import,
      format: `esm`,
    },
    {
      file: package_.exports.types.require,
      format: `cjs`,
    },
  ],

  plugins: [
    rollupPluginTypescript({
      tsconfig: `tsconfig.build.json`,
    }),
    rollupPluginDts(),
  ] as Plugin[],
})

export default [cjs, esm, dts]
