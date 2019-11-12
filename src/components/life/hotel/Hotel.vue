<template>
  <div class="hotel-content">
    <div class="hotel-top">
      <div class="hotel-ico" @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="hotel-top-ico"
             >
        </div>
      </div>
      <div class="hotel-top-title">{{hotelJson.title}}</div>
      <div class="hotel-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="hotel-list">
      <div class="apartment-content-list-item" v-for="item in hotelJson.hotelData" :key="item.name" @click.stop="item.click">
        <div class="apartment-content-list-item-img" :style="'background: url(\''+ item.bgImg + '\') no-repeat; background-size: cover;'"></div>
        <div class="apartment-content-list-item-text">
          <div class="apartment-content-list-name">{{item.name}}</div>
          <div class="apartment-content-list-btn" @click.stop="goLogin(item.router)">
            <div class="btn">{{btn}}</div>
            <div class="btn-ico" :style =" 'background:url(\''+(require('../../../assets/img/life/right.png'))+'\')  no-repeat; background-size: cover;'"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        let $router = this.$router;
          return{
            user:this.$store.state.user,
            btn:"我要申请",
            hotelJson:{
              title:"酒店",
              hotelData:{
                manhattan:{
                  bgImg:require('../../../assets/img/life/h-manhattan.png'),
                  name:"曼哈顿酒店",
                  router:"hotel_apply_form"
                },
                sheraton:{
                  bgImg:require('../../../assets/img/life/h-sheraton.png'),
                  name:"喜来登酒店",
                  router:"hotel_apply_form"
                },
                pullman:{
                  bgImg:require('../../../assets/img/life/h-pullman.png'),
                  name:"铂尔曼酒店",
                  router:"hotel_apply_form"
                }
              }
            }
          }
      },
      methods:{
        goLogin(e){
          if(this.user.isLogin){
            this.$router.openActivity(e, "slide-left");
          }else {
            this.$router.openActivity('login');
          }
        },
        goClose(){
          this.$router.closeActivity()
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .hotel-content{
    height: 100vh;
  .hotel-top{
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: auto;
    display: flex;
    height: 66px;
  .hotel-ico{
    flex: 1;
  .hotel-top-ico{
    margin-top: 36px;
  }
  }
  .hotel-top-title{
    flex: 5;
    text-align: center;
    line-height: 94px;
    font-size: 18px;
    color: #323232;

  }
  }
    .hotel-list{
      background-color: #f5f5f5;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      height: calc(100vh - 66px);
      width: 100%;
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
      .hotel-top{
        padding: 18px 0 0 0 ;
      }
      .hotel-list{
        top:84px ;
      }
    }
  }
</style>
