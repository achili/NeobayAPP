<template>
  <div class="search-all-list">
    <scroller ref="officiailScroller"
              :on-refresh="refresh"
              :refreshText="$t(refreshText)"
              :noDataText="$t(noDataText)"
              :on-infinite="infinite">
      <div v-for="result in pager.data" :key="result.index" class="circle-item" @click.stop="clickResult(result)">
        <div class="img-box" v-if="result.type !== 'POLICY'">
          <!--<img style="height: 66px;width: 66px;" :src="result.poster.url">-->
          <div style="height: 66px;width: 66px;" :style="'background: url(\''+result.poster.url+'\') no-repeat;background-size:cover!important;'"></div>
        </div>
        <div class="content-box">
          <div class="title">{{result.title}}</div>
          <!--<div class="content">-->
            <!--<div class="text">-->
              <!--{{result.content | removalQOfLabels}}-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Tank from "../../../common/model/tank/Tank";
  import Pager from "../../../common/model/_base/Pager";
  import OfficialSearch from "../../../common/model/index/OfficialSearch";
  import OfficialSearchResult from "../../../common/model/index/OfficialSearchResult";

  export default {
    data() {
      return {
        pager: new Pager(OfficialSearchResult),
        type: "",
        refreshText: "message.DropDownData",
        noDataText: 'message.NoMoreData'
      }
    },
    props: {
      searchText: {
        type: String
      },
      labelPosition: {

      }
    },
    components: {
    },
    methods: {
      clickResult(result) {
        switch (result.type) {
          case "ARTICLE":
            this.$router.openActivity('article_detail', "slide-left", {id: result.id});
            break;
          case "ACTIVITY":
            this.$router.openActivity('activity_detail', "slide-left", {id: result.id});
            break;
          case "POLICY":
            this.$router.openActivity('policy_detail', "slide-left", {id: result.id});
            break;
        }
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        if(this.searchText === "" || this.searchText === null || this.searchText === undefined) {
          return;
        }
        this.pager.httpCustomPage(
          OfficialSearch.SEARCH_ALL_URL,
          {page: this.pager.page, pageSize: this.pager.pageSize, content: this.searchText, type: this.type},
          function(response){
            that.pager.page++;
            that.pager.data = response.data.data;
            that.pager.data.forEach(data => {
              // if(data.poster != null && data.type === 'POLICY') {
              //   data.poster.keepLocal(66, 66);
              // }
            });
            done && done();
          },function () {
            done && done();
          });
      },
      infinite(done) {
        let that = this;

        this.pager.httpNextPage(
          OfficialSearch.SEARCH_ALL_URL,
          {page: this.pager.page, pageSize: this.pager.pageSize, content: this.searchText, type: this.type},
          function(response){
            that.$refs.officiailScroller.finishInfinite(true);
            that.pager.data = response.data.data;
          }, function (response) {
            that.pager.data = response.data.data;
            that.$refs.officiailScroller.finishInfinite(true);
          }, function () {
            done();
          }, function (pager) {
            that.pager.data = pager.data.data;
            pager.data.data.forEach(data => {
              // if(data.poster != null && data.type === 'POLICY' ) {
                data.poster.keepLocal(66, 66);
              // }
            });
          });
      }
    },
    mounted(){
      switch (this.labelPosition) {
        case 0:
          this.type = "OFFICIAL";
          break;
        case 1:
          this.type = "ARTICLE";
          break;
        case 2:
          this.type = "ACTIVITY";
          break;
        case 3:
          this.type = "POLICY";
          break;
      }

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .search-all-list {
    position: relative;
    height: 100%;
    background: #F6F6F6;
    .loading {
      text-align: center;
      font-size: 25px;
      padding: 20px;
    }
    .circle-item {
      padding: 19px 20px;
      display: flex;
      border-bottom: 1px #E1E5E5 solid;
      background: white;
      .img-box {
        height: 66px;
        min-width: 66px;
        &.radius {
          overflow: hidden;
          border-radius: 100%;
        }
        img {
          height: 66px;
          width: 66px;
        }
      }
      .content-box {
        margin-left: 15px;
        overflow: hidden;
        .title {
          color: #484848;
          font-size: 16px;
          font-weight: 600;
          line-height: 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          position: relative;
          overflow: hidden;
          -webkit-line-clamp: 3;
          text-overflow: ellipsis;
        }
        .content {
          margin-top: 7px;
          overflow: hidden;
          height: 44px;
          .text {
            color: #8c8c8c;
            font-size: 14px;
            line-height: 22px;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

        }
      }
    }
  }
</style>

