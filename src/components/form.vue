<template>
  <div>
    <div>
      <div>{{ruleForm}}</div>
      <!-- class="demo-ruleForm" -->
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px">

        <!-- <div> -->
        <!-- autocomplete="off" -->
        <!-- :class="{'item-box-50': item.isCol50, 'item-box-33': item.isCol33, 'item-box-def': !item.isCol50&&item.isCol33, 'item-hidden': item.isHidden}" -->

        <div v-for="item in formItems"
             :key="item.key">

          <!-- :prop="item.type != 'table' ? item.key : null" -->

          <el-form-item :label="item.label"
                        :prop="item.key">

            <v-input v-if="item.formType==
                      'input'"
                     :item="item"
                     :type="type">
            </v-input>
            <div class
                 v-else-if="item.formType == 'slot'">
              <slot :name="item.opt.slotName"></slot>
            </div>
            <v-select v-if="item.formType==
                      'select'"
                      :item="item"
                      :type="type">
            </v-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import vInput from "../components/input";
import { mapState } from "vuex";

import vSelect from "../components/select";

export default {
  components: { vInput, vSelect },
  name: "vForm",

  props: {
    formItems: {
      type: Array,
      default: function() {
        return [];
      },
      required: true
    },
    rules: {
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
    required: true
  },
  // 111111adsS

  data() {
    return {
      // type: "",
    };
  },
  computed: {
    ...mapState({
      ruleForm(state) {
        return state.temdata.ruleForm;
      }
    })
  },

  watch: {
    ruleForm: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        console.log("watch  ruleForm", this.ruleForm);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!-----");
          this.$emit("submitForm", this.ruleForm);
        } else {
          console.log(
            "error submit!------!",
            this.ruleForm,
            this.$refs[formName],
            this.$refs.ruleForm
          );

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>