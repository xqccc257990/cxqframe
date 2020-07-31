<template>
  <div>
    <div v-if="item">
      <div>{{form}}</div>

      <el-select v-if="item.selectType=='select-filterable'"
                 v-model="form[item.key]"
                 filterable
                 reserve-keyword
                 :filter-method="handlerFilterMethod(item)"
                 :remote-method="onSelectRemoteMethod"
                 :loading="item.opt.isLoading"
                 :disabled="item.disabled"
                 :placeholder="handlerPlaceholder(item.placeholder, item.label)"
                 :multiple="handlerMultiple(item.opt.multiple)"
                 @change="onChangeSelect(item)"
                 @focus="onSelectRemotefocus(item)">
        <el-option v-for="it in item.opt.list"
                   :key="it.value"
                   :label="it.label"
                   :value="it.value"></el-option>
      </el-select>

      <!-- <el-select
            v-else-if="item.type=='select'"
            v-model="form[item.key]"
            :placeholder="type!='show'?'请选择'+item.label:''"
            :disabled="item.disabled"
            @change="onChangeSelect(item)"
          >
            <el-option
              v-for="it in item.opt.list"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            ></el-option>
          </el-select> -->

      <el-select v-else-if="item.selectType=='select-remote'"
                 v-model="form[item.key]"
                 :multiple="handlerMultiple(item.opt.multiple)"
                 filterable
                 remote
                 reserve-keyword
                 :placeholder="handlerPlaceholder(item.placeholder, item.label)"
                 :remote-method="onSelectRemoteMethod"
                 :loading="item.opt.isLoading"
                 :disabled="item.disabled"
                 @change="onChangeSelect(item)"
                 @focus="onSelectRemotefocus(item)">
        <el-option v-for="it in item.opt.list"
                   :key="it.value"
                   :label="it.label"
                   :value="it.value"></el-option>
      </el-select>
      <!--
            select-remote-filterable
            例子：opt: {
              multiple: false,
              list: [],
              on(keyword, cb) {
                //获取焦点并且list是空数组以及会输入关键字自动调用
                _this.getCompanyList(keyword, cb);//具体获取下拉选项的ajax
              }
            }
            getCompanyList(keyword, cb) {
              cb([{label: '选项名称', value: '值'}]);
            }
          -->
      <el-select v-else-if="item.selectType=='select-remote-filterable'"
                 v-model="form[item.key]"
                 :multiple="handlerMultiple(item.opt.multiple)"
                 filterable
                 :filter-method="handleSelectRemoteFilterable(item)"
                 :placeholder="handlerPlaceholder(item.placeholder, item.label)"
                 :loading="item.opt.isLoading"
                 :disabled="item.disabled"
                 @change="handleSelectRemoteFilterableChange(item)"
                 @focus="handleSelectRemoteFilterableFocus(item)">
        <el-option v-for="it in item.opt.list"
                   :key="it.value"
                   :label="it.label"
                   :value="it.value">
          <span class="select-label">{{ it.label }}</span>
          <span class="select-subLabel">{{ it.subLabel || '' }}</span>
        </el-option>
      </el-select>
      <el-select v-else-if="item.selectType=='select-filter'"
                 v-model="form[item.key]"
                 filterable
                 :multiple="handlerMultiple(item.opt.multiple)"
                 :placeholder="handlerPlaceholder(item.placeholder, item.label)"
                 @change="handleSelectRemoteFilterableChange(item)">
        <el-option v-for="it in item.opt.list"
                   :key="it.value"
                   :label="it.label"
                   :value="it.value"></el-option>
      </el-select>

    </div>
  </div>

</template>

<script>
// mapState
import { mapMutations } from "vuex";
export default {
  name: "vSelect",

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
      form: {}
      // key: this.item
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

    onChangeSelect(item) {
      let _this = this;
      console.log("-------", item);
      // this.$props.opt.form.forEach(data => {
      //   if (data.opt && data.opt.parent && data.opt.parent == item.key) {
      //     _this.form[data.key] = "";
      //     data.disabled = false;
      //     if (data.type == "switch") {
      //       _this.form[data.key] = false;
      //     }
      //   }
      // });
      // if (item.opt && item.opt.change) {
      //   item.opt.change(
      //     _this.form[item.key],
      //     data => {
      //       item.opt.list = data;
      //     },
      //     _this.form
      //   );
      // }
    },
    //配合远程搜索多选下拉框回调确认item
    onSelectRemotefocus(item) {
      // let list = this.cache.getR("selectFilterable" + item.key);
      // if (!list) {
      //   let data = JSON.parse(JSON.stringify(item.opt.list));
      //   // this.cache.setR("selectFilterable" + item.key, data);
      // } else {
      //   item.opt.list = list;
      // }
      // this.cache.setR("selectRemoteItem", item);
    },
    //远程搜索多选下拉框回调
    onSelectRemoteMethod(query) {
      // let item = this.cache.getR("selectRemoteItem");
      if (item && item.opt && item.opt.on) {
        item.opt.on(query);
      }
    },
    //自定义搜索
    handlerFilterMethod(item) {
      var list = item.opt.list;
      return label => {
        console.log(item, label);
        var newarr = list.filter(item2 => {
          let a = item2.label.includes(label);
          if (a) {
            return item2;
          }
        });
        item.opt.list = newarr;
      };
    },
    //远程搜索选择框
    handleSelectRemoteFilterable(item) {
      return keyword => {
        if (item.opt.on) {
          item.opt.on(keyword, data => {
            this.handleSelectRemoteFilterableUtil(data, item);
          });
        }
      };
    },
    //远程搜索选择框获取焦点
    handleSelectRemoteFilterableFocus(item) {
      if (item.opt.list.length == 0 && item.opt.on) {
        item.opt.on("", data => {
          item.opt.list = data;
        });
      }
      if (item.opt.focus) {
        item.opt.focus(item.opt.list, data => {
          item.opt.list = data;
        });
      }
    },
    //远程搜索选择框值改变
    handleSelectRemoteFilterableChange(item) {
      if (item.opt && item.opt.change) {
        item.opt.change(
          this.form[item.key],
          data => {
            this.handleSelectRemoteFilterableUtil(data, item);
          },
          this.form
        );
      }
    },

    /**
     * handleSelectRemoteFilterable辅助方法
     */
    handleSelectRemoteFilterableUtil(data, item) {
      if (item.opt.multiple != false) {
        let mustList = [];
        for (let i = 0; i < this.form[item.key].length; i++) {
          const val = this.form[item.key][i];
          for (let j = 0; j < item.opt.list.length; j++) {
            const tag = item.opt.list[j];
            if (tag.value == val) {
              let is = true;
              for (let k = 0; k < data.length; k++) {
                const ele = data[k];
                if (ele.value == val) {
                  is = false;
                  break;
                }
              }
              if (is) {
                mustList.push(tag);
              }
              break;
            }
          }
        }
        item.opt.list = data.concat(mustList);
      } else {
        item.opt.list = data;
      }
    },

    handlerDisabled(V) {
      return V ? true : false;
    },

    handlerMultiple(V) {
      return V == false ? false : true;
    },
    handlerPlaceholder(placeholder, label) {
      //  :placeholder="type!='show'?'请输入关键词搜索':''"

      return this.type != "show"
        ? // ? placeholder
          //   ? placeholder
          //   : "请填写" + label
          // : "";

          "请输入关键词搜索"
        : "";
    }
  }
};
</script>

<style>
</style>