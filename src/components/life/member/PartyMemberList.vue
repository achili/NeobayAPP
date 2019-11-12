<template>
  <div class="public-lists">
    <div class="parking-payment-top">
      <div class="parking-payment-ico"  @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="parking-payment-top-ico"
        >
        </div>
      </div>
      <div class="parking-payment-top-title">{{$t('message.Member')}}</div>
      <div class="parking-payment-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="public-list-center">
      <div v-for="item in partyList" :key="item.id" class="public-list-data">
        <div class="list-data-name">{{item.title}}</div>
        <div class="list-data-description">{{item.description}}</div>
        <div class="list-data-btn">
          <div class="btn"  @click.stop="item.click">{{$t('message.More')}}</div>
          <div class="btn-ico" :style =" 'background:url(\''+(require('../../../assets/img/life/right.png'))+'\')  no-repeat; background-size: cover;'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Activity from "../../../common/model/_base/Activity";
  import MakerOrganization from "../../../common/model/life/Organization/MakerOrganization";
  import Pager from "../../../common/model/_base/Pager";

  export default {
    name: "PartyMemberList",
    data(){
      let $router = this.$router;
      return{
        user: this.$store.state.user,
        partyList: [
          {
            title: '党员关系转入',
            description: '党员关系转入详情介绍',
            click: function () {
              $router.openActivity("party_member", "slide-left");
            }
          },
          {
            title: '党员关系转出',
            description: '党员关系转出详情介绍',
            click: function () {
              $router.openActivity("party_member_out", "slide-left");
            }
          }
        ]
      }
    },
    props:{
      activity:{
        type: Activity,
        required: false
      }
    },
    methods:{
      goClose(){
        this.$router.closeActivity()
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .public-lists{
    height: 100vh;
    .parking-payment-top{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .parking-payment-ico{
        flex: 1;
        .parking-payment-top-ico{
          margin-top: 36px;
        }
      }
      .parking-payment-top-title{
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .public-list-center{
      width: 100vw;
      height: calc(100vh - 66px);
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      margin-top: 66px;
      background-color: #f5f5f5;
      .public-list-data{
        width: 92%;
        height: 175px;
        background-color: #fff;
        border-radius: 11px;
        margin: 30px auto;
        .list-data-name{
          height: 50px;
          line-height: 50px;
          padding-left: 24px;
        }
        .list-data-description{
          height: 80px;
          line-height: 20px;
          padding: 0 24px;
          font-size: 14px;
          overflow: hidden;
        }
        .list-data-btn{
          margin-top: 5px;
          float: right;
          padding-right: 24px;
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
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .parking-payment-top{
        padding: 18px 0 0 0 ;
      }
      .public-list-center{
        margin-top:84px;
        height: calc(100vh - 84px);
      }
    }
  }
</style>
