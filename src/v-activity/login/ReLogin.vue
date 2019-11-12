<template>
  <div class="app-reLogin" :style="'background-image: url(\''+background+'\')'">
    <div class="app-reLogin-title">
      neoBay
    </div>
    <div class="app-reLogin-input">
      <div class="app-reLogin-input-phone">
        <input v-model="currentUser.phone" :placeholder="$t('message.InputYourPhone')">
        <div style="position: absolute;left: -17px;top: 0;">
          <div :style ="'background:url(\''+(require('../../assets/svg/login/phone.svg'))+'\') center no-repeat'"
               style="width: 24px;height: 20px;padding-right: 30px;border-right: 1px solid #FFFFFF;">
          </div>
        </div>
      </div>

      <div class="app-reLogin-input-phone">
        <input v-model="currentUser.password" :placeholder="$t('message.InputYourPassword')" :type="types">
        <div style="position: absolute;left: -17px;top: 0;">
          <div :style ="'background:url(\''+(require('../../assets/svg/login/password.svg'))+'\') center no-repeat'"
               style="width: 24px;height: 20px;padding-right: 30px;border-right: 1px solid #FFFFFF;">
          </div>
        </div>
        <div v-if="seePasswordShow" style="min-width: 50px;position: absolute;right: 0;top: 0;" @click.stop.prevent="seePassword">
          <div :style ="'background:url(\''+(require('../../assets/svg/login/seePasswordWhite.svg'))+'\') center no-repeat'"
               style="width: 24px;height: 20px;">
          </div>
        </div>
        <div v-if="noSeePasswordShow" style="min-width: 50px;position: absolute;right: 0;top: 0;margin-top: 6px;" @click.stop.prevent="noSeePassword">
          <div :style ="'background:url(\''+(require('../../assets/svg/login/noSeePasswordWhite.svg'))+'\') center no-repeat'"
               style="width: 24px;height: 14px;">
          </div>
        </div>
      </div>
    </div>

    <div class="app-reLogin-content">
      <div class="app-reLogin-button-no-word" :class="(currentUser.phone && currentUser.password)?'app-reLogin-button-has-word':''">
        {{$t('message.login')}}
      </div>
      <div class="app-reLogin-description">
        <div class="app-reLogin-xian"></div>
        <div class="app-reLogin-word">
          {{$t('message.ThirdPartyLand')}}
        </div>
        <div class="app-reLogin-xian"></div>
      </div>
      <div @click="weChatLogin" :style ="'background:url(\''+(require('../../assets/svg/login/weChatWhite.svg'))+'\') center no-repeat'"
           style="width: 45px;height: 45px;margin: 0 auto;">
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
        currentUser: this.$store.state.user,
        sss: "sss",
        background: require("../../assets/img/login/login.png"),
        returnButton: require("../../assets/img/login/return.png"),
        types: 'password',
        seePasswordShow: false,
        noSeePasswordShow: true
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
      login (response) {
        let that = this;
        //登录成功后更新一下用户信息
        this.currentUser.innerLogin(response);
        this.currentUser.avatar.keepLocal(50, 50);
        this.currentUser.avatar.keepLocal(80, 80);
        this.currentUser.avatar.keepLocal(100, 100);
        this.currentUser.avatar.keepLocal(160, 160);
        this.currentUser.avatar.keepLocal(220, 220);
        this.$router.closeActivity();
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
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .app-reLogin {
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow-y: scroll;
    .app-reLogin-title {
      text-align: center;
      color: #FFFFFF;
      font-weight: bold;
      font-size: 35px;
      letter-spacing: 2px;
      padding-top: 80px;
      margin-bottom: 50px;
    }
    .app-reLogin-input {
      padding: 0 0 0 30px;
      .app-reLogin-input-phone {
        position: relative;
        margin-bottom: 40px;
        input {
          background: transparent;
          color: #FFFFFF;
          resize: none;
          outline: none;
          border: 0;
          width: 100%;
          font-size: 17px;
          padding-bottom: 16px;
          padding-left: 55px;
          border-bottom: 1px solid #FFFFFF;
        }
        :-ms-input-placeholder {
          color: #FFFFFF;
        }
        ::-webkit-input-placeholder {
          color: #FFFFFF;
        }
      }
    }
    .app-reLogin-content {
      padding: 0 30px;
      .app-reLogin-button-no-word {
        background-color: #faf9f3;
        color: #666666;
        padding: 14px;
        margin-top: 20px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .app-reLogin-button-has-word {
        background-color: rgba(255, 120, 0, 0.7);
        color: #ffffff;
        padding: 14px;
        margin-top: 20px;
        text-align: center;
        border-radius: 7px;
        font-size: 17px;
        letter-spacing: 8px;
      }
      .app-reLogin-description {
        font-size: 14px;
        color: #FFFFFF;
        padding-top: 40px;
        padding-bottom: 35px;
        text-align: center;
        .app-reLogin-xian {
          width: calc(50vw - 100px);
          height: 2px;
          padding: 0;
          background-color: #FFFFFF;
          overflow: hidden;
          margin-bottom: 8px;
          display: inline-block;
        }
        .app-reLogin-word {
          display: inline-block;
          padding: 0 15px;
        }
      }
      .return {
        width: 60px;
        margin: 50px auto 20px;
        height: 60px;
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>
