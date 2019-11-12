<template>
  <div class="meeting-order">
    <div class="meeting-order-top">
      <div class="close-ico" @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/svg/home/activity/return-black.svg'))+'\') center no-repeat'"
             style="margin-top: 36px ;width: 10px;height: 22px;margin-left: 15px;"
             ></div>
      </div>

      <div class="page-title">{{$t('message.MyReservation')}}</div>
      <div class="close-ico-1"></div>
    </div>
    <div class="meeting-order-list-item">
      <scroller ref="newsScroller"
                :on-refresh="refresh"
                :refreshText="$t(refreshText)"
                :noDataText="$t(noDataText)"
                :on-infinite="infinite"
                class="scroller-margin"
      >
        <div class="meeting-order-list-item-container">
          <div class="list-item " v-for="(conferenceRoomReservation,index) in pager.conferenceRoomReservations" data-type="0" :key="index">
            <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
              <div class="meeting-order-item-top">
                <div class="meeting-order-item-top-title">
                  {{conferenceRoomReservation.name}}
                </div>
                <div class="meeting-order-item-top-edit" >
                  {{conferenceRoomReservation.startTime | yearTime }}
                </div>
              </div>

              <div v-if="!conferenceRoomReservation.remarks" style="margin-top: 30px;"></div>
              <div class="remarks" v-else>
                <div class="room-item-container">
                  {{conferenceRoomReservation.remarks}}
                </div>
              </div>

              <div class="room-item-footer">
                <div class="room-order-footer-day">
                  {{ conferenceRoomReservation.startTime | hourTime }} - {{ conferenceRoomReservation.endTime | hourTime }}
                </div>
                <div class="room-order-footer-time">
                  {{conferenceRoomReservation.getStatusName(conferenceRoomReservation.status)}}
                </div>
              </div>
            </div>
            <div v-if="conferenceRoomReservation.status === 'WAIT'" class="delete" @click="openDetail(conferenceRoomReservation)" :data-index="conferenceRoomReservation.index">继续支付</div>
            <div v-else class="delete" @click="openCallService(conferenceRoomReservation)" :data-index="conferenceRoomReservation.index">{{$t('message.Cancel')}}</div>
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
  import CancelActive from "../../../v-activity/more/order/CancelActive";
  import ConferenceRoom from "../../../common/model/conference/room/ConferenceRoom"
  import ConferenceRoomReservation from "../../../common/model/conference/room/ConferenceRoomReservation";

  export default{
    data () {
      return {
        startX : 0 ,
        endX : 0,
        enroll:null,
        callServiceShow: false,
        user: this.$store.state.user,
        conferenceRoom: new ConferenceRoom(),
        conferenceRoomReservationTest: new ConferenceRoomReservation(),
        pager:this.$store.state.ConferenceRoomReservationPager,
        title:"message.ReservationOrder",
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
      orderEdit(conferenceRoomReservation) {
        this.$store.state.callback = this.refresh;
        this.$router.openActivity("conference_reservation","slide-left",{appId:conferenceRoomReservation.id});
      },
      closeAllPopup() {
        this.callServiceShow = false;
      },
      openCallService(enroll) {
        this.enroll = enroll;
        this.callServiceShow = true;
      },
      openDetail(item) {
        let that = this;
        this.conferenceRoomReservationTest.id = item.id;
        if (this.conferenceRoomReservationTest.id) {
          this.conferenceRoomReservationTest.httpDetail(function (res) {
            if (res.data.conferenceRoomReservation.conferenceRoom.id) {
              that.$router.openActivity('conference_reservation','slide-left',{reservationId: item.id,id: res.data.conferenceRoomReservation.conferenceRoom.id,startTime:item.startTime.getTime(),endTime:item.endTime.getTime()})
            }
          });
        }

      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("isApp", 'true');
        this.pager.setFilterValue("orderId", "DESC");
        this.pager.httpFastPage(function(){
          console.log("fslajf")
          that.pager.page++;
          done && done();
        },function () {
          done && done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("isApp", 'true');
        this.pager.setFilterValue("orderId", "DESC");
        this.pager.httpFastPage(function(response){
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
  .meeting-order {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .meeting-order-top{
      margin: auto;
      height: 66px;
      position: relative;
      width: 100%;
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
    .meeting-order-list-item{
      width: 100%;
      height: 100%;
      .scroller-margin{
        margin-top: 67px;
        .meeting-order-list-item-container{
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
              .meeting-order-item-top {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .meeting-order-item-top-title {
                  color: #484848;
                  font-weight: bold;
                  font-size: 18px;
                  margin-top: 5px;
                }
                .meeting-order-item-top-edit {
                  padding-right: 16px;
                  text-align: right;
                  font-size: 15px;
                  margin-top: 9px;
                }
              }
              .remarks{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                .room-item-container{
                  color: #7b7b7b;
                  font-size: 15px;
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
                  padding-right: 16px;
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
      .meeting-order-top{
        padding: 18px 0 0 0 ;
      }
      .meeting-order-list-item{
        .scroller-margin{
          margin-top: 85px;
        }
      }
    }
  }
</style>

