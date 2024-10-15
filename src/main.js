import TreeRoot from './components/TreeRoot.vue';

// const install = (app) => {
//   app.component(TreeRoot.name, TreeRoot);
// };

// TreeRoot.install = install;

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(TreeRoot);
// }

export default {
  install(app) {
    app.component(TreeRoot.name, TreeRoot);;
  },
};
