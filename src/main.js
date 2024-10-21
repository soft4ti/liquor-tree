import TreeRoot from "./components/TreeRoot.vue";
// import { mitt } from "mitt";

// const emitter = mitt;
// const install = (app) => {
//   app.component(TreeRoot.name, TreeRoot);
// };

// TreeRoot.install = install;

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(TreeRoot);
// }

export default {
  install(app) {
    // app.config.globalProperties.$emitter = emitter;
    app.component(TreeRoot.name, TreeRoot);
  },
};
