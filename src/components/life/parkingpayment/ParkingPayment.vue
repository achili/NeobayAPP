<template>
  <div class="parking-payment-content">
    <div class="parking-payment-top">
      <div class="parking-payment-ico"  @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="parking-payment-top-ico"
            >
        </div>
      </div>
      <div class="parking-payment-top-title">{{$t(title)}}</div>
      <div class="parking-payment-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="parking-payment-content-body">
      <div class="parking-payment-nav" :style="'background: url(\''+ paymentJson.navUrl + '\') no-repeat; background-size: cover;'"></div>
      <div class="parking-payment-title">
        <div class="parking-payment-max-text">
          {{title}}
        </div>
        <div class="parking-payment-min-text">
          {{paymentJson.paymentData.handle.title}}
        </div>
      </div>
      <div class="parking-payment-content-img" :style="'background: url(\''+ paymentJson.paymentData.handle.ico + '\') no-repeat; background-size: cover;'"></div>
      <div class="parking-payment-clause">
        <ul class="parking-payment-clauseText">
          <li class="list"><span>{{paymentJson.paymentData.handle.content1}}</span></li>
          <li class="list"><span>{{paymentJson.paymentData.handle.content2}}</span></li>
          <li class="list"><span>{{paymentJson.paymentData.handle.content3}}</span></li>
        </ul>
      </div>
      <div class="parking-payment-solid"></div>
      <div class="parking-payment-introduce">
        <div class="introduce-title">{{paymentJson.paymentData.introduce.title}}</div>
        <div class="introduce-content">{{paymentJson.paymentData.introduce.content}}</div>
      </div>
      <div class="parking-payment-information">
        <div class="information-title">{{paymentJson.paymentData.information.title}}</div>
        <div class="information-content">{{paymentJson.paymentData.information.content1}}</div>
        <div class="information-content">{{paymentJson.paymentData.information.content2}}</div>
        <div class="information-content">{{paymentJson.paymentData.information.content3}}</div>
      </div>
    </div>
    <div class="parking-payment-btn-content">
      <div class="parking-payment-btn"
           @click.stop="goLogin(paymentJson.paymentData.btnData.router)">
        {{$t(paymentJson.paymentData.btnData.btnText)}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          let $router = this.$router;
          return{
            user: this.$store.state.user,
            title:"message.Park",
            btn:"我要申请",
            paymentJson:{
              navUrl:require('../../../assets/img/life/p-nav.jpg'),
              paymentData:{
                handle:{
                  title:"免费办理",
                  ico:require('../../../assets/img/life/p-content.png'),
                  content1:"首先填写园区停车位申请表。",
                  content2:"审核通过后，到后台打印申请表。",
                  content3:"携带驾照和申请表导零号湾科技大楼1号楼10楼物业处办理相关手续。"
                },
                introduce:{
                  title:"产品介绍",
                  content:"零号湾园区内一共有250多个停车位，现在已经全部开放给园区内的创业团队，创业团队需要停车位的可以向物业申请办理停车月卡。"
                },
                information:{
                  title:"办理信息",
                  content1:"办理时间：周一至周五 9:00-17:00",
                  content2:"联系单位：上海益源工业开发有限公司物业处",
                  content3:"地址:零号湾科技大楼一号楼北楼10楼物业办公室"
                },
                btnData:{
                  btnText:"message.IWantApply",
                  router:"parking_payment_apply_form"
                }
              }
            }
          }
        },
      methods:{
        goLogin(e){
          if(this.user.isLogin){
            this.$router.openActivity(e, "slide-left");
          }else {
            this.$router.openActivity('login');
          }
        },
        goClose(){
          this.$router.closeActivity()
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .parking-payment-content{
    height: 100vh;
    .parking-payment-top{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .parking-payment-ico{
        flex: 1;
        .parking-payment-top-ico{
          margin-top: 36px;
        }
      }
      .parking-payment-top-title{
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .parking-payment-content-body{
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      height: calc(100vh - 66px - 89px);
      margin-top:66px ;
      .parking-payment-nav{
        width: 100%;
        height: 160px;
      }
      .parking-payment-title{
        margin-top: 25px;
        padding-left: 16px;
        .parking-payment-max-text{
          font-size: 20px;
          color: #515151;
        }
        .parking-payment-min-text{
          margin-top: 13px;
          font-size: 15px;
          color: #ffa42f;
        }
      }
      .parking-payment-content-img{
        width: 241px;
        height: 41px;
        margin: 25px 0 24px 15px;
      }
      .parking-payment-clause{
        padding-right: 16px;
        .parking-payment-clauseText{
          margin-top: 18px;
          .list{
            margin-top: 14px;
            color: #ffa42f;
          }
          .list span{
            color: #323232;
            font-size: 15px;
          }
        }
      }
      .parking-payment-solid{
        margin: auto;
        width: 92%;
        height: 1px;
        background-color: #e2e2e2;
      }
      .parking-payment-introduce{
        margin: auto;
        width: 92%;
        .introduce-title{
          margin: 19px 0 14px 0;
          font-size: 15px;
          color: #888;
        }
        .introduce-content{
          font-size: 15px;
          line-height: 23px;
          color: #323232;
        }
      }
      .parking-payment-information{
        margin: auto;
        width: 92%;
        padding-bottom: 120px;
        .information-title{
          color: #888888;
          font-size: 15px;
          margin:40px auto 14px auto;
        }
        .information-content{
          font-size: 15px;
          line-height: 23px;
          color: #323232;
        }
      }
    }
    .parking-payment-btn-content{
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 89px;
      .parking-payment-btn{
        margin:22px auto 30px auto;
        width: 92%;
        height: 49px;
        color: white;
        background-color: #ffa42f;
        text-align: center;
        line-height: 49px;
        border-radius: 5px;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .parking-payment-top{
        padding: 18px 0 0 0 ;
      }
      .parking-payment-content-body{
        margin-top:84px ;
        height: calc(100vh - 84px);
      }
    }
  }
</style>
