<template>
    <div class="my-project-content">
      <div class="my-project-order-top">
        <div class="close-ico" @click.stop="goClose">
          <div :style =" 'background:url(\''+(require('../../../assets/svg/home/activity/return-black.svg'))+'\') center no-repeat'"
               style="margin-top: 36px ;width: 10px;height: 21px;margin-left: 15px;"
               ></div>
        </div>

        <div class="page-title">{{$t('message.Order')}}</div>
        <div class="close-ico-1"></div>
      </div>
      <div class="my-project-content-scroll">
        <scroller ref="newsScroller"
                  :on-refresh="refresh"
                  :refreshText="$t(refreshText)"
                  :noDataText="$t(noDataText)"
                  :on-infinite="infinite"
                  class="scroll-margin">
          <div class="content-scroll">
              <div class="list-item " v-for="(item,index) in pager.markAlls" data-type="0" :key="index">
                <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                  <div class="content-scroll-item-top">
                    <div class="content-scroll-item-top-title">
                      <div v-for="val in listType" :key="val.name" v-if="item.type === val.value">{{val.name}}申请</div>
                    </div>
                    <div class="content-scroll-item-top-edit">
                      {{item.createTime | simpleDateTime}}
                    </div>
                  </div>
                  <div class="">

                  </div>
                  <div class="content-scroll-item-footer">
                    <div class="content-scroll-order-footer-day"  @click.stop="activeEdit(item)">
                      {{$t('message.Edit')}}
                    </div>
                  </div>
                </div>
                <div class="delete" @click="openCallService(item)" :data-index="item.index">{{$t('message.Cancel')}}</div>
              </div>
          </div>
        </scroller>
        <div class="popup-box" v-if="callServiceShow">
          <CancelActive :title="title" :closeCall="closeAllPopup" :entity="enroll" :refresh="refresh" :restSlide="restSlide"></CancelActive>
        </div>
      </div>
    </div>
</template>

