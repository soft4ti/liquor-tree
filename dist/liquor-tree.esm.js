
/*!
 * LiquorTree v0.3.0
 * (c) 2024 amsik
 * Released under the MIT License.
 */

import { nextTick, h, resolveComponent, openBlock, createElementBlock, normalizeClass, withModifiers, createElementVNode, normalizeStyle, createCommentVNode, createVNode, Transition, withCtx, Fragment, renderList, createBlock, toDisplayString, computed, resolveDynamicComponent } from 'vue';

var NodeContent = {
  name: "node-content",
  props: ["node"],
  data: function data() {
    return {
      nodeText: this.node.text,
    };
  },
  methods: {
    focusInput: function focusInput() {
      var this$1$1 = this;

      nextTick(function () {
        this$1$1.$refs.editCtrl.focus();
      });
    },
    handleInput: function handleInput(e) {
      this.nodeText = e.target.value;
    },
    handleBlur: function handleBlur() {
      this.node.stopEditing(this.nodeText);
    },
    handleKeyup: function handleKeyup(e) {
      if (e.keyCode === 13) {
        this.node.stopEditing(this.nodeText);
      }
    },
    handleMouseup: function handleMouseup(e) {
      e.stopPropagation();
    },
  },
  render: function render() {
    var node = this.node;
    var vm = this.node.tree.vm;

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

var _sfc_main$3 = NodeContent;

function styleInject(css, ref) {
  if ( ref === void 0 ) { ref = {}; }
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$2 = "\n.tree-node {\n  white-space: nowrap;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  box-sizing: border-box;\n}\n.tree-content {\n  display: flex;\n  align-items: center;\n  padding: 3px;\n  cursor: pointer;\n  width: 100%;\n  box-sizing: border-box;\n}\n.tree-node:not(.selected) > .tree-content:hover {\n  background: #f6f8fb;\n}\n.tree-node.selected > .tree-content {\n  background-color: #e7eef7;\n}\n.tree-node.disabled > .tree-content:hover {\n  background: inherit;\n}\n.tree-arrow {\n  flex-shrink: 0;\n  height: 30px;\n  cursor: pointer;\n  margin-left: 30px;\n  width: 0;\n}\n.tree-arrow.has-child {\n  margin-left: 0;\n  width: 30px;\n  position: relative;\n}\n.tree-arrow.has-child:after {\n  border: 1.5px solid #494646;\n  position: absolute;\n  border-left: 0;\n  border-top: 0;\n  left: 9px;\n  top: 50%;\n  height: 9px;\n  width: 9px;\n  transform: rotate(-45deg) translateY(-50%) translateX(0);\n  transition: transform 0.25s;\n  transform-origin: center;\n}\n.tree-arrow.has-child.rtl:after {\n  border: 1.5px solid #494646;\n  position: absolute;\n  border-right: 0;\n  border-bottom: 0;\n  right: 0px;\n  top: 50%;\n  height: 9px;\n  width: 9px;\n  transform: rotate(-45deg) translateY(-50%) translateX(0);\n  transition: transform 0.25s;\n  transform-origin: center;\n}\n.tree-arrow.expanded.has-child:after {\n  transform: rotate(45deg) translateY(-50%) translateX(-5px);\n}\n.tree-checkbox {\n  flex-shrink: 0;\n  position: relative;\n  width: 30px;\n  height: 30px;\n  box-sizing: border-box;\n  border: 1px solid #dadada;\n  border-radius: 2px;\n  background: #fff;\n  transition:\n    border-color 0.25s,\n    background-color 0.25s;\n}\n.tree-checkbox:after,\n.tree-arrow:after {\n  position: absolute;\n  display: block;\n  content: \"\";\n}\n.tree-checkbox.checked,\n.tree-checkbox.indeterminate {\n  background-color: #3a99fc;\n  border-color: #218eff;\n}\n.tree-checkbox.checked:after {\n  box-sizing: content-box;\n  border: 1.5px solid #fff; /* probably width would be rounded in most cases */\n  border-left: 0;\n  border-top: 0;\n  left: 9px;\n  top: 3px;\n  height: 15px;\n  width: 8px;\n  transform: rotate(45deg) scaleY(0);\n  transition: transform 0.25s;\n  transform-origin: center;\n}\n.tree-checkbox.checked:after {\n  transform: rotate(45deg) scaleY(1);\n}\n.tree-checkbox.indeterminate:after {\n  background-color: #fff;\n  top: 50%;\n  left: 20%;\n  right: 20%;\n  height: 2px;\n}\n.tree-anchor {\n  flex-grow: 2;\n  outline: none;\n  display: flex;\n  text-decoration: none;\n  color: #343434;\n  vertical-align: top;\n  margin-left: 3px;\n  line-height: 24px;\n  padding: 3px 6px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.tree-node.selected > .tree-content > .tree-anchor {\n  outline: none;\n}\n.tree-node.disabled > .tree-content > .tree-anchor {\n  color: #989191;\n  background: #fff;\n  opacity: 0.6;\n  cursor: default;\n  outline: none;\n}\n.tree-input {\n  display: block;\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  outline: none;\n  border: 1px solid #3498db;\n  padding: 0 4px;\n}\n.l-fade-enter-active,\n.l-fade-leave-active {\n  transition:\n    opacity 0.3s,\n    transform 0.3s;\n  transform: translateX(0);\n}\n.l-fade-enter,\n.l-fade-leave-to {\n  opacity: 0;\n  transform: translateX(-2em);\n}\n.tree--small .tree-anchor {\n  line-height: 19px;\n}\n.tree--small .tree-checkbox {\n  width: 23px;\n  height: 23px;\n}\n.tree--small .tree-arrow {\n  height: 23px;\n}\n.tree--small .tree-checkbox.checked:after {\n  left: 7px;\n  top: 3px;\n  height: 11px;\n  width: 5px;\n}\n.tree-node.has-child.loading > .tree-content > .tree-arrow,\n.tree-node.has-child.loading > .tree-content > .tree-arrow:after {\n  border-radius: 50%;\n  width: 15px;\n  height: 15px;\n  border: 0;\n}\n.tree-node.has-child.loading > .tree-content > .tree-arrow {\n  font-size: 3px;\n  position: relative;\n  border-top: 1.1em solid rgba(45, 45, 45, 0.2);\n  border-right: 1.1em solid rgba(45, 45, 45, 0.2);\n  border-bottom: 1.1em solid rgba(45, 45, 45, 0.2);\n  border-left: 1.1em solid #2d2d2d;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n  left: 5px;\n  -webkit-animation: loading 1.1s infinite linear;\n  animation: loading 1.1s infinite linear;\n  margin-right: 8px;\n}\n@-webkit-keyframes loading {\n0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n}\n}\n@keyframes loading {\n0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n}\n}\n";
styleInject(css_248z$2);

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

var TreeNode = {
  name: "Node",
  inject: ["tree"],
  props: ["node", "options"],
  emits: ["node:clicked"],

  components: {
    NodeContent: _sfc_main$3,
  },

  watch: {
    node: function node() {
      this.node.vm = this;
    },
  },

  data: function data() {
    this.node.vm = this;

    return {
      loading: false,
    };
  },

  computed: {
    padding: function padding() {
      return (
        this.node.depth *
          (this.options.paddingLeft
            ? this.options.paddingLeft
            : this.options.nodeIndent) +
        "px"
      );
    },

    nodeClass: function nodeClass() {
      var state = this.node.states;
      var hasChildren = this.hasChildren();
      var classes = {
        "has-child": hasChildren,
        expanded: hasChildren && state.expanded,
        selected: state.selected,
        disabled: state.disabled,
        matched: state.matched,
        dragging: state.dragging,
        loading: this.loading,
        draggable: state.draggable,
      };

      if (this.options.checkbox) {
        classes["checked"] = state.checked;
        classes["indeterminate"] = state.indeterminate;
      }

      return classes;
    },

    visibleChildren: function visibleChildren() {
      return this.node.children.filter(function (child) {
        return child && child.visible();
      });
    },
  },

  methods: {
    onNodeFocus: function onNodeFocus() {
      this.tree.activeElement = this.node;
    },

    focus: function focus() {
      this.$refs.anchor.focus();
      this.node.select();
    },

    check: function check() {
      if (this.node.checked()) {
        this.node.uncheck();
      } else {
        this.node.check();
      }
    },

    select: function select(ref) {
      if ( ref === void 0 ) ref = evnt;
      var ctrlKey = ref.ctrlKey;

      var opts = this.options;
      var tree = this.tree;
      var node = this.node;

      tree.$emit("node:clicked", node);

      if (opts.editing && node.isEditing) {
        return;
      }

      if (opts.editing && node.editable()) {
        return this.startEditing();
      }

      if (opts.checkbox && opts.checkOnSelect) {
        if (!opts.parentSelect && this.hasChildren()) {
          return this.toggleExpand();
        }

        return this.check(ctrlKey);
      }

      // 'parentSelect' behaviour.
      // For nodes which has a children list we have to expand/collapse
      if (!opts.parentSelect && this.hasChildren()) {
        this.toggleExpand();
      }

      if (opts.multiple) {
        if (!node.selected()) {
          node.select(ctrlKey);
        } else {
          if (ctrlKey) {
            node.unselect();
          } else {
            if (this.tree.selectedNodes.length != 1) {
              tree.unselectAll();
              node.select();
            }
          }
        }
      } else {
        if (node.selected() && ctrlKey) {
          node.unselect();
        } else {
          node.select();
        }
      }
    },

    toggleExpand: function toggleExpand() {
      if (this.hasChildren()) {
        this.node.toggleExpand();
      }
    },

    hasChildren: function hasChildren() {
      return this.node.hasChildren();
    },

    startEditing: function startEditing() {
      if (this.tree._editingNode) {
        this.tree._editingNode.stopEditing();
      }

      this.node.startEditing();
    },

    stopEditing: function stopEditing() {
      this.node.stopEditing();
    },

    handleMouseDown: function handleMouseDown(event) {
      if (!this.options.dnd) {
        return;
      }

      this.tree.vm.startDragging(this.node, event);
    },
  },
};

var _sfc_main$2 = TreeNode;

var _hoisted_1$1 = ["data-id"];
var _hoisted_2 = {
  key: 0,
  class: "tree-children"
};

function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_node_content = resolveComponent("node-content");
  var _component_node = resolveComponent("node");

  return (openBlock(), createElementBlock("li", {
    role: "treeitem",
    class: normalizeClass(["tree-node", _ctx.nodeClass]),
    "data-id": _ctx.node.id,
    onMousedown: _cache[5] || (_cache[5] = withModifiers(function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return (_ctx.handleMouseDown && _ctx.handleMouseDown.apply(_ctx, args));
  }, ["stop"]))
  }, [
    createElementVNode("div", {
      class: "tree-content",
      style: normalizeStyle([
        _ctx.options.direction == 'ltr'
          ? { 'padding-left': _ctx.padding }
          : { 'padding-right': _ctx.padding } ]),
      onClick: _cache[4] || (_cache[4] = withModifiers(function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return (_ctx.select && _ctx.select.apply(_ctx, args));
  }, ["stop"]))
    }, [
      createElementVNode("i", {
        class: normalizeClass(["tree-arrow", [
          {
            expanded: _ctx.node.states.expanded,
            'has-child': _ctx.node.children.length || _ctx.node.isBatch,
          },
          _ctx.options.direction ]]),
        onClick: _cache[0] || (_cache[0] = withModifiers(function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return (_ctx.toggleExpand && _ctx.toggleExpand.apply(_ctx, args));
  }, ["stop"]))
      }, null, 2 /* CLASS */),
      (_ctx.options.checkbox)
        ? (openBlock(), createElementBlock("i", {
            key: 0,
            class: normalizeClass(["tree-checkbox", {
          checked: _ctx.node.states.checked,
          indeterminate: _ctx.node.states.indeterminate,
        }]),
            onClick: _cache[1] || (_cache[1] = withModifiers(function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return (_ctx.check && _ctx.check.apply(_ctx, args));
  }, ["stop"]))
          }, null, 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      createElementVNode("span", {
        ref: "anchor",
        class: "tree-anchor",
        tabindex: "-1",
        onFocus: _cache[2] || (_cache[2] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return (_ctx.onNodeFocus && _ctx.onNodeFocus.apply(_ctx, args));
  }),
        onDblclick: _cache[3] || (_cache[3] = function ($event) { return (_ctx.tree.$emit('node:dblclick', _ctx.node)); })
      }, [
        createVNode(_component_node_content, { node: _ctx.node }, null, 8 /* PROPS */, ["node"])
      ], 544 /* NEED_HYDRATION, NEED_PATCH */)
    ], 4 /* STYLE */),
    createVNode(Transition, { name: "l-fade" }, {
      default: withCtx(function () { return [
        (_ctx.hasChildren() && _ctx.node.states.expanded)
          ? (openBlock(), createElementBlock("ul", _hoisted_2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.visibleChildren, function (child) {
                return (openBlock(), createBlock(_component_node, {
                  key: child.id,
                  node: child,
                  options: _ctx.options
                }, null, 8 /* PROPS */, ["node", "options"]))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          : createCommentVNode("v-if", true)
      ]; }),
      _: 1 /* STABLE */
    })
  ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1$1))
}
var TreeNode$1 = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$2]]);

