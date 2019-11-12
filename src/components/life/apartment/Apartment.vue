<template>
  <div class="apartment-content">
    <div class="apartment-top">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="apartment-top-ico"
           >
        </div>
      </div>
      <div class="apartment-top-title">{{title}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="apartment-content-list">
      <div class="apartment-content-list-item" v-for="item in apartmentJson.apartmentList" :key="item.img" @click.stop="item.click">
        <div class="apartment-content-list-item-img" :style="'background: url(\''+ item.img + '\') no-repeat; background-size: cover;'"></div>
        <div class="apartment-content-list-item-text">
          <div class="apartment-content-list-name">{{item.name}}({{item.address}})</div>
          <div class="apartment-content-list-btn" @click.stop="openPopUp">
            <div class="btn">{{btn}}</div>
            <div class="btn-ico" :style =" 'background:url(\''+(require('../../../assets/img/life/right.png'))+'\')  no-repeat; background-size: cover;'"></div>
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
          return {
            title:"公寓",
            btn:"我要申请",
            tit: "请您登录官方网站平台进行进一步申请",
            description: "https://neoBay.cn/enter/finance",
            createWord: "确定",
            popUpShow: false,
            apartmentJson:{
              apartmentList:{
                item1:{
                  name:"江川公寓",
                  address:"某某路",
                  detailed:{

                  },
                  img:require('../../../assets/img/life/item1.png'),
                  click: function () {
                    $router.openActivity("apartment_apply", "slide-left");
                  }
                },
                item2:{
                  name:"人才公寓",
                  address:"某某路",
                  img:require('../../../assets/img/life/item2.png'),
                  click: function () {
                    $router.openActivity("apartment_apply", "slide-left");
                  }
                }
              }
            }
          }
      },
      components:{popUp},
      methods:{
        openPopUp(){
          this.popUpShow = true;
        },
        closeAllPopup() {
          this.popUpShow = false;
        },
        goClose(){
          this.$router.closeActivity()
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .apartment-content{
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .popup-box{
      position: fixed;
      top: 0;
    }
    .apartment-top{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .apartment-ico{
        flex: 1;
        .apartment-top-ico{
          margin-top: 36px;
        }
      }
      .apartment-top-title{
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
  .apartment-content-list{
    width: 100%;
    height: 1000px;
    background-color: #f5f5f5;
    position: absolute;
    top: 66px;
    left: 0;
    .apartment-content-list-item{
      width: 92%;
      height: 235px;
      background-color: #fff;
      border-radius: 11px;
      margin: 30px auto;
      .apartment-content-list-item-img{
        width: 100%;
        height: 180px;
        border-radius: 11px 11px 0 0 ;
      }
      .apartment-content-list-item-text{
        display: flex;
        line-height: 55px;
        .apartment-content-list-name{
          flex:1;
          font-size: 16px;
          color: #323232;
          padding-left: 16px;
        }
        .apartment-content-list-btn{
          float: right;
          margin-right: 24px;
          .btn{
            display: inline-block;
            font-size: 13px;
            color: #1483ff;
          }
          .btn-ico{
            display: inline-block;
            width: 6px;
            height: 11px;
          }
        }
      }
    }
  }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .apartment-top{
        padding: 18px 0 0 0 ;
      }
      .apartment-content-list{
       top:84px ;
      }
    }
  }

</style>
