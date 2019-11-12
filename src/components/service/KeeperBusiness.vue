<template>
  <div class="service-keeper-business">
    <div class="advertisement"></div>
    <div class="keeper-business-screen" :class="screenShow? 'open':''">

      <div class="screen-bar" ref="screenBar" @touchstart.stop @touchend.stop>
        <div class="text" v-show="screenShow">
          {{$t('message.ChooseType')}}
        </div>

        <div class="screen-item-bar">
          <div class="screen-item" v-for="(screenItem,index) in screenItems"
               :class="$store.state.keeperBusinessOrganizationCurrentType===screenItem.type&&index!==screenItems.length-1? 'active':''"
               :key="screenItem.ico" @click.stop="clickType(screenItem.type, index)">
            <div class="item-ico"
                 :style="'background:url(\''+screenItem.ico+'\') center no-repeat'"></div>
            <div class="item-text"><span class="text-span">{{$t(screenItem.name)}}</span></div>
          </div>
        </div>

      </div>
      <div class="btn" @click="open">
        <i v-show="screenShow" class="ico fa fa-angle-up"></i>
        <i v-show="!screenShow" class="ico fa fa-angle-down"></i>
      </div>
    </div>

    <div class="keeper-business-list" :class="screenShow? 'open':''">
      <scroller ref="keeperScroller"
                :on-refresh="refresh"
                :refreshText="$t(refreshText)"
                :noDataText="$t(noDataText)"
                :on-infinite="infinite">
        <div class="list-box">
          <div v-for="organization in pager.keeperBusinessOrganizations" :key="organization.id" class="keeper-business-item"  @click.stop="serviceDetails(organization)">
            <div class="item-content">
              <div class="item-img"
                   :style ="'background:url(\''+organization.logo.getLocalUrlBySize(100, 230)+'\') center no-repeat'"></div>
              <div class="item-name">{{organization.name}}</div>
              <div class="item-type">
                类型:{{organization.businessType.type? organization.businessType.getTypeName(organization.businessType.type):'其他'}}-{{organization.businessType.name}}
              </div>
            </div>

          </div>
        </div>

      </scroller>
    </div>


  </div>
</template>

