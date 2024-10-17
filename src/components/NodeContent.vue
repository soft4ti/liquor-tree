<script>
import { h, ref, nextTick } from "vue";

const NodeContent = {
  name: "node-content",
  props: ["node"],
  data() {
    return {
      nodeText: this.node.text,
    };
  },
  methods: {
    focusInput() {
      nextTick(() => {
        this.$refs.editCtrl.focus();
      });
    },
    handleInput(e) {
      this.nodeText = e.target.value;
    },
    handleBlur() {
      this.node.stopEditing(this.nodeText);
    },
    handleKeyup(e) {
      if (e.keyCode === 13) {
        this.node.stopEditing(this.nodeText);
      }
    },
    handleMouseup(e) {
      e.stopPropagation();
    },
  },
  render() {
    const node = this.node;
    const vm = this.node.tree.vm;

    if (node.isEditing) {
      this.focusInput();

      return h("input", {
        value: this.nodeText,
        type: "text",
        class: "tree-input",
        onInput: this.handleInput,
        onBlur: this.handleBlur,
        onKeyup: this.handleKeyup,
        onMouseup: this.handleMouseup,
        ref: "editCtrl",
      });
    }

    if (vm.$slots.default) {
      return vm.$slots.default({ node: this.node });
    }

    return h("span", {
      innerHTML: node.text,
    });
  },
};

export default NodeContent;
</script>