var css_248z$1 = "\n.tree-dragnode {\n    padding: 10px;\n    border: 1px solid #e7eef7;\n    position: fixed;\n    border-radius: 8px;\n    background: #fff;\n    transform: translate(-50%, -110%);\n    z-index: 10;\n}\n";
styleInject(css_248z$1);

var _sfc_main$1 = {
    name: 'DragNode',
    props: ['target'],
    computed: {
      style: function style() {
        if (undefined === this.target.top) {
          return 'display: none'
        }

        return ("top: " + (this.target.top) + "px; left: " + (this.target.left) + "px")
      }
    }
  };

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: "tree-dragnode",
    style: normalizeStyle($options.style)
  }, toDisplayString($props.target.node.text), 5 /* TEXT, STYLE */))
}
var DraggableNode = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1]]);

function recurseDown (obj, fn) {
  var res;

  if (Array.isArray(obj)) {
    return obj.map(function (node) { return recurseDown(node, fn); })
  }

  res = fn(obj);

  // Recurse children
  if (res !== false && obj.children && obj.children.length) {
    res = recurseDown(obj.children, fn);
  }

  return res
}

function striptags (value) {
  // ssr fix
  if (!!document === false) {
    return value
  }

  if (!striptags.__element) {
    striptags.__element = document.createElement('div');
  }

  striptags.__element.innerHTML = value;
  return striptags.__element.innerText
}

function finder (criteria) {
  return function (node) {
    return Object.keys(criteria).every(function (key) {
      if (key === 'text' || key === 'id') {
        var c = criteria[key];
        var val = node[key];

        // remove html tags
        val = striptags(val);

        if (isRegExp(c)) {
          return c.test(val)
        } else {
          return c === val
        }
      }

      var states = criteria[key];

      // it is possible to pass 'states' or 'state'
      if (key === 'state') {
        key = 'states';
      }

      return Object.keys(states).every(function (s) { return node[key][s] === states[s]; })
    })
  }
}

function isRegExp (val) {
  return val instanceof RegExp
}

function getAllChildren (source) {
  var result = [];

  source.forEach(function collect (node) {
    result.push(node);

    if (node.children) {
      node.children.forEach(collect);
    }
  });

  return result
}

function find (source, criteria, deep) {
  if ( deep === void 0 ) deep = true;

  if (!source || !source.length || !criteria) {
    return null
  }

  if (deep) {
    source = getAllChildren(source);
  }

  // find by index
  if (typeof criteria === 'number') {
    return source[criteria] || null
  }

  if (typeof criteria === 'string' || criteria instanceof RegExp) {
    criteria = {
      text: criteria
    };
  }

  if (typeof criteria !== 'function') {
    criteria = finder(criteria);
  }

  var result = source.filter(criteria);

  if (result.length) {
    return result
  }

  return null
}

// it is not genuine GUIDs

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

function uuidV4 () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

function nodeIterator (context, method) {
  var args = [], len = arguments.length - 2;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

  context.forEach(function (node) { return node[method].apply(node, args); });
}

var Selection = /*@__PURE__*/(function (Array) {
  function Selection (tree, items) {
    var ref;

    if ( items === void 0 ) items = [];
    /*eslint semi: 0 */
    Array.call(this);

    this.tree = tree;
    (ref = this).push.apply(ref, items);
  }

  if ( Array ) Selection.__proto__ = Array;
  Selection.prototype = Object.create( Array && Array.prototype );
  Selection.prototype.constructor = Selection;

  Selection.prototype.remove = function remove () {
    nodeIterator(this, 'remove');
    return this
  };

  Selection.prototype.expand = function expand () {
    nodeIterator(this, 'expand');
    return this
  };

  Selection.prototype.collapse = function collapse () {
    nodeIterator(this, 'collapse');
    return this
  };

  Selection.prototype.select = function select (extendList) {
    nodeIterator(this, 'select', extendList);
    return this
  };

  Selection.prototype.unselect = function unselect () {
    nodeIterator(this, 'unselect');
    return this
  };

  Selection.prototype.check = function check () {
    if (this.tree.options.checkbox) {
      nodeIterator(this, 'check');
    }

    return this
  };

  Selection.prototype.uncheck = function uncheck () {
    if (this.tree.options.checkbox) {
      nodeIterator(this, 'uncheck');
    }

    return this
  };

  Selection.prototype.disable = function disable () {
    nodeIterator(this, 'disable');
    return this
  };

  Selection.prototype.enable = function enable () {
    nodeIterator(this, 'enable');
    return this
  };

  return Selection;
}(Array));

var Node = function Node(tree, item) {
  if (!item) {
    throw new Error("Node can not be empty");
  }

  this.id = item.id || uuidV4();
  this.states = item.state || {};

  this.showChildren = true;
  this.children = item.children || [];
  this.parent = item.parent || null;

  this.isBatch = item.isBatch || false;
  this.isEditing = false;

  this.data = Object.assign({}, item.data || {}, {
    text: item.text,
  });

  if (!tree) {
    throw new Error("Node must have a Tree context!");
  }

  this.tree = tree;
};

var prototypeAccessors = { key: { configurable: true },depth: { configurable: true },text: { configurable: true } };

