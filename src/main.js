import TreeRoot from "./components/TreeRoot.vue";

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
