<template>
  <div class="meeting-room-detail">
    <div class="meeting-room-title-bar">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.ReservationRoom')}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="detail-content">
      <div class="content-img" :style="'background:url(\''+conferenceRoom.poster.getLocalUrlBySize(540, 100)+'\') center no-repeat'"></div>
      <div class="content-name">
        <div class="name">{{conferenceRoom.name}}</div>
        <div class="user-ico"></div>
        <div class="content-subtitle">
          {{conferenceRoom.getCapacityName()}} | ￥{{conferenceRoom.price}}/时
        </div>
      </div>
      <div class="content-suggest">
        {{conferenceRoom.introduce }}
      </div>

      <div class="content-time">
        <div class="text">{{$t('message.ConferenceTime')}}</div>

        <div class="time-date">
          <el-date-picker class="data-style"
                          format="MM月dd日"
                          v-model="$store.state.meetingRoomDate"
                          :editable="false">
          </el-date-picker>
          <div class="data-week">，{{$store.state.meetingRoomDate | weekDateTime}}</div>
          <div class="data-ico"><i class="fa fa-angle-down"></i></div>
        </div>

      </div>

      <div class="time-axis">
        <NbTimeAxis ref="TimeAxis" :timeInfo="timeInfo" :dataDay="$store.state.meetingRoomDate"></NbTimeAxis>
      </div>

      <div class="content-device">
        <div class="content-device-text">{{$t('message.ConferenceEquipment')}}</div>

        <div class="device-list" :class="deviceOpen? 'device-open':'device-open'">
          <div class="device-item" v-for="device in conferenceRoom.services" :key="device.index">
            <div class="item-ico"
                 :style ="'background:url(\''+conferenceRoom.getServicesMap()[device].ico+'\') center no-repeat'">
            </div>
            <div class="item-text">{{conferenceRoom.getServicesMap()[device].name}}</div>
          </div>
        </div>
      </div>

      <div class="content-contact" v-if="!conferenceRoom.loading">
        <div class="text">{{$t('message.InDoubt')}}</div>
        <div class="contact-list">
          <div class="contact-portrait" :style=" 'background: url(\''+ conferenceRoom.contacts.avatar.url +'\') center no-repeat'" v-if="conferenceRoom.contacts.avatar != null"></div>
          <div class="contact-portraits" v-if="conferenceRoom.contacts.avatar == null"></div>
          <div class="contact-info">
            <div class="contact-name">{{conferenceRoom.contacts.nickname}}</div>
            <div class="contact-role">{{conferenceRoom.contacts.role.name}}</div>
            <div class="contact-tel" @click="phone(conferenceRoom.contacts.phone)"><div class="contact-phone-ico"></div> 联系我</div>
          </div>
        </div>
      </div>

    </div>

    <div class="detail-reserve">
      <div class="reserve-btn" @click="yuding">
        {{$t('message.ConfirmReservation')}}
      </div>
    </div>
  </div>
</template>

