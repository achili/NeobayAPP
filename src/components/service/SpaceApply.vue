<template>
  <div class="service-space-apply">
    <div class="independent-box">
      <div class="box-introduce">
        <div class="introduce-title">
          {{$t('message.Rooms')}}
        </div>
        <div class="introduce-content">
          <div class="text">
            零号湾为初具规模注重私密性的创业
            团队提供定制化的独立办公间，并提
            供商务洽谈室、会议室、休息间等公
            共服务空间支持，孵化企业能够快捷
            方便地“拎包入住”，并享受多元化
            的专业孵化服务。
          </div>
          <div class="swiper-box">

            <div class="swiper-content">
              <NbSwiper :imgUrlList="introduceImg" :intervalTime="3000"></NbSwiper>
            </div>

            <div class="mask"></div>

          </div>
        </div>
      </div>
    </div>
    <div class="nursery-box">
      <div class="box-introduce">
        <div class="introduce-title">
          {{$t('message.SpaceRooms')}}
        </div>
        <div class="introduce-content">
          <div class="swiper-box">

            <div class="swiper-content-left">
              <NbSwiper :imgUrlList="nurseryImg" :intervalTime="3000"></NbSwiper>
            </div>

            <div class="mask-left"></div>

          </div>

          <div class="text">
            零号湾创业苗圃总面积1000平方米，
            提供近150个工位，致力于为初创团
            队提供无忧，舒适的办公环境及全方
            位的创业服务。 至多可为8人及以下
            的创业团队提供3-6个月免费办公机会。
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>

        </div>
      </div>
    </div>
    <div class="apply-btn" @click="goLogin">
      {{$t('message.IWantApply')}}
    </div>
  </div>
</template>

<script>
  import NbSwiper from "../../components/widget/NbSwiper"

  export default {
    data() {
      return {
        user:this.$store.state.user,
        introduceImg: [
          require("../../assets/img/service/space/office1.png"),
          require("../../assets/img/service/space/office2.png"),
          require("../../assets/img/service/space/office3.png")
        ],
        nurseryImg: [
          require("../../assets/img/service/space/nursery1.png"),
          require("../../assets/img/service/space/nursery2.png"),
          require("../../assets/img/service/space/nursery3.png")
        ]
      }
    },
    components: {
      NbSwiper
    },
    methods: {
      goLogin(){
          if (this.user.isLogin) {
            this.$router.openActivity("space_apply", "slide-left");
          } else {
            this.$router.openActivity('login');
          }
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .service-space-apply {
    padding: 0 15px;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .independent-box {
      background: #f1f6e6;
      padding: 5px 0 0 20px;
    }
    .nursery-box {
      background: #F1F6E6;
      margin-top: 15px;
      padding: 5px 20px 0 0;
      .introduce-title {
        margin-left: 50%;
      }
      .swiper-content-left {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 144px;
        width: 140px;
        .page-box {
          left: 30%!important;
        }
      }
      .mask-left {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 144px;
        width: 140px;
        background: url("../../assets/img/service/space/flower.png");
        background-size: cover;
      }
    }
    .box-introduce {
      .introduce-title {
        font-size: 19px;
        color: #323232;
        padding: 20px 0;
        font-weight: 600;
        white-space:nowrap;
      }
      .introduce-content {
        display: flex;
        .text {
          font-size: 13px;
          color: #666666;
          width: 50%;
          padding-bottom: 20px;
        }
        .swiper-box {
          position: relative;
          width: 50%;
          .swiper-content {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 144px;
            width: 140px;
          }
          .mask {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 144px;
            width: 140px;
            background: url("../../assets/img/service/space/leaf.png");
            background-size: cover;
          }

        }

      }
    }
    .apply-btn {
      margin-top: 20px;
      margin-bottom: 15px;
      background: #ffa42f;
      border-radius: 5px;
      color: white;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
    }
  }
</style>
