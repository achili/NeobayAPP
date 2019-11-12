<template>
  <div class="select-order-service" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="title" v-for="item in listType" :key="item.value" v-if="entity.type && entity.type === item.value">{{$t('message.SureCancel')}} {{$t(title)}}?</div>
      <div class="tips" v-if="entity.conferenceRoom">
        {{$t('message.TwoHourOrder')}}
      </div>
      <div class="title" v-if="entity.conferenceRoom">
        {{$t('message.SureCancel')}}{{$t(title)}}?
      </div>
      <div class="content">
        <div class="select" >
          <div class="text" @click.stop="selectYes(entity)">{{$t('message.Yes')}}</div>
        </div>
        <div class="select" >
          <div class="text" @click.stop="selectNo">{{$t('message.No')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
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
          },
          {
            name: "开放式工位",
            value: "NURSERY",
            style: ""
          },
          {
            name: "2号楼独立空间",
            value: "INCUBATOR",
            style: ""
          },
          {
            name: "1号楼独立空间",
            value: "ACCELERATOR",
            style: ""
          }
        ]
      }
    },
    props: {
      restSlide:{
        type: Function
      },
      closeCall: {
        type: Function
      },
      title:{

      },
      entity:{

      },
      refresh:{
        type: Function
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      selectYes(e) {
        let that = this;
        if (e.conferenceRoom) {
          e.httpDeleteReservation(e.id, function (res) {
            that.refresh();
            if (res.data.status === 'success') {
              this.$store.state.plus.nativeUI.toast(this.$t('message.RefundSuccess'), {duration: "long"});
            }
            that.restSlide();
          }, function () {

          });
          that.closeCall()
        } else {
          console.log("111")
          e.httpDel(function () {
            that.refresh();
            that.restSlide();
          }, function () {

          });
          that.closeCall()
        }
      },
      selectNo() {
        this.closeCall()
      }
    },
    mounted(){

    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .select-order-service {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .popup {
      &.animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
      }
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      background: white;
      color: #484848;
      .title {
        text-align: center;
        width: 100%;
        font-size: 20px;
        line-height: 50px;
      }
      .tips {
        padding: 10px;
        text-align: center;
        font-size: 14px;
        color: #ce0058;
      }
      .content {
        text-align: center;
        display: flex;
        height: auto;
        padding: 10px 25px 30px 25px;
        font-size: 12px;
        color: #ce0058;
        .select {
          width: 50%;
          .text{
            width: calc(50vw - 50px);
            height: 45px;
            border: 2px solid #ce0058;
            border-radius: 8px;
            line-height: 45px;
            text-align: center;
            margin: auto;
            color: #ce0058;
            font-size: 16px;
          }
        }

      }
    }
  }
</style>