Node.prototype.$emit = function $emit (evnt) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  (ref = this.tree).$emit.apply(ref, [ ("node:" + evnt), this ].concat( args ));
};

Node.prototype.getPath = function getPath () {
  if (!this.parent) {
    return [this];
  }

  var path = [this];
  var el = this;

  while ((el = el.parent) !== null) {
    path.push(el);
  }

  return path;
};

prototypeAccessors.key.get = function () {
  return this.id + this.text;
};

prototypeAccessors.depth.get = function () {
  var depth = 0;
  var parent = this.parent;

  if (!parent || this.showChildren === false) {
    return depth;
  }

  do {
    depth++;
  } while ((parent = parent.parent));

  return depth;
};

prototypeAccessors.text.get = function () {
  return this.data.text;
};

prototypeAccessors.text.set = function (text) {
  var oldText = this.text;

  if (oldText !== text) {
    this.data.text = text;
    this.$emit("text:changed", text, oldText);
  }
};

Node.prototype.setData = function setData (data) {
  this.data = Object.assign({}, this.data, data);

  this.$emit("data:changed", this.data);

  return this.data;
};

Node.prototype.state = function state (name, value) {
  if (undefined === value) {
    return this.states[name];
  }

  // TODO: check if it for example `selectable` state it should unselect node

  this.states[name] = value;

  return this;
};

Node.prototype.recurseUp = function recurseUp (fn, node) {
    if ( node === void 0 ) node = this;

  if (!node.parent) {
    return;
  }

  if (fn(node.parent) !== false) {
    return this.recurseUp(fn, node.parent);
  }
};

Node.prototype.recurseDown = function recurseDown$1 (fn, ignoreThis) {
  if (ignoreThis !== true) {
    fn(this);
  }

  if (this.hasChildren()) {
    recurseDown(this.children, fn);
  }
};

Node.prototype.refreshIndeterminateState = function refreshIndeterminateState () {
  if (!this.tree.options.autoCheckChildren) {
    return this;
  }

  this.state("indeterminate", false);

  if (this.hasChildren()) {
    var childrenCount = this.children.length;
    var checked = 0;
    var indeterminate = 0;
    var disabled = 0;

    this.children.forEach(function (child) {
      if (child.checked()) {
        checked++;
      }

      if (child.disabled()) {
        disabled++;
      }

      if (child.indeterminate()) {
        indeterminate++;
      }
    });

    if (checked > 0 && checked === childrenCount - disabled) {
      if (!this.checked()) {
        this.state("checked", true);
        this.tree.check(this);

        this.$emit("checked");
      }
    } else {
      if (this.checked()) {
        this.state("checked", false);
        this.tree.uncheck(this);

        this.$emit("unchecked");
      }

      this.state(
        "indeterminate",
        indeterminate > 0 || (checked > 0 && checked < childrenCount)
      );
    }
  }

  if (this.parent) {
    this.parent.refreshIndeterminateState();
  }
};

Node.prototype.indeterminate = function indeterminate () {
  return this.state("indeterminate");
};

Node.prototype.editable = function editable () {
  return !this.state("disabled") && this.state("editable");
};

Node.prototype.selectable = function selectable () {
  return !this.state("disabled") && this.state("selectable");
};

Node.prototype.selected = function selected () {
  return this.state("selected");
};

Node.prototype.select = function select (extendList) {
  if (!this.selectable() || this.selected()) {
    return this;
  }

  this.tree.select(this, extendList);

  this.state("selected", true);
  this.$emit("selected");

  return this;
};

Node.prototype.unselect = function unselect () {
  if (!this.selectable() || !this.selected()) {
    return this;
  }

  this.tree.unselect(this);

  this.state("selected", false);
  this.$emit("unselected");

  return this;
};

Node.prototype.checked = function checked () {
  return this.state("checked");
};

Node.prototype.check = function check () {
    var this$1$1 = this;

  if (this.checked() || this.disabled()) {
    return this;
  }

  if (this.indeterminate()) {
    return this.uncheck();
  }

  var checkDisabledChildren = this.tree.options.checkDisabledChildren;
  var targetNode = this;

  if (this.tree.options.autoCheckChildren) {
    this.recurseDown(function (node) {
      node.state("indeterminate", false);

      if (node.disabled() && !checkDisabledChildren) {
        return;
      }

      if (!node.checked()) {
        this$1$1.tree.check(node);

        node.state("checked", true);
        node.$emit(
          "checked",
          node.id === targetNode.id ? undefined : targetNode
        );
      }
    });

    if (this.parent) {
      this.parent.refreshIndeterminateState();
    }
  } else {
    this.tree.check(this);

    this.state("checked", true);
    this.$emit("checked");
  }

  return this;
};

Node.prototype.uncheck = function uncheck () {
    var this$1$1 = this;

  if ((!this.indeterminate() && !this.checked()) || this.disabled()) {
    return this;
  }

  var targetNode = this;

  if (this.tree.options.autoCheckChildren) {
    this.recurseDown(function (node) {
      node.state("indeterminate", false);

      if (node.checked()) {
        this$1$1.tree.uncheck(node);

        node.state("checked", false);
        node.$emit(
          "unchecked",
          node.id === targetNode.id ? undefined : targetNode
        );
      }
    });

    if (this.parent) {
      this.parent.refreshIndeterminateState();
    }
  } else {
    this.tree.uncheck(this);

    this.state("checked", false);
    this.$emit("unchecked");
  }

  return this;
};

Node.prototype.show = function show () {
  if (this.visible()) {
    return this;
  }

  this.state("visible", true);
  this.$emit("shown");

  return this;
};

Node.prototype.hide = function hide () {
  if (this.hidden()) {
    return this;
  }

  this.state("visible", false);
  this.$emit("hidden");

  return this;
};

Node.prototype.visible = function visible () {
  return this.state("visible");
};

Node.prototype.hidden = function hidden () {
  return !this.state("visible");
};

Node.prototype.enable = function enable () {
  if (this.enabled()) {
    return this;
  }

  if (this.tree.options.autoDisableChildren) {
    this.recurseDown(function (node) {
      if (node.disabled()) {
        node.state("disabled", false);
        node.$emit("enabled");
      }
    });
  } else {
    this.state("disabled", false);
    this.$emit("enabled");
  }

  return this;
};

Node.prototype.enabled = function enabled () {
  return !this.state("disabled");
};

Node.prototype.disable = function disable () {
  if (this.disabled()) {
    return this;
  }

  if (this.tree.options.autoDisableChildren) {
    this.recurseDown(function (node) {
      if (node.enabled()) {
        node.state("disabled", true);
        node.$emit("disabled");
      }
    });
  } else {
    this.state("disabled", true);
    this.$emit("disabled");
  }

  return this;
};

Node.prototype.disabled = function disabled () {
  return this.state("disabled");
};

Node.prototype.expandTop = function expandTop (ignoreEvent) {
    var this$1$1 = this;

  this.recurseUp(function (parent) {
    parent.state("expanded", true);

    if (ignoreEvent !== true) {
      this$1$1.$emit("expanded", parent);
    }
  });
};

Node.prototype.expand = function expand () {
    var this$1$1 = this;

  if (!this.canExpand()) {
    return this;
  }

  if (this.isBatch) {
    this.tree.loadChildren(this).then(function (_) {
      this$1$1.state("expanded", true);
      this$1$1.$emit("expanded");
    });
  } else {
    this.state("expanded", true);
    this.$emit("expanded");
  }

  return this;
};

Node.prototype.canExpand = function canExpand () {
  return (
    this.collapsed() && (!this.tree.autoDisableChildren || this.disabled())
  );
};

Node.prototype.canCollapse = function canCollapse () {
  return (
    this.expanded() && (!this.tree.autoDisableChildren || this.disabled())
  );
};

Node.prototype.expanded = function expanded () {
  return this.state("expanded");
};

Node.prototype.collapse = function collapse () {
  if (!this.canCollapse()) {
    return this;
  }

  this.state("expanded", false);
  this.$emit("collapsed");

  return this;
};

Node.prototype.collapsed = function collapsed () {
  return !this.state("expanded");
};

Node.prototype.toggleExpand = function toggleExpand () {
  return this._toggleOpenedState();
};

Node.prototype.toggleCollapse = function toggleCollapse () {
  return this._toggleOpenedState();
};

Node.prototype._toggleOpenedState = function _toggleOpenedState () {
  if (this.canCollapse()) {
    return this.collapse();
  } else if (this.canExpand()) {
    return this.expand();
  }
};

Node.prototype.isDropable = function isDropable () {
  return this.enabled() && this.state("dropable");
};

Node.prototype.isDraggable = function isDraggable () {
  return this.enabled() && this.state("draggable") && !this.isEditing;
};

Node.prototype.startDragging = function startDragging () {
  if (!this.isDraggable() || this.state("dragging")) {
    return false;
  }

  // root element
  if (this.isRoot() && this.tree.model.length === 1) {
    return false;
  }

  if (this.tree.options.store) {
    this.tree.__silence = true;
  }

  this.select();
  this.state("dragging", true);
  this.$emit("dragging:start");

  this.tree.__silence = false;

  return true;
};

