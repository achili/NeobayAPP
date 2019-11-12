import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Tank from "../tank/Tank";
import Filter from "../_base/Filter";
import {str2Date} from "../../filter/time";
import store from "../../../_store";
import {plusShare} from "./plusShare";

let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "success"
  },
  ERROR: {
    name: "错误",
    value: "ERROR",
    style: "error"
  }
}

export default class OfficialStar extends BaseEntity {
  constructor(args) {
    super(args);
    this.user = new User();
    this.name = null;
    this.score = null
    this.likeNum = 0;

    this.category = null;
    this.carousel = [];
    this.carouselUrls = [];

    //Tank Object
    this.poster = new Tank("image", false, 1024 * 1024, "建议尺寸4:3以达到最佳效果");

    this.posterUrl = null;

    this.content = null;
    this.releaseTime = new Date();
    this.createTime = new Date();
    this.status = StatusMap.OK.value;
  }

  static URL_LIKE = "/official/star/like/{id}"

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.releaseTime = str2Date(this.releaseTime);
    this.createTime = str2Date(this.createTime);
    this.renderList("carousel", Tank);
    this.renderEntity("poster", Tank);
  }

  getTAG() {
    return "officialStar";
  }

  getFilters() {
    return [
      new Filter('SORT', 'ID', 'orderId'),
      new Filter("SORT", "发布时间", "orderReleaseTime"),
      new Filter('INPUT', '名称', 'name'),
      new Filter('INPUT', '关键字', 'keyword'),
      new Filter('SORT', '点赞数', 'orderLike'),
      new Filter('SORT', '评分', 'orderScore')
    ]
  };

  shareSystem(title, content, id) {
    let message = {
      title:title,
      content: content,
      href: store.state.domainName + '/home/article/' + id, //分享出去后，点击跳转地址
      thumbs: ["https://yctank.liyarou.com/f/jay/20190917/3565ef0d842466db4e7362f3a358cf40/logo.png"]
    }
    plusShare(message, function(res) {
      if(res) {
        store.state.plus.nativeUI.toast("分享成功");
      } else {
        store.state.plus.nativeUI.toast("分享失败");
      }
    })

    // store.state.plus.share.sendWithSystem({content: '' + title,href: store.state.domainName + '/home/article/' + id}, function () {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareSuccess'),{duration:"short"});
    // }, function (e) {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareFailed'),{duration:"short"});
    // })
  }

  httpLike = function (successCallback, errorCallback) {
    let that = this;
    let url = OfficialStar.URL_LIKE.replace("{id}", this.id);
    this.httpPost(url, {}, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

}
