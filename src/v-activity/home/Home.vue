<template>
  <div class="app-home">
    <div class="home-content">
      <Park v-if="tabNavigation.home[0].active" :openSearchPopup="openSearchPopup"></Park>
      <Service v-if="tabNavigation.home[1].active"></Service>
      <Code v-if="tabNavigation.home[2].active"></Code>
      <Index v-show="tabNavigation.home[3].active"></Index>
      <More v-if="tabNavigation.home[4].active" :openLogOut="openLogOut"></More>

    </div>
    <div v-show="$store.state.keyboardHeight < 1" class="home-tab">
      <div class="disk"></div>

      <div class="tab-item" :class="tab.active? 'active':''" v-for="(tab,index) in tabNavigation.home" :key="tab.index" @click.stop="clickTab(tab)">

        <div class="tab-item-ico" :class="index === 2?'tab-item-code':''"
             :style="'background:url(\''+(tab.active?tabsStyle[tab.key].active:tabsStyle[tab.key].ico)+'\') center no-repeat content-box'">

        </div>
        <div class="tab-item-text">{{$t(tabsStyle[tab.key].text)}}</div>
      </div>
    </div>


    <div class="popup-box" v-if="logOutShow">
      <logOut :closeCall="closeAllPopup" :logout="logout"></logOut>
    </div>

    <div class="popup-box" v-if="popUpShow">
      <popUp :closeCall="closeAllPopup"  :title="popUpTitle" :description="popUpDescription" :createWord="popUpCreateWord"></popUp>
    </div>

    <div class="popup-box" v-if="searchPopupShow">
      <SearchPopup :closeCall="closeAllPopup"></SearchPopup>
    </div>

    <div class="popup-box" v-if="meetingRoomFilterShow">
      <MeetingRoomFilter :closeCall="closeAllPopup"></MeetingRoomFilter>
    </div>
    <div class="popup-box" v-if="$store.state.needUpdate === 'need'">
      <RenovatePopup></RenovatePopup>
    </div>
  </div>
</template>

<script>
  import Index from "../../components/home/Life";
  import More from "../../components/home/More";
  import Park from "../../components/home/Park";
  import Code from "../../components/home/Code";
  import Service from "../../components/home/Service";
  import logOut from "../../v-activity/more/logout/logOut.vue"
  import SearchPopup from "../../components/home/index/SearchPopup"

  import popUp from "../../v-activity/more/popup/popUp"
  import MeetingRoomFilter from "../../components/service/popup/MeetingRoomFilter";
  import RenovatePopup from "../../components/widget/RenovatePopup"
  export default {
    data() {
      return {
        user: this.$store.state.user,
        tabNavigation: this.$store.state.tabNavigation,
        keyboardHeight: this.$store.state.keyboardHeight,
        tabsStyle: {
          park: {
            text: "message.Campus",
            ico: require("../../assets/svg/bottomBar/park.svg"),
            active: require("../../assets/svg/bottomBar/park_active.svg")
          },
          services: {
            text: "message.Service",
            ico: require("../../assets/svg/bottomBar/service.svg"),
            active: require("../../assets/svg/bottomBar/service_active.svg")
          },
          code: {
            text: "message.Code",
            ico: require("../../assets/svg/bottomBar/code.svg"),
            active: require("../../assets/svg/bottomBar/code_active.svg")
          },
          life: {
            text: "message.Life",
            ico: require("../../assets/svg/bottomBar/life.svg"),
            active: require("../../assets/svg/bottomBar/life_active.svg")
          },
          more: {
            text: "message.Mine",
            ico: require("../../assets/svg/bottomBar/mine.svg"),
            active: require("../../assets/svg/bottomBar/mine_active.svg")
          }
        },
        logOutShow: false,
        popUpShow: false,
        meetingRoomFilterShow: false,
        searchPopupShow: false,
        popUpTitle: "标题",
        popUpDescription: "详情",
        popUpCreateWord: "popUpCreateWord"
      }
    },
    components: {
      Index,
      More,
      logOut,
      Service,
      Park,
      Code,
      popUp,
      MeetingRoomFilter,
      SearchPopup,
      RenovatePopup
    },
    watch:{

    },
    methods: {
      clickTab(tab) {
        if(tab.key === "more" || tab.key === "code"){
          if(this.user.isLogin){
            this.tabNavigation.home.forEach(tabI => {
              tabI.active = false
            });
            tab.active = true;
          }else {
            this.$router.openActivity('login');
          }
        }else {
          this.tabNavigation.home.forEach(tabI => {
            tabI.active = false
          });
          tab.active = true
        }

      },
      openLogOut() {
        this.logOutShow = true;
      },
      closeAllPopup() {
        this.logOutShow = false;
        this.popUpShow = false;
        this.searchPopupShow = false;
        this.meetingRoomFilterShow = false;
      },
      logout() {
        let that = this;
        //如果用户的unionid存在，说明该用户之前用微信登录过，退出后就先注销微信登录
        if (this.user.unionid) {
          this.user.authLogoutAll();
        }
        this.user.httpLogout(function () {
          that.$store.state.plus.nativeUI.toast(that.$t('message.QuitSuccess'),{duration:"short"});
          that.$router.openActivity('login');
        });
      },
      openPopUp(popUpTitle, popUpDescription, popUpCreateWord, type = "PopUp") {
        if(type === "PopUp") {
          this.popUpTitle = popUpTitle;
          this.popUpDescription = popUpDescription;
          this.popUpCreateWord = popUpCreateWord;
          this.popUpShow = true;
        } else if(type === "MeetingRoomFilter") {
          this.meetingRoomFilterShow = true;
        }

      },
      openSearchPopup() {
        this.searchPopupShow = true;
      }
    },
    mounted(){
      this.$store.state.openHomePopUp = this.openPopUp;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .app-home {
    .mask-module{
      height: 100vh;
      width: 100vw;
      position: fixed;
      top:415px;
      left: 0;
      background: rgba(0,0,0,.45);
    }
    height: 100%;
    .home-content {

    }
    .home-tab {
      background: white;
      position: fixed;
      display: flex;
      bottom: 0;
      left: 0;
      right: 0;
      color: #000000;
      text-align: center;
      padding: 5px 12px 7px 12px;
      border-top: 1px solid #C9C9C9;
      .disk {
        background: white;
        position: absolute;
        left: calc(50% - 18px);
        height: 34px;
        width: 34px;
        top: -13px;
        border-radius: 100%;
        z-index: -1;
      }
      .tab-item {
        width: 20%;
        display: inline-block;
        color: black;
        &.active {
          color: #ffa021;
        }
        .tab-item-text {
          margin-top: 4px;
          font-size: 11px;
          line-height: 10px;
        }
        .tab-item-ico {
          height: 23px;
          width: 30px;
          margin: 0 auto;
        }
        .tab-item-code {
          margin-top: -18px;
          margin-bottom: 11px;
          width: 34px;
          height: 34px;
        }
      }

    }
    .popup-box {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    @media (device-width: 375px) and (device-height: 812px){
      .home-tab{
        padding-bottom: 30px;
      }
    }
    @media (device-width: 414px) and (device-height: 896px){
      .home-tab{
        padding-bottom: 30px;
      }
    }
  }
</style>
