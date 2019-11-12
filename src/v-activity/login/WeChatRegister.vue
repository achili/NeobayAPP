<template>
  <div class="weChat-register-page" :style="'background-image: url(\''+background+'\')'">
    <div class="register-page-title">
      完善信息
    </div>
    <div class="register-page-description">
      如果您是第一次微信登录，请完善一下个人信息。
    </div>
    <div class="app-register-input">
      <div class="app-register-input-phone">
        <NbFormItem :formItem="phoneTest"></NbFormItem>
        <div style="margin-top: 30px;">
          <NbFormItem :formItem="phoneCodeTest"></NbFormItem>
        </div>
        <NbFormItem :formItem="nameTest"></NbFormItem>
        <NbFormItem :formItem="passwordTest"></NbFormItem>
        <NbFormItem :formItem="repeatPasswordTest"></NbFormItem>
      </div>
    </div>

    <div class="app-register-content">
      <div class="app-register-button-no-word" @click="register" :class="(phoneTest.value && phoneCodeTest.value && nameTest.value && repeatPasswordTest.value)?'app-register-button-has-word':''">
        立即注册
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
      let  phoneTest = new FormItem(FormItem.prototype.Type.INPUT, "手机号码",false, true, "phone", "user.phone", null,{max: 100, placeholder: "手机号码"});
      let passwordTest = new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "设置密码",false, true, "password", "user.password", null,{min: 6, placeholder: "请输入密码"});
      return {
        user: this.$store.state.user,
        phoneValidation: this.$store.state.user.phoneValidation,
        // httpRegister: this.$store.state.user.getHttpRegister(),
        background: require("../../assets/img/login/login.png"),
        returnButton: require("../../assets/img/login/return.png"),
        sss: "sss",
        phoneTest: phoneTest,
        passwordTest: passwordTest,
        nameTest: new FormItem(FormItem.prototype.Type.INPUT, "姓名",true, true, "name", "user.name", this.$store.state.user.nickname,{max: 100, placeholder: "姓名一旦提交不可更改"}),
        phoneCodeTest: new FormItem(FormItem.prototype.Type.VALIDATION, "验证码",false, true, "phoneCode", "user.phoneCode", null,{placeholder: "验证码", phone: phoneTest}),
        repeatPasswordTest: new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "确认密码",false, true, "repeatPassword",  "user.repeatPassword", null, {max: 100, placeholder: "请确认密码", equal: passwordTest})
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
      register () {
        let that = this;
        if (!this.phoneTest.value || !this.phoneCodeTest.value || !this.nameTest.value || !this.passwordTest.value || !this.repeatPasswordTest.value) {
          that.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'),{duration:"short"});
        } else {
          this.$store.state.plus.nativeUI.toast(this.user.unionid,{duration:"short"});
          let weChatAuth = this.$store.state.auths[0];
          weChatAuth.getUserInfo(function () {
            // let name = weChatAuth.userInfo.nickname;
            let gender;
            if(weChatAuth.userInfo.sex === 1) {
              gender = "MALE";
            } else {
              gender = "FEMALE";
            }
            let unionid = weChatAuth.userInfo.unionid;
            let avatar = weChatAuth.userInfo.headimgurl;

            that.user.httpWeChatRegister(that.phoneTest.value, that.phoneCodeTest.value, that.repeatPasswordTest.value, that.nameTest.value,
              gender, unionid, avatar, function (response) {
                that.$store.state.plus.nativeUI.toast(that.$t('message.RegisterSuccess'),{duration:"short"});
                that.user.httpAppLogin(that.phoneTest.value, that.repeatPasswordTest.value,function (response) {
                  //登录成功后更新一下用户信息
                  that.user.innerLogin(response);
                  that.user.avatar.keepLocal(50, 50);
                  that.user.avatar.keepLocal(80, 80);
                  that.user.avatar.keepLocal(100, 100);
                  that.user.avatar.keepLocal(160, 160);
                  that.user.avatar.keepLocal(220, 220);
                });
                that.$router.openActivity('home');
              });
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
  .weChat-register-page {
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow-y: scroll;
    .register-page-title {
      text-align: center;
      color: #FFFFFF;
      font-weight: bold;
      font-size: 35px;
      letter-spacing: 2px;
      padding-top: 60px;
      margin-bottom: 20px;
    }
    .register-page-description {
      color: #FFFFFF;
      padding: 0 0 0 30px;
      font-size: 14px;
    }
    .app-register-input {
      padding: 0 0 0 30px;
      width: calc(100vw - 30px);
      overflow-x: hidden;
      .app-register-input-phone {
        overflow: hidden;
        input {
          color: #FFFFFF;
        }
      }
    }
    .app-register-content {
      padding: 0 30px;
      .app-register-button-no-word {
        background-color: #faf9f3;
        color: #666666;
        padding: 14px;
        margin-top: 40px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .app-register-button-has-word {
        background-color: rgba(255, 120, 0, 0.7);
        color: #ffffff;
        padding: 14px;
        margin-top: 40px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .app-register-rule {
        font-size: 13px;
        padding: 20px 0;
        .app-register-img {
          width: 12px;
          padding-right: 8px;
        }
        .app-register-agree {
          color: #FFFFFF;
        }
        .app-register-policy {
          color: #ff9b42;
        }
      }
      .return {
        width: 60px;
        margin: 40px auto 20px;
        height: 60px;
        background-size: cover;
        background-position: center;
      }
    }
    .sss {
      background-color: #00B3E4;
      border: 1px solid #00B3E4;
      padding: 14px;
      width: 100%;
      outline: none;
      resize: none;
      border-radius: 8px;
      color: #FFFFFF;
      font-size: 20px;
      margin-top: 35px;
      margin-bottom: 30px;
    }
  }
</style>

