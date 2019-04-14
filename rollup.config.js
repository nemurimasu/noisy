import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    file: pkg.browser,
    name: 'noisy',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    production && terser()
  ]
}
