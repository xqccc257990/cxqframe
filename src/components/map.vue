<template>
  <div>
    <div v-if="item">
      <div>{{form}}</div>
      <div class="map"
           v-if="item.type == 'map'">
        <div class="map-container"
             :ref="item.key"></div>
      </div>
      <div class="map-util"
           v-else-if="item.type == 'mapUtil'">
        <div class="map-container"
             :ref="item.key"></div>
        <el-input :disabled="item.disabled?true:false"
                  v-model="form[item.key]"
                  clearable
                  :placeholder="type!='show'?(item.placeholder?item.placeholder:'请选择'+item.label):''"
                  :maxlength="item.maxlength?item.maxlength:50"></el-input>
      </div>
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