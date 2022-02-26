import { nodeResolve } from '@rollup/plugin-node-resolve';


/*
https://github.com/rollup/plugins/tree/master/packages/node-resolve
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
*/

export default {
  input: 'public_html/main.js',
  output: {
    file: 'public_html/rollup_bundle.js',
    format: 'es'
  },
  plugins: [nodeResolve()]
};