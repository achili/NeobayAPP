<template>
  <div class="service-activity">
    <div class="service-title-tab">
      <div class="service-tab-item" :class="tabNavigation.homeService[0].active? 'active':''"
           @click.stop="clickTab(0)">{{$t('message.Incubator')}}</div>
      <div class="service-tab-item" :class="tabNavigation.homeService[1].active? 'active':''"
           @click.stop="clickTab(1)">{{$t('message.Meeting')}}</div>
      <div class="service-tab-item" :class="tabNavigation.homeService[2].active? 'active':''"
           @click.stop="clickTab(2)">{{$t('message.Keeper')}}</div>
      <div class="service-tab-item" :class="tabNavigation.homeService[3].active? 'active':''"
           @click.stop="clickTab(3)">{{$t('message.Financial')}}</div>
    </div>
    <div ref="swiper" class="home-service-content" :style="'transform: translate('+deviation+'px)'"
         @touchstart="touchstart" @touchend="touchend">
      <div class="content-item">
        <SpaceApply  v-if="tabNavigation.homeService[0].active"></SpaceApply>
      </div>
      <div class="content-item">
        <MeetingRoom v-if="tabNavigation.homeService[1].active"></MeetingRoom>
      </div>
      <div class="content-item">
        <KeeperBusiness  v-if="tabNavigation.homeService[2].active"></KeeperBusiness>
      </div>
      <div class="content-item">
        <Financing v-if="tabNavigation.homeService[3].active"></Financing>
      </div>
    </div>
  </div>
</template>

<script>
  import SpaceApply from '../../components/service/SpaceApply'
  import MeetingRoom from '../../components/service/MeetingRoom'
  import KeeperBusiness from '../../components/service/KeeperBusiness'
  import Financing from '../../components/service/Financing'

  export default {
    data() {
      let deviation = 0;
      let tabNavigation = this.$store.state.tabNavigation;
      if(tabNavigation.homeService[1].active) {
        deviation = -(document.documentElement.clientWidth || document.body.clientWidth);
      }
      if(tabNavigation.homeService[2].active) {
        deviation = -(document.documentElement.clientWidth || document.body.clientWidth) * 2;
      }
      if(tabNavigation.homeService[3].active) {
        deviation = -(document.documentElement.clientWidth || document.body.clientWidth) * 3;
      }
      return {
        //偏移量
        tabNavigation: tabNavigation,
        deviation: deviation,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startX: 0,
        startTime: 0
      }
    },
    components: {
      SpaceApply,
      MeetingRoom,
      KeeperBusiness,
      Financing
    },
    methods: {
      clickTab(tabIndex) {
        this.tabNavigation.homeService.forEach(tabI => {
          tabI.active = false
        });
        this.deviation = -(tabIndex * this.$refs.swiper.offsetWidth);
        this.tabNavigation.homeService[tabIndex].active = true;
      },
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startTime = e.timeStamp
      },
      touchend(e) {
        let distance = e.changedTouches[0].clientX - this.startX;
        let speed = Math.abs(distance) / (e.timeStamp - this.startTime);
        if(Math.abs(distance) > this.triggerDistance) {
          if(speed > this.triggerSpeed) {
            if(distance > 0 && this.deviation < 0) {
              this.deviation += this.$refs.swiper.offsetWidth;
              this.tabNavigation.homeService.forEach(tabI => {
                tabI.active = false
              });
              this.tabNavigation.homeService[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
            } else if (distance < 0 && this.deviation > -this.$refs.swiper.offsetWidth * 3) {
              this.deviation -= this.$refs.swiper.offsetWidth;
              this.tabNavigation.homeService.forEach(tabI => {
                tabI.active = false
              });
              this.tabNavigation.homeService[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
            }
          }
        }
      }
    },
    mounted(){


    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .service-activity {
    .service-title-tab {
      display: flex;
      font-size: 15px;
      padding-top: 30px;
      .service-tab-item {
        color: #666666;
        flex: 1;
        text-align: center;
        line-height: 34px;
        border-bottom: 1px solid #DADCD4;
        &.active {
          color: #333333;
          border-bottom: 2px solid #ffa021;
        }
      }
    }

    .home-service-content {
      position: absolute;
      top: 66px;
      width: 100%;
      bottom: 0;
      display: flex;
      transition-duration: 200ms;
      .content-item {
        width: 100%;
        height: calc(100% - 50px);
        flex-shrink: 0;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .service-title-tab{
       margin-top: 18px;
      }
      .home-service-content{
        top: 84px;
      }
    }
  }
</style>
