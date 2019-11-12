<template>
    <div class="public-list">
      <div class="parking-payment-top">
        <div class="parking-payment-ico"  @click.stop="goClose">
          <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
               style="width: 10px;height: 21px;margin-left: 15px;" class="parking-payment-top-ico"
          >
          </div>
        </div>
        <div class="parking-payment-top-title">{{$t(activity.query.title)}}</div>
        <div class="parking-payment-ico" style="width: 23px;height: 17px;"></div>
      </div>
      <div class="public-list-content">
        <div v-for="item in pager.makerOrganizations" :key="item.id" class="public-list-data" @click.stop="openPublic(item)">
          <div class="list-data-image">
            <div v-if="item.logo != null" :style="'background: url(\''+ item.logo.url + '\') no-repeat;'" class="list-img"></div>
            <div v-else class="list-img-null"></div>
          </div>
          <div class="list-data-center">
            <div class="list-data-name">{{item.name}}</div>
            <div class="list-data-description">{{item.description}}</div>
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
      name: "PublicList",
      data(){
          return{
            user: this.$store.state.user,
            pager:new Pager(MakerOrganization)
          }
      },
      props:{
        activity:{
          type: Activity,
          required: false
        }
      },
      methods:{
        openPublic(e){
          if(this.user.isLogin){
            this.$router.openActivity("public_apply_from", "slide-left",{type:e.type,eId:e.id});
          }else {
            this.$router.openActivity('login');
          }
        },
        goClose(){
          this.$router.closeActivity()
        },
        fastPage(){
          let that = this;
          this.pager.setFilterValue("status", "FINISH");
          this.pager.setFilterValue("type", this.activity.query.type);
          this.pager.httpFastPage(function () {});
        }
      },
      mounted(){
        this.fastPage();
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .public-list{
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
    .public-list-content{
      width: 100vw;
      height: calc(100vh - 66px);
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      margin-top: 66px;
      background-color: #f5f5f5;
      .public-list-data{
        width: 92%;
        height: 135px;
        background-color: #fff;
        border-radius: 11px;
        margin: 30px auto;
        display: flex;
        .list-data-image{
          flex: 1;
          text-align: center;
          .list-img{
            width: 98px;
            height: 98px;
            margin: 19px auto 0 auto;
            border-radius: 5px;
            background-size: cover !important;
            background-position:center !important;
          }
          .list-img-null{
            width: 98px;
            height: 98px;
            margin: 19px auto 0 auto;
            border-radius: 5px;
            background: #f5f5f5;
          }
        }
        .list-data-center{
          flex: 2;
          padding: 0 10px 0 0;
          .list-data-name{
            margin-top: 8px;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            overflow: hidden;
          }
          .list-data-description{
            height: 68px;
            line-height: 17px;
            font-size: 11px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
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
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .parking-payment-top{
        padding: 18px 0 0 0 ;
      }
      .public-list-content{
        margin-top:84px;
        height: calc(100vh - 84px);
      }
    }
  }
</style>
