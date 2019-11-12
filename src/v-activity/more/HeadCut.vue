<template>
  <div class="head-cut-activity">
    <div class="about-header">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title"></div>
      <div class="apartment-ico" style="width: 23px;height: 66px;line-height: 94px;text-align: right;margin-right: 15px"  @click.prevent="determine">
        <span style="">确认</span><i class="fa fa-spinner fa-spin" v-if="loading"></i>
      </div>
    </div>
    <div class="vue-cropper-box">
      <vueCropper class="vue-cropper"
                  ref="vueCropper"
                  :img="cropper.img"
                  :info="cropper.info"
                  :canScale="cropper.canScale"
                  :outputType="cropper.outputType"
                  :autoCrop="cropper.autoCrop"
                  :fixed="cropper.fixed"
                  :fixedNumber="cropper.fixedNumber"
                  :fixedBox="cropper.fixedBox"
                  :canMove="cropper.canMove"
                  :enlarge="cropper.enlarge"
                  :canMoveBox="cropper.canMoveBox"
      ></vueCropper>
    </div>

  </div>
</template>

<script>
  /**
   * https://www.npmjs.com/package/vue-cropper vue-cropper
   */
  import {VueCropper} from 'vue-cropper';
  import Tank from "../../common/model/tank/Tank";
  import Activity from "../../common/model/_base/Activity";

  export default {
    data() {
      let data;
      return {
        cropper: {
          img: data,
          info: true,
          canScale: true,//允许滚轮缩放
          outputType: 'jpeg',
          autoCrop: true,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1],
          fixedBox: true,
          canMove: true,
          enlarge:1,
          canMoveBox:false
        },
        user: this.$store.state.user,
        tank: this.$store.state.temps.headCutTank,
        loading: false
      }
    },
    props:{
      activity:{
        type: Activity,
        required: false
      }
    },
    components: {
      VueCropper
    },
    methods: {
      determine() {
        if(this.loading) {
          return;
        }

        this.loading = true;
        let that = this;
        this.$refs.vueCropper.getCropBlob((data) => {
          that.tank.file = new File([data], that.tank.file.name, {type: "image/jpeg"});
          that.tank.upload(function (response) {
            that.$store.state.plus.nativeUI.toast(that.$t('message.UploadSuccess'),{duration:"short"});
            that.$store.state.temps.headCutCallBack && that.$store.state.temps.headCutCallBack();
            that.$router.closeActivity();
          }, function() {
            that.$store.state.plus.nativeUI.toast(that.$t('message.UploadFailed'),{duration:"short"});
            that.loading = false;
          })
        });

      },
      back() {
        this.$router.closeActivity("slide-top")
      }
    },
    mounted(){
      let that = this;
      let reader = new FileReader();
      if(this.activity.query.fixedNumber && this.activity.query.fixedNumber === 'face'){
        that.cropper.fixedNumber = [3,4];
        that.cropper.enlarge = 1.7;
      }else {
        that.cropper.fixedNumber = [1,1]
      }
      reader.onload = (e) => {
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          that.cropper.img = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          that.cropper.img = e.target.result;
        }
      };
      reader.readAsArrayBuffer(this.tank.file);
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .head-cut-activity {
    height: 100vh;
    width: 100%;
    background: black;
    .about-header {
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .apartment-ico{
        flex: 1;
        .apartment-top-ico{
          margin-top: 36px;
        }
      }
      .apartment-top-title{
        flex: 4;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }

    .vue-cropper-box {
      height: calc(100vh - 66px);
      margin-top: 66px;
      .vue-cropper {
        margin: auto;
        background: black;
        height: 100%;
      }
    }
    .cropper-bg {
      background: black;
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .about-header{
        padding: 18px 0 0 0 ;
      }
      .vue-cropper-box{
        margin-top:84px ;
      }
    }
  }
</style>

