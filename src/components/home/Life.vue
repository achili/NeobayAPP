<template>
  <div class="left-home-index-content">
    <div class="top-title-life">{{$t(lifeJson.title)}}</div>
    <div class="list-business-content">
      <div class="nav-box-img" :style="'background: url(\''+ lifeJson.navUrl + '\') no-repeat; background-size: cover;'"></div>
      <div class="life-content-list-business">
        <div class="life-item-content" v-for="item in lifeJson.dataList" :key="item.name" @click.stop="item.click">
          <div class="life-item-ico" :style="'background: url(\''+ item.ico + '\') no-repeat;'"></div>
          <div class="life-item-name">{{$t(item.name)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import popUp from "../../v-activity/more/popup/popUp";
  export default {
    data() {
      let $router = this.$router;
      let $store = this.$store;
      let that = this;
      return {
        title: "提交成功",
        description: "管理人员将会与您联系",
        createWord: "确定",
        popUpShow: false,
        lifeJson : {
          title:"message.Life",
          navUrl:require('../../assets/img/life/flowers-desk-office-vintage.jpg'),
          dataList:{
            // solution:{
            //   name:"message.Card",
            //   type:"MakerCard",
            //   ico:require('../../assets/svg/life/index/one-card-solution.svg'),
            //   click: function () {
            //     $router.openActivity("one_card_solution", "slide-left");
            //   }
            // },
            apartment:{
              name:"message.Apartment",//人才公寓
              type:"Apartment",
              ico:require('../../assets/svg/life/index/apartment.svg'),
              click: function () {
                $router.openActivity("public_list", "slide-left",{title:"message.Apartment",type:'APARTMENT'});
              }
            },
            hotel:{
              name:"message.Hotel",//协议酒店
              type:"MakerHotel",
              ico:require('../../assets/svg/life/index/hotel.svg'),
              click: function () {
                $router.openActivity("public_list", "slide-left",{title:"message.Hotel",type:'HOTEL'});
              }
            },
            // car:{
            //   name:"message.Car",//汽车服务
            //   type:"AutomobileService",
            //   ico:require('../../assets/svg/life/index/car.svg'),
            //   click: function () {
            //     $store.state.plus.nativeUI.toast(that.$t('message.ComingSoon'));
            //   }
            // },
            // supermarket:{
            //   name:"message.Market",//园区集市
            //   type:"ParkSupermarket",
            //   ico:require('../../assets/svg/life/index/park-supermarket.svg'),
            //   click: function () {
            //     $router.openActivity("public_list", "slide-left",{title:"message.Market",type:'MARKET'});
            //   }
            // },
            // maintenance:{
            //   name:"message.Electronic",//电子维修
            //   type:"ElectronicMaintenance",
            //   ico:require('../../assets/svg/life/index/electronic-maintenance.svg'),
            //   click: function () {
            //     $router.openActivity("public_list", "slide-left",{title:"message.Electronic",type:'ELECTRONIC'});
            //   }
            // },
            payment:{
              name:"message.Park",//停车缴费
              type:"ParkingPayment",
              ico:require('../../assets/svg/life/index/parking-payment.svg'),
              click: function () {
                $router.openActivity("parking_payment", "slide-left");
              }
            },
            sport:{
              name:"message.Sport",//体育运动
              type:"Sport",
              ico:require('../../assets/svg/life/index/sport.svg'),
              click: function () {
                $router.openActivity("public_list", "slide-left",{title:"message.Sport",type:'SPORT'});
              }
            },
            // beverage:{
            //   name:"message.Food",//美食餐饮
            //   type:"FoodAndBeverage",
            //   ico:require('../../assets/svg/life/index/food-and-beverage.svg'),
            //   click: function () {
            //     $router.openActivity("public_list", "slide-left",{title:"message.Food",type:'FOOD'});
            //   }
            // },
            // training:{
            //   name:"message.Education",//教育培训
            //   type:"EducationAndTraining",
            //   ico:require('../../assets/svg/life/index/education-and-training.svg'),
            //   click: function () {
            //     $store.state.plus.nativeUI.toast(that.$t('message.ComingSoon'));
            //   }
            // },
            // logistics:{
            //   name:"message.Package",//快递物流
            //   type:"ExpressLogistics",
            //   ico:require('../../assets/svg/life/index/express-logistics.svg'),
            //   click: function () {
            //     $store.state.plus.nativeUI.toast(that.$t('message.ComingSoon'));
            //   }
            // },
            // services:{
            //   name:"message.Property",//快递物流
            //   type:"PropertyServices",
            //   ico:require('../../assets/svg/life/index/property-services.svg'),
            //   click: function () {
            //     $store.state.plus.nativeUI.toast(that.$t('message.ComingSoon'));
            //   }
            // },
            partyMember:{
              name:"message.Member",//党员服务
              type:"PartyMember",
              ico:require('../../assets/svg/life/index/party-member.svg'),
              click: function () {
                $router.openActivity("party_member_list", "slide-left");
              }
            },
            psychologyCounselling:{
              name:"message.PsychologicalCounselling",//心理辅导
              type:"PsychologicalCounselling",
              ico:require('../../assets/svg/life/index/counselling.svg'),
              click: function () {
                $router.openActivity("public_list", "slide-left",{title:"message.PsychologicalCounselling",type:'PSYCHOLOGICAL'});
              }
            },
            insuranceBroker:{
              name:"message.InsuranceBroker",//保险经纪
              type:"InsuranceBroker",
              ico:require('../../assets/svg/life/index/broker.svg'),
              click: function () {
                $router.openActivity("public_list", "slide-left",{title:"message.InsuranceBroker",type:'INSURANCE'});
              }
            }
          }
        }
      }
    },
    props: {

    },
    components: {
      popUp
    },
    methods: {
      openPopUp() {
        this.popUpShow = true;
      },
      closeAllPopup() {
        this.popUpShow = false;
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .left-home-index-content {
    height: 100vh;
    .top-title-life{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 66px;
      text-align: center;
      line-height: 94px;
      font-size: 17px;
      color: #323232;
    }

    .list-business-content{
      height: calc(100vh - 65px);
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .nav-box-img{
        margin-top:66px;
        width: 100%;
        height: 210px;

      }
      .life-content-list-business{
        width: 100%;
        height: 515px;
        .life-item-content{
          float: left;
          width: 33%;
          text-align: center;
          height: 100px;
          border-right:1px solid #efefef ;
          border-bottom:1px solid #efefef ;
          .life-item-ico{
            width: 40px;
            height: 40px;
            margin: 20px auto 0 auto;
          }
          .life-item-name{
            font-size: 12px;
            color: #222222;
            margin-top: 5px;
          }
        }
        .life-item-content:nth-child(3){
          border-right:none;
        }
        .life-item-content:nth-child(6){
          border-right:none;
        }
        .life-item-contents:nth-child(1){
          border-right:none;
        }.life-item-contents:nth-child(3){
           border-right:1px solid #efefef;
         }
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .top-title-life{
        padding: 18px 0 0 0 ;
      }
      .nav-box-img{
        margin-top: 84px;
      }
    }
  }
</style>
