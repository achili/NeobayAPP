<template>
  <div class="app-login" :style="'background-image: url(\''+background+'\')'">
    <div class="app-login-title">
      neoBay
    </div>
    <div class="app-login-input">
      <div class="app-login-input-box">
        <div class="app-login-input-phone">
          <div class="input-phone-content">
            <input v-model="currentUser.phone" :placeholder="$t('message.InputYourPhone')">
          </div>
          <div style="position: absolute;left: -17px;top: 4px;">
            <div :style ="'background:url(\''+(require('../../assets/svg/login/phone.svg'))+'\') center no-repeat'"
                 style="width: 24px;height: 20px;padding-right: 30px;border-right: 1px solid #FFFFFF;">
            </div>
          </div>
        </div>

        <div class="app-login-input-phone">
          <div class="input-phone-content">
            <input v-model="currentUser.password" :placeholder="$t('message.InputYourPassword')" :type="types">
          </div>
          <div style="position: absolute;left: -17px;top: 4px;">
            <div :style ="'background:url(\''+(require('../../assets/svg/login/password.svg'))+'\') center no-repeat'"
                 style="width: 24px;height: 20px;padding-right: 30px;border-right: 1px solid #FFFFFF;">
            </div>
          </div>
          <div v-if="seePasswordShow" style="min-width: 50px;position: absolute;right: 0;top: 4px;" @click.stop.prevent="seePassword">
            <div :style ="'background:url(\''+(require('../../assets/svg/login/seePasswordWhite.svg'))+'\') center no-repeat'"
                 style="width: 24px;height: 20px;">
            </div>
          </div>
          <div v-if="noSeePasswordShow" style="min-width: 50px;position: absolute;right: 0;top: 4px;margin-top: 6px;" @click.stop.prevent="noSeePassword">
            <div :style ="'background:url(\''+(require('../../assets/svg/login/noSeePasswordWhite.svg'))+'\') center no-repeat'"
                 style="width: 24px;height: 14px;">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="app-login-content">
      <div class="app-login-button-no-word" @click="login" :class="(currentUser.phone && currentUser.password)?'app-login-button-has-word':''">
        {{$t('message.login')}}
      </div>
      <div class="app-login-description" v-if="weChatNo">
        <div class="app-login-xian"></div>
        <div class="app-login-word">
          {{$t('message.ThirdPartyLand')}}
        </div>
        <div class="app-login-xian"></div>
        <div @click="weChatLogin" :style ="'background:url(\''+(require('../../assets/svg/login/weChatWhite.svg'))+'\') center no-repeat'"
             style="width: 45px;height: 45px;margin: 40px auto 0 auto;">
        </div>
      </div>
      <!--<div @click="weChatLogin" :style ="'background:url(\''+(require('../../assets/svg/login/weChatWhite.svg'))+'\') center no-repeat'"-->
      <!--style="width: 45px;height: 45px;margin: 0 auto;">-->
      <!--</div>-->
      <div class="app-login-other-page">
        <div @click="$router.openActivity('edit')">
          {{$t('message.RegisterAccount')}}
        </div>
        <div @click="$router.openActivity('find_password')">
          {{$t('message.ForgetPassword')}}
        </div>
      </div>
      <div class="return" :style="'background-image: url(\''+returnButton+'\')'" @click="$router.closeActivity()"></div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  import NbForm from "../../components/widget/NbForm"

  export default {
    data () {
      return {
        plus:this.$store.state.plus,
        currentUser: this.$store.state.user,
        sss: "sss",
        background: require("../../assets/img/login/login.png"),
        returnButton: require("../../assets/img/login/return.png"),
        types: 'password',
        seePasswordShow: false,
        noSeePasswordShow: true,
        weChatNo:true
      }
    },
    beforeCreate() {
    },
    props: {},
    computed: {},
    watch: {},
    components: {
      NbForm
    },
    methods: {
      login () {
        let that = this;
        if (!this.currentUser.phone || !this.currentUser.password) {
          that.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'),{duration:"short"});
        } else {
          that.currentUser.httpAppLogin(that.currentUser.phone, that.currentUser.password, function (response) {
            //登录成功后更新一下用户信息
            that.currentUser.innerLogin(response);
            that.currentUser.avatar.keepLocal(50, 50);
            that.currentUser.avatar.keepLocal(80, 80);
            that.currentUser.avatar.keepLocal(100, 100);
            that.currentUser.avatar.keepLocal(160, 160);
            that.currentUser.avatar.keepLocal(220, 220);
            that.$router.closeActivity();
          })
        }
      },
      weChatLogin() {
        let that = this;
        this.currentUser.weChatLogin(function (response) {
          that.$router.closeActivity();
          that.$store.state.plus.nativeUI.toast(that.$t('message.LoginSuccess'), {duration: "long"});
          //登录成功后更新一下用户信息
          that.currentUser.innerLogin(response);
          that.currentUser.avatar.keepLocal(50, 50);
          that.currentUser.avatar.keepLocal(80, 80);
          that.currentUser.avatar.keepLocal(100, 100);
          that.currentUser.avatar.keepLocal(160, 160);
          that.currentUser.avatar.keepLocal(220, 220);
        }, function () {
          that.$router.openActivity("weChat_register");
        }, function () {

        });
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
      openApp(){
        let ua = window.navigator.userAgent.toLowerCase();
        //微信
        if(ua.match(/MicroMessenger/i) === 'micromessenger'){
          window.location.href = 'downLoadForPhone';
        }else{
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            this.weChatNo = false;
          }else if (navigator.userAgent.match(/android/i)) {
            this.weChatNo = false;
          }
        }
      },
      testApp(url) {
        let timeout;
        let t = 1000;
        let hasApp = true;
        setTimeout(function () {
          if (!hasApp) {
            let r = confirm("您没有安装微信，请先安装微信!");
            if (r === true){
              location.href = "http://weixin.qq.com/"
            }
          }else{
            //安装微信
          }
          document.body.removeChild(ifr);
        }, 2000);

        let t1 = Date.now();
        let ifr = document.createElement("iframe");
        ifr.setAttribute('src', url);
        ifr.setAttribute('style', 'display:none');
        document.body.appendChild(ifr);
        timeout = setTimeout(function () {
          let t2 = Date.now();
          if (!t1 || t2 - t1 < t + 100) {
            hasApp = false;
          }
        }, t);
      },
      weChatDisplay(){
        if(this.plus.os.name === "WINDOWS") {
          this.weChatNo = false;
          return;
        }
        let WXApi = this.plus.ios.import("WXApi");
        let isWXInstalled = WXApi.isWXAppInstalled();
        if(isWXInstalled === false){
          this.weChatNo = false;
        }else {
          this.weChatNo = true;
        }
      }
    },
    mounted () {
      this.weChatDisplay();
      //设置沉浸式状态栏的字体颜色为白色
      //this.$store.state.plus.navigator.setStatusBarStyle('light');
    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .app-login {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow-y: scroll;
    .app-login-title {
      text-align: center;
      color: #FFFFFF;
      font-weight: bold;
      font-size: 35px;
      letter-spacing: 2px;
      padding-top: 80px;
      margin-bottom: 50px;
    }
    .app-login-input {
      width: 100%;
      margin: auto;
      .app-login-input-box{
        overflow-x: hidden;
        width: calc(100vw - 30px);
        margin-left:30px;
        .app-login-input-phone {
          position: relative;
          margin-bottom: 40px;
          .input-phone-content{
            width: calc(100vw - 30px);
            border-bottom: 1px solid #FFFFFF;
            input {
              background: transparent;
              color: #FFFFFF;
              resize: none;
              outline: none;
              width: calc(100% - 55px);
              border: 0;
              font-size: 17px;
              padding-bottom: 16px;
              padding-left: 55px;
            }
            :-ms-input-placeholder {
              color: #FFFFFF;
            }
            ::-webkit-input-placeholder {
              color: #FFFFFF;
            }
          }
        }
      }
    }
    .app-login-content {
      padding: 0 30px;
      .app-login-button-no-word {
        background-color: #faf9f3;
        color: #666666;
        padding: 14px;
        margin-top: 20px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .app-login-button-has-word {
        background-color: rgba(255, 120, 0, 0.7);
        color: #ffffff;
        padding: 14px;
        margin-top: 20px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .app-login-description {
        font-size: 14px;
        color: #FFFFFF;
        padding-top: 40px;
        padding-bottom: 15px;
        text-align: center;
        .app-login-xian {
          width: calc(50vw - 100px);
          height: 2px;
          padding: 0;
          background-color: #FFFFFF;
          overflow: hidden;
          margin-bottom: 8px;
          display: inline-block;
        }
        .app-login-word {
          display: inline-block;
          padding: 0 15px;
        }
      }
      .app-login-other-page {
        display: flex;
        justify-content: space-between;
        color: #FFFFFF;
        padding-top: 25px;
        font-size: 14px;
      }
      .return {
        width: 60px;
        margin: 15px auto 20px;
        height: 60px;
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>
