<template>
  <div class="service-financing">
    <div class="financing-item" v-for="financing in financings" :key="financing.title">
      <div class="financing-box">
        <div class="box-edge">
          <div class="title"><nobr>{{financing.title}}</nobr></div>
          <div class="title-line"></div>
          <div class="name">{{financing.name}}</div>
          <div class="logo" :style="'background:url(\''+financing.img+'\') center no-repeat'"></div>
        </div>
      </div>
    </div>

    <div class="btn-box">
      <div class="apply-btn" @click="apply">
        {{$t('message.IWantApply')}}
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        financings: [
          {
            title: "ZIZHU",
            name: "紫竹科技金融创新服务信息平台",
            img: require("../../assets/img/service/financing/0.png")
          },
          {
            title: "EFG",
            name: "上海市大学生科技创业基金会",
            img: require("../../assets/img/service/financing/1.png")
          },
          {
            title: "IDG Capital",
            name: "IDG 技术创业投资基金",
            img: require("../../assets/img/service/financing/3.png")

          },
          {
            title: "BCM",
            name: "交通银行",
            img: require("../../assets/img/service/financing/4.png")
          },
          {
            title: "接力空间",
            name: "上海创业接力企业服务有限公司",
            img: require("../../assets/img/service/financing/5.png")
          },
          {
            title: "晨晖创投",
            name: "上海晨晖创业投资管理有限公司",
            img: require("../../assets/img/service/financing/2.png")
          },
          {
            title: "SENSOR SPACE",
            name: "上海赛舍投资管理有限公司",
            img: require("../../assets/img/service/financing/6.png")
          },
          {
            title: "BOC",
            name: "中国银行",
            img: require("../../assets/img/service/financing/7.png")
          },
          {
            title: "InnoBay",
            name: "上海交湾投资管理有限公司",
            img: require("../../assets/img/service/financing/8.png")
          },
          {
            title: "CCB",
            name: "中国建设银行",
            img: require("../../assets/img/service/financing/9.png")
          },
          {
            title: "日臻资产",
            name: "日臻资产",
            img: require("../../assets/img/service/financing/add/rizhen.png")
          },
          {
            title: "QF Capital",
            name: "启赋资本",
            img: require("../../assets/img/service/financing/add/qifu.png")
          },
          {
            title: "伯藜创投",
            name: "伯藜创投",
            img: require("../../assets/img/service/financing/add/boli.png")
          },
          {
            title: "天使湾创投",
            name: "天使湾创投",
            img: require("../../assets/img/service/financing/add/tianshiwan.png")
          },
          {
            title: "英诺天使",
            name: "英诺天使",
            img: require("../../assets/img/service/financing/add/yingnuo.png")
          },
          {
            title: "Plug And Play",
            name: "Plug And Play",
            img: require("../../assets/img/service/financing/add/plug.png")
          },
          {
            title: "上海科投",
            name: "上海科技创业投资股份有限公司",
            img: require("../../assets/img/service/financing/add/shanghai.png")
          },
          {
            title: "见证投资",
            name: "见证投资",
            img: require("../../assets/img/service/financing/add/jianzheng.png")
          },
          {
            title: "富厚创投",
            name: "富厚创投",
            img: require("../../assets/img/service/financing/add/fuhou.png")
          },
          {
            title: "驰星创投",
            name: "驰星创投",
            img: require("../../assets/img/service/financing/add/chixing.png")
          },
          {
            title: "浅石创投",
            name: "浅石创投",
            img: require("../../assets/img/service/financing/add/qianshi.png")
          },
          {
            title: "实领投资",
            name: "实领投资",
            img: require("../../assets/img/service/financing/add/shiling.png")
          },
          {
            title: "分享投资",
            name: "分享投资",
            img: require("../../assets/img/service/financing/add/fenxiang.png")
          },
          {
            title: "复星高科技",
            name: "复星高科技",
            img: require("../../assets/img/service/financing/add/fuxing.png")
          },
          {
            title: "真格基金",
            name: "真格基金",
            img: require("../../assets/img/service/financing/add/zhenge.png")
          },
          {
            title: "海丰至诚",
            name: "海丰至诚",
            img: require("../../assets/img/service/financing/add/haifeng.png")
          },
          {
            title: "小苗基金",
            name: "小苗基金",
            img: require("../../assets/img/service/financing/add/xiaomiao.png")
          },
          {
            title: "伽利略资本",
            name: "伽利略资本",
            img: require("../../assets/img/service/financing/add/jialilve.png")
          }
        ]
      }
    },
    components: {

    },
    methods: {
      apply() {
        this.$store.state.openHomePopUp("message.LoginWebApply", "https://neoBay.cn/enter/finance", "message.Sure");
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .service-financing {
    padding: 7.5px;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    background: #F5F5F5;
    .financing-item {
      width: calc(50% - 15px);
      padding: 7.5px;
      .financing-box {
        background: white;
        padding: 15px;
        .box-edge {
          border: 1px solid #C5D0E0;
          padding: 7px;
          text-align: center;
          .title {
            font-size: 13px;
            font-weight: 600;
            line-height: 34px;
            color: #183761;
            letter-spacing: 1px;
          }
          .title-line {
            height: 1px;
            width: 60px;
            background: #91A6C5;
            margin: 0 auto;
          }
          .name {
            margin: 12px 0 16px 0;
            padding: 0 5px;
            font-size: 10px;
            letter-spacing: 0.8px;
            line-height: 13px;
            height: 26px;
            color: #666666;
            overflow: hidden;
          }
          .logo {
            margin: 0 auto 12px;
            max-width: 60px;
            padding: 0 10px;
            height: 18px;
            background-size: contain!important;
          }
        }
      }
    }
    .btn-box {
      padding: 0 8px 20px 8px;
      width: 100%;
      .apply-btn {
        margin-top: 12px;
        margin-bottom: 30px;
        background: #ffa42f;
        border-radius: 5px;
        width: 100%;
        color: white;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
      }
    }
  }
</style>
