<template>
  <div class="park-index" :class="$store.state.keyboardHeight > 1? 'keyboard-show':''">
    <div class="home-index-top">
      <div class="home-search-box">
        <div class="home-search">
          <div class="input-box">
            <div class="search-ico"></div>
            <input class="search-input" :placeholder="$t('message.Search')" @click.stop="openSearchPopup"/>
          </div>
        </div>
        <div class="home-user-box pull-right" @click.stop="login">
        </div>
      </div>
    </div>

    <div v-if="officialCarouselPager.officialCarousels.length > 0">
      <wc-swiper class="swiper-list">
        <wc-slide v-for="carousel in officialCarouselPager.officialCarousels" :key="carousel.index" class="swiper-slide"
                  :style="'background: url(\''+ carousel.image.getLocalUrlBySize(750, 330) +'\') center;'">
          <div class="list-content"></div>
          <div class="list-content-title">{{carousel.title}}</div>
        </wc-slide>
      </wc-swiper>
    </div>
    <div v-else style="height: 155px;padding-top: 10px;"></div>
    <div class="fast-content" ref="screenBar" @touchstart.stop @touchend.stop>
      <div class="fast-link">
        <div class="link-item" v-for="fastLink in fastLinks" :key="fastLink.text"  @click.stop="fastLink.click">
          <div class="link-ico"
               :style="'background:url(\''+fastLink.ico+'\') center no-repeat content-box'"
          ></div>
          <div class="link-text">{{$t(fastLink.text)}}</div>
        </div>
      </div>
    </div>
    <div style="background-color: #F5F5F5;height: 10px;width: 100vw;"></div>

    <div class="index-tab-box">
      <div class="index-tab-item" v-for="tab in tabNavigation.homeIndex" @click.stop="clickTab(tab)" :key="tab.key">
        <span class="index-tab-item-cell" :class="tab.active? 'active':''">{{$t(tabsStyle[tab.key])}}</span>
      </div>
    </div>

    <div class="index-tab-line"></div>


    <div ref="swiper" class="home-index-content" :style="'transform: translate('+deviation+'px)'"
         @touchstart="touchstart" @touchend="touchend">
      <div class="content-item">
        <ArticleList ref="circleList" v-if="tabNavigation.homeIndex[0].active" :openCircleOperation="openCircleOperation"></ArticleList>
      </div>
      <div class="content-item">
        <ActivityList v-if="tabNavigation.homeIndex[1].active"></ActivityList>
      </div>
      <div class="content-item">
        <PolicyList v-if="tabNavigation.homeIndex[2].active"></PolicyList>
      </div>
      <div class="content-item">
        <StarList v-if="tabNavigation.homeIndex[3].active"></StarList>
      </div>
    </div>

  </div>
</template>

