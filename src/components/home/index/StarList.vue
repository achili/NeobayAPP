<template>
  <div class="index-star-list">
    <scroller ref="circleScroller"
              :on-refresh="refresh"
              :refreshText="$t(refreshText)"
              :noDataText="$t(noDataText)"
              :on-infinite="infinite">
      <div v-for="star in pager.officialStars" :key="star.index" class="star-item"
           @click="$router.openActivity('star_detail','slide-left',{id: star.id})">
        <div class="star-item-cell">
          <div class="star-item-img">
            <div>
              <img :src="star.poster.getLocalUrlBySize(60, 86)" style="height: auto;width: 86px;">
            </div>
          </div>
          <div class="star-item-name">
            {{star.name}}
          </div>
          <div class="star-item-category">
            {{star.category}}
          </div>
        </div>

      </div>
    </scroller>

  </div>
</template>
<script>

  export default {
    data() {
      return {
        pager: this.$store.state.officialStarPager,
        refreshText: "message.DropDownData",
        noDataText: 'message.NoMoreData'
      }
    },
    components: {},
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
        this.pager.setFilterValue("orderScore", "DESC");
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.officialStars.forEach(data => {
            data.poster.keepLocal(60, 86);
          });
          done && done();
        },function () {
          done && done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("orderScore", "DESC");
        this.pager.httpFastNextPage(function(){
          that.$refs.circleScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {
          pager.officialStars.forEach(data => {
            data.poster.keepLocal(60, 86);
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
  .index-star-list {
    position: relative;
    height: 100%;
    background: white;
    .star-item {
      margin-top: 8px;
      background: white;
      width: 50%;
      text-align: center;
      display: inline-block;
      .star-item-cell {
        padding-bottom: 10px;

        .star-item-name {
          font-size: 12px;
          color: #444444;
          padding: 10px 0;
        }
        .star-item-category {
          font-size: 11px;
          color: #666666;
        }
      }
    }
  }
</style>

