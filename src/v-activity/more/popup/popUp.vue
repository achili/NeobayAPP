<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="pop-up" @click.stop="closeOwn">
    <div class="zoomIn animated pop-up-block" @click.stop>
      <div class="ico">

      </div>

      <div class="pop-up-title">
        {{$t(title)}}
      </div>
      <div class="pop-up-description" v-clipboard:copy="description" v-clipboard:success="onCopy" v-clipboard:error="onError">
        {{description}}
      </div>
      <div class="pop-up-createWord" @click.stop="closeOwn">
        {{$t(createWord)}}
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
    props: {
      closeCall: {
        type: Function
      },
      title: {
        type: String
      },
      description: {
        type: String
      },
      createWord: {
        type: String
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      onCopy(e){
        this.$store.state.plus.nativeUI.toast(this.$t('message.CopyLinkSuccess'),{duration:"short"});
      },
      onError(e){
        this.$store.state.plus.nativeUI.toast(this.$t('message.CopyLinkFailed'),{duration:"short"});
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
        background: url("../../../assets/img/common/pop-up-ico.png") center no-repeat;
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
        background-color: #ff9e21;
        color: #ffffff;
        font-size: 14px;
        margin: 12px auto 0 auto;
      }
    }
  }
</style>
