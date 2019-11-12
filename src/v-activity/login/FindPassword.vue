<template>
  <div class="app-find-password" :style="'background-image: url(\''+background+'\')'">
    <div class="app-find-password-title">
      neoBay
    </div>
    <div class="app-find-password-input">
      <div class="app-find-password-input-phone">
        <NbFormItem :formItem="phoneTest" v-model="user.phone"></NbFormItem>
        <div style="margin-top: 30px;padding-right: 30px;">
          <NbFormItem :formItem="phoneCodeTest"></NbFormItem>
        </div>
        <NbFormItem :formItem="passwordTest"></NbFormItem>
        <NbFormItem :formItem="repeatPasswordTest"></NbFormItem>
      </div>
    </div>
    <div class="app-find-password-content">
      <div class="app-find-password-button-no-word" @click="resetPassword" :class="(phoneTest.value || phoneCodeTest.value || passwordTest.value || repeatPasswordTest.value)?'app-find-password-button-has-word':''">
        {{$t('message.Submit')}}
      </div>
      <div class="return" :style="'background-image: url(\''+returnButton+'\')'" @click="$router.closeActivity()"></div>
    </div>
  </div>
</template>

<script>
  import NbForm from "../../components/widget/NbForm"
  import NbFormItem from "../../components/widget/NbFormItem";
  import FormItem from "../../common/model/_base/FormItem";
  import NbLoadingButton from "../../components/widget/NbLoadingButton"

  export default {
    data () {
      let passwordTest = new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "设置密码",false, true, "password", "user.password", null,{min: 6, placeholder: this.$t('message.InputYourPassword')}, null, this.$t('message.InputYourPassword'));
      let  phoneTest = new FormItem(FormItem.prototype.Type.INPUT, "手机号码",false, true, "phone", "user.phone", null,{min: 11, placeholder: this.$t('message.InputYourPhone')});
      return {
        user: this.$store.state.user,
        temps: this.$store.state.temps,
        background: require("../../assets/img/login/register.png"),
        returnButton: require("../../assets/img/login/return.png"),
        phoneValidation: this.$store.state.user.phoneValidation,
        // httpRegister: this.$store.state.user.getHttpRegister(),
        sss: "sss",
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
      resetPassword () {
        let that = this;
        let arr = [this.phoneTest, this.phoneCodeTest, this.passwordTest, this.repeatPasswordTest];
        if (FormItem.validateAll(arr)) {
          this.user.httpResetPassword(this.phoneTest.value, this.phoneCodeTest.value, this.repeatPasswordTest.value, function () {
            that.$router.closeActivity();
          });
        } else {
          that.$store.state.plus.nativeUI.toast(that.$t('message.IncorrectInformation'),{duration:"short"});
        }
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .app-find-password {
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow-y: scroll;
    .app-find-password-title {
      text-align: center;
      color: #FFFFFF;
      font-weight: bold;
      font-size: 35px;
      letter-spacing: 2px;
      padding-top: 80px;
      margin-bottom: 20px;
    }
    .app-find-password-input {
      padding: 0 0 0 30px;
      width: calc(100vw - 30px);
      overflow-x: hidden;
      .app-find-password-input-phone {
        overflow: hidden;
        input {
          color: #FFFFFF;
        }
      }
    }
    .app-find-password-content {
      padding: 0 30px;
      .app-find-password-button-no-word {
        background-color: #faf9f3;
        color: #666666;
        padding: 14px;
        margin-top: 20px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .app-find-password-button-has-word {
        background-color: rgba(255, 120, 0, 0.7);
        color: #ffffff;
        padding: 14px;
        margin-top: 20px;
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

