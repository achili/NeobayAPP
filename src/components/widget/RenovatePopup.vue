<template>
  <div class="pop-up" @click.stop="closeOwn">
    <div class="zoomIn animated pop-up-block" @click.stop>
      <div class="ico"></div>
      <div class="pop-up-title">
        检测到有新版本，是否更新?
      </div>
      <div class="pop-up-createWord" @click.stop="selectYes">
        确定
      </div>
      <div class="pop-up-createWord" @click.stop="selectNo">
        取消
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      selectYes(){
        this.$store.state.plus.runtime.openURL(this.$store.state.downloadUrl)
      },
      selectNo(){
        if(this.$store.state.needUpdate === 'need'){
          this.$store.state.needUpdate = 'unwanted';
        }else if(this.$store.state.needUpdate === 'force'){
          this.$store.state.plus.runtime.quit();
        }
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .pop-up {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    padding-top: 230px;
    .pop-up-block {
      color: #777777;
      margin: 0 auto;
      padding: 25px;
      width: 250px;
      text-align: center;
      background-color: #ffffff;
      &.animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
      }
      .ico {
        height: 42px;
        width: 100%;
        background: url("../../assets/img/common/pop-up-ico.png") center no-repeat;
        background-size: contain;
      }
      .pop-up-title {
        margin-top: 18px;
        font-size: 13px;
        line-height: 24px;
        color: #363636;
      }
      .pop-up-description {
        font-size: 13px;
        line-height: 20px;
      }
      .pop-up-createWord {
        padding: 4px 0;
        width: 120px;
        display: inline-block;
        background-color: #ff9e21;
        color: #ffffff;
        font-size: 14px;
        margin: 12px auto 0 auto;
      }
    }
  }
</style>
