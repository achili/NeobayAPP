<template>
  <div class="order-enroll-container">
    <div class="order-top">
      <div class="close-ico"  @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/svg/home/activity/return-black.svg'))+'\') center no-repeat'"
             style="margin-top: 37px ;width: 10px;height: 22px;margin-left: 15px;"
            ></div>
      </div>

      <div class="page-title">{{$t('message.MyApply')}}</div>
      <div class="close-ico-1"></div>
    </div>
    <div class="order-list-item">
      <scroller ref="newsScroller"
                :on-refresh="refresh"
                :refreshText="$t(refreshText)"
                :noDataText="$t(noDataText)"
                :on-infinite="infinite"
                class="scroller-margin"
      >
        <div class="order-list-item-container">
          <div class="list-item " v-for="(officialActivityApply,index) in pager.officialActivityApplies" data-type="0" :key="index" v-if="!officialActivityApply.officialActivity.deleted">
            <div class="list-box"  @click="skip">
              <div class="order-item-top">
                <div class="order-item-top-title">
                  {{officialActivityApply.leader}}
                </div>
                <div class="order-item-top-edit" >
                   {{officialActivityApply.createTime | yearTime }}
                </div>
              </div>

              <div class="remarks">
                <span class="room-item-container">
                </span>
              </div>
              <div class="room-item-footer">
                <div class="room-order-footer-day">
                  {{$t('message.Phone')}}: {{officialActivityApply.phone}}
                </div>
                <div class="room-order-footer-time" @click.stop="orderEdit(officialActivityApply)" v-if="officialActivityApply.officialActivity.status !== 'FINISH'">
                  {{$t('message.Edit')}}
                </div>
                <div class="room-order-footer-time" v-if="officialActivityApply.officialActivity.status === 'FINISH'">
                  {{$t('message.Expired')}}
                </div>
              </div>
            </div>
            <div class="delete" @click="openCallService(officialActivityApply)" :data-index="officialActivityApply.index">{{$t('message.Cancel')}}</div>
          </div>
        </div>
      </scroller>

      <div class="popup-box" v-if="callServiceShow">
        <CancelActive :title="title" :closeCall="closeAllPopup" :entity="officialActivityApply" :refresh="refresh"></CancelActive>
      </div>
    </div>
  </div>
</template>

<script>
  import CancelActive from "../../../v-activity/more/order/CancelActive";
  import OfficialActivity from "../../../common/model/index/OfficialActivity"
  import OfficialActivityApply from "../../../common/model/index/OfficialActivityApply"

  export default{
    data () {
      return {
        startX : 0 ,
        endX : 0,
        callServiceShow: false,
        user: this.$store.state.user,
        officialActivity: new OfficialActivity(),
        officialActivityApply: new OfficialActivityApply(),
        pager:this.$store.state.OfficialActivityApplyPager,
        title:"message.Apply",
        name:"activeOrder",
        refreshText: "message.DropDownData",
        noDataText: 'message.NoMoreData'
      }
    },
    props:{
    },
    components: {
      CancelActive
    },
    methods : {
      orderEdit(officialActivityApply) {
        this.$store.state.callback = this.refresh;
        this.$router.openActivity("activity_apply","slide-left",{appId:officialActivityApply.id});
      },
      closeAllPopup() {
        this.callServiceShow = false;
      },
      openCallService(enroll) {
        this.enroll = enroll;
        this.callServiceShow = true;
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastPage(function(){
          that.pager.page++;
          done && done();
        },function () {
          done && done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastPage(function(){
          that.$refs.newsScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function () {

        });
      },
      //返回
      goClose(){
        this.$router.closeActivity()
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
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .order-enroll-container{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .order-top{
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
    .order-list-item{
      width: 100%;
      height: 100%;
      .scroller-margin{
        margin-top: 67px;
        .order-list-item-container{
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
              .order-item-top{
                width: 100%;
                display: flex;
                margin-top: 5px;
                .order-item-top-title{
                  color: #484848;
                  font-weight: bold;
                  font-size: 18px;
                  flex: 1;
                }
                .order-item-top-edit {
                  flex: 1;
                  text-align: right;
                  font-size: 15px;
                  line-height: 25px;
                  padding-right: 15px;
                }
              }
              .remarks{
                .room-item-container{
                  color: #7b7b7b;
                  font-size: 15px;
                  width: 100%;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  position: relative;
                  max-height: 36px;
                  -webkit-line-clamp: 2;
                  text-overflow: ellipsis;
                  height: 36px;
                  line-height: 36px;
                }
              }

              .room-item-footer{
                display: flex;
                justify-content: space-between;
                padding-top: 10px;
                height: 20px;
                font-size: 15px;
                color: #484848;
                .room-order-footer-time{
                  padding-right: 15px;
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
      .order-top{
        padding: 18px 0 0 0 ;
      }
      .order-list-item{
        .scroller-margin{
          margin-top:85px ;
        }
      }
    }
  }
</style>
