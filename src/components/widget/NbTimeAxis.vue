<template>
  <div class="nb-time-axis">
    <div class="time-axis-shaft" ref="shaft">
      <div class="shaft-min-unit" v-for="(shaftIUnit,index) in shaftIUnitList" :key="shaftIUnit.index">
        <div  :class="index%2? 'short':'long'"></div>
        <div class="unit-block" :class="shaftIUnit.isPast? 'past-class':''">
          <div class="time-text" v-show="index%2 === 0">{{shaftIUnit.time | hourTime}}</div>
        </div>
      </div>

      <!--滑块-->
      <div class="slider-list" ref="slider" :style="'left:'+sliderDistance+'px'" v-show="showSliders" :class="timeInfo.isOccupy? 'add-list-red':'add-list-yellow'">
        <div class="left-slider" @touchend="touchsend" @touchstart.prevent="touchstart($event)" @touchmove.prevent="touchmove($event)"
             :style="'width: '+ sliderWidth +'px'"></div>
        <div class="right-slider" @touchend="sliderTouchsend" @touchstart.prevent="sliderTouchstart($event)" @touchmove.prevent="sliderTouchmove($event)"></div>
      </div>

    </div>
    {{timeInfo.startTime | hourTime}} - {{timeInfo.endTime | hourTime}}
  </div>
</template>

