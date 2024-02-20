import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: 'cli',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
  ],
  watch: {
    include: 'src/**',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],

  plugins: [
    resolve(),
    commonjs(),
    terser(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
};