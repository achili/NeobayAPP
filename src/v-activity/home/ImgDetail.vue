<template>
  <div class="img-detail" @click="closeClick">
    <div ref="swiper" class="img-detail-content" :style="'transform: translate('+deviation+'px)'"
         @touchstart="touchstart" @touchend="touchend"  @touchmove="touchmove">
      <div class="content-item" v-for="img in imgDetails" :key="img.index">
        <div @touchstart="imgTouchstart($event, img)" @touchmove="imgTouchmove($event, img)" @touchend="imgTouchend($event, img)" @click="imgClick(img, $event)"
             class="img" :style="'background: url(\''+img.getLocalUrlBySize(null, null, require('../../assets/gif/loading.gif'))+'\') no-repeat;transform:scale('+img.multiple+') translate('+img.moveX+'px,'+img.moveY+'px)'">
        </div>
      </div>
    </div>
    <!--<div class="btn"  @click="closeClick">返回</div>-->
  </div>
</template>

<script>

  export default {
    data() {
      return {
        temps: this.$store.state.temps,
        imgDetails: [],
        //偏移量
        deviation: 0,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startX: 0,
        startTime: 0,

        imgStartX: 0,
        imgStartY: 0,
        imgStartZ: 0,
        onClickTime: new Date(),
        closeing: false
      }
    },
    components: {

    },
    methods: {
      closeClick() {
        this.$router.closeActivity();
      },
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startTime = e.timeStamp;
      },
      touchend(e) {
        let distance = e.changedTouches[0].clientX - this.startX;
        let speed = Math.abs(distance) / (e.timeStamp - this.startTime);
        if(Math.abs(distance) > this.triggerDistance) {
          if(speed > this.triggerSpeed) {
            if(distance > 0 && this.deviation < 0) {
              this.deviation += this.$refs.swiper.offsetWidth;
              this.imgDetails.forEach(i => {
                i.resetChange();
              })
            } else if (distance < 0 && this.deviation > -this.$refs.swiper.offsetWidth * (this.imgDetails.length - 1)) {
              this.deviation -= this.$refs.swiper.offsetWidth;
              this.imgDetails.forEach(i => {
                i.resetChange();
              })
            }
          }
        }
      },
      touchmove(e) {
        if(this.closeing) {
          return;
        }
        let distance = e.changedTouches[0].clientX - this.startX;
        if(distance > this.$refs.swiper.offsetWidth / 2 && this.deviation === 0) {
          this.imgDetails.forEach(i => {
            i.resetChange();
          });
          this.closeing = true;
          this.$router.closeActivity();
        }
      },
      imgClick(img, e) {
        let y = e.clientY;
        // if(y > this.$refs.swiper.offsetWidth) {
        //   this.$router.closeActivity();
        // }
        if(new Date().getTime() - this.onClickTime.getTime() < 400) {
          if(img.multiple === 2) {
            img.resetChange();
            img.multiple = 1
          } else {
            img.resetChange();
            img.multiple = 2;
          }
        } else {
          this.onClickTime = new Date();
        }
      },
      imgTouchstart(e, img) {

        if(e.touches[1]) {
          let z2 = (e.touches[1].clientX - e.touches[0].clientX) * (e.touches[1].clientX - e.touches[0].clientX) + (e.touches[1].clientY - e.touches[0].clientY) * (e.touches[1].clientY - e.touches[0].clientY);
          this.imgStartZ = Math.sqrt(z2);
        } else {
          this.imgStartX = e.touches[0].clientX - img.moveX;
          this.imgStartY = e.touches[0].clientY - img.moveY;
        }

      },
      imgTouchmove(e, img) {
        if(e.touches[1]) {
          //处于放大缩小状态
          let z2 = (e.touches[1].clientX - e.touches[0].clientX) * (e.touches[1].clientX - e.touches[0].clientX) + (e.touches[1].clientY - e.touches[0].clientY) * (e.touches[1].clientY - e.touches[0].clientY);
          let z = Math.sqrt(z2);
          let multiple = 1 + (z - this.imgStartZ) / 100;
          if(multiple < 1 / 2) {
            multiple = 1 / 2;
          }
          img.multiple = multiple;
        } else {
          img.moveX = e.touches[0].clientX - this.imgStartX;
          img.moveY = e.touches[0].clientY - this.imgStartY;
        }
      },
      imgTouchend(e, img) {
        let multipleWidth = (this.$refs.swiper.offsetWidth / (2 * img.multiple)) * (img.multiple - 1);
        if(img.moveX > multipleWidth) {
          img.moveX = multipleWidth
        } else if(img.moveX < -multipleWidth) {
          img.moveX = -multipleWidth
        }
        img.moveY = 0;
        if(img.multiple < 1) {
          img.multiple = 1;
        }
      }
    },
    destroyed() {
      this.imgDetails.forEach(i => {
        i.resetChange();
      })
    },
    mounted(){
      this.imgDetails = this.$store.state.temps.imgDetails;
      this.imgDetails.forEach(i => {
        i.resetChange();
        i.keepLocal();
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .img-detail {
    height: 100vh;
    width: 100%;
    background: black;
    overflow: hidden;
    .btn {
      position: fixed;
      top: 20px;
      left: 20px;
      background: rgba(255,255,255,.3);
      padding: 5px;
      color: black;
    }
    .img-detail-content {
      height: 100%;
      width: 100%;
      display: flex;
      transition-duration: 200ms;
      .content-item {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
        .img {
          transition-duration: 100ms;
          width: 100%;
          height: 100%;
          background-position: center!important;
          background-size: contain!important;
        }
      }
    }
  }
</style>
