<template>
  <div class="app-edit" :style="'background-image: url(\''+background+'\')'">
    <div class="app-edit-title">
      neoBay
    </div>
    <div class="app-edit-input">
      <div class="app-edit-input-phone">
        <NbFormItem :formItem="phoneTest" v-model="user.phone"></NbFormItem>
        <div style="margin-top: 30px;padding-right: 30px;">
          <NbFormItem :formItem="phoneCodeTest"></NbFormItem>
        </div>
        <NbFormItem :formItem="passwordTest"></NbFormItem>
        <NbFormItem :formItem="repeatPasswordTest"></NbFormItem>
      </div>
    </div>

    <div class="app-edit-content">
      <div class="app-edit-button-no-word" @click="nextStep(phoneTest,phoneCodeTest,passwordTest,repeatPasswordTest)"
           :class="(phoneTest.value && phoneCodeTest.value && passwordTest.value && repeatPasswordTest.value)?'app-edit-button-has-word':''">
        {{$t('message.NextStep')}}
      </div>
      <div class="return" :style="'background-image: url(\''+returnButton+'\')'" @click="$router.closeActivity()"></div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery"
  import {startWith} from "../../common/filter/str";
  import NbForm from "../../components/widget/NbForm"
  import NbFormItem from "../../components/widget/NbFormItem";
  import FormItem from "../../common/model/_base/FormItem";
  import NbLoadingButton from "../../components/widget/NbLoadingButton"

  export default {
    data () {
      let  phoneTest = new FormItem(FormItem.prototype.Type.HTTP_VERIFY_PHONE, "手机号码",false, true, "phone", "user.phone", null,{min: 11, placeholder: this.$t('message.InputYourPhone')});
      let passwordTest = new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "设置密码",false, true, "password", "user.password", null,{min: 6, placeholder: this.$t('message.InputYourPassword')}, null, this.$t('message.InputYourPassword'));
      return {
        user: this.$store.state.user,
        phoneValidation: this.$store.state.user.phoneValidation,
        // httpRegister: this.$store.state.user.getHttpRegister(),
        sss: "sss",
        loginFail: false,
        background: require("../../assets/img/login/register.png"),
        returnButton: require("../../assets/img/login/return.png"),
        phoneTest: phoneTest,
        passwordTest: passwordTest,
        phoneCodeTest: new FormItem(FormItem.prototype.Type.VALIDATION, "验证码",false, true, "phoneCode", "user.phoneCode", null,{placeholder: this.$t('message.InputCode'), phone: phoneTest}),
        repeatPasswordTest: new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "确认密码",false, true, "repeatPassword",  "user.repeatPassword", null, {max: 100, placeholder: this.$t('message.ConfirmPassword'), equal: passwordTest}, null, this.$t('message.ConfirmPassword'))
      }
    },
    beforeCreate() {
    },
    props: {},
    watch: {},
    computed: {},
    components: {
      NbForm,
      NbFormItem,
      NbLoadingButton
    },
    methods: {
      nextStep(phone,phoneCode,password,repeatPassword){
        let arr = [this.phoneTest, this.phoneCodeTest, this.passwordTest, this.repeatPasswordTest];
        if(FormItem.validateAll(arr)){
          this.$router.openActivity('register','slide-left',{phone: phone.value,phoneCode: phoneCode.value,password: repeatPassword.value})
        }
      },
      register () {
        let that = this;
        if (!this.phoneTest.value || !this.phoneCodeTest.value || !this.passwordTest.value || !this.repeatPasswordTest.value) {
          that.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'),{duration:"short"});
        } else {
          this.user.httpRegister(this.phoneTest.value, this.phoneCodeTest.value, this.repeatPasswordTest.value, function (response) {
            that.$store.state.plus.nativeUI.toast(that.$t('message.RegisterSuccess'),{duration:"short"});
            that.user.httpAppLogin(that.phoneTest.value, that.repeatPasswordTest.value,function (response) {
              that.loginFail = false;
              //登录成功后更新一下用户信息
              that.user.innerLogin(response);
              that.user.avatar.keepLocal(50, 50);
              that.user.avatar.keepLocal(80, 80);
              that.user.avatar.keepLocal(100, 100);
              that.user.avatar.keepLocal(160, 160);
              that.user.avatar.keepLocal(220, 220);
            });
            that.$router.openActivity('edit');
          });
        }
      },
      software(){
        this.$router.openActivity('software_license');
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .app-edit {
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow-y: scroll;
    .app-edit-title {
      text-align: center;
      color: #FFFFFF;
      font-weight: bold;
      font-size: 35px;
      letter-spacing: 2px;
      padding-top: 80px;
      margin-bottom: 20px;
    }
    .app-edit-input {
      padding: 0 0 0 30px;
      width: calc(100vw - 30px);
      overflow-x: hidden;
      .app-edit-input-phone {
        overflow: hidden;
        input {
          color: #FFFFFF;
        }
      }
    }
    .app-edit-content {
      padding: 0 30px;
      .app-edit-button-no-word {
        background-color: #faf9f3;
        color: #666666;
        padding: 14px;
        margin-top: 40px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .app-edit-button-has-word {
        background-color: rgba(255, 120, 0, 0.7);
        color: #ffffff;
        padding: 14px;
        margin-top: 40px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .return {
        width: 60px;
        margin: 40px auto 20px;
        height: 60px;
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>

