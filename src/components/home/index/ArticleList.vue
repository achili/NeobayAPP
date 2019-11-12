<template>
  <div class="index-article-list">
    <scroller ref="circleScroller"
              :on-refresh="refresh"
              :refreshText="$t(refreshText)"
              :noDataText="$t(noDataText)"
              :on-infinite="infinite">
      <div v-for="article in pager.officialArticles" :key="article.index" class="article-item"
           @click="$router.openActivity('article_detail','slide-left',{id: article.id})">
        <div class="article-item-cell">
          <div class="article-item-block">
            <div class="item-content">
              {{article.title}}
            </div>
            <div class="item-tag">
              <div class="item-tag-title" v-for="tag in article.tags" :key="tag">
                {{tag}}
              </div>
              <div class="item-tag-title" v-if="article.tags.length === 0">
                其他
              </div>
              <div class="item-tag-time">
                {{article.createTime | complexHumanTime}}
              </div>
            </div>
          </div>
          <div class="article-item-img">
            <div :style="'background-image:url(\''+article.poster.getLocalUrlBySize(72, 110)+'\')'" style="width: 110px;height: 72px;background-size: cover;background-repeat: no-repeat;">
              <!--<img :src="article.poster.getLocalUrlBySize(72, 110)">-->
            </div>
          </div>
        </div>

      </div>
    </scroller>

  </div>
</template>
<script>
  import NbExpanding from '../../../components/widget/NbExpanding'
  import Tank from "../../../common/model/tank/Tank";

  export default {
    data() {
      return {
        pager: this.$store.state.officialArticlePager,
        refreshText: "message.DropDownData",
        noDataText: 'message.NoMoreData'
      }
    },
    components: {
      NbExpanding
    },
    methods: {
      touchstart(e, welfar) {
        this.startX = e.changedTouches[0].clientX;
        this.startPadding = welfar.padding;
      },
      touchmove(e, welfar) {
        if(welfar.posters.length < 2) {
          return;
        }
        if(this.startX) {
          let spacing = this.startPadding + e.changedTouches[0].clientX - this.startX;
          let aaa = -(this.$refs.swiper[0].offsetWidth);
          if(spacing <= 0 && spacing > aaa) {
            welfar.padding = spacing;
          } else if(spacing > 0) {
            welfar.padding = 0;
          } else if(spacing < aaa) {
            welfar.padding = aaa;
          }
        }
      },
      inputTop(e) {
        this.$refs.circleScroller.scrollTo(0, e.path[0].offsetTop - 60, true);
      },
      openOperation(circle) {
        let that = this;
        this.openCircleOperation(function () {
          circle.httpDel(function () {
            that.plus.nativeUI.toast(that.$t('message.DeleteSuccess'),{duration:"short"});
            that.refresh();
          }, function () {
            that.plus.nativeUI.toast(that.$t('message.DeleteFailed'),{duration:"short"});
          })
        });
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("orderId", "DESC");
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.officialArticles.forEach(data => {
            data.poster.keepLocal(72, 110);
          });
          done && done();
        },function () {
          done && done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("orderId", "DESC");
        this.pager.httpFastNextPage(function(){
          that.$refs.circleScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {
          pager.officialArticles.forEach(data => {
            data.poster.keepLocal(72, 110);
          });
        });
      }
    },
    mounted(){

      //this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .index-article-list {
    position: relative;
    height: 100%;
    background: white;
    .article-item {
      margin-top: 8px;
      padding: 20px 20px 1px 20px;
      background: white;
      .article-item-cell {
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid #d7d7d7;
        .article-item-block {
          flex: 4;
          padding-right: 20px;
          .item-content {
            font-size: 15px;
            color: #444444;
            line-height: 21px;
          }
          .item-tag {
            display: flex;
            padding-top: 25px;
            font-size: 13px;
            .item-tag-title {
              color: #dc9745;
              padding-right: 8px;
            }
            .item-tag-time {
              border-left: 1px solid #b3b3b3;
              padding-left: 8px;
              line-height: 18px;
            }
          }
        }
        .article-item-img {
          flex: 1;
        }
      }
    }
  }
</style>
