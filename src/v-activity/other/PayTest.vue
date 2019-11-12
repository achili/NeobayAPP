<template>
  <div class="pay-test">
    <div class="meeting-room-title-bar">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.Payment')}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="list-details-content">
      <iframe :src="url" id="myIFrame"
              width="100%" height="100%"
              allowTransparency="true" style="border: none;">
        {{$t('message.UseChromeBrowser')}}
      </iframe>
    </div>
  </div>
</template>

<script>
  import Activity from "../../common/model/_base/Activity";
  import OnlinePay from "../../common/model/pay/OnlinePay";
  import ConferenceRoomReservation from "../../common/model/conference/room/ConferenceRoomReservation";
  import Vue from "vue";

  export default {
    data(){
      return {
        onlinePay: new OnlinePay(),
        conferenceRoomReservation: new ConferenceRoomReservation(),
        enclosureUrl: "",
        params: {},
        url: ""
      }
    },
    props:{
      activity:{
        type: Activity,
        required: false
      }
    },
    methods:{
      refresh(id, successCallback, errorCallback) {
        let that = this;
        this.onlinePay.httpPayment(id, function (res) {
          console.log(res.data);
          successCallback && successCallback(res.data);
        })
      },
      iframeUp(id) {
        let that = this;
        let iframe = document.getElementById('myIFrame').contentWindow;
        iframe.onload = function () {
          that.refresh(id, function (params) {
            console.log("that.params " + params)
            iframe.postMessage(JSON.stringify(params), 'http://localhost:8240');
          }, function () {

          });
        }
      }
    },
    mounted(){
      console.log("this.activity.query.id + " + this.activity.query.id)
      console.log("this.activity.query.type + " + this.activity.query.type)
      // if (this.activity.query.id) {
      //   this.iframeUp(this.activity.query.id);
      // } else {
      //   this.$router.closeActivity();
      // }
      this.refresh(this.activity.query.id);
      this.url = this.$store.state.domainName + "/v1/online/pay/app/payment?id=" + this.activity.query.id;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .pay-test{
    .meeting-room-title-bar {
      background-color: #f5f5f5;
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
      position: absolute;
      height: calc(100vh - 66px);
      width: 100vw;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
    }
  }
</style>