Node.prototype.finishDragging = function finishDragging (destination, destinationPosition) {
  if (!destination.isDropable() && destinationPosition === "drag-on") {
    return;
  }

  var tree = this.tree;
  var clone = this.clone();
  var parent = this.parent;

  clone.id = this.id;
  tree.__silence = true;

  this.remove();

  if (destinationPosition === "drag-on") {
    tree.append(destination, clone);
  } else if (destinationPosition === "drag-below") {
    tree.after(destination, clone);
  } else if (destinationPosition === "drag-above") {
    tree.before(destination, clone);
  }

  destination.refreshIndeterminateState();

  parent && parent.refreshIndeterminateState();
  tree.__silence = false;

  clone.state("dragging", false);
  this.state("dragging", false);
  // need to call emit on the clone, because we need to have node.parent filled in the event listener
  clone.$emit("dragging:finish", destination, destinationPosition);

  if (clone.state("selected")) {
    tree.selectedNodes.remove(this);
    tree.selectedNodes.add(clone);

    this.state.selected = false;
    clone.state.selected = true;
    // tree.vm.$set(this.state, 'selected', false)
    // tree.vm.$set(clone.state, 'selected', true)
  }

  if (this.tree.options.store) {
    this.tree.vm.$emit("LIQUOR_NOISE");
  }
};

Node.prototype.startEditing = function startEditing () {
  if (this.disabled()) {
    return false;
  }

  if (!this.isEditing) {
    this.tree._editingNode = this;
    this.tree.activeElement = this;
    this.isEditing = true;
    this.$emit("editing:start");
  }
};

Node.prototype.stopEditing = function stopEditing (newText) {
  if (!this.isEditing) {
    return;
  }

  this.isEditing = false;
  this.tree._editingNode = null;
  this.tree.activeElement = null;

  var prevText = this.text;

  if (newText && newText !== false && this.text !== newText) {
    this.text = newText;
  }

  this.$emit("editing:stop", prevText);
};

Node.prototype.index = function index (verbose) {
  return this.tree.index(this, verbose);
};

Node.prototype.first = function first () {
  if (!this.hasChildren()) {
    return null;
  }

  return this.children[0];
};

Node.prototype.last = function last () {
  if (!this.hasChildren()) {
    return null;
  }

  return this.children[this.children.length - 1];
};

Node.prototype.next = function next () {
  return this.tree.nextNode(this);
};

Node.prototype.prev = function prev () {
  return this.tree.prevNode(this);
};

Node.prototype.insertAt = function insertAt (node, index) {
    var this$1$1 = this;
    if ( index === void 0 ) index = this.children.length;

  if (!node) {
    return;
  }

  node = this.tree.objectToNode(node);

  if (Array.isArray(node)) {
    node.reverse().map(function (n) { return this$1$1.insertAt(n, index); });

    return new Selection(this.tree, [].concat( node ));
  }

  node.parent = this;

  this.children.splice(index, 0, node);

  if (node.disabled() && node.hasChildren()) {
    node.recurseDown(function (child) {
      child.state("disabled", true);
    });
  }

  if (!this.isBatch) {
    this.$emit("added", node);
  }

  return node;
};

Node.prototype.addChild = function addChild (node) {
  return this.insertAt(node);
};

Node.prototype.append = function append (node) {
  return this.addChild(node);
};

Node.prototype.prepend = function prepend (node) {
  return this.insertAt(node, 0);
};

Node.prototype.before = function before (node) {
  return this.tree.before(this, node);
};

Node.prototype.after = function after (node) {
  return this.tree.after(this, node);
};

Node.prototype.empty = function empty () {
  var node;

  while ((node = this.children.pop())) {
    node.remove();
  }

  return this;
};

Node.prototype.remove = function remove () {
  return this.tree.removeNode(this);
};

Node.prototype.removeChild = function removeChild (criteria) {
  var node = this.find(criteria);

  if (node) {
    return this.tree.removeNode(node);
  }

  return null;
};

Node.prototype.find = function find$1 (criteria, deep) {
  if (this.tree.isNode(criteria)) {
    return criteria;
  }

  return find(this.children, criteria, deep);
};

Node.prototype.focus = function focus () {
  if (this.vm) {
    this.vm.focus();
  }
};

Node.prototype.hasChildren = function hasChildren () {
  return (this.showChildren && this.isBatch) || this.children.length > 0;
};

/**
 * Sometimes it's no need to have a parent. It possible to have more than 1 parent
 */
Node.prototype.isRoot = function isRoot () {
  return this.parent === null;
};

Node.prototype.clone = function clone () {
  return this.tree.objectToNode(this.toJSON());
};

Node.prototype.toJSON = function toJSON () {
    var this$1$1 = this;

  return {
    text: this.text,
    data: this.data,
    state: this.states,
    children: this.children.map(function (node) { return this$1$1.tree.objectToNode(node).toJSON(); }
    ),
  };
};

Object.defineProperties( Node.prototype, prototypeAccessors );

var EventBus = function EventBus() {
  this.events = {};
};

// Adiciona um ouvinte de evento
EventBus.prototype.on = function on (event, listener) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(listener);
};

// Remove um ouvinte de evento
EventBus.prototype.off = function off (event, listenerToRemove) {
  if (!this.events[event]) { return; }

  this.events[event] = this.events[event].filter(
    function (listener) { return listener !== listenerToRemove; }
  );
};

// Adiciona um ouvinte de evento que será chamado apenas uma vez
EventBus.prototype.once = function once (event, listener) {
    var this$1$1 = this;

  var wrapper = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    listener.apply(void 0, args);
    this$1$1.off(event, wrapper);
  };
  this.on(event, wrapper);
};

// Emite um evento
EventBus.prototype.emit = function emit (event) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  if (!this.events[event]) { return; }

  this.events[event].forEach(function (listener) { return listener.apply(void 0, args); });
};

// Alias para o método emit
EventBus.prototype.$emit = function $emit (event) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  (ref = this).emit.apply(ref, [ event ].concat( args ));
};

/**
* Default Node's states
*/
var nodeStates = {
  selected: false,
  selectable: true,
  checked: false,
  expanded: false,
  disabled: false,
  visible: true,
  indeterminate: false,
  matched: false,
  editable: true,
  dragging: false,
  draggable: true,
  dropable: true
};

function merge (state) {
  if ( state === void 0 ) state = {};

  return Object.assign({}, nodeStates, state)
}

function objectToNode (tree, obj) {
  var node = null;

  if (obj instanceof Node) {
    return obj
  }

  if (typeof obj === 'string') {
    node = new Node(tree, {
      text: obj,
      state: merge(),
      id: uuidV4()
    });
  } else if (Array.isArray(obj)) {
    return obj.map(function (o) { return objectToNode(tree, o); })
  } else {
    node = new Node(tree, obj);
    node.states = merge(node.states);

    if (!node.id) {
      node.id = uuidV4();
    }

    if (node.children.length) {
      node.children = node.children.map(function (child) {
        child = objectToNode(tree, child);
        child.parent = node;

        return child
      });
    }
  }

  return node
}

var List = /*@__PURE__*/(function (Array) {
  function List () {
    Array.apply(this, arguments);
  }

  if ( Array ) List.__proto__ = Array;
  List.prototype = Object.create( Array && Array.prototype );
  List.prototype.constructor = List;

  List.prototype.empty = function empty () {
    this.splice(0, this.length);

    return this
  };

  List.prototype.has = function has (item) {
    return this.includes(item)
  };

  List.prototype.add = function add () {
    var ref;

    var items = [], len = arguments.length;
    while ( len-- ) items[ len ] = arguments[ len ];
    (ref = this).push.apply(ref, items);

    return this
  };

  List.prototype.remove = function remove (item) {
    var index = this.indexOf(item);

    if (index === -1) {
      return this
    }

    this.splice(index, 1);

    return this
  };

  List.prototype.removeAll = function removeAll (item) {
    while (this.includes(item)) {
      this.remove(item);
    }

    return this
  };

  List.prototype.top = function top () {
    return this[this.length - 1]
  };

  return List;
}(Array));

/**
  Every Node has certain format:
  {
    id,           // Unique Node id. By default it generates using uuidV4
    text,         // Node text
    children,     // List of children. Each children has the same format
    parent,       // Parent Node or null. The tree is able to have more than 1 root node
    state,        // States of Node. Ex.: selected, checked and so on
    data          // Any types of data. It is similar to `storage`.
                  // Ex.: data: {myAwesomeProperty: 10}. To get this property you need: Node.data('myAwesomeProperty')
  }
*/

var defaultPropertyNames = {
  id: 'id',
  text: 'text',
  children: 'children',
  state: 'state',
  data: 'data',
  isBatch: 'isBatch'
};

function convertNames (obj, names) {
  return {
    id: obj[names.id],
    text: obj[names.text],
    children: obj[names.children],
    state: obj[names.state],
    data: obj[names.data],
    isBatch: obj[names.isBatch]
  }
}

var TreeParser = {
  parse: function parse (data, tree, options) {
    if ( options === void 0 ) options = {};

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    var p = Object.assign(
      {},
      defaultPropertyNames,
      options
    );

    var preparedItems = data.map(function converter (item) {
      var convertedItem = convertNames(item, p);

      // Possible to receive 1 child like a simple object. It must be converted to an array
      // We do not have checks on the correctness of the format. A developer should pass correct format
      if (convertedItem.children && !Array.isArray(convertedItem.children)) {
        convertedItem.children = [convertedItem.children];
      }

      if (convertedItem.children) {
        convertedItem.children = convertedItem.children.map(converter);
      }

      return convertedItem
    });

    return preparedItems.map(function (item) { return objectToNode(tree, item); })
  }
};

