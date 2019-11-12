<template>
  <div class="article-detail">
    <div class="article-detail-block" @scroll.native="handleScroll" ref="viewBox">
      <div class="article-detail-block-header">
        <div class="article-detail-block-header-img" :style="'background: url(\''+officialArticle.poster.getLocalUrlBySize(210, 500)+'\') center'">

        </div>
        <div class="article-detail-block-header-title">
          {{officialArticle.title}}
        </div>
        <div class="article-detail-block-header-subtitle">
          <div class="article-detail-block-header-subtitle-cell">
            <div class="article-detail-block-header-subtitle-logo" :style="'background: url(\''+ logo + '\') no-repeat; background-size: cover;'"></div>

            <div class="article-detail-block-header-subtitle-tag" v-for="tag in officialArticle.tags" :key="tag.index">
              {{tag}}
            </div>
          </div>

          <div class="article-detail-block-header-subtitle-time">
            {{officialArticle.createTime | mouthTime()}}
          </div>
        </div>
      </div>


      <div class="content">
        <div class="detail-article-html" v-html="officialArticle.content" @click.prevent='openATag($event)'></div>

        <div class="seize-seat" v-show="officialArticle.loading">
          <span><i class="fa fa-spinner fa-spin fa-fw"></i>{{$t('message.Loading')}}...</span>
        </div>
      </div>
    </div>
    <div class="article-detail-top-content-show"></div>
    <div :class="style?'article-detail-top-content-add':'article-detail-top-content'" :style="'opacity:'+ opacity +';'">
      <div class="article-detail-img-tag">
        <div v-if="style" class="article-top">
          <div class="article-detail-img-tag-return" @click="$router.closeActivity()"
               :style ="'background:url(\''+(require('../../../../assets/svg/home/article/return-black.svg'))+'\') center no-repeat'">
          </div>
          <div style="text-align: center;font-size: 18px;line-height: 18px;color: #323232;font-weight: bold;">{{$t('message.ArticleDetail')}}</div>
          <div class="article-detail-img-tag-share" @click.stop="openShare"
               :style ="'background:url(\''+(require('../../../../assets/svg/home/article/share-black.svg'))+'\') center no-repeat'">
          </div>
        </div>

        <div v-if="!style" class="article-top-show">
          <div class="article-detail-img-tag-return" @click="$router.closeActivity()"
               :style ="'background:url(\''+(require('../../../../assets/svg/home/article/return-white.svg'))+'\') center no-repeat'">
          </div>
          <div class="article-detail-img-tag-share" @click.stop="openShare"
               :style ="'background:url(\''+(require('../../../../assets/svg/home/article/share-white.svg'))+'\') center no-repeat'">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Activity from "../../../../common/model/_base/Activity";
  import {mouthTime} from "../../../../common/filter/time";
  import OfficialArticle from "../../../../common/model/index/OfficialArticle"

  export default {
    data () {
      return {
        officialArticle: new OfficialArticle(),
        logo: require('../../../../assets/img/park/article/logo.png'),
        style:false,
        opacity:1
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
      openShare() {
        this.officialArticle.shareSystem(this.officialArticle.title, this.officialArticle.digest, this.officialArticle.id);
      },
      refresh() {
        let that = this;
        this.officialArticle.id = this.$store.state.route.query.id;
        if (this.officialArticle.id) {
          this.officialArticle.httpDetail(function () {
            that.officialArticle.poster.keepLocal(210, 500);
          })
        }
      },
      handleScroll(){
        this.box = this.$refs.viewBox;
        this.box.addEventListener('scroll', () => {
          let opc = (this.$refs.viewBox.scrollTop - 100) / 100 / 2;
          if(this.$refs.viewBox.scrollTop > 144){
            this.opacity = opc.toFixed(1);
          }else if(this.$refs.viewBox.scrollTop < 144){
            this.opacity = 1 - opc.toFixed(1);
          }
          this.addStyle(this.$refs.viewBox.scrollTop)
        }, false)
      },
      addStyle(e){
        if(e > 144){
          this.style = true;
        }else {
          this.style = false;
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
      this.handleScroll()
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  .article-detail {
    width: 100%;
    height: calc(100vh);
    .article-detail-top-content-show{
      height: 66px;
      width: 100%;
      position: fixed;
      top: 0;
      background: #888;
      opacity: .3;
    }
    .article-detail-top-content {
      height: 66px;
      width: 100%;
      position: fixed;
      top: 0;
      .article-detail-img-tag {
        padding-top: 33px;
        .article-top-show{
          display: flex;
          justify-content: space-between;
          .article-detail-img-tag-return {
            width: 19px;
            height: 19px;
            margin-left: 15px;
          }
          .article-detail-img-tag-share {
            width: 19px;
            height: 19px;
            margin-right: 15px;
          }
        }
        .article-top{
          display: flex;
          justify-content: space-between;
          .article-detail-img-tag-return {
            width: 19px;
            height: 19px;
            margin-left: 15px;
          }
          .article-detail-img-tag-share {
            width: 19px;
            height: 19px;
            margin-right: 15px;
          }
        }

      }

    }
    .article-detail-top-content-add{
      height: 66px;
      width: 100%;
      position: fixed;
      top: 0;
      background-color: #fff;
      .article-detail-img-tag {
        padding-top: 33px;
        .article-top{
          display: flex;
          justify-content: space-between;
          .article-detail-img-tag-return {
            width: 19px;
            height: 19px;
            margin-left: 15px;
          }
          .article-detail-img-tag-share {
            width: 19px;
            height: 19px;
            margin-right: 15px;
          }
        }

      }
    }
    .article-detail-block {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      height:100vh;
      .article-detail-block-header {

        .article-detail-block-header-img{
          height: 210px;
          width: 100%;
          background-size: cover !important;

        }
        .article-detail-block-header-title {
          margin: 23px 15px;
          color: #323232;
          font-size: 23px;
          padding-bottom: 30px;
          font-weight: 600;
          max-width: calc(100vw - 70px);
        }
        .article-detail-block-header-subtitle {
          display: flex;
          font-size: 15px;
          justify-content: space-between;
          margin: 23px 15px;
          .article-detail-block-header-subtitle-cell {
            display: flex;
            .article-detail-block-header-subtitle-logo {
              width: 23px;
              height: 23px;
              margin-right: 10px;
            }
            .article-detail-block-header-subtitle-tag {
              color: #323232;
              display: inline-block;
              padding-right: 10px;
            }
          }
          .article-detail-block-header-subtitle-time {
            color: #888888;
          }
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
              margin: 0 -20px;
              max-width: 100vw !important;
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
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .article-detail-top-content{
        padding: 18px 0 0 0 ;
      }
      .article-detail-top-content-add{
        padding: 18px 0 0 0 ;
      }
      .article-detail-block{

      }
    }

  }
</style>
