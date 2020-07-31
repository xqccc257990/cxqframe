<template>
  <div>
    <div v-if="item">
      <div>{{form}}</div>
      <el-switch v-if="item.type=='switch'"
                 v-model="form[item.key]"
                 :disabled="item.disabled"
                 active-color="#67C23A"
                 @change="onChangeSelect(item)"
                 inactive-color="#F56C6C"
                 :active-text="item.opt && item.opt.activeText ? item.opt.activeText : '启用'"
                 :inactive-text="item.opt && item.opt.inactiveText ? item.opt.inactiveText : '禁用'"></el-switch>
      <el-checkbox-group v-else-if="item.type=='checkbox'"
                         v-model="form[item.key]"
                         size="small">
        <el-checkbox v-for="it in item.opt.list"
                     :key="it.id"
                     :label="it.id"
                     border>{{it.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>

</template>

<script>
// mapState
import { mapMutations } from "vuex";
export default {
  name: "vInput",

  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      },
      required: true
    },

    type: {
      type: String,
      default: ""
    },
    required: false
  },
  data() {
    return {
      form: {},
      key: this.item
    };
  },

  watch: {
    //  'b.value':{//深度监听，可监听到对象、数组的变化
    //        handler(val, oldVal){
    //           console.log("b.value: "+val.value, oldVal.value);//但是这两个值打印出来却都是一样的
    //       },
    //  deep:true
    //  },
    form: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        // console.log("watch  form", this.form);
        this.setruleForm(this.form);
      },
      deep: true
      // immediate: true
    }
  },

  computed: {
    // placeholder(placeholder, label) {
    //   // ="type!='show'?(item.placeholder?item.placeholder:'请填写'+item.label):''"
    //   return this.type != "show" ? this.tempdata(placeholder, label) : "";
    // }
  },

  methods: {
    ...mapMutations({
      setruleForm(commit, form) {
        commit("setruleForm", form);
      }
    }),
    handlerDisabled(V) {
      return V ? true : false;
    },

    handlerClearable(V) {
      // return V ? true : false;
      return V ? false : true;
    },
    // handlerDisabled(disabled) {
    //   this.$store.commit("updateMainTabs", val);
    // },
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