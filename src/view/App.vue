<template>
  <div class="main-app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'app',
  data () {
    return {
      preference:this.$store.state.preference,
      user: this.$store.state.user,
      plus: this.$store.state.plus,
      originalHeight: 0
    }
  },
  methods:{
    //检查更新
    UpVersion(){
      let that = this;
      this.preference.httpVersion(function (res) {
        console.log('开始检查更新' + parseFloat(res.data.versionNumber));
        that.$store.state.downloadUrl = that.$store.state.plus.os.name === "iOS" ? res.data.appStoreUrl : res.data.androidUrl;
        if(parseFloat(that.$store.state.version) < parseFloat(res.data.versionNumber)) {
          //需要更新
          that.$store.state.needUpdate = "need";
        } else {
          //无需更新
          that.$store.state.needUpdate = "unwanted";
        }
      });
    }
  },
  mounted(){
    this.UpVersion();
    Vue.http.headers.common['Authorization'] = this.user.session;

    let that = this;

    //单页应用，在登录成功后更新一次用户的信息
    this.user.httpUpdateInfo(function () {}, function () {
      console.error("Update user information failure");
    });
    this.originalHeight = document.documentElement.clientHeight || document.body.clientHeight;


    document.addEventListener("plusready",function () {
      // Android处理返回键
      window.plus.key.addEventListener('backbutton', function(){
        that.$router.closeActivity();
      }, false);

      window.onresize = function(){
        //软键盘弹起与隐藏  都会引起窗口的高度发生变化
        let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if(resizeHeight < that.originalHeight){ //resizeHeight<originalHeight证明窗口被挤压了
          that.$store.state.keyboardHeight = that.originalHeight - resizeHeight;
        } else {
          that.$store.state.keyboardHeight = 0;
        }
      }
    });

    if(!this.$store.state.debug) {
      this.$router.push("/app/splash");
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  @font-face {
    font-family: PINGFANG;
    src: url("/static/font/PINGFANG_REGULAR.TTF") format("truetype");
  }
  .main-app {
    font-family: PINGFANG, "PINGFANG", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
  }
  html, body {
    background-color: white;
    min-height: 100vh;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  body {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
