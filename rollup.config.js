import pkg from "./package.json";
import vue from "@vitejs/plugin-vue";
import buble from "@rollup/plugin-buble";
import { terser } from "@rollup/plugin-terser";
import alias from "@rollup/plugin-alias";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";

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
    entries: {
      vue: "@vue/compat", // Alias para usar @vue/compat
    },
    resolve: [".vue", ".js"],
  }),
  vue({
    // Configuração de compatibilidade Vue 2 no Vue 3
    compilerOptions: {
      compatConfig: {
        MODE: 2,
      },
    },
  }),
  postcss(),
  buble({
    objectAssign: "Object.assign",
    exclude: "**/*.css",
  }),
];

const outputES = {
  file: pkg.module,
  format: "es",
  sourcemap: true,
  banner,
};

const outputUMD = {
  file: pkg.main,
  format: "umd",
  name: "LiquorTree",
  sourcemap: true,
  banner,
  globals: {
    vue: "Vue",
  },
};

const config = [
  {
    input: "src/main.js",
    output: outputES,
    cache: false,
    plugins,
    external: ["vue"],
  },
  {
    input: "src/main.js",
    output: outputUMD,
    cache: false,
    plugins: plugins.concat(
      "production" !== process.env.NODE_ENV
        ? []
        : terser({
            output: {
              comments: function (node, comment) {
                var text = comment.value;
                var type = comment.type;
                if (type == "comment2") {
                  return /license/i.test(text);
                }
              },
            },
          }),
    ),
    external: ["vue"],
  },
];

if ("development" == process.env.NODE_ENV) {
  config[0].plugins.push(
    serve({
      contentBase: ["dist", "demo"],
      port: 8081,
      open: true,
    }),
  );
}

export default config;
