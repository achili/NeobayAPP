<template>
  <div class="nb-apply-form-item">
    <div class="nb-interval" v-if="formItem.type === FormItemType.INTERVAL"></div>

    <div class="nb-input common-input" v-if="formItem.type === FormItemType.INPUT" :class="formItem.errorMsg? 'red-border': ''">
      <input :id="formItem.id" type="text" class="usual-style" v-model="formItem.value"  @blur="blur"
             @focus="emptyMsg" :placeholder="formItem.rule.placeholder" :readonly="formItem.rule.readonly">
      <div style="position: absolute;right: 0;top:0; margin: 16px 16px 0 0 ">
        <span class="danger-style" v-show="formItem.errorMsg">{{$t(formItem.errorMsg)}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.SELECT" class="nb-select-item" :class="formItem.errorMsg? 'red-border': ''">
      <el-select v-model="formItem.value" :placeholder="$t('message.PleaseSelect')" class="nb-select">
        <el-option
          v-for="item in formItem.rule.list"
          :key="item.name"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger" style="color: red"></i> <span class="text-danger" style="color: red">{{$t(formItem.errorMsg)}}</span>
      </div>
    </div>



    <div v-if="formItem.type === FormItemType.ADD_APPLY_USER" class="nb-add-apply-item">
      <div class="nb-add-apply" v-for="addApply in formItem.value" :key="addApply.index">
        <div class="nb-add-apply-name">
          <div class="nb-add-apply-text">{{$t('message.Applicant')}}</div>
          <div class="nb-add-apply-ipt">
            <input  type="text" class="usual-style" v-model="addApply.name"  @blur="blur"
                    @focus="emptyMsg" :placeholder="formItem.rule.placeholder" :readonly="formItem.rule.readonly">
          </div>
        </div>
        <div class="nb-add-apply-name">
          <div class="nb-add-apply-text">{{$t('message.ID')}}</div>
          <div class="nb-add-apply-ipt">
            <input  type="text" class="usual-style" v-model="addApply.idCard"  @blur="blur"
                    @focus="emptyMsg" :placeholder="formItem.rule.placeholder" :readonly="formItem.rule.readonly">
          </div>
        </div>
      </div>
      <div style="position: absolute;right: 0;top:0; margin: 16px 16px 0 0 ">
        <span class="danger-style" v-show="formItem.errorMsg">{{$t(formItem.errorMsg)}}</span>
      </div>
      <div class="add-apply-user-btn" @click.stop="addApplyUser">
        +
      </div>
    </div>
    <div v-if="formItem.type === FormItemType.DATE" class="nb-date-picker-item">
      <el-date-picker :id="formItem.id" v-model="formItem.value" type="date"
                      :editable="false"
                      :placeholder="formItem.rule.placeholder" class="nb-date-picker">
      </el-date-picker>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{$t(formItem.errorMsg)}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.CHECKBOX_ONE" class="nb-checkbox-one-item">
      <div v-for="checkItem in formItem.rule.list" :key="checkItem.val" class="nb-checkbox-one" v-if="!checkItem.now">
        <span style="color:#2587EC" >*</span>
        <label :for="checkItem.val" class="check-label">{{checkItem.name}}</label>
        <NbCheckbox :val="checkItem.val" v-model="formItem.value" :inputId="checkItem.val"></NbCheckbox>
      </div>
      <div v-for="checkItem in formItem.rule.list" :key="checkItem.val" class="nb-checkbox-one" v-if="checkItem.now">
        <NbCheckbox :val="checkItem.val" v-model="formItem.value" :inputId="checkItem.val"></NbCheckbox>
        <label :for="checkItem.val" class="check-label">{{checkItem.name}}</label>
      </div>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{$t(formItem.errorMsg)}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.CHECKBOX"
         :class="formItem.rule.title === '一号楼'?  'nb-checkbox-item-one':'nb-checkbox-item-two'">
      <div class="nb-checkbox-title">{{formItem.rule.title}}</div>
      <div v-for="checkItem in formItem.rule.list" :key="checkItem.val" class="nb-checkbox">
        <label :for="checkItem.val" class="check-label">{{checkItem.name}}</label>
        <NbCheckbox :val="checkItem.val" v-model="formItem.value" :inputId="checkItem.val"></NbCheckbox>
      </div>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{$t(formItem.errorMsg)}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import FormItem from "../../common/model/_base/FormItem";
  import NbNumberInput from "./NbNumberInput";
  import NbTank from "./NbTank";
  import NbRadio from "./NbRadio";
  import NbDateRange from "./NbDateRange";
  import NbCheckbox from "./NbCheckbox";
  import NbCaptcha from "./NbCaptcha";

  export default {
    data() {
      return {
        FormItemType: FormItem.prototype.Type,
        phoneValidation: this.$store.state.user.phoneValidation,
        toolTipClass:'company_code_toolTipClass',
        types: 'password',
        seePasswordShow: false,
        noSeePasswordShow: true,
        temps:this.$store.state.temps
      }
    },
    props: {
      formItem: {
        type: FormItem,
        required: true
      }
    },
    components: {
      NbTank,
      NbNumberInput,
      NbRadio,
      NbCaptcha,
      // NbEditor,
      // NbTanks,
      NbDateRange,
      // NbMap,
      NbCheckbox
    },
    computed: {},
    watch:{
      'formItem.value'(newVal,oldVal) {
        this.formItem.watch(newVal, oldVal);
      },
      'formItem.value.uuid'(newVal,oldVal) {
        this.formItem.watch(newVal, oldVal);
      }
    },
    methods: {
      blur(){
        this.formItem.validate();
      },
      emptyMsg() {
        this.formItem.errorMsg = null;
      },
      seePassword() {
        this.types = "password";
        this.seePasswordShow = false;
        this.noSeePasswordShow = true;
      },
      noSeePassword() {
        this.types = "text";
        this.noSeePasswordShow = false;
        this.seePasswordShow = true;
      },
      addApplyUser(){
        this.formItem.value.push({name:"",idCard:""});
      }
    },
    mounted() {
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .nb-apply-form-item {
    .nb-interval{
      width: 100vw;
      height: 10px;
      background-color: #f5f5f5;
    }
    .nb-input {
      width: 95%;
      position: relative;
      display: inline-block;
      padding: 12px 0 0 0;
      line-height: 30px;
      input {
        background: transparent;
        resize: none;
        outline: none;
        border: 0;
        width: 100%;
        font-size: 15px;
        padding-bottom: 16px;
      }
      :-ms-input-placeholder {
        color: #FFFFFF;
      }
      ::-webkit-input-placeholder {
        color: #FFFFFF;
      }
      .usual-style {
        width: 100%;
        resize: none;
        outline: none;
        font-size: 15px;
        border: 0;
        padding-bottom: 16px;
        letter-spacing: 1px;
      }

      .danger-style {
        color: #ff2347;
        font-size: 14px;
      }
    }
    .red-border {
      border-bottom: 1px solid #ff2347;
    }
    .nb-tank{
      width: 100%;
      display: inline-block;
    }
    .nb-select-item{
      width: 95%;
      display: inline-block;
      margin: 7px 0 0 0;
      .nb-select{
        width: 100%;
        .el-input__inner{
          border:none;
          padding-left: 0;
          margin-bottom: 10px;
        }
      }
    }
    .nb-checkbox-one-item{
      width: 100vw;
      .nb-checkbox-one{
        padding: 16px;
        font-size: 14px;
        .star{

        }
      }
    }
    .nb-radio-item{
      font-size: 15px;
      color: #323232;
    }
    .nb-add-apply-item{
      width: 100vw;
      padding-bottom: 20px;
      .nb-add-apply{
        .nb-add-apply-name{
          display: flex;
          border-bottom: 1px solid #f5f5f5;
          .nb-add-apply-text{
            font-weight: normal;
            font-size: 15px;
            color: #888;
            line-height: 55px;
            padding-left: 16px;
            width: 20%;
          }
          .nb-add-apply-ipt{
            width: 80%;
            .usual-style {
              width: 70%;
              resize: none;
              outline: none;
              font-size: 18px;
              border: 0;
              padding-bottom: 16px;
              letter-spacing: 1px;
              padding-top: 17px;
            }
          }
        }

      }
      .add-apply-user-btn{
        font-size: 55px;
        color: #fff;
        background-color: #f0f0f0;
        display: inline-block;
        width: 45px;
        height: 45px;
        text-align: center;
        line-height: 35px;
        margin: 20px 0 0 16px;
      }
    }
    .nb-date-picker-item{
      margin-top: 7px;
      .nb-date-picker{
        width: 100%;
        .el-input__prefix{
          display: none;
        }
        .el-input__inner{
          border:none;
          padding-left: 0;
          margin-bottom: 0;
        }
        .el-input__suffix{
          margin-right: 10px;
        }
      }

    }
    .nb-checkbox-item-one{
      font-size: 14px;
      .nb-checkbox-title{
        display: inline-block;
        float: left;
        line-height: 55px;
      }
      .nb-checkbox{
        float: left;
        margin-left: 10px;
        .check-label{
          font-size: 14px;
          line-height: 55px;
        }
      }
      .mt2{
        color: #ff2347;
        float: left;
        margin-top: 10px;
      }
    }
    .nb-checkbox-item-two{
      width: 100%;
      font-size: 14px;
      margin-left: 25%;
      padding-left: 16px;
      .nb-checkbox-title{
        float: left;
        margin-left: 10px;
        line-height: 55px;
      }
      .nb-checkbox{
        float: left;
        margin-left: 10px;
        .check-label{
          font-size: 14px;
          line-height: 55px;
        }

      }
      .mt2{
        float: left;
        margin-top: 10px;
      }
    }
    .common-input {
      color: #000000;
    }
  }
  .el-tooltip__popper{
    width: 210px;
    font-size: 16px;
    color: rgb(102, 102, 102);
  }

</style>