/*eslint no-undef: 0 */

function request (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function (_) {
      try {
        var response = JSON.parse(xhr.response);

        resolve(response);
      } catch (e) {
        reject(e);
      }
    });

    xhr.send(null);
  })
}

function get (url) {
  return request(url)
}

function createTemplate (template) {
  return function (source) {
    var re = /{([^}]+)}/;
    var m;
    var result = template;

    while (m = re.exec(result)) {
      result = result.replace(m[0], source[m[1]]);
    }

    return result
  }
}

function orderAsc (node0, node1) {
  if (node0.text < node1.text) {
    return -1
  }

  if (node0.text > node1.text) {
    return 1
  }

  return 0
}

function orderDesc (node0, node1) {
  if (node0.text < node1.text) {
    return 1
  }

  if (node0.text > node1.text) {
    return -1
  }

  return 0
}

function getCompareFunction (order) {
  switch (order.toLowerCase()) {
    case 'asc': return orderAsc
    case 'desc': return orderDesc
  }
}

function sort (source, compareFunction) {
  if (typeof compareFunction === 'string') {
    compareFunction = getCompareFunction(compareFunction);
  }

  if (Array.isArray(source) && typeof compareFunction === 'function') {
    source.sort(compareFunction);
  }
}

function fetchDelay (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  })
}

var Tree = function Tree(vm) {
  var this$1$1 = this;

  this.vm = vm;
  this.options = vm.opts;
  this.activeElement = null;
  this.emitter = new EventBus();
  // We have to convert 'fetchData' to function. It must return Promise always
  var fetchData = this.options.fetchData;

  if (typeof fetchData === "string") {
    this.options.fetchData = (function (template) {
      var urlTemplate = createTemplate(template);

      return function (node) {
        return get(urlTemplate(node)).catch(this$1$1.options.onFetchError);
      };
    })(fetchData);
  }
};

Tree.prototype.$on = function $on (name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  // this.vm.$on(name, ...args);
  (ref = this.emitter).on.apply(ref, [ name ].concat( args ));
  // console.log("era pra ter um on aqui");
};

Tree.prototype.$once = function $once (name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  // this.vm.$once(name, ...args);
  (ref = this.emitter).once.apply(ref, [ name ].concat( args ));
  // console.log("era pra ter um once aqui");
};

Tree.prototype.$off = function $off (name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  // this.vm.$off(name, ...args);
  (ref = this.emitter).off.apply(ref, [ name ].concat( args ));
  // console.log("era pra ter um off aqui");
};

Tree.prototype.$emit = function $emit (name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  if (this.__silence) {
    return;
  }

  // this.vm.$emit(name, ...args);
  (ref = this.emitter).$emit.apply(ref, [ name ].concat( args ));

  if (this.options.store) {
    // this.vm.$emit("LIQUOR_NOISE");
    this.emitter.$emit("LIQUOR_NOISE");
  }
};

Tree.prototype._sort = function _sort (source, compareFn, deep) {
  if (deep !== false) {
    this.recurseDown(source, function (node) {
      if (node.hasChildren()) {
        sort(node.children, compareFn);
      }
    });
  }

  sort(source, compareFn);
};

Tree.prototype.sortTree = function sortTree (compareFn, deep) {
  this._sort(this.model, compareFn, deep);
};

Tree.prototype.sort = function sort (query, compareFn, deep) {
    var this$1$1 = this;

  var targetNode = this.find(query, true);

  if (!targetNode || !compareFn) {
    return;
  }

  targetNode.forEach(function (node) {
    this$1$1._sort(node.children, compareFn, deep);
  });
};

Tree.prototype.clearFilter = function clearFilter () {
  this.recurseDown(function (node) {
    node.state("matched", false);
    node.state("visible", true);
    node.state("expanded", node.__expanded);

    node.__expanded = undefined;
    node.showChildren = true;
  });

  this.vm.matches.length = 0;
  this.vm.$emit("tree:filtered", [], "");
};

Tree.prototype.filter = function filter (query) {
  if (!query) {
    return this.clearFilter();
  }

  var matches = [];
  var predicate = this.options.filter.matcher;
  var ref = this.options.filter;
    var showChildren = ref.showChildren;
    var plainList = ref.plainList;

  // collect nodes
  this.recurseDown(function (node) {
    if (predicate(query, node)) {
      matches.push(node);
    }

    node.showChildren = true;

    // save prev `expanded` state
    if (undefined === node.__expanded) {
      node.__expanded = node.state("expanded");
    }

    node.state("visible", false);
    node.state("matched", false);
    node.state("expanded", true);
  });

  matches.reverse().forEach(function (node) {
    node.state("matched", true);
    node.state("visible", true);

    node.showChildren = !plainList;

    if (node.hasChildren()) {
      node.recurseDown(function (n) {
        n.state("visible", !!showChildren);
      }, true);
    }

    node.recurseUp(function (parent) {
      parent.state("visible", true);
      parent.state("expanded", true);
    });

    if (node.hasChildren()) {
      node.state("expanded", false);
    }
  });

  this.vm.matches = matches;

  this.vm.$emit("tree:filtered", matches, query);

  return matches;
};

Tree.prototype.selected = function selected () {
  return new (Function.prototype.bind.apply( Selection, [ null ].concat( [this], this.selectedNodes) ));
};

Tree.prototype.checked = function checked () {
  if (!this.options.checkbox) {
    return null;
  }

  return new (Function.prototype.bind.apply( Selection, [ null ].concat( [this], this.checkedNodes) ));
};

Tree.prototype.loadChildren = function loadChildren (node) {
    var this$1$1 = this;

  if (!node) {
    return;
  }

  this.$emit("tree:data:fetch", node);

  if (this.options.minFetchDelay > 0 && node.vm) {
    node.vm.loading = true;
  }

  var result = this.fetch(node).then(function (children) {
    node.append(children);
    node.isBatch = false;

    if (this$1$1.options.autoCheckChildren) {
      if (node.checked()) {
        node.recurseDown(function (child) {
          child.state("checked", true);
        });
      }

      node.refreshIndeterminateState();
    }

    this$1$1.$emit("tree:data:received", node);
  });

  return Promise.all([fetchDelay(this.options.minFetchDelay), result]).then(
    function (_) {
      if (node.vm) {
        node.vm.loading = false;
      }

      return result;
    }
  );
};

Tree.prototype.fetch = function fetch (node, parseData) {
    var this$1$1 = this;

  var result = this.options.fetchData(node);

  if (!result.then) {
    result = get(result).catch(this.options.onFetchError);
  }

  if (parseData === false) {
    return result;
  }

  return result
    .then(function (data) {
      try {
        return this$1$1.parse(data, this$1$1.options.modelParse);
      } catch (e) {
        throw new Error(e);
      }
    })
    .catch(this.options.onFetchError);
};

Tree.prototype.fetchInitData = function fetchInitData () {
  // simulate root node
  var node = {
    id: "root",
    name: "root",
  };

  return this.fetch(node, false);
};

Tree.prototype.setModel = function setModel (data) {
    var this$1$1 = this;

  return new Promise(function (resolve) {
    this$1$1.model = this$1$1.parse(data, this$1$1.options.modelParse);

    /* eslint-disable */
    requestAnimationFrame(function (_) {
      this$1$1.vm.model = this$1$1.model;
      resolve();
    });
    /* eslint-enable */

    /**
     * VueJS transform properties to reactives when constructor is running
     * And we lose List object (extended from Array)
     */
    this$1$1.selectedNodes = new List();
    this$1$1.checkedNodes = new List();

    recurseDown(this$1$1.model, function (node) {
      node.tree = this$1$1;

      if (node.selected()) {
        this$1$1.selectedNodes.add(node);
      }

      if (node.checked()) {
        this$1$1.checkedNodes.add(node);

        if (node.parent) {
          node.parent.refreshIndeterminateState();
        }
      }

      if (this$1$1.options.autoDisableChildren && node.disabled()) {
        node.recurseDown(function (child) {
          child.state("disabled", true);
        });
      }
    });

    if (!this$1$1.options.multiple && this$1$1.selectedNodes.length) {
      var top = this$1$1.selectedNodes.top();

      this$1$1.selectedNodes.forEach(function (node) {
        if (top !== node) {
          node.state("selected", false);
        }
      });

      this$1$1.selectedNodes.empty().add(top);
    }

    // Nodes can't be selected on init. By it's possible to select through API
    if (this$1$1.options.checkOnSelect && this$1$1.options.checkbox) {
      this$1$1.unselectAll();
    }
  });
};

Tree.prototype.recurseDown = function recurseDown$1 (node, fn) {
  if (!fn && node) {
    fn = node;
    node = this.model;
  }

  return recurseDown(node, fn);
};

Tree.prototype.select = function select (node, extendList) {
  var treeNode = this.getNode(node);

  if (!treeNode) {
    return false;
  }

  if (this.options.multiple && extendList) {
    this.selectedNodes.add(treeNode);
  } else {
    this.unselectAll();
    this.selectedNodes.empty().add(treeNode);
  }

  return true;
};

