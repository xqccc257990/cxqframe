<template>
  <div>
    <div v-if="item">
      <div>{{form}}</div>
      <div class="table"
           v-if="item.type == 'table'">
        <el-row class="table__row table__header">
          <el-col v-for="it in item.opt.columns"
                  :key="it.key">{{it.label}}</el-col>
        </el-row>
        <i class="not_table__action el-icon-circle-plus"
           v-if="type!='show' && !item.opt.isDisabled && !form[item.key].length"
           @click="form[item.key].push(JSON.parse(JSON.stringify(item.opt.temp)))"></i>
        <el-form :model="form[item.key][index]"
                 :rules="item.rules"
                 ref="table_form"
                 :key="index"
                 v-for="(it, index) in form[item.key]">
          <el-row class="table__row">
            <el-col v-for="(i,k) in item.opt.columns"
                    :key="k">
              <el-form-item :prop="i.key">
                <input v-if="!i.type"
                       type="text"
                       :readonly="item.opt && item.opt.isDisabled"
                       :disabled="type!='show'?false:true"
                       v-model="form[item.key][index][i.key]"
                       clearable />
                <input v-else-if="i.type == 'number'"
                       type="number"
                       :max='i.max'
                       :readonly="item.opt && item.opt.isDisabled"
                       :disabled="type!='show'?false:true"
                       v-model.number="form[item.key][index][i.key]"
                       clearable />
                <el-input-number v-else-if="i.type == 'number-pro'"
                                 v-model="form[item.key][index][i.key]"
                                 :max="i.max?i.max:'Infinity'"
                                 :min="i.min!=undefined?i.min:'-Infinity'"
                                 :controls='false'
                                 size="mini">
                </el-input-number>
              </el-form-item>
            </el-col>
            <i class="table__action el-icon-remove"
               v-if="type!='show' && !item.opt.isDisabled"
               @click="form[item.key].splice(index, 1)"></i>
            <i class="table__action el-icon-circle-plus"
               v-if="type!='show' && !item.opt.isDisabled && index == form[item.key].length -1"
               @click="form[item.key].push(JSON.parse(JSON.stringify(item.opt.temp)))"></i>
          </el-row>
        </el-form>
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