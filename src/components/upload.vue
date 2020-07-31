<template>
  <div>
    <div v-if="item">
      <div>{{form}}</div>
      <div v-if="item.type=='upload-img'">
        <el-upload :action="item.opt.url"
                   accept="image/*"
                   list-type="picture-card"
                   :auto-upload="false"
                   :limit="item.opt.limit?item.opt.limit:6"
                   :file-list="form[item.key]"
                   :http-request="item.opt.upload"
                   :before-upload="onBeforeUpload(item)"
                   :before-remove="onBeforeRemoveByUploadImg(item)"
                   :on-success="onSuccessByUploadImg(item)"
                   :on-preview="onPreviewByUploadImg"
                   :on-exceed="onExceed"
                   :disabled="isDisabled"
                   :class="{'upload-disabled': isDisabled}">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div v-else-if="item.type=='upload-img-form'">
        <el-upload accept="image/*"
                   list-type="picture-card"
                   :action="item.opt.url"
                   :file-list="form[item.key]"
                   :limit="item.opt.limit?item.opt.limit:6"
                   :on-preview="onPreviewByUploadImg"
                   :before-upload="onBeforeUpload(item)"
                   :name="item.opt.name ? item.opt.name: 'file'"
                   :before-remove="onBeforeRemoveByUploadImg(item)"
                   :on-success="onSuccessByFormUploadImg(item)"
                   :on-remove="onHandleRemove(item)"
                   :on-exceed="onExceed"
                   :disabled="isDisabled"
                   :class="{'upload-disabled': isDisabled}">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="img-upload-alt">{{item.opt.alt}}</div>
      </div>

      <el-upload v-else-if="item.type=='upload-file'"
                 :action="item.opt && item.opt.url ? item.opt.url : '#'"
                 :limit="item.opt.limit?item.opt.limit:6"
                 :file-list="form[item.key]"
                 :accept="item.opt && item.opt.accept ?  item.opt.accept : ''"
                 :multiple="item.opt.multiple?multiple:false"
                 :on-change="onChangeFile(item)"
                 :before-upload="item.opt.beforeUploadFile || (() => true)"
                 :on-success="onSuccessByFormUploadFile(item)"
                 :on-exceed="onExceed"
                 :on-remove="onHandleRemove(item)"
                 :before-remove="item.opt.remove">
        <el-button size="small"
                   type="primary">点击上传</el-button>
        <div slot="tip"
             class="el-upload__tip">{{item.opt.tip}}</div>
      </el-upload>
      <div v-else-if="item.type=='upload-img-only'">
        <div class="disabled-box"
             v-if="isDisabled"></div>
        <el-upload class="avatar-uploader"
                   accept="image/*"
                   list-type="picture-card"
                   :action="item.opt.url"
                   :file-list="form[item.key]"
                   :show-file-list="false"
                   :on-preview="onPreviewByUploadImg"
                   :before-upload="onBeforeUpload(item)"
                   :before-remove="onBeforeRemoveByUploadImg(item)"
                   :on-success="onSuccessByUploadImgOnly(item)"
                   :on-remove="onHandleRemove(item)"
                   :on-exceed="onExceed">
          <img v-if="form[item.key] && form[item.key].length"
               :src="item.opt.src?item.opt.src+form[item.key][0].url:form[item.key][0].url"
               class="avatar" />
          <i v-else
             class="el-icon-plus"></i>
        </el-upload>

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