Tree.prototype.selectAll = function selectAll () {
    var this$1$1 = this;

  if (!this.options.multiple) {
    return false;
  }

  this.selectedNodes.empty();

  this.recurseDown(function (node) {
    this$1$1.selectedNodes.add(node.select(true));
  });

  return true;
};

Tree.prototype.unselect = function unselect (node) {
  var treeNode = this.getNode(node);

  if (!treeNode) {
    return false;
  }

  this.selectedNodes.remove(treeNode);

  return true;
};

Tree.prototype.unselectAll = function unselectAll () {
  var node;

  while ((node = this.selectedNodes.pop())) {
    node.unselect();
  }

  return true;
};

Tree.prototype.check = function check (node) {
  this.checkedNodes.add(node);
};

Tree.prototype.uncheck = function uncheck (node) {
  this.checkedNodes.remove(node);
};

Tree.prototype.checkAll = function checkAll () {
  this.recurseDown(function (node) {
    if (node.depth === 0) {
      if (node.indeterminate()) {
        node.state("indeterminate", false);
      }

      node.check();
    }
  });
};

Tree.prototype.uncheckAll = function uncheckAll () {
  var node;

  while ((node = this.checkedNodes.pop())) {
    node.uncheck();
  }

  return true;
};

Tree.prototype.expand = function expand (node) {
  if (node.expanded()) {
    return false;
  }

  node.expand();

  return true;
};

Tree.prototype.collapse = function collapse (node) {
  if (node.collapsed()) {
    return false;
  }

  node.collapse();

  return true;
};

Tree.prototype.toggleExpand = function toggleExpand (node) {
  if (!node.hasChildren()) {
    return false;
  }

  node.toggleExpand();

  return true;
};

Tree.prototype.toggleCollapse = function toggleCollapse (node) {
  if (!node.hasChildren()) {
    return false;
  }

  node.toggleCollapse();

  return true;
};

Tree.prototype.expandAll = function expandAll () {
  this.recurseDown(function (node) {
    if (node.hasChildren() && node.collapsed()) {
      node.expand();
    }
  });
};

Tree.prototype.collapseAll = function collapseAll () {
  this.recurseDown(function (node) {
    if (node.hasChildren() && node.expanded()) {
      node.collapse();
    }
  });
};

Tree.prototype.index = function index (node, verbose) {
  var target = node.parent;

  if (target) {
    target = target.children;
  } else {
    target = this.model;
  }

  var index = target.indexOf(node);

  if (verbose) {
    return {
      index: index,
      target: target,
      node: target[index],
    };
  }

  return index;
};

Tree.prototype.nextNode = function nextNode (node) {
  var ref = this.index(node, true);
    var target = ref.target;
    var index = ref.index;

  return target[index + 1] || null;
};

Tree.prototype.nextVisibleNode = function nextVisibleNode (node) {
  if (node.hasChildren() && node.expanded()) {
    return node.first();
  }

  var nextNode = this.nextNode(node);

  if (!nextNode && node.parent) {
    return node.parent.next();
  }

  return nextNode;
};

Tree.prototype.prevNode = function prevNode (node) {
  var ref = this.index(node, true);
    var target = ref.target;
    var index = ref.index;

  return target[index - 1] || null;
};

Tree.prototype.prevVisibleNode = function prevVisibleNode (node) {
  var prevNode = this.prevNode(node);

  if (!prevNode) {
    return node.parent;
  }

  if (prevNode.hasChildren() && prevNode.expanded()) {
    return prevNode.last();
  }

  return prevNode;
};

Tree.prototype.addToModel = function addToModel (node, index) {
    var this$1$1 = this;
    if ( index === void 0 ) index = this.model.length;

  node = this.objectToNode(node);

  this.model.splice(index, 0, node);
  this.recurseDown(node, function (n) {
    n.tree = this$1$1;
  });

  this.$emit("node:added", node);

  return node;
};

Tree.prototype.append = function append (criteria, node) {
  var targetNode = this.find(criteria);

  if (targetNode) {
    return targetNode.append(node);
  }

  return false;
};

Tree.prototype.prepend = function prepend (criteria, node) {
  var targetNode = this.find(criteria);

  if (targetNode) {
    return targetNode.prepend(node);
  }

  return false;
};

Tree.prototype.before = function before (targetNode, sourceNode) {
  targetNode = this.find(targetNode);

  var position = this.index(targetNode, true);
  var node = this.objectToNode(sourceNode);

  if (!~position.index) {
    return false;
  }

  position.target.splice(position.index, 0, node);

  node.parent = targetNode.parent;
  this.$emit("node:added", node);

  return node;
};

Tree.prototype.after = function after (targetNode, sourceNode) {
  targetNode = this.find(targetNode);

  var position = this.index(targetNode, true);
  var node = this.objectToNode(sourceNode);

  if (!~position.index) {
    return false;
  }

  position.target.splice(position.index + 1, 0, node);

  node.parent = targetNode.parent;
  this.$emit("node:added", node);

  return node;
};

Tree.prototype.addNode = function addNode (node) {
  var index = this.model.length;

  node = objectToNode(node);

  this.model.splice(index, 0, node);
  this.$emit("node:added", node);

  return node;
};

Tree.prototype.remove = function remove (criteria, multiple) {
  return this.removeNode(this.find(criteria, multiple));
};

Tree.prototype.removeNode = function removeNode (node) {
  if (node instanceof Selection) {
    return node.remove();
  }

  if (!node) {
    return false;
  }

  if (!node.parent) {
    if (~this.model.indexOf(node)) {
      this.model.splice(this.model.indexOf(node), 1);
    }
  } else {
    var children = node.parent.children;

    if (~children.indexOf(node)) {
      children.splice(children.indexOf(node), 1);
    }
  }

  if (node.parent) {
    if (node.parent.indeterminate() && !node.parent.hasChildren()) {
      node.parent.state("indeterminate", false);
    }
  }

  if (this.activeElement !== null) {
    if (node.id === this.activeElement.id) {
      this.activeElement = null;
    }
  }

  node.parent = null;

  this.$emit("node:removed", node);

  this.selectedNodes.remove(node);
  this.checkedNodes.remove(node);

  var matches = this.vm.matches;

  if (matches && matches.length) {
    if (matches.includes(node)) {
      matches.splice(matches.indexOf(node), 1);
    }
  }

  return node;
};

Tree.prototype.isNode = function isNode (node) {
  return node instanceof Node;
};

Tree.prototype.find = function find$1 (criteria, multiple) {
  if (this.isNode(criteria)) {
    return criteria;
  }

  var result = find(this.model, criteria);

  if (!result || !result.length) {
    return new Selection(this, []);
  }

  if (multiple === true) {
    return new Selection(this, result);
  }

  return new Selection(this, [result[0]]);
};

Tree.prototype.updateData = function updateData (criteria, callback) {
  var nodes = this.find(criteria);

  nodes.forEach(function (node) { return node.setData(callback(node)); });

  return nodes;
};

Tree.prototype.getNodeById = function getNodeById (id) {
  var targetNode = null;

  recurseDown(this.model, function (node) {
    if ("" + node.id === id) {
      targetNode = node;
      return false;
    }
  });

  return targetNode;
};

Tree.prototype.getNode = function getNode (node) {
  if (this.isNode(node)) {
    return node;
  }

  return null;
};

Tree.prototype.objectToNode = function objectToNode$1 (obj) {
  return objectToNode(this, obj);
};

Tree.prototype.parse = function parse (data, options) {
  if (!options) {
    options = this.options.propertyNames;
  }

  try {
    return TreeParser.parse(data, this, options);
  } catch (e) {
    return [];
  }
};

var keyCodes = {
  'ARROW_LEFT': 37,
  'ARROW_TOP': 38,
  'ARROW_RIGHT': 39,
  'ARROW_BOTTOM': 40,
  'SPACE': 32,
  'DELETE': 46,
  'ENTER': 13,
  'ESC': 27
};

var codesArr = [37, 38, 39, 40, 32];

function focusUp (tree, node) {
  var prevNode = tree.prevVisibleNode(node);

  if (!prevNode) {
    return
  }

  if (prevNode.disabled()) {
    return focusUp(tree, prevNode)
  }

  prevNode.focus();
}

function focusdDown (tree, node) {
  var nextNode = tree.nextVisibleNode(node);

  if (!nextNode) {
    return
  }

  if (nextNode.disabled()) {
    return focusdDown(tree, nextNode)
  }

  nextNode.focus();
}

function checkNode (tree, node) {
  if (!tree.options.checkbox) {
    return
  }

  if (node.checked()) {
    node.uncheck();
  } else {
    node.check();
  }
}

function leftArrow (tree, node) {
  if (node.expanded()) {
    node.collapse();
  } else {
    var parent = node.parent;

    if (parent) {
      parent.focus();
    }
  }
}

function rightArrow (tree, node) {
  if (node.collapsed()) {
    node.expand();
  } else {
    var first = node.first();

    if (first) {
      first.focus();
    }
  }
}

function deleteNode (tree, node) {
  var deletion = tree.options.deletion;

  if (deletion) {
    if (typeof deletion === 'function') {
      if (deletion(node) === true) {
        node.remove();
      }
    } else if (deletion === true) {
      node.remove();
    }
  }
}

