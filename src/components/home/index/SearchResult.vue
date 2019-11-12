<template>
  <div class="search-result">
    <div class="meeting-room-title-bar">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.SearchResult')}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="input-bar">
      <div class="input-box">
        <div class="search-ico"></div>
        <input v-model="searchText" @keyup.enter="refresh" />
      </div>
    </div>
    <div class="btn-bar">
      <div class="btn-tab mr25" :class="labelPosition===0? 'active':''" @click.stop="clickTab(0)">{{$t('message.SearchAll')}}</div>
      <div class="btn-tab mr25" :class="labelPosition===1? 'active':''" @click.stop="clickTab(1)">{{$t('message.News')}}</div>
      <div class="btn-tab mr25" :class="labelPosition===2? 'active':''" @click.stop="clickTab(2)">{{$t('message.Activity')}}</div>
      <div class="btn-tab" :class="labelPosition===3? 'active':''" @click.stop="clickTab(3)">{{$t('message.Policy')}}</div>
    </div>
    <div ref="swiper" class="result-content" :style="'transform: translate('+deviation+'px)'"
         @touchstart="touchstart" @touchend="touchend">
      <div class="content-item">
        <All ref="all" v-if="labelPosition===0" :labelPosition="labelPosition" :searchText="searchText"></All>
      </div>
      <div class="content-item">
        <All ref="all" v-if="labelPosition===1" :labelPosition="labelPosition" :searchText="searchText"></All>
      </div>
      <div class="content-item">
        <All ref="all" v-if="labelPosition===2" :labelPosition="labelPosition" :searchText="searchText"></All>
      </div>
      <div class="content-item">
        <All ref="all" v-if="labelPosition===3" :labelPosition="labelPosition" :searchText="searchText"></All>
      </div>
    </div>
  </div>
</template>

<script>
  import All from "../../../components/home/index/All";
  import Activity from "../../../common/model/_base/Activity";

  export default {
    data() {
      return {
        searchText: "",
        labelPosition : 0,
        //偏移量
        deviation: 0,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startX: 0,
        startTime: 0
      }
    },
    props: {
      activity: {
        type: Activity,
        required: false
      }
    },
    components: {
      All
    },
    methods: {
      refresh() {
        this.$refs.all.refresh();
      },
      clickTab(labelPosition) {
        this.labelPosition = labelPosition;
        this.deviation = -(labelPosition * this.$refs.swiper.offsetWidth);
      },
      close() {
        this.$router.closeActivity("slide-top")
      },
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startTime = e.timeStamp
      },
      touchend(e) {
        let distance = e.changedTouches[0].clientX - this.startX;
        let speed = Math.abs(distance) / (e.timeStamp - this.startTime);
        if(Math.abs(distance) > this.triggerDistance) {
          if(speed > this.triggerSpeed) {
            if(distance > 0  && this.deviation < 0) {
              this.deviation += this.$refs.swiper.offsetWidth;
              this.labelPosition--;
            } else if (distance < 0 && this.deviation > -this.$refs.swiper.offsetWidth * 3) {
              this.deviation -= this.$refs.swiper.offsetWidth;
              this.labelPosition++;
            }
          }
        }
      }
    },
    mounted(){
      this.searchText = this.activity.query.searchContent;
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .search-result {
    height: 100%;
    position: relative;
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
    .input-bar {
      margin-top: 66px;
      padding: 20px 20px 8px 20px;
      .input-box {
        background: #F1F1F2;
        border-radius: 5px;
        padding: 8px 24px;
        display: flex;
        position: relative;
        .search-ico {
          position: absolute;
          top: calc(50% - 7px);
          left: 10px;
          width: 15px;
          height: 15px;
          /*background:url('../../assets/svg/home/index/search/search-ico.svg') center no-repeat;*/
        }
        input {
          width: 100%;
          margin-left: 10px;
          background:none;
          outline:none;
          border:0;
          font-size: 16px;
          color: #8e8e93;
        }
      }
    }
    .btn-bar {
      display: flex;
      padding: 0 20px;
      background: white;
      height: 39px;
      border-bottom: #E1E5E5 1px solid;
      .btn-tab {
        height: 36px;
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #8e8e93;
        line-height: 36px;
        &.active {
          border-bottom: #00B3E5 2px solid;
          color: #484848;
        }
      }
    }
    .result-content {
      height: calc(100% - 160px);
      width: 100%;
      display: flex;
      transition-duration: 200ms;
      .content-item {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .meeting-room-title-bar{
        padding: 18px 0 0 0 ;
      }
      .input-bar{
        margin-top:84px ;
      }
    }
  }
</style>

