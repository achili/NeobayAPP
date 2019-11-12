<template>
  <div class="index-activity-list">
    <scroller ref="circleScroller"
              :on-refresh="refresh"
              :refreshText="$t(refreshText)"
              :noDataText="$t(noDataText)"
              :on-infinite="infinite">
      <div v-for="activity in pager.officialActivities" :key="activity.index" class="activity-item"
           @click="$router.openActivity('activity_detail','slide-left',{id: activity.id})">
        <div class="activity-item-cell">
          <div class="item-img" :style="'background-image: url(\''+activity.poster.getLocalUrlBySize(200, 500)+'\')'">
          </div>
          <div class="bottom-bar">
            <div class="bar-content">
              <div class="content-title">
                {{activity.title}}
              </div>
              <div class="content-block">
                <div class="content-cell">
                  <div class="content-block-area"
                       :style ="'background:url(\''+(require('../../../assets/svg/home/activity/address.svg'))+'\') center no-repeat'">
                  </div>
                  <div class="content-address">
                    {{activity.address}}
                  </div>
                </div>

                <div class="content-cell-2">
                  <div class="content-cell-2-logo" :style="'background: url(\''+ map + '\') no-repeat; background-size: contain;'"></div>
                  <div class="content-status" v-if="activity.status === 'NEW'">
                    {{activity.startTime | timeTime()}} <span>开始</span>
                  </div>
                  <div v-else class="content-status">
                    <nobr>
                      {{activity.getStatusName(activity.status)}}
                    </nobr>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div style="background-color: #F5F5F5;height: 10px;width: 100vw;"></div>
      </div>
    </scroller>

  </div>
</template>
<script>

  export default {
    data() {
      return {
        pager: this.$store.state.officialActivityPager,
        map: require('../../../assets/img/park/activity/map.png'),
        refreshText: "message.DropDownData",
        noDataText: 'message.NoMoreData'
      }
    },
    components: {

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
          that.pager.officialActivities.forEach(data => {
            data.poster.keepLocal(200, 500);
          });
          done && done();
        },function () {
          done && done();
        });
        this.pager.httpFastNextPage();
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
          pager.officialActivities.forEach(data => {
            data.poster.keepLocal(200, 500);
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
  .index-activity-list {
    position: relative;
    height: 100%;
    background: white;
    .activity-item {
      margin-top: 8px;
      background: white;
      .activity-item-cell {
        padding: 20px 20px 1px 20px;
        .item-img {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background-size: cover;
          background-repeat: no-repeat;
          padding-bottom: 200px;
        }
        .bottom-bar {
          padding: 15px 0;
          .bar-content {
            .content-title {
              color: #333333;
              font-weight: 600;
              font-size: 16px;
              margin-bottom: 5px;
              line-height: 19px;
            }
            .content-block {
              display: flex;
              justify-content:space-between;
              .content-cell {
                display: flex;
                .content-block-area {
                  width: 9px;
                  height: 27px;
                  margin-right: 10px;
                }
                .content-address {
                  margin-top: 4px;
                  line-height: 20px;
                  padding-right: 30px;
                  font-size: 12px;
                  color: #666666;
                }
              }
              .content-cell-2 {
                display: flex;
                .content-cell-2-logo {
                  width: 11px;
                  height: 11px;
                  margin-top: 9px;
                  margin-right: 10px;
                }
                .content-status {
                  margin-top: 4px;
                  line-height: 21px;
                  font-size: 12px;
                  color: #666666;
                }
              }
            }

          }
        }
      }
    }
  }
</style>


