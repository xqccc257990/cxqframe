<template>
  <div>
    <div>
      <v-input :item="item"
               :type="type">
      </v-input>
    </div>
  </div>
</template>

<script>
import vInput from "../components/input";

export default {
  components: { vInput },
  data() {
    return {
      item: {
        // type: "password",
        // placeholder: "cxq",
        // placeholder: "",
        label: "姓名",
        maxlength: "10",
        key: "xmkey",
        disabled: ""
      },

      // item: {
      //   type: "password"
      // },
      // item: {
      //   type: "subTitle"
      // },
      // item: {
      //   type: "number"
      // },
      // item: {
      //   type: "link"
      // },

      type: ""
    };
  }
};
</script>

<style>
</style>