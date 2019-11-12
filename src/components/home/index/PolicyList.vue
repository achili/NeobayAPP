<template>
  <div class="index-policy-list">
    <scroller ref="circleScroller"
              :on-refresh="refresh"
              :refreshText="$t(refreshText)"
              :noDataText="$t(noDataText)"
              :on-infinite="infinite">
      <div v-for="policy in pager.officialPolicies" :key="policy.index" class="policy-item"
           @click="$router.openActivity('policy_detail','slide-left',{id: policy.id})">
        <div class="policy-item-title">
          {{policy.title}}
        </div>
        <div class="policy-item-cell">
          <div class="policy-item-cell-area"
               :style ="'background:url(\''+(require('../../../assets/svg/home/policy/area.svg'))+'\') center no-repeat'">
          </div>
          <div class="policy-item-cell-name">
            <nobr>{{policy.area.name}}</nobr>
          </div>

          <div class="policy-item-cell-type" v-if="policy.tags.length > 0"
               :style ="'background:url(\''+(require('../../../assets/svg/home/policy/type.svg'))+'\') center no-repeat'">
          </div>
          <div class="policy-item-cell-tag" v-for="( tag ,index ) in policy.tags" :key="tag.index" v-if="index < 1">
            <nobr>{{tag}}</nobr>
          </div>
        </div>
      </div>
    </scroller>

  </div>
</template>
<script>
  import OfficialPolicy from "../../../common/model/index/OfficialPolicy"
  import Pager from "../../../common/model/_base/Pager";

  export default {
    data() {
      return {
        pager: this.$store.state.officialPolicyPager,
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
        }, function () {

        });
      }
    },
    mounted(){
      //this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .index-policy-list {
    position: relative;
    height: 100%;
    background: white;
    .policy-item {
      padding: 20px 20px 10px 20px;
      border-bottom: 1px solid #d7d7d7;
      .policy-item-title {
        color: #333333;
        padding-bottom: 20px;
        font-size: 15px;
      }
      .policy-item-cell {
        display: flex;
        color: #666666;
        font-size: 12px;
        overflow: hidden;
        .policy-item-cell-area {
          width: 9px;
          height: 15px;
          margin-right: 10px;
        }
        .policy-item-cell-name {
          padding-right: 7px;
        }
        .policy-item-cell-type {
          width: 11px;
          height: 16px;
          margin-right: 10px;
        }
        .policy-item-cell-tag {
          display: inline-block;
          padding-right: 10px;
        }
      }
    }
  }
</style>



