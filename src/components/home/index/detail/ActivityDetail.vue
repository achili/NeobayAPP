<template>
  <div class="activity-detail">
    <div class="activity-detail-img-tag-top">
      <div class="activity-detail-img-tag">
        <div class="activity-detail-img-tag-return-i" @click="$router.closeActivity()">
          <div class="activity-detail-img-tag-return" :style ="'background:url(\''+(require('../../../../assets/svg/home/activity/return-black.svg'))+'\') center no-repeat'"></div>
        </div>
        <div class="activity-detail-img-tag-title">
          {{$t('message.ActivityDetail')}}
        </div>
        <div class="activity-detail-img-tag-share-i" @click.stop="openShare">
          <div class="activity-detail-img-tag-share" :style ="'background:url(\''+(require('../../../../assets/svg/home/activity/share-black.svg'))+'\') center no-repeat'"></div>
        </div>
      </div>
    </div>

    <div class="activity-detail-content">
      <div class="activity-detail-img" :style="'background: url(\''+officialActivity.poster.getLocalUrlBySize(200, 500)+'\') center'"></div>
      <div class="article-detail-block">
        <div class="article-detail-block-header">
          <div class="article-detail-block-header-title">
            <div class="article-detail-block-header-title-cell">
              <div style="padding-left: 15px;border-left: 3px solid #000;">
                {{officialActivity.title}}
              </div>
            </div>
          </div>
          <div class="article-detail-block-header-subtitle">

            <div class="article-detail-block-header-subtitle-time">
              <div class="yellow-circle"></div>
              <div>
                时间: {{officialActivity.startTime | yearTime()}} 至 {{officialActivity.endTime | yearTime()}}
              </div>
            </div>
            <div class="article-detail-block-header-subtitle-time">
              <div class="yellow-circle"></div>
              <div>
                报名: {{officialActivity.applyStartTime | yearTime()}} 至 {{officialActivity.applyEndTime | yearTime()}}
              </div>
            </div>
            <div class="article-detail-block-header-subtitle-time">
              <div class="yellow-circle"></div>
              <div>
                地点: {{officialActivity.address}}
              </div>
            </div>
            <div class="article-detail-block-header-subtitle-time">
              <div class="yellow-circle"></div>
              <div>
                发起: {{officialActivity.sponsor}}
              </div>
            </div>
            <div class="article-detail-block-header-subtitle-time">
              <div class="yellow-circle"></div>
              <div>
                人数: {{officialActivity.num}}/{{officialActivity.maxNum}}
              </div>
            </div>
          </div>
        </div>

        <div style="background-color: #ededed;width: 100vw;height: 10px;"></div>
        <div class="article-detail-block-content">
          <div class="article-detail-block-content-title">
            <div class="article-detail-block-content-title-cell">
              <div style="padding-left: 15px;border-left: 3px solid #000;">
                活动详情
              </div>
            </div>
          </div>
          <div class="content">
            <div class="detail-article-html" v-html="officialActivity.content" @click.prevent='openATag($event)'></div>

            <div class="seize-seat" v-show="officialActivity.loading">
              <span><i class="fa fa-spinner fa-spin fa-fw"></i>{{$t('message.Loading')}}...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="background-color: #FFFFFF;width: 100%;height: 89px;position: fixed;bottom: 0;">
      <div class="activity-bottom" v-if="officialActivity.endTime.getTime() > new Date().getTime()">
        <div class="button-entry" @click="goLogin(officialActivity)">
          {{$t('message.IWantApply')}}
        </div>
      </div>
      <div class="activity-bottom-disable" v-if="officialActivity.endTime.getTime() < new Date().getTime()">
        <div class="button-entry" >
          {{$t('message.Expired')}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Activity from "../../../../common/model/_base/Activity";
  import {mouthTime} from "../../../../common/filter/time";
  import OfficialActivity from "../../../../common/model/index/OfficialActivity"

  export default {
    data () {
      return {
        officialActivity: new OfficialActivity(),
        logo: require('../../../../assets/img/park/article/logo.png'),
        user:this.$store.state.user,
        status:false
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
    components: {

    },
    methods: {
      // queryStatus(){
      //   let that = this;
      //   this.officialActivity.id = this.$store.state.route.query.id;
      //   if (this.officialActivity.id) {
      //     this.officialActivity.httpDetail(function () {
      //       if(that.officialActivity.endTime.getTime() < new Date().getTime()){
      //         this.status = false
      //       }else {
      //         this.status = true
      //       }
      //     })
      //   }
      // },
      goLogin(i){
        if (this.user.isLogin) {
          this.$router.openActivity('activity_apply','slide-left',{id: i.id})
        } else {
          this.$router.openActivity('login');
        }
      },
      openShare() {
        let that = this;
        that.officialActivity.activitySharing(this.officialActivity.title,this.officialActivity.id);
      },
      refresh() {
        let that = this;
        this.officialActivity.id = this.$store.state.route.query.id;
        if (this.officialActivity.id) {
          this.officialActivity.httpDetail(function () {
            that.officialActivity.poster.keepLocal(200, 500);
          })
        }
      },
      openATag(event) {
        if(event.target.nodeName === 'A'){
          this.$router.openActivity('wc_list_details',"slide-left",{enclosureUrl:event.target.href});
        }else if(event.target.nodeName === 'FONT'){
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
      // this.queryStatus();
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  .activity-detail {
    width: 100%;
    height: 100vh;
    .activity-detail-img-tag-top{
      background-color: #fff;
      .activity-detail-img-tag {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-top: 33px;
        padding-bottom: 15px;
        .activity-detail-img-tag-return-i{
          flex: 1;
          .activity-detail-img-tag-return {
            width: 19px;
            height: 19px;
            margin-left: 15px;
          }
        }
        .activity-detail-img-tag-title {
          flex: 5;
          text-align: center;
          font-size: 18px;
          line-height: 18px;
          color: #323232;
          font-weight: bold;
        }
        .activity-detail-img-tag-share-i{
          flex: 1;
          .activity-detail-img-tag-share {
            width: 19px;
            height: 19px;
            margin-right: 15px;
          }
        }
      }
    }
    .activity-detail-content{
      width: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      height: calc(100vh - 66px - 89px);
      .activity-detail-img {
        width: 100%;
        height: 200px;
        background-size: cover !important;
      }
      .article-detail-block {
        .article-detail-block-header {
          .article-detail-block-header-title {
            border-bottom: 1px solid #dfdfdf;
            padding: 0 15px;
            margin-bottom: 20px;
            .article-detail-block-header-title-cell {
              display: flex;;
              color: #333333;
              padding-top: 15px;
              padding-bottom: 15px;
              font-size: 18px;
              line-height: 18px;
              font-weight: bold;
            }
          }
          .article-detail-block-header-subtitle {
            padding: 0 15px;
            .article-detail-block-header-subtitle-time {
              display: flex;
              font-size: 15px;
              color: #323232;
              line-height: 15px;
              padding-bottom: 15px;
            }
          }
        }
        .article-detail-block-content {
          .article-detail-block-content-title {
            border-bottom: 1px solid #dfdfdf;
            padding: 0 15px;
            margin-bottom: 20px;
            .article-detail-block-content-title-cell {
              display: flex;;
              color: #333333;
              padding-top: 15px;
              padding-bottom: 15px;
              font-size: 18px;
              line-height: 18px;
              font-weight: bold;
            }
          }
          .content {
            .detail-article-html {
              min-height: calc(100vh - 153px - 100vw / 2);
              img {
                height: auto;
              }
              p {
                font-size: 17px;
                color: #323232;
                line-height: 25px;
                letter-spacing: 1px;
                margin: 23px 15px;
                img {
                  max-width: calc(100vw - 30px) !important;
                }

                a {
                  margin: 23px -15px;
                  font-size: 14px;
                  overflow: hidden;
                }
              }
            }
            .seize-seat {
              text-align: center;
              background: white;
              min-height: 55vh;
              line-height: 100px;
            }
          }
        }

      }
      .yellow-circle {
        width: 7px;
        height: 7px;
        background-color: #ffa42f;
        border-radius: 50%;
        margin-top: 4px;
        margin-right: 15px;
      }
    }
    .activity-bottom {
      width: calc(100% - 30px);
      background-color: #ffa42f;
      color: white;
      height: 49px;
      bottom: 20px;
      left: 15px;
      border-radius: 5px;
      font-size: 16px;
      position: fixed;
      .button-entry {
        line-height: 49px;
        text-align: center;
      }
    }
    .activity-bottom-disable {
      width: calc(100% - 30px);
      background-color: #dfdfdf;
      color: #fff;
      height: 49px;
      bottom: 20px;
      left: 15px;
      border-radius: 5px;
      font-size: 16px;
      position: fixed;
      .button-entry {
        line-height: 49px;
        text-align: center;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .activity-detail-img-tag-top{
        padding: 18px 0 0 0 ;
      }
      .activity-detail-content{
      }
    }
  }
</style>
