<template>
  <div class="park-supermarket-content">
    <div class="park-supermarket-top">
      <div class="park-supermarket-ico"  @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="park-supermarket-top-ico"
            >
        </div>
      </div>
      <div class="park-supermarket-top-title">{{title}}</div>
      <div class="park-supermarket-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="park-supermarket-content-box">
      <div class="park-supermarket-nav" :style="'background: url(\''+ parkJson.navUrl + '\') no-repeat; background-size: cover;'"></div>
      <div class="park-supermarket-park" :style =" 'background:url(\''+(require('../../../assets/img/life/park-supermarket-bg.png'))+'\')  no-repeat; background-size: cover;'">
        <div class="park-supermarket-notice">
          <div class="park-supermarket-content-text">
            {{parkJson.parkData.notice.noticeText}}
          </div>
          <div class="notice-btn" @click.stop="openPopUp">{{parkJson.parkData.notice.noticeBtn.btnText}}</div>
        </div>
        <div class="park-supermarket-activity">
          <div class="park-supermarket-activity-img" :style="'background: url(\''+ parkJson.parkData.activity.activityUrl + '\') no-repeat; background-size: cover;'"></div>
          <div class="park-supermarket-activity-content">
            <div class="park-supermarket-activity-title">
              {{parkJson.parkData.activity.activityTitle}}
            </div>
            <div class="park-supermarket-activity-text">
              {{parkJson.parkData.activity.activityText}}
            </div>
            <div class="park-supermarket-activity-time">
              时间:{{parkJson.parkData.activity.activityTime}}
            </div>
            <div class="park-supermarket-activity-address">
              地点:{{parkJson.parkData.activity.activityAddress}}
            </div>
          </div>
        </div>
        <div class="park-supermarket-extension">
          <div class="park-supermarket-extension-title">
            <div class="extension-title">
              {{parkJson.parkData.extension.extensionTitle}}
            </div>
          </div>
          <div class="park-supermarket-extension-content">
            <div class="park-supermarket-extension-text">
              {{parkJson.parkData.extension.extensionText}}
            </div>
            <div class="park-supermarket-extension-detailed">
              <div class="extension-detailed">联系我们：</div>
              <div class="extension-detailed-name">
                {{parkJson.parkData.extension.extensionName}}
              </div>
              <div class="extension-detailed-address">
                {{parkJson.parkData.extension.extensionAddress}}
              </div>
              <div class="extension-detailed-url">
                {{parkJson.parkData.extension.extensionUrl}}
              </div>
              <div class="extension-detailed-phone">
                Phone:{{parkJson.parkData.extension.extensionPhone}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-box" v-if="popUpShow">
      <popUp :closeCall="closeAllPopup"  :title="tit" :description="description" :createWord="createWord"></popUp>
    </div>
  </div>
</template>

<script>
  import popUp from "../../../v-activity/more/popup/popUp";
  export default {
    data(){
      let $router = this.$router;
      let $store =  this.$store;
      return{
        title:"园区集市",
        btn:"我要申请",
        tit: "请您登录官方网站平台进行进一步申请",
        description: "https://neoBay.cn/enter/finance",
        createWord: "确定",
        popUpShow: false,
        parkJson:{
          navUrl:require('../../../assets/img/life/ps-nav.jpg'),
          parkData:{
            notice:{
              noticeText:"零号湾为园区内创业团队更好的推广自己的产品/项目，将定期举办创业内卖活动，届时也将邀请投资机构参与内卖活动，这也是创业团队向投资机构展示自己产品和理念的平台，在此期间可能会获得投资机构的青睐，希望各位创业团队踊跃报名参与。",
              noticeBtn:{
                btnText:"我要申请"
              }
            },
            activity:{
              activityUrl:require('../../../assets/img/life/chanpin.png'),
              activityTitle:"零号湾",
              activityText:"零号湾为园区内创业团队更好的推广自己的产品/项目，将定期举办创业内卖活动，届时也将邀请投资机构参与内卖活动",
              activityTime:"2018/05/01-2018/05/10",
              activityAddress:"零号湾科技楼一号楼1楼大厅"
            },
            extension:{
              extensionTitle:"齿度",
              extensionText:"齿度Bonalign领先的生物力学技术和个性化美学设计理念，既继承了传统的牙,齿度Bonalign，源自美国最新口腔微整形技术。",
              extensionName:"上海天医数据科技有限公司",
              extensionAddress:"上海市闵行区剑川路951号零号湾2号楼204室",
              extensionUrl:"https://www.tgrins.com",
              extensionPhone:"(+81)021-60732608"
            }
          }
        }
      }
    },
    components:{
      popUp
    },
    methods:{
      goClose(){
        this.$router.closeActivity()
      },
      openPopUp(){
        this.popUpShow = true;
      },
      closeAllPopup() {
        this.popUpShow = false;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .park-supermarket-content{
    height: 100vh;
    .popup-box{
      position: fixed;
      top: 0;
    }
    .park-supermarket-top{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .park-supermarket-ico{
        flex: 1;
        .park-supermarket-top-ico{
          margin-top: 36px;
        }
      }
      .park-supermarket-top-title{
        text-align: center;
        flex: 5;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .park-supermarket-content-box{
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      height: calc(100vh - 66px);
      margin-top:66px ;
      .park-supermarket-nav{
        width: 100%;
        height: 160px;
      }
      .park-supermarket-park{
        width: 100%;
        height: 135%;
        .park-supermarket-notice{
          width: 100%;
          height: 300px;
          .park-supermarket-content-text{
            width: 80%;
            margin: auto;
            font-size: 12px;
            padding-top: 110px;
          }
          .notice-btn{
            margin:55px auto 30px auto;
            width: 150px;
            height: 40px;
            color: white;
            background-color: #ffa42f;
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
          }
        }
        .park-supermarket-activity{
          width: 90%;
          margin:120px auto 0 auto;
          height: 180px;
          .park-supermarket-activity-img{
            width: 30%;
            height: 180px;
            display: inline-block;
            float: left;
          }
          .park-supermarket-activity-content{
            display: inline-block;
            width: 60%;
            float: right;
            padding-left: 10%;
            .park-supermarket-activity-title{
              font-size: 16px;
              color: #7EA447;
            }
            .park-supermarket-activity-text{
              font-size: 14px;
              margin-top: 25px;
              line-height: 20px;
            }
            .park-supermarket-activity-time{
              margin-top: 10px;
              font-size: 13px;
              color: #7EA447;
            }
            .park-supermarket-activity-address{
              font-size: 13px;
              color: #7EA447;
              line-height: 28px;
            }
          }

        }
        .park-supermarket-extension{
          width: 90%;
          height: 180px;
          margin:140px auto 0 auto;
          .park-supermarket-extension-title{
            width: 25%;
            height: 180px;
            float: left;
            .extension-title{
              font-size: 33px;
              width: 33px;
              padding-left: 15px;
              padding-top: 25px;
              color: #FFA57B;
            }
          }
          .park-supermarket-extension-content{
            width: 65%;
            height: 180px;
            float: left;
            .park-supermarket-extension-text{
              font-size: 12px;
            }
            .park-supermarket-extension-detailed{
              font-size: 11px;
              margin-top: 30px;
              .extension-detailed{

              }
              .extension-detailed-name{

              }
              .extension-detailed-address{

              }
              .extension-detailed-url{

              }
              .extension-detailed-phone{
                padding-bottom: 50px;
              }
            }
          }
        }
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .park-supermarket-top{
        padding: 18px 0 0 0 ;
      }
      .park-supermarket-content-box{
        margin-top:84px ;
      }
    }
  }
</style>
