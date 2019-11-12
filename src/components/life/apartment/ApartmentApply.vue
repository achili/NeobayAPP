<template>
    <div class="apartment-apply-content">

      <div class="apartment-apply-top">
       <div class="apartment-apply-ico" @click.stop="goClose">
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
          <div class="apartment-apply-title">{{apartmentApplyJson.title}}({{apartmentApplyJson.address}})</div>
          <div class="apartment-apply-location">
            <div class="apartment-apply-location-text">{{apartmentApplyJson.location}}</div>
            <div class="apartment-apply-location-ico" :style="'background: url(\''+ apartmentApplyJson.addressIco + '\') no-repeat; background-size: cover;'"></div>
          </div>
        </div>
        <div class="apartment-apply-item">
          <div class="apartment-apply-list-box"
               @touchstart.stop="touchstart($event)" @touchmove.stop="touchmove($event)">
            <div class="apartment-apply-sortl" :style="'left:'+padding+'px'">
              <div v-for="item in apartmentApplyJson.apartmentApplyData" :key="item.img" class="apartment-apply-swiper">
                <div class="apartment-apply-item-img" :style="'background: url(\''+ item.img + '\') no-repeat; background-size: cover;'"></div>
                <div class="apartment-apply-item-text">
                  <div class="apartment-apply-item-one-row apartment-apply-item-row">
                    <div class="apartment-apply-item-type">{{item.type}}</div>
                    <div class="apartment-apply-item-btn"  @click.stop="openPopUp">我要申请</div>
                  </div>
                  <div class="apartment-apply-item-two-row apartment-apply-item-row">
                    <div class="apartment-apply-item-monthly">
                      <span class="span-text">月租:</span>
                      <span class="span-color">
                        ￥<span class="span-monthly">{{item.monthly}}</span>
                      </span>
                    </div>
                    <div class="apartment-apply-item-total">共计{{item.total}}套</div>
                  </div>
                  <div class="apartment-apply-item-three-row apartment-apply-item-row">
                    <div class="apartment-apply-item-detailed">{{item.detailed}}</div>
                    <div class="apartment-apply-item-bed">{{item.bed}}</div>
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
      <div class="popup-box" v-if="popUpShow">
        <popUp :closeCall="closeAllPopup"  :title="tit" :description="description" :createWord="createWord"></popUp>
      </div>
    </div>
</template>

<script>
  import popUp from "../../../v-activity/more/popup/popUp";
    export default {
        name: "ApartmentApply",
      data(){
        let $router = this.$router;
          return{
            apartmentApplyJson:{
              title:"人才公寓",
              address:"某某路",
              location:"上海 · 闵行",
              addressIco:require('../../../assets/img/life/H-address.png'),
              apartmentApplyData:{
                item1:{
                  img:require('../../../assets/img/life/item1.png'),
                  type:"房型E",
                  monthly:"1950",
                  total:"9",
                  detailed:"套间（四房）",
                  bed:"单人床1.2米",
                  services:"1.2米床、床头柜、床垫、写字台、写字椅、衣柜、窗帘、空调"
                },
                item2:{
                  img:require('../../../assets/img/life/item2.png'),
                  type:"房型E",
                  monthly:"1900",
                  total:"7",
                  detailed:"套间（四房）",
                  bed:"单人床1.2米",
                  services:"1.2米床、床头柜、床垫、写字台、写字椅、衣柜、窗帘、空调"
                }
              }
            },
            startX: 0,
            startPadding: 0,
            padding: 15,
            sliders:true,
            popUpShow: false,
            tit: "请您登录官方网站平台进行进一步申请",
            description: "https://neoBay.cn/enter/finance",
            createWord: "确定"
          }
      },
      components:{
        popUp
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
            } else if(spacing < -(this.apartmentApplyJson.apartmentApplyData.length * 320 - document.documentElement.clientWidth + 15)) {
              this.padding = -(this.apartmentApplyJson.apartmentApplyData.length.length * 320 - document.documentElement.clientWidth + 15);
            } else {
              this.padding = spacing;
            }
          }
        },
        openPopUp(){
          this.popUpShow = true;
        },
        closeAllPopup() {
          this.popUpShow = false;
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
  .apartment-apply-content{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    background: url("../../../assets/img/life/tom-grimbert-659318-unsplash.png") no-repeat;
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
        line-height: 94px;
        font-size: 18px;
        color: #323232;
        text-align: center;
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
          font-size: 25px;
          color: #323232;
          margin: 16px 0 20px 16px;
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
          height: 400px;
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
              height: 400px;
              .apartment-apply-item-img{
                width: 100%;
                height: 180px;
                border-radius: 11px 11px 0 0 ;
              }
              .apartment-apply-item-text{
                margin: 15px 0 0 16px;
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
                  margin-top: 10px;
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
                  .apartment-apply-item-total{
                    margin-left: 26px;
                    font-size: 15px;
                    color: #888;
                    line-height: 28px;
                  }
                }
                .apartment-apply-item-three-row{
                  display: flex;
                  color: #888;
                  font-size: 15px;
                  margin-top: 10px;
                  .apartment-apply-item-detailed{

                  }
                  .apartment-apply-item-bed{
                    margin-left: 38px;
                  }
                }
                .apartment-apply-item-service-row{
                  margin-top: 16px;
                  font-size: 15px;
                  .apartment-apply-item-service-text{
                    color: #323232;
                  }
                  .apartment-apply-item-service{
                    margin-top: 10px;
                    color: #323232;
                  }
                }
              }
            }
          }
        }
      }

    }
    .popup-box{
      position: fixed;
      top: 0;
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .apartment-apply-top{
        padding: 18px 0 0 0 ;
      }
      .apartment-apply-content-list{
        margin-top:84px ;
      }
    }
  }
</style>
