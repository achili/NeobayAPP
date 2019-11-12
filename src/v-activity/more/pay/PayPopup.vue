<template>
  <div class="pay-call-service">
    <div class="popup animated bounceInUp">
      <div class="pay-method">
        {{$t('message.PaymentMethod')}}
        <i class="fa fa-remove"  style="float: right;color: #ccc;font-size: 23px;margin-top: 10px;" @click.stop="closeOwn"></i>
      </div>
      <div class="pay-line"></div>
      <div class="content">
        <div class="PayBackground" @click="chooseAliPay('Bank')">
          <div style="display: flex">
            <div class="bankCardPayPicture"></div>
            <div class="PayText">{{$t('message.BankPayment')}}</div>
          </div>
          <div style="margin-right: 30px;">
            <NbRadio v-model="isPay" val="Bank" name="pay"></NbRadio>
          </div>
        </div>
      </div>
      <div class="content" style="padding: 5px 20px 10px;">
        <div class="PayBackground" @click="chooseAliPay('WeChat')">
          <div style="display: flex">
            <div class="weChatPayPicture"></div>
            <div class="PayText">{{$t('message.WeChatPayment')}}</div>
          </div>
          <div style="margin-right: 30px;">
            <NbRadio v-model="isPay" val="WeChat" name="pay"></NbRadio>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="PayBackground" @click="chooseAliPay('AliPay')">
          <div style="display: flex">
            <div class="aliPayPicture"></div>
            <div class="PayText">{{$t('message.AliPayPayment')}}</div>
          </div>
          <div style="margin-right: 30px;">
            <NbRadio v-model="isPay" val="AliPay" name="pay"></NbRadio>
          </div>
        </div>
      </div>
      <!--<div v-if="!isPay" class="back" @click.stop="closeOwn">返回</div>-->
      <div class="sure-apply" :class="isPay? 'active':''"  @click.stop="surePay(isPay)">{{$t('message.SurePayment')}}</div>
    </div>
  </div>
</template>

<script>
  import NbRadio from "../../../components/widget/NbRadio"
  import OnlinePay from "../../../common/model/pay/OnlinePay";
  export default {
    data() {
      return {
        isPay: "",
        onlinePay: new OnlinePay()
      }
    },
    components: {
      NbRadio
    },
    props: {
      closeCall: {
        type: Function
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      },
      conferenceRoomReservationId: {
        type: Number
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
        this.$emit('type', this.isPay)
      },
      chooseAliPay(item) {
        this.isPay = item;
      },
      surePay(type) {
        let that = this;
        if (type === "Bank") {
          this.onlinePay.httpSearchOrder(this.conferenceRoomReservationId, function (res) {
            if (res.data.rspData.rspCode === 'SUC0000') {
              that.$store.state.plus.nativeUI.toast(this.$t('message.DoublePay'), {duration: "long"});
            } else {
              that.$router.openActivity("pay_test", "slide-top", {"id": that.conferenceRoomReservationId, "type": type})
            }
          })
        } else {
          this.$store.state.plus.nativeUI.toast(this.$t('message.NotSupportPay'), {duration: "long"});
        }
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .pay-call-service {
    .popup {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      background: #ffffff;
      color: #484848;
      box-shadow: 0px -2px 10px #f5a623;
      .pay-method {
        text-align: center;
        width: 90%;
        margin: 0 auto;
        font-size: 20px;
        line-height: 50px;
        color: #484848;
      }
      .pay-line {
        width: 90%;
        margin: auto;
        height: 1px;
        background: #cecece;
      }
      .content {
        height: auto;
        padding: 20px 20px 25px 20px;
        line-height: 50px;
        font-size: 12px;
      }
    }
    .PayBackground{
      border: 1px solid #dddddd;
      margin-top: -8px;
      margin-bottom: -10px;
      width: 100%;
      height: 84px;
      background: #f1f3f6;
      display: flex;
      justify-content: space-between;

      .aliPayPicture{
        margin-left: 20px;
        height: 100%;
        width: 50px;
        background: url("../../../assets/img/service/meeting-room/alipay.png")no-repeat center content-box;
        background-size: 100%;
      }
      .weChatPayPicture{
        margin-left: 20px;
        height: 100%;
        width: 50px;
        background: url("../../../assets/img/service/meeting-room/wechat.png")no-repeat center content-box;
        background-size: 100%;
      }
      .bankCardPayPicture{
        margin-left: 20px;
        height: 100%;
        width: 50px;
        background: url("../../../assets/img/service/meeting-room/bank-logo.jpg")no-repeat center content-box;
        background-size: 100%;
      }

      .PayText{
        font-size: 16px;
        color: #333333;
        line-height: 84px;
        margin-left: 15px;
      }
    }
    .sure-apply {
      text-align: center;
      font-size: 17px;
      line-height: 50px;
      background: #ccc;
      color: white;
      &.active {
        background: #f5a623;
        color: white;
      }
    }
  }
</style>
