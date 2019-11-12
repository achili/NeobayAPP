<template>
  <div class="conference-reservation">
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

    <div class="activity-apply-input-content">
      <div class="activity-apply-input">
        <div class="activity-apply-input-cell" style="padding: 11px 15px;">
          <div class="activity-apply-input-cell-title" style="margin-top: 10px;padding-right: 30px;">
            {{$t('message.SelectDate')}}
          </div>
          <div class="activity-apply-input-cell-block">
            <el-date-picker class="data-style"
                            format="yyyy年MM月dd日"
                            v-model="conferenceRoomReservation.startTime"
                            :editable="false"
                            disabled>
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="activity-apply-input">
        <div class="activity-apply-input-cell">
          <div class="activity-apply-input-cell-title" style="padding-right: 15px;">
            {{$t('message.BookingTime')}}
          </div>
          <!--<div class="activity-apply-input-cell-block" style="padding-left: 25px;" v-if="activity.query.id">-->
            <!--{{new Date(activity.query.startTime) | hourTime }} - {{ new Date(activity.query.endTime) | hourTime }}-->
          <!--</div>-->
          <div class="activity-apply-input-cell-block" style="padding-left: 25px;">
            {{conferenceRoomReservation.startTime | hourTime }} - {{ conferenceRoomReservation.endTime | hourTime }}
          </div>
        </div>
      </div>
      <div class="activity-apply-input">
        <div class="activity-apply-input-cell">
          <div class="activity-apply-input-cell-title">
            {{$t('message.ConferencePrice')}}
          </div>
          <div class="activity-apply-input-cell-block" style="padding-left: 25px;" v-if="activity.query.id">
            ￥{{conferenceRoom.price * timeList}}
          </div>
          <div class="activity-apply-input-cell-block" style="padding-left: 25px;" v-if="!activity.query.id">
            ￥{{conferenceRoomReservation.price}}
          </div>
        </div>
      </div>
      <div class="activity-apply-input">
        <div class="activity-apply-input-cell">
          <div class="activity-apply-input-cell-title" style="min-width: 80px;">
            {{$t('message.ConferenceLocale')}}
          </div>
          <div class="activity-apply-input-cell-block" style="padding-left: 25px;" v-if="activity.query.id">
            {{conferenceRoom.address}}
          </div>
          <div class="activity-apply-input-cell-block" style="padding-left: 25px;" v-if="!activity.query.id">
            {{conferenceRoomReservation.location}}
          </div>
        </div>
      </div>
      <div class="activity-apply-input">
        <div class="activity-apply-input-cell">
          <div class="activity-apply-input-cell-title" style="padding-right: 5px;">
            {{$t('message.Remark')}}
          </div>
          <div class="activity-apply-input-cell-block">
            <input type="text" v-model="conferenceRoomReservation.remarks">
          </div>
        </div>
      </div>

      <div class="activity-apply-button"
           :class="conferenceRoomReservation.startTime && conferenceRoomReservation.remarks ?'active':''" @click="activityApply" v-if="subscribe">
        {{$t('message.SubmitApply')}}
      </div>
      <div class="activity-apply-button"
           :class="conferenceRoomReservation.startTime && conferenceRoomReservation.remarks ?'active':''" v-if="!subscribe">
        {{$t('message.SubmitApply')}}
      </div>
    </div>
  </div>
