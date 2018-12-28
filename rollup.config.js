import babel from 'rollup-plugin-babel'
import localResolve from 'rollup-plugin-local-resolve'
import pkg from './package.json'

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: pkg.main, format: 'cjs', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel(), localResolve()]
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: pkg.module, format: 'es', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel(), localResolve()]
  }
]
