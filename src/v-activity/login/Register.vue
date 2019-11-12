<template>
  <div class="app-register" :style="'background-image: url(\''+background+'\')'">
    <div class="app-register-title">
      neoBay
    </div>
    <div class="app-register-input">
      <div class="app-register-input-phone">
        <NbFormItem :formItem="nameTest"></NbFormItem>

        <NbFormItem :formItem="emailTest"></NbFormItem>
        <div style="margin-top: 30px;padding-right: 30px;">
          <NbFormItem :formItem="captchaTest"></NbFormItem>
        </div>
      </div>
    </div>

    <div class="app-register-content">
      <div class="app-register-button-no-word" @click="register" :class="(isAgree && nameTest.value && emailTest.value && captchaTest.value)?'app-register-button-has-word':''">
        {{$t('message.Register')}}
      </div>
      <div class="app-register-rule">
        <img v-if="isAgree" class="app-register-img" :src="require('../../assets/img/login/agree.png')" @click="toAgree">
        <img v-else class="app-register-img" :src="require('../../assets/img/login/disagree.png')" @click="toAgree">
        <span class="app-register-agree">
           {{$t('message.ReadAndAgree')}}
        </span>
        <span class="app-register-policy">
          <span @click="toProtocol">《{{$t('message.NeoBay')}} {{$t('message.UserRegisterProtocol')}}》</span>
          <!--<span @click="toPrivacy">《隐私政策》</span>-->
        </span>
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
  import Activity from "../../common/model/_base/Activity";
  import Captcha from "../../common/model/user/validation/Captcha";

  export default {
    data () {
      return {
        user: this.$store.state.user,
        phoneValidation: this.$store.state.user.phoneValidation,
        sss: "sss",
        isAgree: true,
        background: require("../../assets/img/login/register.png"),
        returnButton: require("../../assets/img/login/return.png"),
        nameTest: new FormItem(FormItem.prototype.Type.INPUT, "姓名",true, true, "name", "user.name", this.$store.state.user.name,{max: 11, placeholder: this.$t('message.LeaderName')}),
        emailTest: new FormItem(FormItem.prototype.Type.HTTP_EMAIL_INPUT, "电子邮箱",true, false, "email", "user.email", this.$store.state.user.email,{max: 100, placeholder: this.$t('message.LeaderEmail'), isEmail: true}),
        captchaTest: new FormItem(FormItem.prototype.Type.CAPTCHA_VALIDATION, "图形验证",false, true, "captchaTest", "user.captcha", this.$store.state.user.captcha,{placeholder: this.$t('message.GraphicVerify')})
      }
    },
    beforeCreate() {
    },
    props: {
      activity:{
        type: Activity,
        required: false
      }
    },
    watch: {},
    computed: {},
    components: {
      NbForm,
      NbFormItem,
      NbLoadingButton
    },
    methods: {
      toProtocol(){
        this.$router.openActivity('protocol');
        },
      toPrivacy(){
        this.$router.openActivity('privacy');
        },
      register () {
        let that = this;
        if (!this.nameTest.value || !this.emailTest.value || !this.captchaTest.value) {
          that.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'),{duration:"short"});
        } else {
          this.user.httpAppRegister(this.activity.query.phone, this.activity.query.phoneCode,
            this.activity.query.password,this.nameTest.value, this.emailTest.value, this.captchaTest.value.value,this.$store.state.user.captcha.blob.Token, function (response) {
            that.$store.state.plus.nativeUI.toast(that.$t('message.RegisterSuccess'),{duration:"short"});
            that.user.httpAppLogin(that.activity.query.phone, that.activity.query.password,function (response) {
              //登录成功后更新一下用户信息
              that.user.innerLogin(response);
              that.user.avatar.keepLocal(50, 50);
              that.user.avatar.keepLocal(80, 80);
              that.user.avatar.keepLocal(100, 100);
              that.user.avatar.keepLocal(160, 160);
              that.user.avatar.keepLocal(220, 220);
            });
            that.$router.closeActivity("slide-right","home");
          });
        }
      },
      software(){
        this.$router.openActivity('software_license');
      },
      toAgree() {
        this.isAgree = !this.isAgree;
      }
    },
    mounted () {
    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .app-register {
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow-y: scroll;
    .app-register-title {
      text-align: center;
      color: #FFFFFF;
      font-weight: bold;
      font-size: 35px;
      letter-spacing: 2px;
      padding-top: 80px;
      margin-bottom: 20px;
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
  }
</style>

