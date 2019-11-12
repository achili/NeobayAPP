<template>
  <div class="one-card-solution-content">
    <div class="one-card-solution-top">
      <div class="one-card-solution-ico"   @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="one-card-solution-top-ico"
           >
        </div>
      </div>
      <div class="one-card-solution-top-title">{{$t(solutionJson.title)}}</div>
      <div class="one-card-solution-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="one-card-solution-content-body">
      <div class="one-card-solution-nav" :style="'background: url(\''+ solutionJson.navUrl + '\') no-repeat; background-size: cover;'"></div>
      <div class="one-card-solution-title">
        <div class="one-card-solution-max-text">
          {{solutionJson.maxText}}
        </div>
        <div class="one-card-solution-min-text">
          {{solutionJson.minText}}
        </div>
      </div>
      <div class="one-card-solution-abstract">
        <div class="one-card-solution-abstract-title">
          {{solutionJson.abstractTitle}}
        </div>
        <div class="one-card-solution-abstract-text">
          {{solutionJson.abstractText}}
        </div>
      </div>
      <div class="one-card-solution-clause">
        <div class="one-card-solution-clause-title">
          {{solutionJson.clauseTitle}}
        </div>
        <ul class="one-card-solution-clauseText">
          <li class="list"><span>{{solutionJson.clauseText1}}</span></li>
          <li class="list"><span>{{solutionJson.clauseText2}}</span></li>
          <li class="list"><span>{{solutionJson.clauseText3}}</span></li>
          <li class="list"><span>{{solutionJson.clauseText4}}</span></li>
          <li class="list"><span>{{solutionJson.clauseText5}}</span></li>
        </ul>
      </div>
    </div>
    <div class="one-card-solution-btn-content">
      <div class="one-card-solution-btn"
           @click.stop="goLogin(solutionJson.btnData.router)">
        {{$t(solutionJson.btnData.btnText)}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        let $router = this.$router;
        return{
          user:this.$store.state.user,
          solutionJson:{
            title:"message.Card",
            navUrl:require('../../../assets/img/life/banner.png'),
            maxText:"创业一卡通 One-Card",
            minText:"免费办理",
            abstractTitle:"产品介绍",
            abstractText:"neoBay生活卡（创业一卡通）适用于上海零号湾全球创新创业集聚区内办公区域的门禁和零号湾食堂、赛舍咖啡馆、喜士多的充值与消费。",
            clauseTitle:"使用条款",
            clauseText1:"本一卡通不提现、不透支、不计息。",
            clauseText2:"本一卡通充值为自助充值。园区内充值点：零号湾科技大楼二楼餐厅旁的一卡通充值机。",
            clauseText3:"本一卡通为持卡人本人所持有，不得转借、不得转让、不得出售。违者个人将承担相应的责任。",
            clauseText4:"一经遗失或员工离职，团队或企业必须以邮件的形式向我零号湾管理部门报告(发送至邮箱welcome@neoBay.cn)。如不执行，将承担由此带来的任何安全风险。如给园区带来损失，企业或团队将承担相应的责任。",
            clauseText5:"补卡请重新线上填写一卡通申请，并承担相应的购卡费用。",
            btnData:{
              btnText:"message.IWantApply",
              router:"one_card_solution_apply_form"
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
  .one-card-solution-content{
    height: 100vh;
    .one-card-solution-top{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .one-card-solution-ico{
        flex: 1;
        .one-card-solution-top-ico{
        margin-top: 36px;
        }
      }
      .one-card-solution-top-title{
        flex:5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .one-card-solution-content-body{
      margin-top: 66px;
      height: calc(100vh - 66px - 89px);
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;

      .one-card-solution-nav{
        width: 100%;
        height: 160px;
      }
      .one-card-solution-title{
        margin-top: 25px;
        padding-left: 16px;
        .one-card-solution-max-text{
          font-size: 20px;
          color: #515151;
        }
        .one-card-solution-min-text{
          margin-top: 13px;
          font-size: 15px;
          color: #ffa42f;
        }
      }
      .one-card-solution-abstract{

        padding:39px 16px 0 16px ;
        .one-card-solution-abstract-title{
          font-size: 15px;
          color: #888888;
        }
        .one-card-solution-abstract-text{
          margin-top: 18px;
          font-size: 15px;
          color:#323232;
          padding: 0 0 21px 0;
          border-bottom: 1px solid #e2e2e2;
        }
      }
      .one-card-solution-clause{
        padding:0 16px 0 0;
        .one-card-solution-clause-title{
          margin: 18px;
          font-size: 15px;
          color: #888888;
        }
        .one-card-solution-clauseText{
          margin-top: 18px;
          .list{
            margin-bottom: 14px;
            color: #ffa42f;
          }
          .list span{
            color: #323232;
            font-size: 15px;
          }
        }

      }
    }

    .one-card-solution-btn-content{
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 89px;
      .one-card-solution-btn{
        margin:22px auto 40px auto;
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
      .one-card-solution-top{
        padding: 18px 0 0 0 ;
      }
      .one-card-solution-content-body{
        margin-top:84px ;
      }
    }
  }
</style>
