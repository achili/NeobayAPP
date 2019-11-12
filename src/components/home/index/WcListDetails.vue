<template>
    <div class="wc-list-details-content">
      <div class="about-header">
        <div class="apartment-ico"  @click.stop="$router.closeActivity()">
          <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
               style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
          >
          </div>
        </div>
        <div class="apartment-top-title">{{ dataList.title }}</div>
        <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
      </div>
      <div class="list-details-content">
          <iframe :src="dataList.url"
                  width="100%" height="100%"
                  allowTransparency="true" style="border: none;">
            您的浏览器不支持嵌入式框架，推荐使用Chrome浏览器获得最佳体验。
          </iframe>
      </div>
    </div>
</template>

<script>
    import Activity from "../../../common/model/_base/Activity";

    export default {
        name: "WcListDetails",
      data(){
          return {
            officialCarouselPager: this.$store.state.officialCarouselPager,
            dataList:{
              title:"",
              url:""
            }
          }
      },
      props:{
        activity:{
          type: Activity,
          required: false
        }
      },
      methods:{

      },
      mounted(){
          if(this.activity.query.listUrl){
            this.officialCarouselPager.officialCarousels.forEach(e => {
              if(e.id === this.activity.query.listUrl){
                this.dataList = e;
              }
            })
          }else {
            this.dataList.url = this.activity.query.enclosureUrl;
          }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .wc-list-details-content{
    height: 100vh;
    width: 100vw;
    .about-header {
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
    .list-details-content{
      width: 100vw;
      height: calc(100vh - 66px);
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      margin-top: 66px;
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .about-header{
        padding: 18px 0 0 0 ;
      }
      .list-details-content{
        margin-top: 84px;
        height: calc(100vh - 84px);
      }
    }
  }
</style>
