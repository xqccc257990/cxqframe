<template>
  <div>
    <div v-if="item">
      <div>{{form}}</div>
      <el-tree v-if="!item.treeType"
               :data="item.list"
               :props="props"
               ref="tree"
               @node-click="handleNodeClick"></el-tree>
      <!-- 
      <el-tree v-if="item.treeType=='lazy-zones'"
               :props="itme.props"
               :load="loadNode"
               lazy
               show-checkbox
               @check-change="handleCheckChange">
      </el-tree> -->
      <!-- @check-change="handleCheckChange_leaf" -->

      <el-tree v-if="item.treeType=='lazy-leaf'"
               :props="props"
               :default-checked-keys="defaultCheckedKeys"
               :load="loadNode_leaf"
               lazy
               node-key="id"
               ref="tree"
               highlight-current
               show-checkbox>
      </el-tree>

    </div>
  </div>

</template>

<script>
// mapState
import { mapMutations } from "vuex";
export default {
  props: {
    defaultCheckedKeys: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    },

    item: {
      type: Object,
      default: function() {
        return {};
      },
      required: true
    },
    props: {
      type: Object,
      default: function() {
        return {
          label: "label",
          children: "children"
        };
      },
      required: false
    }
  },
  data() {
    return {
      form: {}
    };
  },

  computed: {
    ss() {
      var a;
      this.$nextTick(() => {
        a = this.$refs.tree.data;
      });

      return a;
    }
  },

  watch: {
    defaultChecked: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        // console.log("watch2222222222问问  w", this.defaultChecked);

        if (val) {
          this.$nextTick(() => {
            // this.$parent.d();

            console.log(
              "watch2222222222问问  w",
              this.ss,
              this.$refs.tree,
              this.defaultChecked
            );

            // this.$refs.tree.setCheckedNodes(this.defaultChecked);
          });
        }
      },
      // immediate: true,

      deep: true
    },
    form: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.setruleForm(this.form);
      },
      deep: true,
      immediate: true
    }
  },

  computed: {},

  methods: {
    ...mapMutations({
      setruleForm(commit, form) {
        commit("setruleForm", form);
      }
    }),

    //tree-动态加载节点 leaf

    loadNode_leaf(node, resolve) {
      this.$emit("treeLoadNode", node, resolve);
    },

    //tree-基础
    handleNodeClick(data) {
      console.log(data);
    },

    //tree -ref-共有
    getCheckedNodes() {
      console.log(
        "ee getCheckedNodesgetCheckedNodesgetCheckedNodes e",
        this.$refs.tree.getCheckedNodes()
      );

      // this.$emit("getCheckedNodes", this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log("ee getCheckedKeys e", this.$refs.tree.getCheckedKeys());

      //  this.$nextTick(() => {
      // this.$emit("getCheckedKeys", this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      console.log("ee setCheckedNodessetCheckedNodes e", this.$refs.tree);

      this.$refs.tree.setCheckedNodes([
        {
          pid: 1,
          id: 5,

          label: "部门a----",
          children: []
        }
      ]);

      // this.$emit("setCheckedNodes", this.$refs.tree.setCheckedNodes());
    },
    setCheckedKeys() {
      this.$emit("setCheckedKeys", this.$refs.tree.setCheckedKeys([5]));
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },

    //
    handlerPlaceholder(placeholder, label) {
      return this.type != "show"
        ? placeholder
          ? placeholder
          : "请填写" + label
        : "";
    }
  }
};
</script>

<style>
</style>