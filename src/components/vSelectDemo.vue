<template>
  <div>
    <div>
      <v-select :item="item"
                :type="type">
      </v-select>
    </div>
  </div>
</template>

<script>
import vSelect from "../components/select";

export default {
  components: { vSelect },
  data() {
    return {
      item: {
        type: "select-filterable",
        label: "权限",
        key: "sysqxkey",
        // disabled: ,
        // placeholder: "3",
        // ？

        opt: {
          // isLoading: true,
          multiple: true,
          list: [
            {
              value: "v1",
              label: "1部门a"
            },
            {
              value: "v2",
              label: "11部门b"
            },
            {
              value: "v3",
              label: "部门c"
            }
          ]
        }
      },

      type: "",

      value: ""
    };
  }
};
</script>

<style>
</style>