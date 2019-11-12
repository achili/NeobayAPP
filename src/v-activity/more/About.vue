<template>
  <div class="about">
    <div class="about-header">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.About')}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="about-content">
      <div class="about-pic">
        <div :style="'background: url(\''+background+'\') 50% 50% no-repeat; height: 70px;width: calc(100vw - 140px);margin: 0 auto;background-size: contain;'"></div>
        <div class="about-pic-title">
          {{$t('message.Version')}}: {{$store.state.version}}
        </div>
      </div>

      <div class="about-button">
        <div class="about-button-block-1" @click.stop="$router.openActivity('about_us','slide-left')">
          {{$t('message.AboutUs')}} neoBay
        </div>
        <div class="about-button-block-2" @click.stop="$router.openActivity('protocol','slide-left')">
          {{$t('message.Agreement')}}
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: this.$store.state.user,
        background: require("../../assets/img/more/about/about.png")
      }
    },
    components: {

    },
    methods: {

    },
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .about {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
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
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .about-content {
      background-image: url("../../assets/img/more/about/background_about.jpg");
      padding: 90px 0;
      background-repeat: no-repeat;
      height: 55vh;
      background-size: cover;

      .about-pic {
        .about-pic-title {
          text-align: center;
          font-size: 19px;
          color: #8c8c8c;
          margin-top: 15px;
        }
      }
      .about-button {
        padding-top: calc(50vh - 170px);
        .about-button-block-1 {
          margin: 0 auto;
        }
        .about-button-block-2 {
          margin: 30px auto;
        }
        .about-button-block-1, .about-button-block-2 {
          text-align: center;
          padding: 15px 0;
          border-radius: 5px;
          font-size: 16px;
          color: #666666;
          border: 2px solid #666666;
          width: 150px;
        }
      }
    }

    .about-footer {
      text-align: center;
      color: #ccc;
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .about-header{
        padding: 18px 0 0 0 ;
      }
      .about-content{
        margin-top:84px ;
      }
    }
  }
</style>
