<template>
  <div class="electronic-maintenance-apply-content">
    <div class="electronic-maintenance-apply-top">
      <div class="electronic-maintenance-apply-ico"  @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 33px;margin-left: 15px;" class="electronic-maintenance-apply-top-ico"
            >
        </div>
      </div>
      <div class="electronic-maintenance-apply-top-title">{{maintenanceJson.title}}</div>
      <div class="electronic-maintenance-apply-ico" style="width: 23px;height: 17px;"></div>
    </div>
      <!--<Swiper :imgUrlList="maintenanceJson.navUrl" :intervalTime="4000" :transitionTime="500"></Swiper>-->
    <div class="electronic-maintenance-content-box">
      <wc-swiper class="electronic-maintenance-apply-nav">
        <wc-slide v-for="(slide, key) in maintenanceJson.navUrl" :key="key" >
          <div  class="apply-nav" :style="'background: url(\''+ slide + '\') no-repeat; background-size: cover;'"></div>
        </wc-slide>
      </wc-swiper>
      <div class="electronic-maintenance-apply-title">
        <div class="electronic-maintenance-apply-max-text">
          {{maintenanceJson.maxText}}
        </div>
        <div class="electronic-maintenance-apply-min-text">
          {{maintenanceJson.minText}}
        </div>
      </div>
      <div class="electronic-maintenance-apply-abstract">
        <div class="electronic-maintenance-apply-abstract-title">
          {{maintenanceJson.abstractTitle}}
        </div>
        <div class="electronic-maintenance-apply-abstract-text">
          {{maintenanceJson.abstractText}}
        </div>
      </div>
      <div class="electronic-maintenance-apply-clause">
        <div class="electronic-maintenance-apply-clause-title">
          {{maintenanceJson.serviceScopeText}}
        </div>
        <div class="electronic-maintenance-apply-clause-list">
          <ul class="electronic-maintenance-apply-clause-text">
            <li class="list"><span>{{maintenanceJson.serviceScopeContent1}}</span></li>
            <li class="list"><span>{{maintenanceJson.serviceScopeContent2}}</span></li>
            <li class="list"><span>{{maintenanceJson.serviceScopeContent3}}</span></li>
          </ul>
        </div>
      </div>
      <div class="electronic-maintenance-apply-call">
        <div class="call-text">{{maintenanceJson.callText}}</div>
        <div class="call-phone">预约电话：{{maintenanceJson.callPhone}}</div>
        <div class="call-address">公司地址：{{maintenanceJson.callAddress}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "../../widget/NbSwiper";
    export default {
        name: "ElectronicMaintenanceApply",
      data(){
          return{
            maintenanceJson:{
              title:"奥布科技",
              navUrl:[
                require('../../../assets/img/life/EM-banner.png'),
                require('../../../assets/img/life/EM-banner2.jpg')
              ],
              maxText:"电子维修（奥布科技）",
              minText:"可上门维修",
              abstractTitle:"产品介绍",
              abstractText:"为了每一位创业者安心的办公，园区内特别设有电子维修公司，奥布科技有限公司，公司工作室位于赛舍空间，有专业的技术团队，随时为创业者们服务。",
              serviceScopeText:"服务范围",
              serviceScopeContent1:"手机（包括贴膜、碎屏等）",
              serviceScopeContent2:"Ipad（更新系统、贴膜、碎屏服务等）",
              serviceScopeContent3:"电脑（重装系统、电脑清洗、定期维修、碎屏服务、内存等）",
              callText:"联系方式",
              callPhone:"18017694449",
              callAddress:"上海市闵行区零号湾1号楼赛舍空间内"
            }
          }
      },
      components:{
        Swiper
      },
      methods:{
        goClose(){
          this.$router.closeActivity()
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .electronic-maintenance-apply-content{
    height: 100vh;
    .electronic-maintenance-apply-top{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .electronic-maintenance-apply-ico{
        flex: 1;
        .electronic-maintenance-apply-top-ico{
          margin-top: 36px;
        }
      }
      .electronic-maintenance-apply-top-title{
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .electronic-maintenance-content-box{
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      margin-top:66px ;
      height: calc(100vh - 66px);
      .electronic-maintenance-apply-nav{
        width: 100%;
        height: 160px;
        .apply-nav{
          width: 100%;
          height: 160px;
        }
      }
      .electronic-maintenance-apply-title{
        padding: 25px 16px 0 16px;

        .electronic-maintenance-apply-max-text{
          font-size: 20px;
          color: #515151;
        }
        .electronic-maintenance-apply-min-text{
          margin-top: 13px;
          font-size: 15px;
          color: #ffa42f;
          padding-bottom: 18px;
          border-bottom: 1px solid #888888 ;
        }
      }
      .electronic-maintenance-apply-abstract{


        padding: 17px 16px 0 16px;
        .electronic-maintenance-apply-abstract-title{
          font-size: 15px;
          color: #888888;
        }
        .electronic-maintenance-apply-abstract-text{
          margin-top: 10px;
          font-size: 15px;
          padding:0 14px 20px 0;
          color:#323232;
          border-bottom: 1px solid #888888;
        }
      }
      .electronic-maintenance-apply-clause{


        padding: 17px 16px 0 16px;
        .electronic-maintenance-apply-clause-title{
          font-size: 15px;
          color: #888888;
        }
        .electronic-maintenance-apply-clause-list{
          padding:0 16px 5px 0;
          .electronic-maintenance-apply-clause-text{
            margin-left: -22px;
            margin-top: 10px;
            .list{
              margin-top: 10px;
              color: #ffa42f;
            }
            .list span{
              color: #323232;
              font-size: 15px;
            }
          }
          border-bottom: 1px solid #888888;
        }
      }
      .electronic-maintenance-apply-call{

        padding: 17px 16px 21px 16px;
        font-size: 15px;
        .call-text{
          color: #888888;
        }
        .call-phone{
          margin-top: 10px;
        }
        .call-address{
          margin-top: 5px;
        }
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .electronic-maintenance-apply-top{
        padding: 18px 0 0 0 ;
      }
      .electronic-maintenance-content-box{
        margin-top:84px ;
      }
    }
  }
</style>
