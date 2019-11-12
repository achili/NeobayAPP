<template>
  <div class="service-meeting-room">
    <div class="meeting-room-filter"  @click.stop="openFilter">
      <div class="filter-ico"></div>
      <div class="filter-text">{{$t('message.Screen')}}</div>
      <div class="filter-up"><i class="fa" :class="!isOpenFilter? 'fa-angle-down':' fa-angle-up'"></i></div>
    </div>

    <div class="meeting-room-scroller">

      <scroller ref="meetingRoomScroller"
                :on-refresh="refresh"
                :refreshText="$t(refreshText)"
                :noDataText="$t(noDataText)"
                :on-infinite="infinite">
        <div class="list-box">
          <div v-for="(conferenceRoom,index) in pager.conferenceRooms" :key="conferenceRoom.id" class="meeting-room-item"
               @click.stop="openMeetingRoomDetail(conferenceRoom.id)">
            <div class="item-img" :style="'background: url(\''+conferenceRoom.poster.getLocalUrlBySize(540, 100)+'\') content-box no-repeat center;'"></div>
            <div class="item-title">
              <div class="title-name">
                {{conferenceRoom.name}}（{{conferenceRoom.getCapacityName(conferenceRoom.capacity)}}）
              </div>
              <div class="title-price"><nobr>￥{{conferenceRoom.price}}/小时</nobr></div>
            </div>
            <div class="item-address">{{conferenceRoom.address}}</div>
            <div class="item-bottom">
              <div class="bottom-facilities">
                <span v-for="(service, index) in conferenceRoom.services"
                      v-if="index < 3" :key="service.index">
                  {{conferenceRoom.ServicesMap[service].name}}
                </span>
              </div>
              <div class="bottom-reserve-btn" @click.stop="openMeetingRoomDetail(conferenceRoom.id)">
                <nobr>{{$t('message.IWantReservation')}}</nobr>
              </div>
            </div>
            <div class="item-lin" v-show="index!==1"></div>
          </div>
        </div>

      </scroller>

    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        pager: this.$store.state.conferenceRoomPager,
        isOpenFilter: false,
        refreshText: "message.DropDownData",
        noDataText: 'message.NoMoreData'
      }
    },
    components: {

    },
    methods: {
      apply() {
        console.log("预定！")
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.conferenceRooms.forEach(data => {
            data.poster.keepLocal(540, 100);
          });
          done && done();
        },function () {
          done && done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastNextPage(function(){
          that.$refs.meetingRoomScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {
          pager.conferenceRooms.forEach(data => {
            data.poster.keepLocal(540, 100);
          });
        });
      },
      openFilter() {
        this.isOpenFilter = !this.isOpenFilter;
        this.$store.state.openHomePopUp(null, null, null, "MeetingRoomFilter")
      },
      openMeetingRoomDetail(id) {
        this.$router.openActivity("meeting-room-detail", "slide-left", {id: id})
      },
      openMeetingRoomReserve(id) {
        this.$router.openActivity("text1", "slide-left", {id: id})
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .service-meeting-room {
    height: 100%;
    .meeting-room-filter {
      background: #E8E8E8;
      padding: 0 15px;
      display: flex;
      color: #666666;
      .filter-ico {
        background: url("../../assets/svg/service/meeting-room/meeting_room_filter.svg") content-box no-repeat center;
        height: 45px;
        width: 20px;
      }
      .filter-text {
        padding-left: 20px;
        font-size: 15px;
        width: 100%;
        line-height: 45px;
      }
      .filter-up {
        font-size: 27px;
        line-height: 45px;
      }
    }
    .meeting-room-scroller {
      position: relative;
      height: calc(100% - 45px);
      .list-box {
        background: white;
        padding: 0 20px;
        .meeting-room-item {
          margin-top: 15px;
          padding-bottom: 7px;
          .item-img {
            height: 160px;
            width: 100%;
            border-radius: 5px;
            background-size: cover!important;
          }
          .item-title {
            margin-top: 10px;
            display: flex;
            color: #333333;
            .title-name {
              width: 100%;
              font-size: 16px;
            }
            .title-price {
              font-size: 15px;
            }
          }
          .item-address {
            color: #888888;
            font-size: 13px;
            margin-top: 9px;
          }
          .item-bottom {
            display: flex;
            font-size: 12px;
            margin-top: 7px;
            .bottom-facilities {
              height: 32px;
              overflow: hidden;
              color: #666666;
              width: 100%;
            }
            .bottom-reserve-btn {
              background: #222222;
              padding: 0 20px;
              color: white;
              border-radius: 3px;
              line-height: 32px;
            }
          }
          .item-lin {
            background: #E8E8E8;
            height: 1px;
            width: 100%;
            margin-top: 21px;
          }
        }
      }
    }
  }
</style>
