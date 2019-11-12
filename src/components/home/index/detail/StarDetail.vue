<template>
  <div class="star-detail">
    <div class="star-detail-img-tag">
      <div class="one-card-solution-ico"   @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="one-card-solution-top-ico">
        </div>
      </div>
      <div class="one-card-solution-top-title">{{$t('message.StartUpsDetail')}}</div>
      <div class="one-card-solution-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="star-detail-content-box">
    <div class="star-detail-header">
      <div class="star-detail-header-block">
        <div class="star-detail-img"
             :style="'background: url(\''+officialStar.poster.getLocalUrlBySize(80, 80)+'\') center'"></div>
        <div class="star-detail-header-cell">
          <div class="star-detail-header-cell-title">
            {{officialStar.name}}
          </div>
          <div class="star-detail-header-cell-name">
            {{officialStar.name}}
          </div>
          <div class="star-detail-header-cell-button">
            <div class="tag-block" style="margin-right: 11px;">
              <nobr>
              <span class="tag">
              类型
            </span>
                <span class="content">
              {{officialStar.category}}
            </span>
              </nobr>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="star-detail-content">
      <div class="star-detail-content-show">
        <div class="star-detail-content-show-title">
          {{$t('message.ProjectDisplay')}}
        </div>
        <div class="show-title-bg" v-if="officialStar.carouselUrls.length <= 1" :style="'background:url(\''+ officialStar.carouselUrls +'\') center no-repeat'" style="background-size: cover !important;height: 150px;"></div>
          <div class="swiper-list-content" v-else>
            <wc-swiper class="swiper-list" ref="swiper" :pagination="false" :therehold="250">
              <wc-slide class="swiper-slide" v-for="k in officialStar.carouselUrls.length-1" :key="k"
                        :style="'background: url(\''+ officialStar.carouselUrls[k] +'\') center;'">
              </wc-slide>
            </wc-swiper>
          </div>
      </div>


      <div class="star-detail-content-description">
        <div class="star-detail-content-description-title">
          {{$t('message.ProjectIntroduce')}}
        </div>
        <div v-html="officialStar.content" @click.prevent='openATag($event)'>
        </div>
      </div>
    </div>

    <!--<div class="star-detail-content-cell-button">-->
        <!--<div class="star-detail-content-cell-button-block">-->
          <!--<div class="star-detail-content-cell-button-tag">-->
            <!--<div class="star-detail-content-like">-->
              <!--<div v-if="!isLike" class="star-detail-content-button-tag-dislike" @click.stop="starLike"-->
                   <!--:style ="'background:url(\''+(require('../../../../assets/svg/home/star/like.svg'))+'\') center no-repeat'">-->
              <!--</div>-->
              <!--<div v-else class="star-detail-content-button-tag-like"-->
                   <!--:style ="'background:url(\''+(require('../../../../assets/svg/home/star/like-active.svg'))+'\') center no-repeat'">-->
              <!--</div>-->
              <!--<div class="star-detail-content-cell-button-tag-like">-->
                <!--{{officialStar.likeNum}}-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;<div style="font-size: 13px;color: #666666;">&ndash;&gt;-->
          <!--&lt;!&ndash;已有 {{officialStar.likeNum}} 人点赞&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</div>-->
        <!--<div style="font-size: 13px;color: #666666;">-->
          <!--已有 {{officialStar.likeNum}} 人点赞-->
        <!--</div>-->
        <!--&lt;!&ndash;<div class="star-detail-content-img">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="star-detail-content-cell-button-img"&ndash;&gt;-->
        <!--&lt;!&ndash;:style="'background: url(\''+ logo + '\') no-repeat; background-size: contain;'">&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</div>-->
    </div>

  </div>