<script>
  import ArticleList from "../../components/home/index/ArticleList";
  import ActivityList from "../../components/home/index/ActivityList";
  import PolicyList from "../../components/home/index/PolicyList";
  import StarList from "../../components/home/index/StarList";
  import Tank from "../../common/model/tank/Tank";

  export default {
    data() {
      let tabNavigation = this.$store.state.tabNavigation;
      let $router = this.$router;
      let that = this;
      let deviation = 0;
      if(tabNavigation.homeIndex[1].active) {
        deviation = -(document.documentElement.clientWidth || document.body.clientWidth);
      }
      if(tabNavigation.homeIndex[2].active) {
        deviation = -(document.documentElement.clientWidth || document.body.clientWidth) * 2;
      }
      if(tabNavigation.homeIndex[3].active) {
        deviation = -(document.documentElement.clientWidth || document.body.clientWidth) * 3;
      }
      return {
        keyboardHeight: this.$store.state.keyboardHeight,
        officialCarouselPager: this.$store.state.officialCarouselPager,
        fastLinks: [
          {
            text: "message.Join",
            ico: require("../../assets/svg/home/index/entry.svg"),
            click: function () {
              that.$store.state.openHomePopUp("message.LoginWebApply", "https://neoBay.cn/home/entry", "message.Sure");
            }
          },
          {
            text: "message.Meeting",
            ico: require("../../assets/svg/home/index/meeting.svg"),
            click: function () {
              tabNavigation.home.forEach(item => {
                item.active = false;
              });
              tabNavigation.home[1].active = true;
              tabNavigation.homeService.forEach(item => {
                item.active = false;
              });
              tabNavigation.homeService[1].active = true;
            }
          },
          {
            text: "message.HomeInvite",
            ico: require("../../assets/svg/home/index/homeInvite.svg"),
            click: function () {
              $router.openActivity('invite_apply');
            }
          },
          {
            text: "message.Keeper",
            ico: require("../../assets/svg/home/index/keeper.svg"),
            click: function () {
              tabNavigation.home.forEach(item => {
                item.active = false;
              });
              tabNavigation.home[1].active = true;
              tabNavigation.homeService.forEach(item => {
                item.active = false;
              });
              tabNavigation.homeService[2].active = true;
            }
          },
          {
            text: "message.Financial",
            ico: require("../../assets/svg/home/index/finance.svg"),
            click: function () {
              tabNavigation.home.forEach(item => {
                item.active = false;
              });
              tabNavigation.home[1].active = true;
              tabNavigation.homeService.forEach(item => {
                item.active = false;
              });
              tabNavigation.homeService[3].active = true;
            }
          },
          {
            text: "message.Incubator",
            ico: require("../../assets/svg/home/index/space.svg"),
            click: function () {
              tabNavigation.home.forEach(item => {
                item.active = false;
              });
              tabNavigation.home[1].active = true;
              tabNavigation.homeService.forEach(item => {
                item.active = false;
              });
              tabNavigation.homeService[0].active = true;
            }
          }
        ],
        tabNavigation: tabNavigation,
        user: this.$store.state.user,
        tabsStyle: {
          news: "message.News",
          activity: "message.Activity",
          policy: "message.Policy",
          star: "message.Star"
        },
        //偏移量
        deviation: deviation,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startX: 0,
        startTime: 0
      }
    },
    props: {
      openCallService: {
        type: Function
      },
      openCircleOperation: {
        type: Function
      },
      openSearchPopup: {
        type: Function
      },
      openNewsDetail: {
        type: Function
      }
    },
    components: {
      ArticleList,
      ActivityList,
      PolicyList,
      StarList
    },
    methods: {
      openUrl(e){
        this.$router.openActivity('wc_list_details',"slide-left",{listUrl:e.id});
      },
      login() {
        if (this.user.isLogin) {
          this.$router.openActivity('archives');
        } else {
          this.$router.openActivity('login');
        }
      },
      clickTab(tab) {
        this.tabNavigation.homeIndex.forEach(tabI => {
          tabI.active = false
        });
        this.deviation = -(this.tabNavigation.homeIndex.indexOf(tab) * this.$refs.swiper.offsetWidth);
        tab.active = true;
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
              this.tabNavigation.homeIndex.forEach(tabI => {
                tabI.active = false
              });
              this.tabNavigation.homeIndex[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
            } else if (distance < 0 && this.deviation > -this.$refs.swiper.offsetWidth * 3) {
              this.deviation -= this.$refs.swiper.offsetWidth;
              this.tabNavigation.homeIndex.forEach(tabI => {
                tabI.active = false
              });
              this.tabNavigation.homeIndex[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
            }
          }
        }
      },
      refresh() {
        let that = this;

        if(this.officialCarouselPager.officialCarousels && this.officialCarouselPager.officialCarousels.length === 0) {
          this.officialCarouselPager.setFilterValue("status", "OK");
          this.officialCarouselPager.httpFastPage(function () {
            that.officialCarouselPager.officialCarousels.forEach(data => {
              data.image.keepLocal(750, 330);
            });
          })
        }
      }
    },
    mounted() {
      this.refresh();
      this.$refs.screenBar.scrollLeft = (4 - 1) * this.$refs.screenBar.offsetWidth * 0.25;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .park-index {
    height: calc(100vh - 50px);
    position: relative;
    &.keyboard-show {
      height: 100vh!important;
    }
    .home-index-top {
      padding: 28px 0 0 0;
      .home-search-box {
        position: relative;
        padding: 5px 15px 0 15px;
        .home-search {
          width: calc(100% - 47px);
          .input-box {
            position: relative;
            border-radius: 12px;
            background: #F1F1F2;
            padding: 8px 10px;
            display: flex;
            .search-ico {
              position: absolute;
              top: calc(50% - 7px);
              left: 15px;
              width: 14px;
              height: 14px;
              background: url("../../assets/svg/home/index/search.svg") no-repeat center;
            }
            .search-input {
              display: block;
              width: 100%;
              margin-left: 22px;
              background:none;
              outline:none;
              border:0;
              font-size: 16px;
            }
          }
        }
        .home-user-box {
          position: absolute;
          top: 8px;
          right: 15px;
          width: 24px;
          height: 24px;
          padding: 5px;
          background: url("../../assets/svg/home/index/user.svg") content-box no-repeat center;
          &.msg {
            top: 2px;
            right: 15px;
            height: 27px;
            background: url("../../assets/svg/home/index/user-msg.svg") content-box no-repeat center;
          }
        }
      }
    }
    .swiper-list{
      width: 100%;
      height: 155px;
      padding-top: 6px;
      .swiper-slide {
        background-repeat: no-repeat;
        background-size: cover !important;
        z-index: 0 !important;
        .list-content{
          width: 100%;
          height: 100%;
          background-color: #bababa;
          opacity: .35;
          position: absolute;
        }
        .list-content-title{
          width: 90%;
          margin:60px auto 0 auto;
          text-align: center;
          font-size: 15px;
          color: #fff;
        }
        .list-content-btn{
          font-size: 10px;
          text-align: center;
          margin-top: 15px;
          color: #EDA046;
        }
      }
    }
    .fast-content{
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      .fast-link {
        padding: 15px 15px 0;
        width: auto;
        display: flex;
        flex-wrap: nowrap;
        background: white;
        .link-item {
          padding: 0 0 4px 0;
          min-width: 20%;
          color: #484848;
          .link-ico {
            height: 25px;
            width: 25px;
            margin: 0 auto;
          }
          .link-text {
            margin-top: 5px;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
    .index-tab-box {
      height: 37px;
      font-size: 12px;
      border-bottom: 1px solid #ECEEEF;
      .index-tab-item {
        height: 35px;
        width: 25%;
        display: inline-block;
        text-align: center;
        line-height: 35px;
        .index-tab-item-cell {
          color: #666666;
          padding-bottom: 10px;

          &.active {
            color: #444444;
            border-bottom: 2px solid #ffbb55;
          }
        }
      }
    }
    .index-tab-line {
      height: 1px;
      background: #F6F6F6;
    }
    .home-index-content {
      height: calc(100% - 308px);
      width: 100%;
      display: flex;
      transition-duration: 200ms;
      .content-item {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .home-index-top{
        padding-top: 46px;
      }
    }
  }
</style>

