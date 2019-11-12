<template>
  <div class="more">
      <div  class="more-top">
        {{$t('message.Mine')}}
      </div>
      <div class="more-index-content-box">
      <div class="more-header" v-if="user.isLogin" @click="$router.openActivity('archives')">
        <div class="more-header-img">
          <img :src="user.getAvatarUrl(80, 80)">
        </div>
        <div class="more-header-word">
          <div v-if="user.nickname" class="more-header-word-name">
            {{user.nickname}}
          </div>
          <div v-else class="more-header-word-name">
            {{user.phone}}
          </div>
          <div>
            {{$t('message.Profile')}}
          </div>
        </div>
        <div :style="'background:url(\''+(require('../../assets/svg/more/arrow.svg'))+'\') center no-repeat'" style="height: 9px;width: 6px;float: right;"></div>
      </div>
      <div class="more-header" v-else @click="$router.openActivity('login')">
        <div class="more-header-img">
          <img :src="user.getAvatarUrl(80, 80)">
        </div>
        <div class="more-header-word">
          <div class="more-header-word-name">
            {{user.name}}
          </div>
          <div>
            {{$t('message.Profile')}}
          </div>
        </div>
        <div :style="'background:url(\''+(require('../../assets/svg/more/arrow.svg'))+'\') center no-repeat'" style="height: 9px;width: 6px;float: right;"></div>
      </div>

      <div class="more-order">
        <div class="more-order-cell">
          <div class="more-block" v-for="(order,index) in orders" :key="order.index" :style="index === 'message'?'border: 0':'' " @click.stop="goLogin(order.router) " :typeTop="order.text">
            <div class="more-block-cell">
              <div class="more-block-cell-ico" :style="'background: url(\''+ order.ico + '\') no-repeat;'"></div>
              <div class="more-block-cell-text">{{$t(order.text)}}</div>
              <div class="more-block-cell-arrow" :style="'background:url(\''+(require('../../assets/svg/more/arrow.svg'))+'\') center no-repeat'"></div>
            </div>
          </div>
        </div>

        <div style="width: 100%;height: 10px;margin: auto;background-color:#f5f5f5;"></div>
        <div class="more-order-cell">
          <div class="more-block">
            <div class="more-block-cell" @click.prevent="openTot">
              <div class="more-block-cell-ico" :style="'background:url(\''+(require('../../assets/svg/more/language.svg'))+'\') no-repeat'"></div>
              <div class="more-block-cell-text">{{$t('message.Language')}}</div>
              <div class="more-block-cell-arrow" :style="'background:url(\''+(require('../../assets/svg/more/arrow.svg'))+'\') center no-repeat'"></div>
            </div>
          </div>
          <div class="more-block">
            <div class="more-block-cell" @click.prevent="openPop">
              <div class="more-block-cell-ico" :style="'background:url(\''+(require('../../assets/svg/more/about.svg'))+'\') no-repeat'"></div>
              <div class="more-block-cell-text">{{$t('message.About')}}</div>
              <div class="more-block-cell-arrow" :style="'background:url(\''+(require('../../assets/svg/more/arrow.svg'))+'\') center no-repeat'"></div>
            </div>
          </div>
          <div class="more-block" style="border: 0;">
            <div class="more-block-cell" @click.prevent="openLogOut">
              <div class="more-block-cell-ico" :style="'background:url(\''+(require('../../assets/svg/more/logout.svg'))+'\') no-repeat'"></div>
              <div class="more-block-cell-text">{{$t('message.Quit')}}</div>
              <div class="more-block-cell-arrow" :style="'background:url(\''+(require('../../assets/svg/more/arrow.svg'))+'\') center no-repeat'"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      let $router = this.$router;
      return {
        user: this.$store.state.user,
        logOutShow: false,
        orders: {
          active: {
            text: "message.Apply",
            ico:  require('../../assets/svg/more/active.svg'),
            router: "activity_order",
            click: function () {
              if (user.isLogin) {
                $router.openActivity("activity_order", "slide-left");
              } else {
                $router.openActivity('login');
              }
            }
          },
          meeting: {
            text: "message.Reservation",
            ico:  require('../../assets/svg/more/meeting.svg'),
            router: "meeting_order",
            click: function () {
              if (isLogin) {
                $router.openActivity("meeting_order", "slide-left");
              } else {
                $router.openActivity('login');
              }
            }
          },
          space: {
            text: "message.Space",
            ico:  require('../../assets/svg/more/message.svg'),
            router: "space_order",
            click: function () {
              if (isLogin) {
                $router.openActivity("space_order", "slide-left");
              } else {
                $router.openActivity('login');
              }
            }
          },
          project: {
            text: "message.Order",
            ico:  require('../../assets/svg/more/project.svg'),
            router: "project_order",
            click: function () {
              if (this.isLogin) {
                $router.openActivity("project_order", "slide-left");
              } else {
                $router.openActivity('login');
              }
            }
          },
          message: {
            text: "message.Invite",
            ico:  require('../../assets/svg/more/invite.svg'),
            router: "invite_order",
            click: function () {
              if (this.isLogin) {
                $router.openActivity("invite_order", "slide-left");
              } else {
                $router.openActivity('login');
              }
            }
          }
        },
        others: {
          userManual: {
            text: "用户手册",
            ico: require('../../assets/svg/more/userManual.svg'),
            router: "user_manual"
          },
          usualQuestion: {
            text: "常见问题",
            ico: require('../../assets/svg/more/usualQuestion.svg'),
            router: "common_problem"
          },
          about: {
            text: "关于我们",
            ico: require('../../assets/svg/more/about.svg'),
            router: "about"
          }
        }
      }
    },
    components: {

    },
    props: {
      openLogOut: {
        type: Function
      }
    },
    methods: {
      goLogin(e){
        if (this.user.isLogin) {
          this.$router.openActivity(e, "slide-left");
        } else {
          this.$router.openActivity('login');
        }
      },
      logout() {
        let that = this;
        this.user.httpLogout(function () {
          that.$router.openActivity('login');
        });
      },
      openPop(){
        let that = this;
        that.$router.openActivity("about", "slide-left");
      },
      openTot(){
        this.$router.openActivity("language", "slide-left");
      }
    },
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">
  .more {
    height: 100%;
      .more-top{
        width: 100%;
        height: 66px;
        position: fixed;
        top: 0;
        left: 0;
        font-size: 17px;
        color: #323232;
        text-align: center;
        border-bottom: 1px solid #ECEEEF;
        background-color: #FFFFFF;
        line-height: 94px;
      }
      .more-index-content-box{
        margin-top: 66px;
        overflow-y: scroll;
        -webkit-overflow-scrolling:touch;
        height: calc(100vh - 50px - 66px);
        width: 100%;
        background-color: #f5f5f5;
      .more-header {
        background: #FFFFFF;
        height: 120px;
        text-align: left;
        margin-bottom: 10px;
        padding: 20px 15px 0 15px;
        .more-header-img {
          float: left;
          padding-right: 20px;
          img {
            border-radius: 50%;
            width: 80px;
            height: 80px;
          }
        }
        .more-header-word {
          width: auto;
          line-height: 30px;
          height: 20px;
          padding-top: 10px;
          .more-header-word-name {
            font-size: 18px;
            font-weight: 600;
          }
          .more-header-word-description {
            color: #888888;
          }
        }
      }

      .more-order {
        text-align: left;
        .more-order-cell {
          .more-block {
            background-color: #FFFFFF;
            border-bottom: 1px solid #ECEEEF;
            .more-block-cell {
              padding: 20px 5px 20px 15px;
              display: flex;
              .more-block-cell-ico {
                height: 17px;
                width: 14px;
                margin-right: 5px;
                flex: 1;
              }
              .more-block-cell-text {
                letter-spacing: 1px;
                color: #323232;
                line-height: 20px;
                font-size: 15px;
                flex: 13;
              }
              .more-block-cell-arrow {
                height: 9px;
                width: 6px;
                flex: 1;
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
      @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
        .more-top{
        padding: 18px 0 0 0 ;
        }
        .more-index-content-box{
          margin-top:84px ;
        }
      }
  }
</style>
