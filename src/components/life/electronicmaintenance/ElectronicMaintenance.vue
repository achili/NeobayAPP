<template>
  <div class="electronic-maintenance-content">
    <div class="electronic-maintenance-top">
      <div class="electronic-maintenance-ico" @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="electronic-maintenance-top-ico"
             >
        </div>
      </div>
      <div class="electronic-maintenance-top-title">{{title}}</div>
      <div class="electronic-maintenance-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="electronic-maintenance-content-list">
      <div class="electronic-maintenance-content-list-item" v-for="item in apartmentJson.apartmentList" :key="item.img" @click.stop="item.click">
        <div class="electronic-maintenance-content-list-item-img" :style="'background: url(\''+ item.img + '\') no-repeat; background-size: cover;'"></div>
        <div class="electronic-maintenance-content-list-item-text">
          <div class="electronic-maintenance-content-list-name">{{item.name}}</div>
          <div class="electronic-maintenance-content-list-btn" @click.stop="item.click">
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
        title:"电子维修",
        btn:"我要申请",
        apartmentJson:{
          apartmentList:{
            item1:{
              name:"奥布科技",
              detailed:{

              },
              img:require('../../../assets/img/life/e-item1.jpg'),
              click: function () {
                $router.openActivity("electronic_maintenance_apply", "slide-left");
              }
            },
            item2:{
              name:"电子科技",
              img:require('../../../assets/img/life/e-item2.png'),
              click: function () {
                $router.openActivity("electronic_maintenance_apply", "slide-left");
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
  .electronic-maintenance-content{
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .electronic-maintenance-top{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .electronic-maintenance-ico{
        flex: 1;
        .electronic-maintenance-top-ico{
          margin-top: 36px;
        }
      }
      .electronic-maintenance-top-title{
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .electronic-maintenance-content-list{
      width: 100%;
      height: 1000px;
      background-color: #f5f5f5;
      position: absolute;
      top: 66px;
      left: 0;
      .electronic-maintenance-content-list-item{
        width: 92%;
        height: 235px;
        background-color: #fff;
        border-radius: 11px;
        margin: 30px auto;
        .electronic-maintenance-content-list-item-img{
          width: 100%;
          height: 180px;
          border-radius: 11px 11px 0 0 ;
        }
        .electronic-maintenance-content-list-item-text{
          display: flex;
          line-height: 55px;
          .electronic-maintenance-content-list-name{
            flex:1;
            font-size: 16px;
            color: #323232;
            padding-left: 16px;
          }
          .electronic-maintenance-content-list-btn{
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
      .electronic-maintenance-top{
        padding: 18px 0 0 0 ;
      }
      .electronic-maintenance-content-list{
       top:84px;
      }
    }
  }

</style>
