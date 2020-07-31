<template>
  <div>
    <div v-if="item">
      <div>{{form}}</div>
      <el-cascader v-if="item.type=='cascader'"
                   :options="item.opt.list"
                   :props="item.opt.props"
                   :separator="'/'"
                   v-model="form[item.key]"></el-cascader>
      <el-date-picker v-else-if="item.type=='date-time'"
                      v-model="form[item.key]"
                      type="datetime"
                      :disabled="item.disabled"
                      :placeholder="type!='show'?'请选择'+item.label:''"></el-date-picker>
      <el-time-picker v-model="form[item.key]"
                      v-else-if="item.type=='time'"
                      :disabled="item.disabled"
                      :value-format="item.opt && item.opt.format ? item.opt.format  : 'HH:mm:ss'"
                      :format="item.opt && item.opt.format ? item.opt.format  : 'HH:mm:ss'"
                      @change="onChangeTime(item, form[item.key])"
                      :picker-options="{
              selectableRange:  item.opt && item.opt.min && item.opt.max ? `${item.opt.min} - ${item.opt.max}` : ''
            }"></el-time-picker>
      <el-time-picker v-model="form[item.key]"
                      v-else-if="item.type=='range-time'"
                      range-separator="至"
                      is-range
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                      @change="item.opt && item.opt.change ? item.opt.change(form[item.key]) : null"
                      :value-format="item.opt && item.opt.format ? item.opt.format : 'HH:mm:ss'"
                      :format="item.opt && item.opt.format ? item.opt.format : 'HH:mm:ss'"></el-time-picker>
      <el-date-picker v-else-if="item.type=='range-date'"
                      v-model="form[item.key]"
                      type="daterange"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-date-picker v-else-if="item.type=='datetimerange'"
                      v-model="form[item.key]"
                      type="datetimerange"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options='{disabledDate: onDatetimerangeDisabledDate(item)}'>
      </el-date-picker>
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