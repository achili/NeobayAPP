<template>
  <div class="user-manual">
    <div class="user-manual-header">
      <div class="user-manual-title">
        <div class="user-manual-first-block-svg" @click="$router.closeActivity()">
          <div :style="'background:url(\''+(require('../../assets/svg/home/activity/return-black.svg'))+'\') center no-repeat'"
               style="margin-top: 38px;width: 13px;height: 17px;margin-left: 16px"></div>
        </div>
        <div class="user-manual-first-block-name">用户手册</div>
        <div class="close-ico-1"></div>
      </div>
    </div>
    <div class="user-manual-content">
      <div class="user-manual-box">
        <p>零号湾是….（零号湾介绍<p>
        <p>零号湾成立的宗旨是…</p>
        <p>理解尊重。正是风格完全不一样的一群人造就了这样丰富多元的社区,激发人们的创造力、创新力,开拓国际视野。让我们多一些 互动,少一点评头论足,更加尊重彼此。这样才能让整个社区,以及大家的事业更好地发展爱护公共空间。我们希望您在这片区域里舒适自如,但也希望您理解,其他的会员也需要使用这里。请您保持公共客厅以及会议室 的整洁,用餐之后,请及时清理,请您爱惜办公设备,像爱惜自己的东西一样。请您只使用您权限范围内的办公桌。为了整洁,也 为了安全,请不要把自己的物件放在办公桌上过夜。</p>
        <p>珍惜公共资源。如需使用会议室或活动场地,请您至前台预订,如需取消,请提前1小时通知我们。您放在公共冰箱里的食物,请保 持干净整齐,并且贴上姓名日期的标签。无姓名标签的食物,我们将在每周五进行清理。此外,我们免费提供咖啡、啤酒、软饮, 以及优惠的食品,让互动更有趣也随时帮您补充能量,希望您能享受的同时也注意节约——要记得其他会员的需要。</p>
        <p>避免噪音。当您和同事讨论正激烈,其他人可能在集中精神解决问题,或者在构筑一个大方案,反之亦然,如需在公共区域听音乐 或看视频,请您佩戴耳机;如需大声讨论问题,请至公共客厅或会议室,以免打扰他人。</p>
        <p>留意味道。没有人喜欢食物残留的异味,所以请尽可能减小这种味道。位于开放式办公区域的会员们,请至客厅区域就餐。让我们 大家都留意味道比较重的食物,不要带到社区内部。</p>
        <p>绿色工作。持鼓励可持续发展,是裸心引以为傲的事,我们也很感激您为此做出的努力。请节约能源,在您结束一天的工作时,关 闭办公间的灯,空调,以及您的电脑电源。</p>
          如果您有客人来访,请至前台登记他的信息(姓名,邮箱,电话)。如果我们不知道访客的身份,可能无法像招待客人一样招待他们,这也是出于维护社区安全的考虑。
          我们的共享工作间为您提供了极大的机动性,但这也意味着,我们不能追踪您的包裹和快递。因此请自行安排收发快递,我们只可 在您不在社区的时候临时代收快递。考虑到全部会员的安全,所有的外卖与快递止步于前台。
          如果您认为社区会员的行为违反了这些指南,请您亲自把这一现象或行为告知社区经理或发邮件到__________。我们不会透漏您的姓名。
          客厅/活动场地仅限会员使用,任何规模较大的集会都应事先与零号湾工作人员预订。
        <p>对于时常违背本我们指南的人,我们有权限制, 甚至取消其使用本社区的权利,尤其当他的行为涉及以下方面:</p>
        <ul>
          <li>发布法律禁止的内容,或威胁社区安全的危险内容。如果我们发现您有这类行为,将撤销您的会员身份,也可能采取必要措施,向 有关部门举报。</li>
          <li>向其他会员发泄不良情绪。零号湾并不是您排解恼怒、发泄情绪,甚至威胁他人的场所。我们不容忍任何的语言攻击,以及指名道 姓地谩骂。如果我们接到对您的投诉,并且查证属实,将发出警告,甚至撤销您会员身份。</li>
          <li>垃圾邮件、信息。零号湾可以作为一个寻找雇员、合作者甚至顾客的地方。但是,请对您信息的受众负责,如果您发布的信息不受 欢迎,言语过激,或者不尊重他人,我们有权向您发出警告,并拒绝您参与社区的活动。</li>
          <li>破坏工作环境。在我们的社区环境里工作时,请尊重其他会员以及他们的工作空间。使用过会议室或活动场地之后,请自觉清理, 以便其他会员继续使用。</li>
        </ul>
        <p>
          针对实际情况, 零号湾有权更改/更新/删减以上指南。
          我们诚挚欢迎任何会员来到本社区,也期待您的力量让这里变得更好。我们的指南只是希望大家享受自我的同时不会打扰他人。如对此有任何 想法,我们乐意倾听。留言请发邮件给我们的社区经理,邮箱地址:__________。
        </p>
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
  .user-manual{
    width: 100%;
    height: 100%;
    .user-manual-header{
      width: 100%;
      height: 66px;
      position: fixed;
      top: 0;
      left: 0;
      border-bottom: 1px solid #d7dcdd;
      .user-manual-title{
        width: 100%;
        display: flex;
        .close-ico-1{
          flex: 1;
        }
        .user-manual-first-block-svg{
          flex: 1;
        }
        .user-manual-first-block-name{
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
    .user-manual-content {
      margin-top: 66px;
      height: 100vh;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .user-manual-box{
        padding:0 20px 60px 20px;
        font-size: 14px;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .user-manual-header{
        padding: 18px 0 0 0 ;
      }
      .user-manual-content{
        margin-top:84px ;
      }
    }
  }
</style>
