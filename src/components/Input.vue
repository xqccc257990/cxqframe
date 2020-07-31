<template>
  <div>
    <div v-if="item">
      <div>{{form}}</div>
      <el-input v-if="!item.inputType"
                :disabled="handlerDisabled(item.disabled)"
                :clearable="handlerClearable(item.clearable)"
                v-model="form[item.key]"
                :placeholder="handlerPlaceholder(item.placeholder, item.label)"
                :maxlength="item.maxlength?item.maxlength:50"></el-input>
      <div v-else-if="item.type == 'subTitle'"
           class="form-item_subTitle">{{item.subLabel}}</div>
      <el-input type="textarea"
                v-else-if="item.inputType=='textarea'"
                v-model="form[item.key]"
                :disabled="handlerDisabled(item.disabled)"
                :rows="4"
                :maxlength="item.maxlength?item.maxlength:1000"
                :placeholder="handlerPlaceholder(item.placeholder, item.label)"
                show-word-limit
                :clearable="handlerClearable(item.clearable)"></el-input>

      <el-input-number v-else-if="item.inputType=='number'"
                       type="number"
                       :clearable="handlerClearable(item.clearable)"
                       v-model.number="form[item.key]"
                       :min="item.min != null ? item.min : 1"
                       :max="item.max != null ? item.max : 9999"
                       :label="item.label ? item.label : '描述文字'"
                       :placeholder="handlerPlaceholder(item.placeholder, item.label)"></el-input-number>
      <!-- @click="item.opt.callback(form)" -->

      <div v-else-if="item.inputType=='link'"
           :class="type == 'show' ? 'input-link' : ''">

        <el-input :disabled="handlerDisabled(item.disabled)"
                  type="text"
                  v-model="form[item.key]"
                  :placeholder="handlerPlaceholder(item.placeholder, item.label)"></el-input>
      </div>

      <el-input v-else-if="item.inputType=='password'"
                :disabled="handlerDisabled(item.disabled)"
                type="password"
                v-model="form[item.key]"
                :clearable="handlerClearable(item.clearable)"
                :placeholder="handlerPlaceholder(item.placeholder, item.label)"></el-input>
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