</template>
<script>
  import Activity from "../../../../common/model/_base/Activity";
  import NbSwiper from "../../../../components/widget/NbSwiper"
  import OfficialStar from "../../../../common/model/index/OfficialStar"

  export default {
    data () {
      return {
        i : 1,
        j : 2,
        k : 3,
        officialStar: new OfficialStar(),
        logo: require('../../../../assets/img/park/star/head-portrait-list1.png'),
        isLike: false
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
    watch: {

    },
    computed: {},
    components: {
      NbSwiper
    },
    methods: {
      openShare() {
        this.officialStar.shareSystem(this.officialStar.title, this.officialStar.content, this.officialStar.id);
      },
      starLike() {
        let that = this;
        this.officialStar.likeNum += 1;
        this.officialStar.httpLike(function () {
          that.isLike = true;
        });
      },
      refresh() {
        let that = this;
        this.officialStar.id = this.$store.state.route.query.id;
        if (this.officialStar.id) {
          this.officialStar.httpDetail(function () {
            that.officialStar.poster.keepLocal(80, 80);
            that.officialStar.carouselUrls.forEach(data => {

            })
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
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  .star-detail {
    width: 100%;
    height: 100%;
    .star-detail-img-tag {
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
    .star-detail-content-box{
      margin-top: 66px;
      height: calc(100vh - 66px);
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .star-detail-header {
      border-bottom: 1px solid #dedede;
      .star-detail-header-block {
        display: flex;
        padding: 15px 0 15px 15px;
        .star-detail-img {
          height: 80px;
          width: 80px;
          margin-right: 20px;
          background-size: contain !important;
          background-repeat: no-repeat !important;
        }
        .star-detail-header-cell {
          .star-detail-header-cell-title {
            font-size: 18px;
            color: #333333;
            font-weight: bold;
          }
          .tar-detail-header-cell-name {
            font-size: 14px;
            color: #666666;
          }
          .star-detail-header-cell-button {
            .tag-block {
              margin: 5px 0;
              border: 1px solid #ff9600;
              border-radius: 2px;
              font-size: 11px;
              float: left;
              line-height: 22px;

              .tag {
                display: inline-block;
                color: white;
                text-align: center;
                font-weight: normal;
                background-color: #ff9600;
                margin: 0;
                padding: 0 5px;
                border-radius: 1px;
              }
              .content {
                display: inline-block;
                color: #ff9600;
                letter-spacing: 0;
                text-align: center;
                font-weight: normal;
                margin: 0 0 0 -4px;
                padding: 0 11px;
              }
            }
          }
        }
      }


    }
    .star-detail-content {
      .star-detail-content-show {
        padding: 30px 15px 0 15px;
        .star-detail-content-show-title {
          border-left: 2px solid #ff9600;
          padding-left: 5px;
          font-size: 18px;
          line-height: 18px;
          color: #333333;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .show-title-bg{
          background-size: contain !important;
          height: 150px;
        }
        .swiper-list-content{
          overflow: hidden;
          padding-top: 10px;
          .swiper-list {
            width: 60vw;
            height: 155px;
            overflow: visible !important;
            margin: auto;
            .wc-default-swiper-box{
              width: 100%;
              font-size: 0;
            }
            .swiper-slide {
              background-repeat: no-repeat;
              background-size: cover !important;
              width: 100vw;
              z-index: 0 !important;
            }
          }
        }
      }

      .star-detail-content-description {
        padding: 30px 15px 20px 15px;
        .star-detail-content-description-title {
          border-left: 2px solid #ff9600;
          padding-left: 5px;
          line-height: 18px;
          font-size: 18px;
          color: #333333;
          font-weight: bold;
        }
      }
    }
    .star-detail-content-cell-button {
      width: 100vw;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      display: flex;
        padding: 15px 0 0 15px;
        .star-detail-content-cell-button-block {
          padding-right: 10px;
          .star-detail-content-cell-button-tag {
            display: flex;
            font-size: 13px;
            margin-bottom: 15px;
            .star-detail-content-like {
              display: flex;
              .star-detail-content-button-tag-dislike {
                width: 16px;
                height: 16px;
                margin-right: 9px;
                margin-top: 2px;
              }
              .star-detail-content-button-tag-like {
                width: 21px;
                height: 21px;
                margin-right: 9px;
                margin-top: -5px;
              }
              .star-detail-content-cell-button-tag-like {
                margin-right: 15px;
              }
            }
            .star-detail-content-share {
              display: flex;
              .star-detail-content-button-tag-share {
                width: 14px;
                height: 15px;
                margin-right: 9px;
                margin-top: 2px;
              }
              .star-detail-content-cell-button-tag-share {

              }
            }
          }
        }

        .star-detail-content-img {
          display: flex;
          justify-content: center;
          align-items: center;
          .star-detail-content-cell-button-img {
            margin-left: 10px;
            height: 30px;
            width: calc(100vw - 177px);
          }
        }
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .star-detail-img-tag{
        padding: 18px 0 0 0 ;
      }
      .star-detail-content-box{
        height: calc(100vh - 84px);
        margin-top:84px ;
      }
    }
  }
</style>