</template>
<script>
  import Activity from "../../common/model/_base/Activity";
  import ConferenceRoom from "../../common/model/conference/room/ConferenceRoom";
  import ConferenceRoomReservation from "../../common/model/conference/room/ConferenceRoomReservation";
  import {simpleDateTime} from "../../common/filter/time"

  export default {
    data () {
      return {
        conferenceRoom: new ConferenceRoom(),
        conferenceRoomReservation: new ConferenceRoomReservation(),
        timeList:0,
        subscribe:true
      }
    },
    props: {
      activity:{
        type: Activity,
        required: false
      }
    },
    watch: {},
    computed: {},
    components: {

    },
    methods: {
      activityApply() {
        let that = this;
        this.subscribe = false;
        if (this.activity.query.id) {
          if (this.activity.query.startTime && this.activity.query.endTime) {
            let form = {
              conferenceRoomId: this.activity.query.id,
              endTime: simpleDateTime(new Date(this.activity.query.endTime)),
              startTime: simpleDateTime(new Date(this.activity.query.startTime)),
              remarks: this.conferenceRoomReservation.remarks
            };
            if (this.id) {
              form.id = this.id
            }
            this.conferenceRoomReservation.httpSave(form, function () {
              that.subscribe = true;
              that.$store.state.plus.nativeUI.toast(that.$t('message.ApplySuccess'), {duration: "long"});

              let last = that.$store.state.temps.timeAxisConferenceRoom;
              let lastTimeAxis = that.$store.state.temps.conferenceRoomTimeAxis;
              if(last && lastTimeAxis) {
                last.httpDetailByDate(that.$store.state.meetingRoomDate, null, function () {
                  lastTimeAxis.refreshBusyTimeList(last.occupyList);
                  last = null;
                  lastTimeAxis = null;
                  that.$router.closeActivity();
                } ,function () {
                  last = null;
                  lastTimeAxis = null;
                  that.$router.closeActivity();
                });
              } else {
                that.$router.closeActivity();
              }
            })
          } else {
            this.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'), {duration: "long"});
          }
        } else {
          if(this.conferenceRoomReservation.endTime && this.conferenceRoomReservation.startTime){
            let form = {
              conferenceRoomId: this.conferenceRoomReservation.conferenceRoom.id,
              endTime: simpleDateTime(new Date(this.conferenceRoomReservation.endTime)),
              startTime: simpleDateTime(new Date(this.conferenceRoomReservation.startTime)),
              remarks: this.conferenceRoomReservation.remarks
            };
            if (this.activity.query.appId) {
              form.id = this.activity.query.appId
            }
            this.conferenceRoomReservation.httpSave(form, function (response) {
              that.$store.state.plus.nativeUI.toast(that.$t('message.ApplySuccess'), {duration: "long"});
              that.conferenceRoomReservation.render(response.data.conferenceRoom);
              that.$store.state.callback();
              that.$router.closeActivity();
            })
          }else {
            this.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'), {duration: "long"});
          }

        }

      }
    },
    mounted () {
      let that = this;
      if(this.activity.query.endTime && this.activity.query.startTime){
        this.timeList = (this.activity.query.endTime - this.activity.query.startTime) / 3600000;
        this.conferenceRoomReservation.startTime = new Date(this.activity.query.startTime);
        this.conferenceRoomReservation.endTime = new Date(this.activity.query.endTime);
      }
      if (this.activity.query.id) {
        this.conferenceRoom.id = this.activity.query.id;
        this.conferenceRoom.httpDetail()
      }
      if (this.activity.query.appId) {
        this.conferenceRoomReservation.id = this.activity.query.appId;
        this.conferenceRoomReservation.editMode = true;
        this.conferenceRoomReservation.httpDetail()
      }
      // console.log(simpleDateTime(new Date(this.conferenceRoomReservation.startTime)))
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  .conference-reservation {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    .meeting-room-title-bar {
      background-color: #f5f5f5;
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
  .activity-apply-input-content{
    margin-top: 66px;
    .activity-apply-input {
      background-color: #ffffff;
      .activity-apply-input-cell {
        display: flex;
        padding: 22px 15px;
        border-bottom: 1px solid #dedede;
        .activity-apply-input-cell-title {
          font-size: 16px;
          color: #555555;
        }
        .activity-apply-input-cell-block {
          input {
            background: transparent;
            color: #323232;
            resize: none;
            outline: none;
            border: 0;
            width: 100%;
            font-size: 15px;
            padding-left: 37px;
            border-bottom: 1px solid #FFFFFF;
          }
        }
      }
    }

    .activity-apply-button {
      width: calc(100vw - 15px);
      background-color: #202020;
      border-radius: 5px;
      color: #ffffff;
      padding: 8px 0;
      text-align: center;
      line-height: 34px;
      margin: 40px auto 0;
      &.active {
        background-color: #ff9600;
      }
    }
  }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .meeting-room-title-bar{
        padding: 18px 0 0 0 ;
      }
      .activity-apply-input-content{
        margin-top:84px ;
      }
    }
  }
</style>

