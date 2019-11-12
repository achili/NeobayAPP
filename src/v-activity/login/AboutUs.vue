<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="about-us-content">
    <div class="one-card-solution-top" @click.stop="goClose">
      <div class="one-card-solution-ico">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="one-card-solution-top-ico">
        </div>
      </div>
      <div class="one-card-solution-top-title">{{$t('message.AboutUs')}} neoBay</div>
      <div class="one-card-solution-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="protocol-con protocol-content">
      <h3>零号湾简介 Introduction</h3>
      <p>2015年4月11日，上海交通大学、上海市闵行区人民政府、上海地产集团三方合作共建零号湾全球创新创业集聚区，全力投入三方优势资源，共同打造创新创业培育生态体系。零号湾重点培育和孵化科技型创业企业，通过创新创业生态体系的建设，吸引和凝聚国内外创新创业资源及力量，助力上海建设成为具有全球影响力的科技创新中心。</p>
      <p>neoBay, Global Entrepreneurship and Innovation Community (neoBay), is co-founded on April 11, 2015 by Shanghai Jiao Tong University (SJTU), Government of Shanghai Minhang District, and Shanghai Land Group (SL) to build an incubation platform of innovation and entrepreneurship with premium resources. With its focus on incubating technology-based start-ups, based on a solid eco-system of innovation and entrepreneurship, neoBay aims at attracting and converging worldwide resources and power of innovation and entrepreneurship, advancing Shanghai towards the leading hub of hi-tech innovation with global influence.</p>
      <h3>生态体系 Ecosystem</h3>
      <h3>1.	优质的苗圃、孵化器众创空间</h3>
      <p>Premium Incubators and Co-working Space</p>
      <h3>2.	创业无忧</h3>
      <p>Benefits and Perks</p>
      <p> 零号湾为创业者提供包括工商服务、政策支持、金融证券、融资投资、税务法务、知识产权等全方位的创业服务支持，落户零号湾的闵行区行政服务中心让创业者足不出园即可办理各类繁琐手续；</p>
      <p>同时，零号湾也为创业者提供包括人才公寓、餐饮配套、游泳健身、创业一卡通、创业车管家、汽车分时租赁等强大的配套服务支持。</p>
      <p>neoBay allows all members to freely enjoy business service, policy support, financing service, tax & law consulting, accounting service, intellectual property support, and other entrepreneurship services. The Government of Shanghai Minhang District administrative service center is located in neoBay, providing one-stop business solutions for neoBay start-ups.</p>
      <p>Meanwhile, neoBay offers discounts on supportive services such as talent flats, catering, gym membership, neoBay’s E-card, car maintenance, car rental and so on.</p>
      <h3>3.	联合孵化</h3>
      <p>Co-incubators</p>
      <p>引育并举，多主体联合培育创业项目，零号湾苗圃、孵化器与先进制造、智慧医疗、接力空间、晨晖创投、苏河汇、塞舍空间、产研院孵化专区、信息安全孵化专区等专业孵化平台联合，共同打造多元化、开放性的创新创业培育平台。</p>
      <p>neoBay cooperates with professional incubators from all backgrounds to foster entrepreneurship, among which are advanced-manufacturing, smart healthcare, CHENHUI venture partners, SuHeHui, Sensor Coffee, SJTU’s Advanced Industrial Technology Research Institute and Information Security (IS) incubator zone etc. Those incubators help build a diversified and open platform for innovation and entrepreneurship.</p>
      <h3>4.	创业社群</h3>
      <p>Start-up Community</p>
      <p>创业社群全方位提升创业者社交环境，成立零号湾创业代表委员会，定期举办零号湾独有的neoShow（“牛秀”）、neoTalk（“牛说”）系列活动、举办各类路演、科技赛事、产业峰会，丰富创业者们的融资与交流渠道。</p>
      <p>neoBay start-up community has set up the neoBay entrepreneurs’ committee, and regularly holds exclusive events including neoShows, neoTalks, road shows, hi-tech competition and industrial summits, bringing more networking and financing opportunities to entrepreneurs.</p>
      <h3>入驻方式How to Join Us</h3>
      <p>1.	访问零号湾官方网站http://neoBay.cn，下载并填写零号湾入驻申请表</p>
      <p>Please visit our website http://neoBay.cn to download the application form.</p>
      <p>2.	将申请表发送至welcome@neoBay.cn </p>
      <p>Send the application form to welcome@neoBay.cn after filling in it.</p>
      <p>3.	制作约10分钟内容的演示文稿，参加入驻评审</p>
      <p>Prepare a presentation of about 10 minutes for your road show. </p>
      <p>4.	顺利通过，入驻零号湾。</p>
      <p>Join us and start your business when you pass the road show successfully.</p>
      <h3>联系我们Contact </h3>
      <p>地址：上海市闵行区剑川路951号零号湾2号楼202室</p>
      <p>Address: Room 202, Block 2, neoBay Building, No. 951 Jianchuan Road, Minhang District, Shanghai</p>
      <p>邮编/ Postcode：200240 </p>
      <p>网址/ Official website：<span style="color: blue"  v-clipboard:copy="'www.neoBay.cn'" v-clipboard:success="onCopy" v-clipboard:error="onError">www.neoBay.cn</span></p>
      <p>邮箱/ Email: <span style="color: blue" v-clipboard:copy="'welcome@neoBay.cn'" v-clipboard:success="onCopy" v-clipboard:error="onError">welcome@neoBay.cn</span></p>
      <p>电话/ Tel: 021-6450 0866</p>
      <img src="../../assets/img/more/about/neobay.jpg" alt="">
      <p>欢迎关注我们的微信公众号！</p>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        plus:this.$store.state.plus
      }
    },
    components: {},
    methods: {
      goClose(){
        this.$router.closeActivity()
      },
      isOpenUrl(i){
        let that = this;
        let urlStr = encodeURI(i);
        that.plus.runtime.openURL(urlStr,function (err) {
          that.$store.state.plus.nativeUI.toast(urlStr + err ,{duration:"short"});
        });
      },
      onCopy(e){
        this.$store.state.plus.nativeUI.toast(this.$t('message.CopyLinkSuccess'),{duration:"short"});
      },
      onError(e){
        this.$store.state.plus.nativeUI.toast(this.$t('message.CopyLinkFailed'),{duration:"short"});
      },
      downloaderQrCode() {
        let that = this;
        let downloaderTask = this.$store.state.plus.downloader.createDownload("https://yctank.liyarou.com/f/jay/20180904/b03e25d294f673e975335c122671a57e/neobay.jpg", {filename:"_documents/neobay.jpg", retryInterval: 2}, function(d, status) {
          if (status === 200) {
            that.$store.state.plus.nativeUI.toast(that.$t('message.DownloadSuccess'), {duration:"short"});
          } else {
            that.$store.state.plus.nativeUI.toast(that.$t('message.DownloadFailed') + status + " - " + e.code,{duration:"short"});
          }
        });
        //启动下载任务
        downloaderTask.start();
      }
    },
    mounted(){}
  }
</script>
<style lang="less" rel="stylesheet/less">
  .about-us-content{
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
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
    }
    .protocol-content{
      padding: 0 16px;
      margin-top: 66px;
      height: calc(100vh - 66px);
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      p{
        font-size: 17px;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .one-card-solution-top{
        padding: 18px 0 0 0 ;
      }
      .protocol-content{
        margin-top:84px ;
        height: calc(100vh - 84px);
      }
    }
  }
</style>

