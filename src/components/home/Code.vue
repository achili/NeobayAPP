<template>
  <div class="code">
    <div class="code-content">
      <div class="code-title">
        {{$t('message.OpenDoor')}}
      </div>

      <div class="code-block">
        <div v-if="isCode || codeError">
          <div class="code-block-title">
            {{$t('message.IndoorCode')}}
          </div>
          <div class="code-block-description">
            {{$t('message.DescriptionCode')}}
          </div>
          <div v-show="!codeLoading && !codeError"  class="code-block-pic">
            <span><i class="fa fa-spinner fa-spin fa-fw"></i>{{$t('message.Loading')}}...</span>
          </div>
          <div class="code-block-pic" id="qrCode" v-show="codeLoading"></div>
          <div v-show="codeError" class="code-block-pic">
            {{$t('message.NetWorkError')}}
          </div>
        </div>
        <div v-else>
          <div style="padding-top: 10vh;">
            <div class="code-block-yes" :style="'background: url(\''+ yes +'\');'"></div>
          </div>
          <div class="code-block-success">
            刷卡成功
          </div>
          <div class="code-block-button" @click="closeCode">
            我知道了
          </div>
          <div class="code-block-close">
            {{time}}s后弹窗自动关闭
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import QRCode from 'qrcodejs2';

  export default {
    data() {
      let $router = this.$router;
      return {
        user:this.$store.state.user,
        code: "",
        yes: require("../../assets/img/code/yes.png"),
        isCode: false,
        time:0,
        timeInterval: null,
        qrCode:null,
        codeLoading:false,
        codeError:false
      }
    },
    components: {

    },
    methods: {
      createQrCode(){
        this.qrCode = new QRCode('qrCode', {
          text: this.code,// 二维码内容
          width: 256,
          height: 256// 高度
          //render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          //background: '#f0f',
          //foreground: '#ff0'
          //correctLevel: QRCode.CorrectLevel.H;
        });
      },
      closeCode() {
        this.isCode = !this.isCode;
      },
      refresh() {
        //5s后弹窗自动关闭
        let that = this;
        let refreshTime = new Date();
        that.isCode = true;
      },
      httpEntranceGuards () {
        let that = this;
          this.user.httpEntranceGuard(function (res) {
            that.code = res.data.qrCode;
            if(that.qrCode) {
              console.log("11111")
              that.qrCode.makeCode(that.code);
            } else {
              console.log("22222")
              that.createQrCode();
            }
            that.codeLoading = true;
          },function (err) {
            that.codeError = true;
            console.log(err)
          })
        },
      makeCodeEntranceGuard () {
        let that = this;
        this.user.httpEntranceGuard(function (res) {
          that.code = res.data.qrCode;
          that.qrCode.makeCode(that.code);
          that.codeLoading = true;
        },function (err) {
          that.codeError = true;
          console.log(err)
        })
      }
    },
    beforeDestroy() {
      if (this.timeInterval) {
        clearInterval(this.timeInterval);
      }
    },
    mounted(){
      let that = this;
      this.refresh();
      this.httpEntranceGuards();
      this.timeInterval = setInterval(function () {
        that.makeCodeEntranceGuard();
      }, 1000 * 60);
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .code {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-image: url("../../assets/img/code/code-background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    .code-content {
      overflow-y: scroll;
      height: calc(100vh - 50px);
      .code-title {
        text-align: center;
        padding-top: 36px;
        padding-bottom: 62px;
        color: #fefefe;
        font-size: 17px;
      }
      .code-block {
        width: calc(100vw - 22px);
        background-color: #ffffff;
        margin: 0 auto;
        text-align: center;
        border-radius: 7px;
        .code-block-title {
          color: #333333;
          font-size: 18px;
          font-weight: bold;
          padding-top: 40px;
          padding-bottom: 20px;
        }
        .code-block-description {
          color: #888888;
          font-size: 15px;
          padding-bottom: 30px;
        }
        .code-block-pic {
          min-width: 256px;
          min-height: 256px;
          padding-bottom: 55px;
          overflow: hidden;
          img{
            background-size: cover !important;
            margin: 0 auto;
            background-repeat: no-repeat;
          }
        }
        .code-block-yes {
          height: 60px;
          width: 60px;
          margin: 0 auto;
          background-size: cover !important;
          background-repeat: no-repeat;
        }
        .code-block-success {
          padding-top: 20px;
          color: #333333;
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 60px;
        }
        .code-block-button {
          border-radius: 19px;
          background-color: rgba(255, 160, 33, 0.8);
          padding: 12px 0;
          color: #ffffff;
          font-size: 16px;
          margin: 0 auto;
          width: calc(100% - 80px);
        }
        .code-block-close {
          color: #666666;
          font-size: 13px;
          padding-top: 20px;
        }
      }
    }

  }
</style>

