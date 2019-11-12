<template>
  <div class="food-and-beverage-apply">
    <div class="food-and-beverage-apply-top">
      <div class="food-and-beverage-apply-ico" @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="food-and-beverage-apply-top-ico"
             >
        </div>
      </div>
      <div class="food-and-beverage-apply-top-title">{{beverageJson.title}}</div>
      <div class="food-and-beverage-apply-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="food-and-beverage-apply-content">
      <div class="food-and-beverage-apply-nav" :style="'background: url(\''+ beverageJson.navUrl + '\') no-repeat; background-size: cover;'"></div>
      <div class="food-and-beverage-apply-title-content">
        <div class="food-and-beverage-apply-name">
          {{beverageJson.name}}
        </div>
        <div class="food-and-beverage-apply-synopsis">
          "{{beverageJson.synopsis}}"
        </div>
        <div class="food-and-beverage-apply-business-hours">
          营业时间：{{beverageJson.businessHours}}
        </div>
      </div>
      <div class="food-and-beverage-apply-address-call">
        <div class="food-and-beverage-apply-address">
          <div class="apply-address-ico" :style="'background: url(\''+ beverageJson.addressIco + '\') no-repeat; background-size: cover;'"></div>
          <div class="apply-address-text">{{beverageJson.address}}</div>
        </div>
        <div class="food-and-beverage-apply-call">
          <div class="apply-call-ico" :style="'background: url(\''+ beverageJson.callIco + '\') no-repeat; background-size: cover;'"></div>
          <div class="apply-call-text">{{beverageJson.call}}</div>
        </div>
      </div>
      <div class="food-and-beverage-apply-text-content">
        <div class="food-and-beverage-apply-text1">
          {{beverageJson.text1}}
        </div>
        <div class="food-and-beverage-apply-img" :style="'background: url(\''+ beverageJson.contentImg + '\') no-repeat; background-size: cover;'"></div>
        <div class="food-and-beverage-apply-text2">
          {{beverageJson.text2}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FoodAndBeverageApply",
      data(){
          return{
            beverageJson:{
              title:"餐饮美食",
              navUrl:require('../../../assets/img/life/FAB-banner.png'),
              name:"赛舍空间",
              synopsis:"在繁忙的工作中享受片刻的美好",
              businessHours:"08:00 - 18:00 ",
              addressIco:require('../../../assets/svg/life/index/address.svg'),
              address:"零号湾科技楼1号楼1层咖啡馆",
              callIco:require('../../../assets/svg/life/index/call.svg'),
              call:"021-64970237",
              text1:"塞舍空间位于零号湾科技大楼1号楼1层，有咖啡、果汁、甜点、西餐和会议室。在疲惫的工作之余，可以到塞舍空间享受一杯香醇的咖啡，或与同事在午餐时间享受一餐西餐。",
              contentImg:require('../../../assets/img/life/FAB-img.png'),
              text2:"塞舍空间同时提供会议室租赁，可在宽敞的会议室中，与团队火热的聊着自己的创意。塞舍空间会议室的租赁200元/小时，满3小时优惠可送14杯咖啡。"
            }
          }
      },
      methods:{
        goClose(){
          this.$router.closeActivity()
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .food-and-beverage-apply{
    height: 100vh;

    .food-and-beverage-apply-top{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .food-and-beverage-apply-ico{
        flex: 1;
        .food-and-beverage-apply-top-ico{
          margin-top: 36px;
        }
      }
      .food-and-beverage-apply-top-title{
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .food-and-beverage-apply-content{
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      height: calc(100vh - 66px);
      margin-top: 66px;
      .food-and-beverage-apply-nav{
        width: 100%;
        height: 210px;
      }
      .food-and-beverage-apply-title-content{
        width: 100%;
        color:#323232;
        text-align: center;
        .food-and-beverage-apply-name{
          font-size: 21px;
          margin: 18px 0 16px 0;
        }
        .food-and-beverage-apply-synopsis{
          font-size: 15px;
          padding-bottom: 13px;
        }
        .food-and-beverage-apply-business-hours{
          font-size: 15px;
          padding-bottom:29px;
        }
      }
      .food-and-beverage-apply-address-call{
        padding-left: 16px;
        font-size: 14px;
        .food-and-beverage-apply-address{
          display: flex;
          .apply-address-ico{
            width: 12px;
            height: 14px;
            margin-top: 2px;
          }
          .apply-address-text{
            margin-left: 13px;
            color: #0A70D0;
          }
        }
        .food-and-beverage-apply-call{
          display: flex;
          .apply-call-ico{
            width: 16px;
            height: 14px;
            margin-top: 2px;
          }
          .apply-call-text{
            margin-left: 10px;
            color: #0A70D0;
          }
        }
      }
      .food-and-beverage-apply-text-content{
        margin-top: 19px;
        color:#323232;
        font-size: 15px;
        .food-and-beverage-apply-text1{
          padding: 0 16px 12px 16px;
        }
        .food-and-beverage-apply-img{
          width: 100%;
          height: 200px;
        }
        .food-and-beverage-apply-text2{
          padding: 12px 16px;
          margin-bottom: 30px;
        }
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .food-and-beverage-apply-top{
        padding: 18px 0 0 0 ;
      }
      .food-and-beverage-apply-content{
        margin-top:84px ;
      }
    }
  }
</style>
