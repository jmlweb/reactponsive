import progress from 'rollup-plugin-progress';
import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';
import { plugin as analyze } from 'rollup-plugin-analyzer';
import pkg from './package.json';

const createCjs = (entry, out) => ({
  input: `src/${entry}.ts`,
  output: [
    {
      file: `${out || entry}.js`,
      format: 'cjs',
    },
    {
      file: `${out || entry}.es.js`,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    progress({
      clearLine: false,
    }),
    typescript({
      typescript: require('typescript'),
    }),
    cleanup(),
    analyze(),
  ],
});

export default [createCjs('index', 'dist/index')];
