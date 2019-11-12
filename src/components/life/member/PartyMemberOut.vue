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

      <div class="one-card-solution-clause">
        <div class="one-card-solution-clause-title">
          {{solutionJson.clauseTitle}}
        </div>
        <ul class="one-card-solution-clauseText">
          <li class="list"><span>{{solutionJson.clauseText1}}</span></li>
          <li class="list"><span>{{solutionJson.clauseText2}}</span></li>
        </ul>
      </div>

      <div class="one-card-solution-clause">
        <div class="one-card-solution-clause-title">
          {{solutionJson.cell2}}
        </div>
        <ul class="one-card-solution-clauseText">
          <li class="list"><span>{{solutionJson.cell2Text1}}</span></li>
          <li class="list"><span>{{solutionJson.cell2Text2}}</span></li>
          <li class="list"><span>{{solutionJson.cell2Text3}}</span></li>
          <li class="list"><span>{{solutionJson.cell2Text4}}</span></li>
        </ul>
      </div>

      <div class="one-card-solution-clause">
        <div class="one-card-solution-clause-title">
          {{solutionJson.cell4}}
        </div>
        <ul class="one-card-solution-clauseText">
          <li class="list"><span>{{solutionJson.cell4Text1}}</span></li>
          <li class="list"><span>{{solutionJson.cell4Text2}}</span></li>
          <li class="list"><span>{{solutionJson.cell4Text3}}</span></li>
          <li class="list"><span>{{solutionJson.cell4Text4}}</span></li>
        </ul>
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
          title:"message.Member",
          navUrl:require('../../../assets/img/life/party-member.png'),
          maxText:"党员组织关系转出",
          minText:"转移流程",
          clauseTitle:"转本市",
          clauseText1:"支部提供必要信息（开具内部介绍信），南滨江党群部开具介绍信后交予支部书记或直接寄给党员本人，同时在党管系统中将其转出；",
          clauseText2:"介绍信回执以传真、扫描、快递等方式到南滨江党群部。",
          cell2:"转外省市",
          cell2Text1:"支部事先向闵行区国资委党群科说明转出事由；",
          cell2Text2:"党员到闵行区国资委党群科开介绍信，抬头写“中共上海市闵行区委组织部”，同时在党管系统中转出；",
          cell2Text3:"持此介绍信再到闵行区党建服务中心开介绍信；",
          cell2Text4:"两份介绍信回执可以不回。",
          cell4:"联系人及联系方式",
          cell4Text1:"闵行区党建服务中心地址：莘东路505号12楼",
          cell4Text2:"闵行区国资委党群科联系人：许之琼，电话：64122200-3132，地址：水清路399号3楼党群科",
          cell4Text3:"南滨江党群部联系人：胡蝶飞，电话：34906631-8511、18221331180，地址：都市路717号5楼512室",
          cell4Text4:"零号湾联合支部联系人：陈青，电话：64501298、13917598825，地址：剑川路951号2号楼209室"
        }
      }
    },
    methods:{
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
      height: calc(100vh - 66px);
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