<script>
  import KeeperBusinessType from "../../common/model/keeper/business/KeeperBusinessType";

  export default {
    data() {
      let keeperBusinessType = new KeeperBusinessType();
      return {
        screenShow: false,
        user:this.$store.state.user,
        refreshText: "message.DropDownData",
        noDataText: 'message.NoMoreData',
        screenItems: [
          {
            ico: require('../../assets/svg/service/keeper-business/1.svg'),
            name: "message.All",
            type: null
          },
          {
            ico: require('../../assets/svg/service/keeper-business/2.svg'),
            name: "message.Business",
            type: keeperBusinessType.Type.BUSINESS_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/3.svg'),
            name: "message.Financials",
            type: keeperBusinessType.Type.FINANCE_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/4.svg'),
            name: "message.Tax",
            type: keeperBusinessType.Type.FISCAL_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/5.svg'),
            name: "message.Legal",
            type: keeperBusinessType.Type.LAW_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/6.svg'),
            name: "message.Intellectual",
            type: keeperBusinessType.Type.KNOWLEDGE_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/7.svg'),
            name: "message.Hr",
            type: keeperBusinessType.Type.RESOURCES_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/8.svg'),
            name: "message.Advertise",
            type: keeperBusinessType.Type.ADVERTISEMENT_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/9.svg'),
            name: "message.IT",
            type: keeperBusinessType.Type.IT_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/10.svg'),
            name: "message.Entrepreneurship",
            type: keeperBusinessType.Type.BUSINESS_START_SERVICE
          },
          {
            ico: require('../../assets/svg/service/keeper-business/11.svg'),
            name: "message.Others",
            type: keeperBusinessType.Type.OTHER_SERVICE
          },
          {
            ico: null,
            name: "",
            type: keeperBusinessType.Type.OTHER_SERVICE
          }
        ],
        deviation: 0,
        pager: this.$store.state.keeperBusinessOrganizationPager
      }
    },
    components: {

    },
    methods: {
      serviceDetails(i){
        if (this.user.isLogin) {
          this.$router.openActivity("service_create","slide-left",{itemId:i.id});
        } else {
          this.$router.openActivity('login');
        }
      },
      open() {
        this.screenShow = !this.screenShow;
        let keeperScroller = this.$refs.keeperScroller;
        if(this.screenShow) {
          keeperScroller.scrollTo(0, keeperScroller.getPosition().top + 185, false)
        } else {
          keeperScroller.scrollTo(0, keeperScroller.getPosition().top - 185, false)
        }
      },
      clickType(type, index) {
        this.screenShow = false;
        this.$store.state.keeperBusinessOrganizationCurrentType = type;
        let that = this;
        setTimeout(function () {
          that.$refs.screenBar.scrollLeft = (index - 1) * that.$refs.screenBar.offsetWidth * 0.25;
        }, 5);
        this.$store.state.keeperBusinessOrganizationCurrentTypeIndex = index;
        this.pager.setFilterValue("type", type);
        this.refresh();
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("status", "FINISH");
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.keeperBusinessOrganizations.forEach(data => {
            data.logo.keepLocal(100, 230);
          });
          done && done();
        },function () {
          done && done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("status", "FINISH");
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastNextPage(function(){
          that.$refs.keeperScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {
          pager.keeperBusinessOrganizations.forEach(data => {
            data.logo.keepLocal(100, 230);
          });
        });

      }
    },
    mounted(){
      let index = this.$store.state.keeperBusinessOrganizationCurrentTypeIndex;
      this.$refs.screenBar.scrollLeft = (index - 1) * this.$refs.screenBar.offsetWidth * 0.25;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .service-keeper-business {
    height: 100%;
    width: 100%;
    .advertisement {
      height: 160px;
      width: 100%;
      background: url("../../assets/img/life/banner.png") center;
      background-size: cover;
    }
    .keeper-business-screen {
      position: relative;
      .btn {
        position: absolute;
        top: 0;
        right: 0;
        height: 60px;
        min-width: 50px;
        border-left: 1px solid #ECECEC;
        border-bottom: 1px solid #ECECEC;
        background: white;
        .ico {
          display: block;
          width: 100%;
          font-size: 23px;
          line-height: 50px;
          text-align: center;
          color: #787878;
        }
      }
      &.open {
        .btn {
          height: 50px;
        }
        .screen-item-bar {
          width: 100%;
          height: auto;
          overflow: auto;
          flex-wrap: wrap;
          .screen-item {
            padding: 14px 0 0 0;
          }
        }
      }
    }
    .screen-bar {
      position: relative;
      overflow-x: scroll;
      -webkit-overflow-scrolling:touch;
      .text {
        font-size: 15px;
        line-height: 50px;
        padding-left: 15px;
        color: #666666;
        border-bottom: 1px solid #ECECEC;
      }
      .screen-item-bar {
        width: auto;
        display: flex;
        flex-wrap: nowrap;
        background: white;
        .screen-item {
          border-bottom: 1px solid #ECECEC;
          min-width: 25%;
          padding: 10px 0 0 0;
          .item-ico {
            height: 18px;
          }
          .item-text {
            font-size: 12px;
            margin-top: 4px;
            color: #666666;
            .text-span {
              width: 60px;
              margin-left: calc(50% - 30px);
              text-align: center;
              display: inline-block;
              line-height: 26px;
              border-bottom: 2px solid white;
            }
          }
          &.active {
            .item-text {
              color: #333333;
              .text-span {
                border-bottom: 2px solid #EFC06F;
              }
            }
          }
        }
      }
    }

    .keeper-business-list {
      background: #F5F5F5;
      height: calc(100% - 220px);
      position: relative;
      /*&.open {*/
        /*margin-top: -185px;*/
      /*}*/
      .list-box {
        display: flex;
        flex-wrap: wrap;
        padding: 5px 10px;
        .keeper-business-item {
          min-width: calc(50% - 10px);
          width: calc(50% - 10px);
          padding: 5px;
          .item-content {
            background: white;
            padding: 15px 5px 10px 13px;
            .item-img {
              height: 60px;
              background-size: contain!important;
            }
            .item-name {
              margin-top: 14px;
              line-height: 22px;
              height: 22px;
              overflow: hidden;
              font-size: 12px;
              color: #333333;
            }
            .item-type {
              font-size: 11px;
              color: #666666;
              height: 17px;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
</style>
