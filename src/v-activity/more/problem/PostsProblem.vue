<template>
  <div class="posts-problem">
    <div class="posts-problem-header">
      <div class="posts-problem-title">
        <div class="posts-problem-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../../assets/svg/register/arrow.svg'))+'\') center no-repeat'"></div>
        <div class="posts-problem-first-block-name">朋友圈发表异常问题</div>
      </div>
    </div>

    <div class="body">
      <div class="posts-problem-top">
        <div class="top">申请提交问题</div>
      </div>

      <div class="posts-problem-content">
        <p style="color: #484848;font-size: 14px;">申请提交:</p>
        <p>1)在APP中限制了一些复杂申请的使用，需要您在零号湾官方网站上进行进一步更详细的操作；</p>
        <p>2)当前连接的网络不稳定，或预约高峰期不能及时审批提交的申请，建议您可以更换其他网络，或及时联系工作人员咨询;</p>
        <p>3)若填写订单内容有误或者关键信息缺失，导致审核失败，需要及时联系工作人员进行修改或者重新提交订单申请；</p>
        <p style="color: #00B3E4;">温馨提示:</p>
        若恶意提交申请，会导致您的账号被封禁，并承担相应的法律责任。
        <p style="color: #484848;font-size: 14px;">链接地址无法被别人分享:</p>
        可能由于此链接同一时段分享给其它用户数较多导致，可更换其它时段再分享。为了更多精彩内容能被他人正常分享及转发，建议您在发布内容中不要存在诱导分享的行为。
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
      goClose(){
        this.$router.closeActivity()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .posts-problem{
    .posts-problem-header{
      padding: 10px 20px 10px 20px;
      border-bottom: #ECEEEF solid 1px;
      .posts-problem-title{
        position: relative;
        font-size: 18px;
        .posts-problem-first-block-svg{
          height: 30px;
          width: 30px;
          display: inline-block;
        }
        .posts-problem-first-block-name{
          display: inline-block;
          position: absolute;
          right: 25%;
        }
      }
    }
    .body{
      padding-left: 20px;
      .posts-problem-top{
        padding-right: 20px;
        padding-top: 20px;
       .top{
         color: #484848;
         padding-bottom: 10px;
       }
      }
      .posts-problem-content {
       padding-right: 20px;
        font-size: 14px;
      }
    }


  }
</style>
