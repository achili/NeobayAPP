<template>
  <div class="policy-detail">
    <div class="policy-detail-img-tag">
      <div class="one-card-solution-ico"   @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="one-card-solution-top-ico"
        >
        </div>
      </div>
      <div class="one-card-solution-top-title">{{$t('message.PolicyDetail')}}</div>
      <div class="one-card-solution-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="policy-detail-content-box">
    <div class="policy-detail-header">
      <div class="policy-detail-header-title">
        {{$t('message.Title')}}: {{officialPolicy.title}}
      </div>
      <div class="policy-detail-header-first-block">
        <div class="policy-detail-header-second-block" v-if="officialPolicy.tags.length > 0">
          <div class="policy-detail-header-second-block-title">
            {{$t('message.Tag')}}:
          </div>
          <div class="policy-detail-header-second-block-tag" v-for="tag in officialPolicy.tags" :key="tag.index">
            {{tag}}
          </div>
        </div>
      </div>
      <div class="policy-detail-header-first-block-time">
        {{$t('message.Publish')}}: {{officialPolicy.createTime | yearTime()}}
      </div>
    </div>

    <div class="policy-detail-description" v-if="officialPolicy.digest !== ' '">
      <div class="policy-detail-description-title">
        {{$t('message.DescriptionWord')}}
      </div>
      <div class="policy-detail-description-word">
        {{officialPolicy.digest}}
      </div>
    </div>


    <div class="policy-detail-content">
      <div class="policy-detail-content-title">
        {{$t('message.PolicyContent')}}:
      </div>
      <div @click.prevent='openATag($event)' v-html="officialPolicy.content"></div>
    </div>
    </div>
  </div>
</template>
<script>
  import Activity from "../../../../common/model/_base/Activity";
  import OfficialPolicy from "../../../../common/model/index/OfficialPolicy"
  export default {
    data () {
      return {
        officialPolicy: new OfficialPolicy()
      }
    },
    beforeCreate() {
    },
    props: {
      activity:{
        type: Activity,
        required: false
      }
    },
    watch: {},
    computed: {},
    components: {},
    methods: {
      refresh() {
        let that = this;
        this.officialPolicy.id = this.$store.state.route.query.id;
        if (this.officialPolicy.id) {
          this.officialPolicy.httpDetail()
        }
      },
      openATag(event) {
        if(event.target.nodeName === 'A' ){
          this.$router.openActivity('wc_list_details',"slide-left",{enclosureUrl:event.target.href});
        }else if( event.target.nodeName === 'FONT'){
          if(event.target.parentNode.parentNode.nodeName === 'A'){
            this.$router.openActivity('wc_list_details',"slide-left",{enclosureUrl:event.target.parentNode.parentNode.href});
          }else {
            return false
          }
        }
      }
    },
    mounted () {
      this.refresh();
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  .policy-detail {
    width: 100%;
    height: 100%;
    .policy-detail-img-tag {
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

    .policy-detail-content-box{
      margin-top: 66px;
      height: calc(100vh - 66px);
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
    .policy-detail-header {
      border-bottom: 1px solid #dedede;
      padding: 20px 15px;
      .policy-detail-header-title {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .policy-detail-header-first-block {
        display: flex;
        font-size: 14px;
        color: #666666;
        padding-bottom: 10px;
        justify-content: space-between;
        .policy-detail-header-first-block-author {

        }
        .policy-detail-header-second-block {
          display: flex;
          font-size: 14px;
          color: #666666;
          .policy-detail-header-second-block-title {

          }
          .policy-detail-header-second-block-tag {
            color: #ff9600;
            margin-left: 5px;
          }
        }

      }
      .policy-detail-header-first-block-time {
        font-size: 14px;
      }

    }

    .policy-detail-description {
      padding: 20px 15px 0;
      .policy-detail-description-title {
        color: #333333;
        font-weight: bold;
        line-height: 18px;
        font-size: 18px;
        border-left: 2px solid #ff9600;
        padding-left: 5px;
        margin-bottom: 20px;
      }
      .policy-detail-description-word {
        color: #666666;
      }
    }

    .policy-detail-content {
      padding: 20px 15px;
      .policy-detail-content-title {
        color: #333333;
        font-weight: bold;
        line-height: 18px;
        font-size: 18px;
        border-left: 2px solid #ff9600;
        padding-left: 5px;
        margin-bottom: 20px;
      }
    }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .policy-detail-img-tag{
        padding: 18px 0 0 0 ;
      }
      .policy-detail-content-box{
        margin-top:84px ;
      }
    }
  }
</style>
