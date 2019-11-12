<template>
  <div>
    <button @click="payJump">点击支付生成订单:支付宝</button>
    {{params}}

  </div>
</template>
<script>
  import OnlinePay from "../../../common/model/pay/OnlinePay";
  import {getPayParamsText} from "../../../common/util/PayUtil";
  import axios from 'axios'
  import Base from "../../../common/model/_base/Base";

  export default{
    data () {
      return {
        onlinePay: new OnlinePay(),
        params: {}
      }
    },
    props:{
    },
    components: {

    },
    methods : {
      payJump() {
        this.$router.openActivity("pay_test", "slide-top")
      }
    },
    mounted(){

    }
  }
</script>