<script>

  import ConferenceRoom from "../../common/model/conference/room/ConferenceRoom";
  import {getDayStart,addDatestamp} from "../../common/filter/time";

  export default {
    data() {
      return {
        // timeInfo: {
        //   startTime: new Date(),
        //   endTime: new Date()
        // }
        shaftIUnitList: [],
        showSliders: true,

        unitWidth: 41.5,


        sliderInfo: {
          startX: 0,
          startDistance: 0,
          startWidth: 0,
          startTime: null,
          endTime: null,
          distance: 0,
          width: 42
        },
        sliderTouchInfo: {
          startX: 0,
          startDistance: 0,
          distance: 0
        }
      }
    },
    props: {
      //startTime endTime isOccupy 都放在这 双向绑定
      timeInfo: {
        type: Object
      },
      //日期
      dataDay: {
        type: Date
      },
      //启用消减时间
      enableReduction: {
        type: Boolean,
        required: false,
        default: true
      },
      //允许开始的时间（格式为9:00、18:00）非动态绑定
      allowableStartTime: {
        type: String,
        required: false,
        default: "0:00"
      },
      //允许开始的时间（格式为9:00、18:00）非动态绑定
      allowableEndTime: {
        type: String,
        default: "24:00"
      },
      //最小时间间距（半格）1代表一分钟 非动态绑定
      minSpacingMinute: {
        type: String,
        required: false,
        default: "30"
      }
    },
    computed: {
      sliderDistance() {
        let distance = 0;
        if(this.shaftIUnitList[0]) {
          distance = (this.timeInfo.startTime.getTime() - this.shaftIUnitList[0].time.getTime()) / ((Number)(this.minSpacingMinute) * 60000) * this.unitWidth;
        }
        return distance;
      },
      sliderWidth() {
        let width = 0;
        if(this.shaftIUnitList[0]) {
          let endDistance = (this.timeInfo.endTime.getTime() - this.shaftIUnitList[0].time.getTime()) / ((Number)(this.minSpacingMinute) * 60000) * this.unitWidth;
          let distance = (this.timeInfo.startTime.getTime() - this.shaftIUnitList[0].time.getTime()) / ((Number)(this.minSpacingMinute) * 60000) * this.unitWidth;
          width = endDistance - distance;
        }
        return width - this.unitWidth / 2;
      }
    },
    watch: {
      "dataDay"(newVal) {
        this.refreshShaft();
        this.$refs.shaft.scrollLeft = 0;
        this.timeInfo.startTime = newVal;
        this.timeInfo.endTime = addDatestamp(this.timeInfo.startTime, this.minSpacingMinute * 180000 - 60000);
        this.correctSlider();
      }
    },
    components: {

    },
    methods: {
      touchstart(e) {
        this.sliderInfo.startX = e.changedTouches[0].clientX;
        this.sliderInfo.startDistance = this.sliderInfo.distance;
        this.sliderInfo.startTime = this.timeInfo.startTime;
        this.sliderInfo.endTime = this.timeInfo.endTime;
      },
      touchsend(e) {
        this.correctSlider();
      },
      touchmove(e) {
        let spacing = e.changedTouches[0].clientX - this.sliderInfo.startX;
        let unitTime = ((Number)(this.minSpacingMinute) * 60000) / this.unitWidth;
        this.timeInfo.startTime = addDatestamp(this.sliderInfo.startTime, parseInt((spacing) * unitTime));
        this.timeInfo.endTime = addDatestamp(this.sliderInfo.endTime, parseInt((spacing) * unitTime));
      },
      sliderTouchstart(e) {
        this.sliderTouchInfo.startX = e.changedTouches[0].clientX;
        this.sliderInfo.startWidth = this.sliderInfo.width;
        this.sliderInfo.endTime = this.timeInfo.endTime;
      },
      sliderTouchmove(e) {
        let spacing = e.changedTouches[0].clientX - this.sliderTouchInfo.startX;
        let unitTime = ((Number)(this.minSpacingMinute) * 60000) / this.unitWidth;
        this.timeInfo.endTime = addDatestamp(this.sliderInfo.endTime, parseInt((spacing) * unitTime));
      },
      sliderTouchsend(e) {
        this.correctSlider();
      },
      correctSlider() {
        let minTime = this.minSpacingMinute * 60000;
        let time1 = this.timeInfo.startTime.getTime();
        let time = this.timeInfo.endTime.getTime();
        if(time1 % minTime !== 0) {
          time1 = Math.round(time1 / minTime) * minTime;
        }
        if(time1 < this.shaftIUnitList[0].time.getTime()) {
          time1 = this.shaftIUnitList[0].time.getTime();
        } else if(time1 > this.shaftIUnitList[this.shaftIUnitList.length - 1].time.getTime() - minTime) {
          time1 = this.shaftIUnitList[this.shaftIUnitList.length - 1].time.getTime() - minTime;
        }
        this.timeInfo.startTime = new Date(time1);
        if(time % minTime !== 0) {
          time = Math.round(time / minTime) * minTime;
        }
        if(time < this.timeInfo.startTime.getTime() + minTime) {
          time = this.timeInfo.startTime.getTime() + minTime;
        } else if(time > this.shaftIUnitList[this.shaftIUnitList.length - 1].time.getTime()) {
          time = this.shaftIUnitList[this.shaftIUnitList.length - 1].time.getTime();
        }
        this.timeInfo.endTime = new Date(time - 60000);

        this.refreshOccupy();
      },
      refreshBusyTimeList(busyTimeList) {
        busyTimeList.forEach(busyTime => {
          if(this.shaftIUnitList[busyTime - 5]) {
            this.shaftIUnitList[busyTime - 5].isPast = true;
          }
        })
      },
      refreshShaft() {
        //更新时间条
        let endTimestamp = addDatestamp(getDayStart(this.dataDay), this.conversionTimestamp(this.allowableEndTime)).getTime();
        this.shaftIUnitList = [];
        let shaftIUnit = addDatestamp(getDayStart(this.dataDay), this.conversionTimestamp(this.allowableStartTime));
        let i = 1;
        do {
          i++;
          let shaftIUnitOb = {time: shaftIUnit, isPast: false, isOccupy: false};
          if(this.enableReduction) {
            let currentTimestamp = new Date().getTime();
            if(shaftIUnit.getTime() < currentTimestamp) {
              shaftIUnitOb.isPast = true;
            }
          }
          this.shaftIUnitList.push(shaftIUnitOb);
          shaftIUnit = addDatestamp(shaftIUnit, (Number)(this.minSpacingMinute) * 60000);
        } while (shaftIUnit.getTime() <= endTimestamp && i < 50);
      },
      refreshOccupy() {
        // //刷新占用检测.timeInfo.isOccupy
        for(let i = 0; i < this.shaftIUnitList.length; i++) {
          if(this.shaftIUnitList[i].isOccupy || this.shaftIUnitList[i].isPast) {
            if(this.shaftIUnitList[i].time.getTime() >= this.timeInfo.startTime.getTime() && this.shaftIUnitList[i].time.getTime() < this.timeInfo.endTime.getTime()) {
              this.timeInfo.isOccupy = true;
              return;
            } else {
              this.timeInfo.isOccupy = false;
            }
          } else {
            this.timeInfo.isOccupy = false;
          }
        }
      },
      conversionTimestamp(timeString) {
        let arr = timeString.split(":");
        return (Number)(arr[0]) * 3600000 + (Number)(arr[1]) * 60000;
      }

    },
    mounted(){
      //计算出数组
      this.refreshShaft();
      this.correctSlider();
      let that = this;
      //让滚动轴滚动到合适的位置
      setTimeout(function () {
        let left = that.$refs.slider.style.left;
        that.$refs.shaft.scrollLeft = left.substring(0, left.length - 2);
      }, 20);

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-time-axis {
    width: 100%;
    .time-axis-shaft {
      width: 100%;
      overflow-x: scroll;
      -webkit-overflow-scrolling:touch;
      position: relative;
      display: flex;
      .shaft-min-unit {
        display: flex;
        .long {
          height: 70px;
          width: 1px;
          background: rgba(190, 190, 190, .8);
        }
        .short {
          height: 35px;
          width: 1px;
          margin-left: -1px;
          background: rgba(190, 190, 190, .8);
          margin-top: 35px;
        }
        .unit-block {
          width: 41px;
          height: 50px;
          margin-top: 19px;
          border-bottom: #DCDCDC solid 1px;
          .time-text {
            font-size: 12px;
            color: #333333;
            margin-top: -21px;
            margin-left: 3px;
          }
          &.past-class {
            background-size: contain;
            background: url("../../assets/img/service/meeting-room/slash-texture.png") center no-repeat;
          }
        }
      }

      .slider-list{
        left: 0;
        top: 19px;
        height: 50px;
        display: flex;
        background-color: rgba(249, 167, 167, .5);
        position: absolute;
        opacity: .5;
        .left-slider{
          height: 50px;
        }
        .right-slider{
          width: 20px;
          height:50px;
          background-color: rgba(249, 167, 167, 0.9);
          display: inline-block;
        }
        .add-list-transparent{
          background-color: #ffdc35;
        }
        &.add-list-yellow{
          background-color: #ffdc35;
          .right-slider{
            background-color: rgba(255, 181, 6, 0.9);
          }
        }
      }
    }


  }
</style>
