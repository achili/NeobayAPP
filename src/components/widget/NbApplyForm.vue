<template>
  <div class="nb-apply-form">
    <div>
      <div v-for="formItem in httpForm.form" :key="formItem.name" v-if="formItem.type !== FormItemType.HIDDEN" class="apply-form-item-style">
        <label :for="formItem.id" class="control-label mt5" v-if="formItem.showDescription">{{$t(formItem.description)}}</label>
        <div class="content">
          <NbApplyFormItem :formItem="formItem"></NbApplyFormItem>
        </div>
      </div>
    </div>

    <div>
      <NbLoadingButton :entity="httpForm" :callback="callback" :createClass="createClass"
                       :saveText="saveText" :createText="createText" :createIcon="createIcon" :saveIcon="saveIcon" v-if="display"></NbLoadingButton>
    </div>
  </div>
</template>

<script>
  import BaseEntity from "../../common/model/_base/BaseEntity";
  import Tank from "../../common/model/tank/Tank";
  import FormItem from "../../common/model/_base/FormItem";
  import HttpForm from "../../common/model/_base/HttpForm";
  import NbApplyFormItem from "./NbApplyFormItem";
  import NbLoadingButton from "./NbLoadingButton";
  import NbNumberInput from "./NbNumberInput";
  import NbTank from "./NbTank";

  export default {
    data() {
      return {
        FormItemType: FormItem.prototype.Type,
        baseEntity: new BaseEntity(),
        myNumber: "",
        tank: new Tank()
      }
    },
    props: {
      httpForm: {
        type: HttpForm,
        required: true
      },
      beforeSubmit: {
        type: Function,
        required: false,
        default: function () {
          return true;
        }
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      },
      createText: {
        type: String,
        required: false,
        "default": "创建"
      },
      createClass:{
        type: String,
        required: false,
        "default":"pull-right btn btn-success"
      },
      saveText: {
        type: String,
        required: false,
        "default": "保存"
      },
      createIcon:{
        type: String,
        required: false,
        "default":"fa fa-plus"
      },
      saveIcon:{
        type: String,
        required: false,
        "default":"fa fa-save"
      },
      display:{
        type:Boolean,
        required:false,
        "default":true
      }
    },
    components: {
      NbLoadingButton,
      NbNumberInput,
      NbTank,
      NbApplyFormItem
    },
    computed: {},
    methods: {
      callback() {
        if(this.beforeSubmit()) {
          this.httpForm.submit(this.successCallback, this.errorCallback);
        }

      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-apply-form {
    .apply-form-item-style{
      width: 100%;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      .control-label {
        font-weight: normal;
        font-size: 13px;
        color: #888;
        line-height: 55px;
        padding-left: 16px;
        min-width: 30%;
      }
      .content{
        width: 70%;
      }
    }
  }
</style>
