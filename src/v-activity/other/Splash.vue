<template>
  <div class="app-splash animated fadeIn">
    <div class="splash-logo">
      <div class="seize-seat"></div>
      <div class="logo-img"></div>
      <div class="logo-loading" v-show="logoLoadingShow">
        <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
      </div>
    </div>
    <div class="splash-copyright">
      ©Copyright 上海零号湾创业投资有限公司
    </div>
  </div>
</template>

<script>
  import Activity from "../../common/model/_base/Activity";

  export default {
    data() {
      return {
        logoLoadingShow: false
      }
    },
    props: {
      activity: {
        type: Activity,
        required: true
      }
    },
    methods: {
      openHome() {
        if(this.$store.state.plus.isReady) {
          this.$router.openActivity('home')
        } else if(!this.activity.isMostTop()) {

        } else {
          this.logoLoadingShow = true;
          setTimeout(this.openHome, 1000);
          console.log("Splash:plus尚未加载...")
        }
      }
    },
    mounted(){
      setTimeout(this.openHome, 1200)
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .app-splash {
    .splash-logo {
      height: calc(100vh - 42px);
      .seize-seat {
        height: calc(50% - 47px);
      }
      .logo-img {
        width: 100%;
        height: 74px;
        margin: 0 auto;
        background: url("../../assets/img/splash/splash-logo.png") no-repeat center;
        background-size: contain;
      }
      .logo-loading{
        margin-top: 20px;
        color: #a7a7a7;
        text-align: center;
      }
    }
    .splash-copyright {
      height: 42px;
      font-size: 14px;
      letter-spacing: 0.5px;
      color: #a7a7a7;
      text-align: center;
    }

  }
</style>
