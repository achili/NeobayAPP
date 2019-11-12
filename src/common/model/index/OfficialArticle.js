import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Tank from "../tank/Tank";
import Filter from "../_base/Filter";
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


export default class OfficialArticle extends BaseEntity {
  constructor(args) {
    super(args);
    this.user = new User();

    this.title = null;
    //Tank Object
    this.poster = new Tank("image", false, 1024 * 1024, "图片大小不超过1M");
    this.posterUrl = null;

    this.tags = [];
    this.createTime = new Date();
    this.releaseTime = new Date();
    this.author = null;
    this.digest = null;
    this.content = null;
    this.status = StatusMap.OK.value;
  }

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("releaseTime", Date);
    this.renderEntity("poster", Tank);
  }

  getTAG() {
    return "officialArticle";
  }

  getFilters() {
    return [
      new Filter('SORT', '创建时间', 'orderId')
    ]
  };

  shareSystem(title, digest, id) {
    let message = {
      title:title,
      content:digest,
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
    // store.state.plus.share.sendWithSystem({content: '' + title,href:store.state.domainName + '/home/article/' + id}, function () {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareSuccess'),{duration:"short"});
    // }, function (e) {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareFailed'),{duration:"short"});
    // })
  }

}
