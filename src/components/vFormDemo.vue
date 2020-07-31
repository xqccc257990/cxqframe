<template>
  <div>
    <div>
      <v-from :formItems="formdatas"
              :rules="rules"
              @submitForm="submit">
      </v-from>
    </div>
  </div>
</template>

<script>
import vFrom from "../components/form";

import { regTest, validatepassWord } from "@/utils/validatefun";
import { formRules } from "@/utils/validate";
import { isEmpty } from "@/utils/index";
import { mapState } from "vuex";

var validatePass = validatepassWord;

export default {
  components: { vFrom },

  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    var checkAge = (rule, value, callback) => {
      console.log("checkAge!!", this.z, this.ruleForm, value);

      if (!value) {
        return callback(new Error("年龄不能为22空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      formdatas: [
        {
          formType: "input",
          inputType: "password",
          // placeholder: "cxq",
          // placeholder: "",
          label: "密码",
          maxlength: "10",
          key: "pass",
          disabled: ""
        },
        {
          formType: "input",
          inputType: "password",
          label: "2密码",

          maxlength: "10",
          key: "checkPass",
          disabled: ""
        },
        {
          formType: "select",
          selectType: "select-filterable",
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
        }
      ],

      rules: {
        pass: [{ validator: validatePass, trigger: "blur", required: true }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        sysqxkey: [
          { required: true, message: "请选择bumen", trigger: "change" }
        ]
      }
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
    // ruleForm: {
    //   //深度监听，可监听到对象、数组的变化
    //   handler(val, oldVal) {
    //     console.log("watch  ruleForm", this.ruleForm);
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    submit(x) {
      console.log("submit222222", x);
    }
  }
};
</script>
<style>
</style>