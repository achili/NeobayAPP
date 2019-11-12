<template>
  <div class="hotel-apply">
    <div class="apartment-apply-top">
      <div class="apartment-apply-ico"  @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/fff-left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="apartment-apply-top-ico"
            >
        </div>
      </div>
      <div class="apartment-apply-top-title"></div>
      <div class="apartment-apply-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="apartment-apply-content-list">
      <div class="apartment-apply-content-text">
        <div class="apartment-apply-title">{{hotelApplyJson.title}}</div>
        <div class="apartment-apply-location">
          <div class="apartment-apply-location-text">{{hotelApplyJson.location}}</div>
          <div class="apartment-apply-location-ico" :style="'background: url(\''+ hotelApplyJson.addressIco + '\') no-repeat; background-size: cover;'"></div>
        </div>
      </div>
      <div class="apartment-apply-item">
        <div class="apartment-apply-list-box"
             @touchstart.stop="touchstart($event)" @touchmove.stop="touchmove($event)">
          <div class="apartment-apply-sortl" :style="'left:'+padding+'px'">
            <div v-for="item in hotelApplyJson.hotelApplyData" :key="item.agreementPrice" class="apartment-apply-swiper">
              <div class="apartment-apply-item-img" :style="'background: url(\''+ item.img + '\') no-repeat; background-size: cover;'"></div>
              <div class="apartment-apply-item-text">
                <div class="apartment-apply-item-one-row apartment-apply-item-row">
                  <div class="apartment-apply-item-type">{{item.type}}</div>
                  <div class="apartment-apply-item-btn" @click.stop="hotelApplyJson.click">我要申请</div>
                </div>
                <div class="apartment-apply-item-two-row apartment-apply-item-row">
                  <div class="apartment-apply-item-monthly">
                    <span class="span-text">协议价:</span>
                    <span class="span-color">
                        ￥<span class="span-monthly">{{item.agreementPrice}}</span>
                      </span>
                  </div>
                  <div class="apartment-apply-item-monthly" style="margin-left: 17px">
                    <span class="span-text">门市价:</span>
                    <span class="span-color">
                        ￥<span class="span-monthly">{{item.rackRate}}</span>
                      </span>
                  </div>
                </div>
                <div class="apartment-apply-item-three-row apartment-apply-item-row">
                  <div class="apartment-apply-item-detailed">{{item.detailed}}</div>
                </div>
                <div class="apartment-apply-item-service-row">
                  <div class="apartment-apply-item-service-text">服务</div>
                  <div class="apartment-apply-item-service">{{item.services}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HotelApply",
      data(){
        let $router = this.$router;
          return{
            hotelApplyJson:{
              title:"曼哈顿酒店",
              location:"上海·闵行",
              addressIco:require('../../../assets/img/life/H-address.png'),
              hotelApplyData:{
                item1:{
                  img:require('../../../assets/img/life/guestroom1.png'),
                  type:"豪华行政房",
                  agreementPrice:"528",
                  rackRate:"1288",
                  detailed:"免费提供迷你吧",
                  services:"便利设施: 雨伞、书桌、多种规格电源插座、110V电压插座、房内保险箱、空调、闹钟、针线包、220V电压插座、遮光窗帘、自动窗帘、备用床具:鸭绒被、沙发、房间内高速上网、客房WIFI覆盖\n" +
                  "浴室： 拖鞋、24小时热水、独立淋浴间、吹风机、免费洗漱用品(6样以内)、淋浴"
                },
                item2:{
                  img:require('../../../assets/img/life/guestroom1.png'),
                  type:"豪华行政房",
                  agreementPrice:"518",
                  rackRate:"1288",
                  detailed:"免费提供迷你吧",
                  services:"便利设施: 雨伞、书桌、多种规格电源插座、110V电压插座、房内保险箱、空调、闹钟、针线包、220V电压插座、遮光窗帘、自动窗帘、备用床具:鸭绒被、沙发、房间内高速上网、客房WIFI覆盖\n" +
                  "浴室： 拖鞋、24小时热水、独立淋浴间、吹风机、免费洗漱用品(6样以内)、淋浴"
                }
              },
              click: function () {
                $router.openActivity("hotel_apply_form", "slide-left");
              }

            },
            startX: 0,
            startPadding: 0,
            padding: 15,
            sliders:true
          }
      },
      methods:{
        goClose(){
          this.$router.closeActivity()
        },
        touchstart(e) {
          this.startX = e.changedTouches[0].clientX;
          this.startPadding = this.padding;
        },
        touchmove(e) {
          if(this.startX) {
            let spacing = this.startPadding + e.changedTouches[0].clientX - this.startX;
            if(spacing > 15) {
              this.padding = 15;
            } else if(spacing < -(this.hotelApplyJson.hotelApplyData.length * 320 - document.documentElement.clientWidth + 15)) {
              this.padding = -(this.hotelApplyJson.hotelApplyData.length.length * 320 - document.documentElement.clientWidth + 15);
            } else {
              this.padding = spacing;
            }
          }
        }
      },
      watch:{
        "padding"(){
          if(this.padding < -290){
            this.padding = -290
          }
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .hotel-apply{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    background: url("../../../assets/img/life/H-bgimg.png") no-repeat;
    background-size:cover;
    .apartment-apply-top{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .apartment-apply-ico{
        flex: 1;
        .apartment-apply-top-ico{
          margin-top: 36px;
        }
      }
      .apartment-apply-top-title{
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .apartment-apply-content-list{
      width: 100%;
      margin-top: 66px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      height: calc(100vh - 66px);
      .apartment-apply-content-text{
        .apartment-apply-title{
          font-size: 20px;
          color: #323232;
          margin: 11px 0 20px 16px;
        }
        .apartment-apply-location{
          font-size: 13px;
          color: #323232;
          margin: 0 0 71px 16px;
          display: flex;
          .apartment-apply-location-text{

          }
          .apartment-apply-location-ico{
            width: 11px;
            height: 13px;
            margin: 2px 13px;
          }
        }
      }
      .apartment-apply-item{
        width: 100%;
        border-radius: 5px;
        margin: 20px 0 50px 0;
        .apartment-apply-list-box {
          width: 100%;
          position: relative;
          height: 440px;
          overflow: hidden;
          .apartment-apply-sortl {
            left: 15px;
            top: 0;
            display: flex;
            position: absolute;
            .apartment-apply-swiper{
              margin: 0 5px;
              background: white;
              border-radius: 11px;
              width: 310px;
              height: 440px;
              .apartment-apply-item-img{
                width: 100%;
                height: 180px;
                border-radius: 11px 11px 0 0 ;
              }
              .apartment-apply-item-text{
                margin: 11px 0 0 16px;
                .apartment-apply-item-row{

                }
                .apartment-apply-item-one-row{
                  display: flex;
                  .apartment-apply-item-type{
                    flex: 1;
                    font-size: 20px;
                    color: #323232;
                  }
                  .apartment-apply-item-btn{
                    margin-right: 16px;
                    font-size: 15px;
                    color: #ED8D03;
                    line-height: 28px;
                  }
                }
                .apartment-apply-item-two-row{
                  margin-top: 5px;
                  display: flex;
                  .apartment-apply-item-monthly{
                    .span-text{
                      font-size: 15px;
                      color: #888;
                    }
                    .span-color{
                      font-size: 15px;
                      color:#ED8D03;
                      .span-monthly{
                        font-size: 20px;
                        color:#ED8D03;
                      }
                    }
                  }
                }
                .apartment-apply-item-three-row{
                  color: #ED8D03;
                  font-size: 15px;
                  margin-top: 8px;
                  .apartment-apply-item-detailed{
                  }
                }
                .apartment-apply-item-service-row{
                  margin-top: 10px;
                  .apartment-apply-item-service-text{
                    font-size: 15px;
                    color: #323232;
                  }
                  .apartment-apply-item-service{
                    font-size: 13px;
                    margin-top: 8px;
                    color: #888888;
                    padding-right: 15px;
                  }
                }
              }
            }
          }
        }
      }

    }
  }
</style>
