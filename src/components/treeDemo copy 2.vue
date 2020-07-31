<template>
  <div>
    <div>
      <k-tree :item="item"
              @treeLoadNode="treeLoadNode">
      </k-tree>
    </div>
  </div>
</template>

<script>
import kTree from "../components/k-tree";

export default {
  components: { kTree },
  data() {
    return {
      item: {
        list: [
          {
            label: "部门a-",
            pid: 0,
            id: 1,

            children: [
              {
                pid: 1,
                id: 2,
                label: "部门a--",
                children: [
                  {
                    pid: 2,
                    id: 3,
                    label: "部门a---",
                    children: [
                      {
                        pid: 3,
                        id: 4,
                        label: "部门a----"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: "部门b-",
            children: [
              {
                label: "部门b1--",
                children: [
                  {
                    label: "部门b1---"
                  }
                ]
              },
              {
                label: "部门b2--",
                children: [
                  {
                    label: "部门b2---"
                  }
                ]
              }
            ]
          }
        ],

        treeType: "lazy-leaf"
      }
    };
  },

  methods: {
    treeLoadNode(node, resolve) {
      console.log("treeLoadNode", node.data, resolve);

      // leaf: true
      if (node.level === 0) {
        return resolve([{ label: "aaaa" }, { label: "bbbb" }]);
      }
      if ((node.level = 1))
        return resolve([
          {
            label: "leaf",
            leaf: true
          },
          {
            label: "ccc"
          }
        ]);
    }
  }
};
</script>

<style>
</style>