<template>
  <div class="common-problem">
    <div class="common-problem-header">
      <div class="common-problem-title">
        <div class="common-problem-first-block-svg" >
          <div @click="$router.closeActivity()"
               :style="'background:url(\''+(require('../../assets/svg/home/activity/return-black.svg'))+'\') center no-repeat'"
               style="margin-top: 38px;width: 13px;height: 14px;margin-left: 16px"
          ></div>
        </div>
        <div class="common-problem-first-block-name">常见问题</div>
        <div class="close-ico-1"></div>
      </div>
    </div>

    <div class="common-problem-content">
      <div class="common-problem-box" @click="postProblem" >
        <div class="title pull-left">申请提交</div>
        <div class="pull-right tag" :style="'background:url(\''+(require('../../assets/svg/more/select.svg'))+'\') center'"></div>
      </div>
    </div>

  </div>
</template>

<script>

  export default{
    data () {
      return {

      }
    },
    props:{
    },
    components: {
    },
    methods : {
      postProblem(){
        this.$router.openActivity('posts_problem');
      },
      goClose(){
        this.$router.closeActivity()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .common-problem{
    .common-problem-header{
      width: 100%;
      height: 66px;
      position: fixed;
      top: 0;
      left: 0;
      border-bottom: 1px solid #d7dcdd;
      .common-problem-title{
        width: 100%;
        display: flex;
        .close-ico-1{
          flex: 1;
        }
        .common-problem-first-block-svg{
          flex: 1;
        }
        .common-problem-first-block-name{
          font-size: 18px;
          flex: 3;
          margin: 0 auto;
          height: 66px;
          line-height: 94px;
          text-align: center;
          font-weight: bold;
        }
      }
    }
    .common-problem-content {
      margin-top: 66px;
      padding-top: 20px;
      padding-left: 20px;
      .common-problem-box{
        padding-bottom: 20px;
        border-bottom: #ECEEEF solid 1px;
        height: 30px;
        .title{
          padding-bottom: 20px;
        }
        .tag{
          position: relative;
          height: 25px;
          width: 25px;
        }

      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .common-problem-header{
        padding: 18px 0 0 0 ;
      }
      .common-problem-content{
        margin-top:84px ;
      }
    }
  }
</style>