function initKeyboardNavigation (tree) {
  var vm = tree.vm;
  var $el = vm.$el;

  $el.addEventListener('keydown', function (e) {
    var code = e.keyCode;
    var node = tree.activeElement;

    if (!tree.isNode(node)) {
      return
    }

    if (node.isEditing) {
      switch (code) {
        case keyCodes.ESC: return node.stopEditing(false)
      }
    } else {
      if (codesArr.includes(code)) {
        e.preventDefault();
        e.stopPropagation();
      }

      switch (code) {
        case keyCodes.ARROW_LEFT: return leftArrow(tree, node)
        case keyCodes.ARROW_RIGHT: return rightArrow(tree, node)
        case keyCodes.ARROW_TOP: return focusUp(tree, node)
        case keyCodes.ARROW_BOTTOM: return focusdDown(tree, node)
        case keyCodes.SPACE:
        case keyCodes.ENTER: return checkNode(tree, node)
        case keyCodes.DELETE: return deleteNode(tree, node)
      }
    }
  }, true);
}

function assert (truth, message) {
  if (truth === false) {
    throw new Error(message)
  }
}

function initEvents(vm) {
  var ref = vm.opts;
  var multiple = ref.multiple;
  var checkbox = ref.checkbox;
  var tree = vm.tree;

  var emitter = function (obj) {
    var selected = vm.selected();

    if (!checkbox) {
      vm.$emit("update:model-value", multiple ? selected : selected[0] || null);
    } else {
      vm.$emit("update:model-value", {
        selected: multiple ? selected : selected[0] || null,
        checked: vm.checked(),
      });
    }
  };

  emitter();

  tree.$on("node:selected", emitter);
  tree.$on("node:unselected", emitter);

  if (checkbox) {
    tree.$on("node:checked", emitter);
    tree.$on("node:unchecked", emitter);
  }

  tree.$on("node:added", function (targetNode, newNode) {
    var node = newNode || targetNode;

    if (checkbox) {
      if (node.state("checked") && !tree.checkedNodes.has(node)) {
        tree.checkedNodes.add(node);
      }

      node.refreshIndeterminateState();
    }

    if (node.state("selected") && !tree.selectedNodes.has(node)) {
      tree.select(node);
    }

    emitter();
  });
}

var TreeMixin = {
  emits: [
    "tree:mounted",
    "tree:filtered",
    "node:selected",
    "node:unselected",
    "node:checked",
    "node:unchecked",
    "node:added" ],
  mounted: function mounted() {
    var this$1$1 = this;

    var tree = new Tree(this);
    var dataProvider;

    this.tree = tree;
    // this._provided.tree = tree;

    if (!this.data && this.opts.fetchData) {
      // Get initial data if we don't have a data directly
      // In this case we call 'fetcher' with node.id == 'root' && node.name == 'root'
      dataProvider = tree.fetchInitData();
    } else if (this.data && this.data.then) {
      // Yeah... nice check!
      dataProvider = this.data;
      this.loading = true;
    } else {
      dataProvider = Promise.resolve(this.data);
    }

    dataProvider.then(function (data) {
      if (!data) {
        data = [];
      }

      if (this$1$1.opts.store) {
        this$1$1.connectStore(this$1$1.opts.store);
      } else {
        this$1$1.tree.setModel(data);
      }

      if (this$1$1.loading) {
        this$1$1.loading = false;
      }

      this$1$1.$emit("tree:mounted", this$1$1);

      initEvents(this$1$1);
    });

    if (this.opts.keyboardNavigation !== false) {
      initKeyboardNavigation(tree);
    }
  },

  methods: {
    connectStore: function connectStore(store) {
      var this$1$1 = this;

      var Store = store.store;
      var mutations = store.mutations;
      var getter = store.getter;
      var dispatcher = store.dispatcher;

      assert(typeof getter === "function", "`getter` must be a function");
      assert(
        typeof dispatcher === "function",
        "`dispatcher` must be a function"
      );

      if (undefined !== mutations) {
        assert(Array.isArray(mutations), "`mutations` must be an array");
      }

      Store.subscribe(function (action, state) {
        if (!mutations) {
          this$1$1.tree.setModel(getter());
        } else if (mutations.includes(action.type)) {
          this$1$1.tree.setModel(getter());
        }
      });

      this.tree.setModel(getter());

      this.tree.$on("LIQUOR_NOISE", function () {
        nextTick(function (_) {
          dispatcher(this$1$1.toJSON());
        });
      });
    },

    recurseDown: function recurseDown(fn) {
      this.tree.recurseDown(fn);
    },

    selected: function selected() {
      return this.tree.selected();
    },

    checked: function checked() {
      return this.tree.checked();
    },

    append: function append(criteria, node) {
      // append to model
      if (!node) {
        return this.tree.addToModel(criteria, this.tree.model.length);
      }

      return this.tree.append(criteria, node);
    },

    prepend: function prepend(criteria, node) {
      if (!node) {
        return this.tree.addToModel(criteria, 0);
      }

      return this.tree.prepend(criteria, node);
    },

    addChild: function addChild(criteria, node) {
      return this.append(criteria, node);
    },

    remove: function remove(criteria, multiple) {
      return this.tree.remove(criteria, multiple);
    },

    before: function before(criteria, node) {
      if (!node) {
        return this.prepend(criteria);
      }

      return this.tree.before(criteria, node);
    },

    after: function after(criteria, node) {
      if (!node) {
        return this.append(criteria);
      }

      return this.tree.after(criteria, node);
    },

    find: function find(criteria, multiple) {
      return this.tree.find(criteria, multiple);
    },

    findAll: function findAll(criteria) {
      return this.tree.find(criteria, true);
    },

    expandAll: function expandAll() {
      return this.tree.expandAll();
    },

    updateData: function updateData(criteria, callback) {
      return this.tree.updateData(criteria, callback);
    },

    collapseAll: function collapseAll() {
      return this.tree.collapseAll();
    },

    sortTree: function sortTree(compareFn, deep) {
      return this.tree.sortTree(compareFn, deep);
    },

    sort: function sort() {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      return (ref = this.tree).sort.apply(ref, args);
    },

    setModel: function setModel(data) {
      return this.tree.setModel(data);
    },

    getRootNode: function getRootNode() {
      return this.tree.model.length === 1
        ? this.tree.model[0]
        : this.tree.model;
    },

    toJSON: function toJSON() {
      return JSON.parse(JSON.stringify(this.model));
    },
  },

  /*eslint semi: 0 */
  /* https://github.com/vuejs/rollup-plugin-vue/issues/169 */
};

var DropPosition = {
  ABOVE: "drag-above",
  BELOW: "drag-below",
  ON: "drag-on",
};

function isMovingStarted(event, start) {
  return (
    Math.abs(event.clientX - start[0]) > 5 ||
    Math.abs(event.clientY - start[1]) > 5
  );
}

function composedPath(event) {
  var el = event.target;
  var path = [];

  while (el) {
    path.push(el);

    if (el.tagName === "HTML") {
      path.push(document);
      path.push(window);

      return path;
    }

    el = el.parentElement;
  }

  return path;
}

function getPath(event) {
  if (event.path) {
    return event.path;
  }

  if (event.composedPath) {
    return event.composedPath();
  }

  return composedPath(event);
}

function getSelectedNode(event) {
  var className;
  var i = 0;

  var path = getPath(event);

  for (; i < path.length; i++) {
    className = path[i].className || "";

    if (/tree-node/.test(className)) {
      return path[i];
    }
  }

  return null;
}

function getDropDestination(e) {
  var selectedNode = getSelectedNode(e);

  if (!selectedNode) {
    return null;
  }

  return selectedNode;
}

function updateHelperClasses(target, classes) {
  if (!target) {
    return;
  }

  var className = target.className;

  if (!classes) {
    for (var i in DropPosition) {
      className = className.replace(DropPosition[i], "");
    }

    className.replace("dragging", "");
  } else if (!new RegExp(classes).test(className)) {
    className += " " + classes;
  }

  target.className = className.replace(/\s+/g, " ");
}

function getDropPosition(e, element) {
  var coords = element.getBoundingClientRect();
  var nodeSection = coords.height / 3;

  var dropPosition = DropPosition.ON;

  if (coords.top + nodeSection >= e.clientY) {
    dropPosition = DropPosition.ABOVE;
  } else if (coords.top + nodeSection * 2 <= e.clientY) {
    dropPosition = DropPosition.BELOW;
  }

  return dropPosition;
}

function callDndCb(args, opts, method) {
  if (!opts || !opts[method] || typeof opts[method] !== "function") {
    return;
  }

  return opts[method].apply(opts, args) !== false;
}

function clearDropClasses(parent) {
  for (var key in DropPosition) {
    var el = parent.querySelectorAll(("." + (DropPosition[key])));

    for (var i = 0; i < el.length; i++) {
      updateHelperClasses(el[i]);
    }
  }
}

