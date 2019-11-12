<template>
  <div class="food-and-beverage-content">
    <div class="food-and-beverage-top">
      <div class="food-and-beverage-ico" @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="food-and-beverage-top-ico"
             >
        </div>
      </div>
      <div class="food-and-beverage-top-title">{{title}}</div>
      <div class="food-and-beverage-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="food-and-beverage-content-list">
      <div class="food-and-beverage-content-list-item" v-for="item in apartmentJson.apartmentList" :key="item.img" @click.stop="item.click">
        <div class="food-and-beverage-content-list-item-img" :style="'background: url(\''+ item.img + '\') no-repeat; background-size: cover;'"></div>
        <div class="food-and-beverage-content-list-item-text">
          <div class="food-and-beverage-content-list-name">{{item.name}}</div>
          <div class="food-and-beverage-content-list-btn" @click.stop="item.click">
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
      return {
        title:"餐饮美食",
        btn:"我要申请",
        apartmentJson:{
          apartmentList:{
            item1:{
              name:"赛舍空间",
              detailed:{

              },
              img:require('../../../assets/img/life/f-item1.png'),
              click: function () {
                $router.openActivity("food_and_beverage_apply", "slide-left");
              }
            },
            item2:{
              name:"食堂",
              img:require('../../../assets/img/life/f-item2.png'),
              click: function () {
                $router.openActivity("food_and_beverage_apply_canteen", "slide-left");
              }
            }
          }
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
  .food-and-beverage-content{
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .food-and-beverage-top{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .food-and-beverage-ico{
        flex: 1;
        .food-and-beverage-top-ico{
          margin-top: 37px;
        }
      }
      .food-and-beverage-top-title{
        flex: 1;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .food-and-beverage-content-list{
      width: 100%;
      height: 1000px;
      background-color: #f5f5f5;
      position: absolute;
      top: 66px;
      left: 0;
      .food-and-beverage-content-list-item{
        width: 92%;
        height: 235px;
        background-color: #fff;
        border-radius: 11px;
        margin: 30px auto;
        .food-and-beverage-content-list-item-img{
          width: 100%;
          height: 180px;
          border-radius: 11px 11px 0 0 ;
        }
        .food-and-beverage-content-list-item-text{
          display: flex;
          line-height: 55px;
          .food-and-beverage-content-list-name{
            flex:1;
            font-size: 16px;
            color: #323232;
            padding-left: 16px;
          }
          .food-and-beverage-content-list-btn{
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
      .food-and-beverage-top{
        padding: 18px 0 0 0 ;
      }
      .food-and-beverage-content-list{
       top:84px ;
      }
    }
  }

</style>