<script>
  import Pager from "../../../common/model/_base/Pager";
  import CancelActive from "../../../v-activity/more/order/CancelActive";
  import MakerSimpleApply from "../../../common/model/life/PublicSimpleApply/MakerSimpleApply";
  import MarkAll from "../../../common/model/reservation/MarkAll";
    export default {
      data(){
          return {
            startX : 0 ,
            endX : 0,
            callServiceShow: false,
            enroll: null,
            user: this.$store.state.user,
            pager:new Pager(MarkAll),
            title:"message.Order",
            refreshText: "message.DropDownData",
            noDataText: 'message.NoMoreData',
            listType : [
              {
                name: "企业服务",
                value: "KEEPER_BUSINESS",
                style: ""
              },
              // {
              //   name: "一卡通",
              //   value: "ONE_CARD",
              //   style: ""
              // },
              {
                name: "人才公寓",
                value: "APARTMENT",
                style: ""
              },
              {
                name: "协议酒店",
                value: "HOTEL",
                style: ""
              },
              {
                name: "体育运动",
                value: "SPORT",
                style: ""
              },
              {
                name: "汽车租赁",
                value: "CAR",
                style: ""
              },
              {
                name: "电子维修",
                value: "ELECTRONIC",
                style: ""
              },
              {
                name: "停车缴费",
                value: "PARK",
                style: ""
              },
              {
                name: "美食",
                value: "FOOD",
                style: ""
              },
              // {
              //   name: "教育培训",
              //   value: "EDUCATION",
              //   style: ""
              // },
              {
                name: "快递物流",
                value: "EXPRESS",
                style: ""
              },
              {
                name: "物业服务",
                value: "SERVICE",
                style: ""
              }
            ]
          }
      },
      components:{CancelActive},
      methods:{
        activeEdit(i) {
          this.$store.state.callback = this.refresh;
          if(i.category === 'MAKER_HOTEL'){
            this.$router.openActivity("hotel_apply_form","slide-left",{itemId:i.id});
          }else if (i.category === 'MAKER_CARD') {
            this.$router.openActivity("one_card_solution_apply_form","slide-left",{itemId:i.id});
          }else if(i.category === 'KEEPER_BUSINESS'){
            this.$router.openActivity("service_create","slide-left",{obId:i.id});
          }else if(i.category === 'MAKER_SIMPLE_APPLY'){
            this.$router.openActivity("public_apply_from","slide-left",{obId:i.id,type:i.type});
          }
        },
        //返回
        goClose(){
          this.$router.closeActivity()
        },
        closeAllPopup() {
          this.callServiceShow = false;
        },
        openCallService(item) {
          this.enroll = item;
          this.callServiceShow = true;
        },
        refresh(done) {
          let that = this;
          this.pager.page = 0;
          this.pager.httpCustomPage(
            MarkAll.MARK_ALL_URL,
            {page: this.pager.page, pageSize: this.pager.pageSize,creatorId:this.user.id},
            function(response){
              that.pager.page++;
              done && done();
            },function () {
              done && done();
            });
        },
        infinite(done) {
          let that = this;
          this.pager.httpNextPage(
            MarkAll.MARK_ALL_URL,
            {page: this.pager.page, pageSize: this.pager.pageSize,creatorId:this.user.id},
            function(response){
              that.$refs.newsScroller.finishInfinite(true);
            }, function () {
              done();
            }, function () {
              done();
            }, function () {

            }
          );
        },
        //跳转
        skip(){
          if( this.checkSlide() ){
            this.restSlide();
          }else{

          }
        },
        //滑动开始
        touchStart(e){
          // 记录初始位置
          this.startX = e.touches[0].clientX;
        },
        //滑动结束
        touchEnd(e){
          // 当前滑动的父级元素
          let parentElement = e.currentTarget.parentElement;
          // 记录结束位置
          this.endX = e.changedTouches[0].clientX;
          // 左滑
          if( parentElement.dataset.type === "0" && this.startX - this.endX > 30 ){
            this.restSlide();
            parentElement.dataset.type = 1;
          }
          // 右滑
          if( parentElement.dataset.type === "1" && this.startX - this.endX < -30 ){
            this.restSlide();
            parentElement.dataset.type = 0;
          }
          this.startX = 0;
          this.endX = 0;
        },
        //判断当前是否有滑块处于滑动状态
        checkSlide(){
          let listItems = document.querySelectorAll('.list-item');
          for( let i = 0; i < listItems.length; i++){
            if( listItems[i].dataset.type === 1 ) {
              return true;
            }
          }
          return false;
        },
        //复位滑动状态
        restSlide(){
          let listItems = document.querySelectorAll('.list-item');
          // 复位
          for( let i = 0; i < listItems.length; i++){
            listItems[i].dataset.type = 0;
          }
        }
      },
      mounted(){
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
.my-project-content{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling:touch;
  .my-project-order-top{
    margin: auto;
    height: 66px;
    position: relative;
    border-bottom: 1px solid #d7dcdd;
    display: flex;
    .close-ico-1 {
      flex:1;
    }
    .close-ico {
      flex:1;
    }
    .page-title{
      font-size: 18px;
      flex: 5;
      margin: 0 auto;
      height: 66px;
      line-height: 94px;
      text-align: center;
      font-weight: bold;
    }
  }
  .my-project-content-scroll{
    .scroll-margin{
      margin-top: 67px;
        .content-scroll{
          width: 95%;
          height: 100%;
          padding-left: 5%;
          .list-item{
            position: relative;
            height: 105px;
            transition: all 0.2s;
            border-bottom: 1px solid #d7dcdd;
            .list-box{
              background: #fff;
              align-items: center;
              box-sizing: border-box;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              overflow: hidden;
              .content-scroll-item-top {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .content-scroll-item-top-title {
                  color: #484848;
                  font-weight: bold;
                  font-size: 18px;
                  margin-top: 5px;
                }
                .content-scroll-item-top-edit {
                  padding-right: 16px;
                  text-align: right;
                  font-size: 15px;
                  margin-top: 9px;
                }
              }


              .content-scroll-item-footer{
                padding: 47px 16px 0 0;
                height: 20px;
                font-size: 15px;
                float: right;
                color: #484848;
                .content-scroll-order-footer-day{
                  color: #459ee9;
                }
              }

            }
            .delete{
              width: 75px;
              height: 105px;
              background: #ce0058;
              font-size: 17px;
              color: #fff;
              text-align: center;
              line-height: 105px;
              position: absolute;
              top:0;
              right: -75px;
            }
          }
          .list-item[data-type="0"]{
            transform: translate3d(0,0,0);
          }
          .list-item[data-type="1"]{
            transform: translate3d(-75px,0,0);
          }
          .list-item:after{
            position: absolute;
            left: 75px;
            bottom: 0;
            right: 0;
            color: #ccc;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            z-index: 2;
          }
        }
    }
  }
  @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
    .my-project-order-top{
      padding: 18px 0 0 0 ;
    }
    .my-project-content-scroll{
      margin-top:85px ;
      .scroll-margin{
        margin-top:85px ;
      }
    }
  }
}
</style>