var TreeDnd = {
  methods: {
    onDragStart: function onDragStart(e) {
      e.preventDefault();
    },

    startDragging: function startDragging(node, event) {
      if (
        !node.isDraggable() ||
        callDndCb([node], this.tree.options.dnd, "onDragStart") === false
      ) {
        return;
      }

      this.$$startDragPosition = [event.clientX, event.clientY];
      this.$$possibleDragNode = node;

      this.initDragListeners();
    },

    initDragListeners: function initDragListeners() {
      var this$1$1 = this;

      var dropPosition;

      var removeListeners = function () {
        window.removeEventListener("mouseup", onMouseUp, true);
        window.removeEventListener("mousemove", onMouseMove, true);
      };

      var onMouseUp = function (e) {
        if (!this$1$1.$$startDragPosition) {
          e.stopPropagation();
        }

        if (this$1$1.draggableNode) {
          this$1$1.draggableNode.node.state("dragging", false);
        }

        if (
          this$1$1.$$dropDestination &&
          this$1$1.tree.isNode(this$1$1.$$dropDestination) &&
          this$1$1.$$dropDestination.vm
        ) {
          updateHelperClasses(this$1$1.$$dropDestination.vm.$el, null);

          var cbResult = callDndCb(
            [this$1$1.draggableNode.node, this$1$1.$$dropDestination, dropPosition],
            this$1$1.tree.options.dnd,
            "onDragFinish"
          );

          if (
            cbResult !== false &&
            !(
              (!this$1$1.$$dropDestination.isDropable() &&
                dropPosition === DropPosition.ON) ||
              !dropPosition
            )
          ) {
            this$1$1.draggableNode.node.finishDragging(
              this$1$1.$$dropDestination,
              dropPosition
            );
            this$1$1.draggableNode.node.parent = this$1$1.$$dropDestination;
          }

          this$1$1.$$dropDestination = null;
        }

        this$1$1.$$possibleDragNode = null;
        this$1$1.draggableNode = null;

        removeListeners();
      };

      var onMouseMove = function (e) {
        if (
          this$1$1.$$startDragPosition &&
          !isMovingStarted(e, this$1$1.$$startDragPosition)
        ) {
          return;
        } else {
          this$1$1.$$startDragPosition = null;
        }

        if (this$1$1.$$possibleDragNode) {
          if (this$1$1.$$possibleDragNode.startDragging() === false) {
            removeListeners();
            this$1$1.$$possibleDragNode = null;

            return;
          }

          this$1$1.draggableNode = {
            node: this$1$1.$$possibleDragNode,
            left: 0,
            top: 0,
          };
          this$1$1.$$possibleDragNode = null;
        }

        this$1$1.draggableNode.left = e.clientX;
        this$1$1.draggableNode.top = e.clientY;

        var dropDestination = getDropDestination(e);

        clearDropClasses(this$1$1.$el);

        if (dropDestination) {
          var dropDestinationId = dropDestination.getAttribute("data-id");

          if (this$1$1.draggableNode.node.id === dropDestinationId) {
            return;
          }

          if (
            !this$1$1.$$dropDestination ||
            this$1$1.$$dropDestination.id !== dropDestinationId
          ) {
            this$1$1.$$dropDestination = this$1$1.tree.getNodeById(dropDestinationId);
          }

          if (this$1$1.$$dropDestination && this$1$1.draggableNode.node) {
            var path = this$1$1.$$dropDestination.getPath();

            if (path.includes(this$1$1.draggableNode.node)) {
              this$1$1.$$dropDestination = null;
              return;
            }
          }

          dropPosition = getDropPosition(e, dropDestination);

          var cbResult = callDndCb(
            [this$1$1.draggableNode.node, this$1$1.$$dropDestination, dropPosition],
            this$1$1.tree.options.dnd,
            "onDragOn"
          );

          var isDropable =
            this$1$1.$$dropDestination.isDropable() && cbResult !== false;

          if (!isDropable && dropPosition === DropPosition.ON) {
            dropPosition = null;
          }

          updateHelperClasses(dropDestination, dropPosition);
        }
      };

      window.addEventListener("mouseup", onMouseUp, true);
      window.addEventListener("mousemove", onMouseMove, true);
    },
  },
};

var css_248z = "\n.tree {\n  overflow: auto;\n}\n.tree-root,\n.tree-children {\n  list-style: none;\n  padding: 0;\n}\n.tree > .tree-root,\n.tree > .tree-filter-empty {\n  padding: 3px;\n  box-sizing: border-box;\n}\n.tree.tree--draggable .tree-node:not(.selected) > .tree-content:hover {\n  background: transparent;\n}\n.drag-above,\n.drag-below,\n.drag-on {\n  position: relative;\n  z-index: 1;\n}\n.drag-on > .tree-content {\n  background: #fafcff;\n  outline: 1px solid #7baff2;\n}\n.drag-above > .tree-content::before,\n.drag-below > .tree-content::after {\n  display: block;\n  content: \"\";\n  position: absolute;\n  height: 8px;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  box-sizing: border-box;\n  background-color: #3367d6;\n  border: 3px solid #3367d6;\n  background-clip: padding-box;\n  border-bottom-color: transparent;\n  border-top-color: transparent;\n  border-radius: 0;\n}\n.drag-above > .tree-content::before {\n  top: 0;\n  transform: translateY(-50%);\n}\n.drag-below > .tree-content::after {\n  bottom: 0;\n  transform: translateY(50%);\n}\n";
styleInject(css_248z);

var defaults = {
  direction: "ltr",
  multiple: true,
  checkbox: false,
  checkOnSelect: false,
  autoCheckChildren: true,
  autoDisableChildren: true,
  checkDisabledChildren: true,
  parentSelect: false,
  keyboardNavigation: true,
  nodeIndent: 24,
  minFetchDelay: 0,
  fetchData: null,
  propertyNames: null,
  deletion: false,
  dnd: false,
  editing: false,
  onFetchError: function (err) {
    throw err;
  },
};

var filterDefaults = {
  emptyText: "Nothing found!",
  matcher: function matcher(query, node) {
    var isMatched = new RegExp(query, "i").test(node.text);

    if (isMatched) {
      if (node.parent && new RegExp(query, "i").test(node.parent.text)) {
        return false;
      }
    }

    return isMatched;
  },
  plainList: false,
  showChildren: true,
};

var _sfc_main = {
  name: "Tree",
  components: {
    TreeNode: TreeNode$1,
    DraggableNode: DraggableNode,
  },

  mixins: [TreeMixin, TreeDnd],

  provide: function provide() {
    var this$1$1 = this;

    return {
      tree: computed(function () { return this$1$1.tree; }),
    };
  },

  props: {
    data: {
      type: Object,
      default: function (_) { return ({}); },
    },

    options: {
      type: Object,
      default: function (_) { return ({}); },
    },

    filter: { type: String, default: "" },

    tag: {
      type: String,
      default: "div",
    },
    modelValue: {
      type: [Object, Array],
      default: undefined,
    },
  },
  emits: ["update:model-value"],
  data: function data() {
    // we should not mutating a prop directly...
    // that's why we have to create a new object
    // TODO: add method for changing options
    var opts = Object.assign({}, defaults, this.options);

    opts.filter = Object.assign({}, filterDefaults, opts.filter);

    return {
      model: [],
      tree: null,
      loading: false,
      opts: opts,
      matches: [],
      draggableNode: null,
    };
  },

  computed: {
    visibleModel: function visibleModel() {
      return this.model.filter(function (node) {
        return node && node.visible();
      });
    },
    visibleMatches: function visibleMatches() {
      return this.matches.filter(function (node) {
        return node && node.visible();
      });
    },
  },

  watch: {
    filter: function filter(term) {
      this.tree.filter(term);
    },
  },
};

var _hoisted_1 = ["innerHTML"];

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TreeNode = resolveComponent("TreeNode");
  var _component_DraggableNode = resolveComponent("DraggableNode");

  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    role: "tree",
    class: normalizeClass({
      tree: true,
      'tree-loading': $data.loading,
      'tree--draggable': !!$data.draggableNode,
    })
  }, {
    default: withCtx(function () { return [
      ($props.filter && $data.matches.length == 0)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "tree-filter-empty",
            innerHTML: $data.opts.filter.emptyText
          }, null, 8 /* PROPS */, _hoisted_1))
        : (openBlock(), createElementBlock("ul", {
            key: 1,
            class: "tree-root",
            onDragstart: _cache[0] || (_cache[0] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return (_ctx.onDragStart && _ctx.onDragStart.apply(_ctx, args));
      })
          }, [
            ($data.opts.filter.plainList && $data.matches.length > 0)
              ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($options.visibleMatches, function (node) {
                  return (openBlock(), createBlock(_component_TreeNode, {
                    key: node.id,
                    node: node,
                    options: $data.opts
                  }, null, 8 /* PROPS */, ["node", "options"]))
                }), 128 /* KEYED_FRAGMENT */))
              : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList($options.visibleModel, function (node) {
                  return (openBlock(), createBlock(_component_TreeNode, {
                    key: node.id,
                    node: node,
                    options: $data.opts
                  }, null, 8 /* PROPS */, ["node", "options"]))
                }), 128 /* KEYED_FRAGMENT */))
          ], 32 /* NEED_HYDRATION */)),
      ($data.draggableNode)
        ? (openBlock(), createBlock(_component_DraggableNode, {
            key: 2,
            target: $data.draggableNode
          }, null, 8 /* PROPS */, ["target"]))
        : createCommentVNode("v-if", true)
    ]; }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class"]))
}
var TreeRoot = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

var install = function (app) {
  app.component(TreeRoot.name, TreeRoot);
};

TreeRoot.install = install;

export { TreeRoot as default };
//# sourceMappingURL=liquor-tree.esm.js.map