<script>

  import ConferenceRoom from "../../common/model/conference/room/ConferenceRoom";
  import NbTimeAxis from "../../components/widget/NbTimeAxis";
  import Activity from "../../common/model/_base/Activity";

  export default {
    data() {
      return {
        conferenceRoom: new ConferenceRoom(),
        user:this.$store.state.user,
        deviceOpen: false,
        timeInfo: {
          startTime: new Date(),
          endTime: new Date(),
          isOccupy: false
        }
      }
    },
    props: {
      activity:{
        type: Activity,
        required: false
      }
    },
    watch:{
      "$store.state.meetingRoomDate"() {
        this.update();
      }
    },
    components: {
      NbTimeAxis
    },
    methods: {
      phone(i) {
        // console.log(i)
        window.location.href = "tel:" + i;
      },
      yuding() {
        if(this.timeInfo.isOccupy) {
          this.$store.state.plus.nativeUI.toast(this.$t('message.UnselectedOrIncorrectTime'), {duration: "long"});
          return;
        }
        if (this.user.isLogin) {
          this.$store.state.temps.timeAxisConferenceRoom = this.conferenceRoom;
          this.$store.state.temps.conferenceRoomTimeAxis = this.$refs.TimeAxis;

          // this.$router.openActivity('conference_reservation','slide-left',{id: 7,startTime:new Date().getTime() + 24 * 30 * 30 * 1000,endTime:new Date().getTime() + 24 * 30 * 40 * 1000})
          this.$router.openActivity('conference_reservation','slide-left',{id: this.conferenceRoom.id,startTime:this.timeInfo.startTime.getTime(),endTime:this.timeInfo.endTime.getTime()})
        } else {
          this.$router.openActivity('login');
        }
      },
      update() {
        let that = this;
        if(this.activity.query.id) {
          this.conferenceRoom.id = this.activity.query.id;
          this.conferenceRoom.httpDetailByDate(this.$store.state.meetingRoomDate, null, function () {
            that.conferenceRoom.poster.keepLocal(540, 100);
            that.$refs.TimeAxis.refreshBusyTimeList(that.conferenceRoom.occupyList);
          })
        }
      }
    },
    mounted(){
      this.update();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .meeting-room-detail {
    height: 100%;
    width: 100%;
    .meeting-room-title-bar {
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
    .detail-content {
      margin-top: 66px;
      height: calc(100% - 150px);
      background: #F5F5F5;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .content-img {
        height: 180px;
        background-size: cover!important;
      }
      .content-name {
        background: white;
        padding: 10px 15px 5px 15px;
        display: flex;
        .name {
          font-size: 20px;
          line-height: 35px;
          color: #333333;
          font-weight: 600;
        }
        .user-ico {
          margin-left: 14px;
          height: 26px;
          background: url("../../assets/svg/service/meeting-room/user.svg") no-repeat bottom;
          width: 11px;
        }
        .content-subtitle {
          color: #555555;
          margin-left: 5px;
          height: 26px;
          font-size: 13px;
          margin-top: 11px;
        }

      }
      .content-suggest {
        background: white;
        padding: 0 15px 20px 15px;
        font-size: 15px;
        color: #777777;
      }
      .content-time {
        margin-top: 10px;
        background: white;
        color: #333333;
        font-size: 20px;
        padding: 15px 15px 0 15px;
        .text {
          font-weight: 600;
        }
        .time-date {
          position: relative;
          font-size: 15px;
          color: #333333;
          letter-spacing: 1px;
          .data-style {
            input {
              padding: 0;
              font-size: 15px;
              color: #333333;
              letter-spacing: 1px;
            }
            .el-input__prefix{
              display: none;
            }
            .el-input__inner{
              border: none;
            }
            .el-input__suffix {
              display: none;
            }
          }
          .data-week {
            position: absolute;
            top: 9px;
            left: 70px;
          }
          .data-ico {
            position: absolute;
            top: 1px;
            left: 127px;
            font-size: 25px;
          }

        }
      }
      .time-axis {
        background: white;
        padding-bottom: 5px;
      }

      .content-device {
        background: white;
        margin-top: 10px;
        font-size: 20px;
        padding: 12px 0 10px 0;
        font-weight: 600;
        color: #333333;
        .content-device-text {
          padding: 5px 15px;
        }
        .device-list {
          display: flex;
          .device-item {
            padding: 10px 17px;
            .item-ico {
              height: 30px;
              width: 30px;
            }
            .item-text {
              display: none;
              font-size: 16px;
              color: #333333;
              font-weight: 400;
              line-height: 30px;
              margin-left: 10px;
            }
          }
          .device-add {
            width: 60px;
            text-align: center;
            color: #ffa42f;
            padding: 5px 0;
            font-size: 40px;
            line-height: 30px;

          }
          &.device-open {
            display: block;
            .device-item {
              padding: 8px 17px;
              display: flex;
              .item-ico {
              }
              .item-text {
                display: block;
              }
            }
          }
        }

      }
      .content-contact {
        padding: 0 15px 30px 15px;
        .text {
          font-size: 20px;
          font-weight: 600;
          color: #333333;
          margin-top: 27px;
        }
        .contact-list {
          border-radius: 3px;
          background: white;
          padding: 20px;
          display: flex;
          margin-bottom: 20px;
          margin-top: 16px;
          .contact-portrait {
            height: 90px;
            width: 90px;
            background-size: cover !important;
            border-radius: 100%;
          }
          .contact-portraits {
            height: 90px;
            width: 90px;
            background-size: cover !important;
            background: url("../../assets/img/service/meeting-room/portrait.png") center;
            border-radius: 100%;
          }
          .contact-info {
            margin-left: 20px;
            .contact-name {
              color: #333333;
              font-size: 18px;
              line-height: 28px;
            }
            .contact-role {
              color: #888888;
              font-size: 15px;
            }
            .contact-tel {
              display: flex;
              margin-top: 9px;
              color: #ffa42f;
              font-size: 15px;
              .contact-phone-ico {
                margin-right: 8px;
                height: 21px;
                width: 15px;
                background: url("../../assets/svg/service/meeting-room/phone-ico.svg") center no-repeat;
              }

            }
          }

        }

      }



    }
    .detail-reserve {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 20px 15px;
      background-color: #fff;
      .reserve-btn {
        background: #FFA42F;
        border-radius: 5px;
        line-height: 50px;
        width: 90%;
        text-align: center;
        color: white;
        font-size: 16px;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .meeting-room-title-bar{
        padding: 18px 0 0 0 ;
      }
      .detail-content{
        margin-top:84px ;
      }
    }
  }

</style>
