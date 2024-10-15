import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');
import vue from '@vitejs/plugin-vue';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import serve from 'rollup-plugin-serve';
import styles from '@rollup/plugin-styles';

const version = pkg.version;
const banner = `
/*!
 * LiquorTree v${version}
 * (c) ${new Date().getFullYear()} amsik
 * Released under the MIT License.
 */
`;

const plugins = [
  alias({
    resolve: ['.vue', '.js'],
  }),
  vue(),
  styles(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env']
  }),
  terser()
];

const outputES = {
  file: pkg.module,
  format: 'es',
  sourcemap: true,
  banner
};

const outputUMD = {
  file: pkg.main,
  format: 'umd',
  name: 'LiquorTree',
  sourcemap: true,
  banner,
  globals: {
    vue: 'Vue'
  }
};

const config = [
  {
    input: 'src/main.js',
    output: outputES,
    cache: false,
    plugins,
    external: ['vue']
  },
  {
    input: 'src/main.js',
    output: outputUMD,
    cache: false,
    plugins,
    external: ['vue']
  },
];

if ('development' == process.env.NODE_ENV) {
  config.plugins.push(serve({
    contentBase: ['dist', 'demo'],
    port: 8081,
    open: true
  }));
}

export default config;
