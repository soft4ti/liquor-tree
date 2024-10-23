import TreeRoot from "./components/TreeRoot.vue";

const install = (app) => {
  app.component(TreeRoot.name, TreeRoot);
};

TreeRoot.install = install;
export default TreeRoot;
