<template>
  <div class="nb-swiper" ref="nbSwiper">
    <div class="list-box" ref="listBox" :style="'transition: '+transition+'ms;transform: translate('+deviation+'px)'">

      <div v-for="url in imgUrlList" :key="url" class="img-box"  :style="'min-width: '+ width + 'px;background: url(\''+url+'\') center;'"></div>

      <div class="img-box" v-if="imgUrlList.length > 2"
           :style="'min-width: '+ width + 'px;background: url(\''+imgUrlList[0]+'\') center;'"></div>
    </div>
    <div class="page-box">
      <div v-for="(url,index) in imgUrlList" :key="url" class="page-circle" :class="deviation === -width * index? 'active':''"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        width: 140,
        deviation: 0,
        transition: this.transitionTime,
        interval: null
      }
    },
    props: {
      imgUrlList: {
        type: Array
      },
      intervalTime: {
        type: Number,
        required: false,
        default: 1500
      },
      transitionTime: {
        type: Number,
        required: false,
        default: 200
      }
    },
    methods: {
      slide() {
        if (this.imgUrlList.length <= 1) {
          return;
        }
        this.deviation -= this.width;
        if(this.deviation <= -this.width * this.imgUrlList.length) {
          let that = this;
          setTimeout(function () {
            that.transition = 0;
            that.deviation = 0;
            setTimeout(function () {
              that.transition = that.transitionTime;
            }, 20)
          }, that.transition)
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    mounted(){
      this.width = this.$refs.nbSwiper.offsetWidth;
      if(!this.interval) {
        this.interval = setInterval(this.slide, this.intervalTime);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-swiper {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    .list-box {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: flex-start;
      height: 100%;
      .img-box {
        height: 100%;
        flex: 1;
      }
    }
    .page-box {
      position: absolute;
      bottom: 0;
      left: 50%;
      right: 0;
      .page-circle {
        height: 3px;
        width: 3px;
        display: inline-block;
        margin-right: 9px;
        border-radius: 100%;
        background: white;
        &.active {
          background: #659BE3;
        }
      }
    }
  }
</style>

