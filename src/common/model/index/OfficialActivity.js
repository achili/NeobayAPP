import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Tank from "../tank/Tank";
import Filter from "../_base/Filter";
import store from "../../../_store";
import {plusShare} from "./plusShare";
let Status = {
  NEW: "NEW",
  EXCEPTION: "EXCEPTION",
  PROCESSING: "PROCESSING",
  STOP: "STOP"
}
let StatusMap = {
  NEW: {
    name: "正在报名中",
    value: "NEW",
    style: "primary"
  },
  EXCEPTION: {
    name: "活动中止",
    value: "EXCEPTION",
    style: "danger"
  },
  PROCESSING: {
    name: "活动进行中",
    value: "PROCESSING",
    style: "success"
  },
  STOP: {
    name: "活动已结束",
    value: "STOP",
    style: "default"
  }
}

let CategoryMap = {
  SELF: {
    name: "自己的活动，可以在线报名",
    value: "SELF",
    style: "primary"
  },
  OTHER: {
    name: "别人的活动，不可在线报名",
    value: "OTHER",
    style: "danger"
  }
}

export default class OfficialActivity extends BaseEntity {
  constructor(args) {
    super(args);
    this.user = new User();
    this.title = null;
    this.address = null;
    //Tank Object
    this.poster = new Tank("image", false, 1024 * 1024, "图片大小不超过1M");
    this.posterUrl = null;
    this.sponsor = null;
    this.applyStartTime = new Date();
    this.applyEndTime = new Date();
    this.num = 0;
    this.maxNum = 0;
    this.startTime = new Date();
    this.endTime = new Date();
    this.releaseTime = new Date();
    this.author = null;
    this.digest = null;
    this.content = null;
    this.status = Status.NEW;
    this.category = CategoryMap.SELF.value;
  }



  render(obj) {
    BaseEntity.prototype.render.call(this, obj);

    this.renderEntity("applyStartTime", Date);
    this.renderEntity("applyEndTime", Date);
    this.renderEntity("releaseTime", Date);
    this.renderEntity("startTime", Date);
    this.renderEntity("endTime", Date);
    this.renderEntity("poster", Tank);
    this.renderEntity("user", User);
  }

  getTAG() {
    return "officialActivity";
  }

  getFilters() {
    return [
      new Filter("SORT", "ID", "orderId"),
      new Filter("INPUT", "关键字", "keyword"),
      new Filter("INPUT", "类型编号", "typeId")
    ]
  };
  shareSystem(title, id) {
    let message = {
      content: '' + title,
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
    // store.state.plus.share.sendWithSystem({content: '' + title, href: store.state.domainName + '/home/article/' + id}, function () {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareSuccess'),{duration:"short"});
    // }, function (e) {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareFailed'),{duration:"short"});
    // })
  }

  activitySharing(title, id) {
    let message = {
      title:title,
      content:'' + title,
      href: 'https://neobay.cn/home/park/activity/' + id, //分享出去后，点击跳转地址
      thumbs: ["https://yctank.liyarou.com/f/jay/20190917/3565ef0d842466db4e7362f3a358cf40/logo.png"]
    }
    plusShare(message, function(res) {
        if(res) {
          store.state.plus.nativeUI.toast("分享成功");
        } else {
          store.state.plus.nativeUI.toast("分享失败");
        }
      })

    // store.state.plus.share.sendWithSystem({content: '' + title,href:'http://neoBay.cn/enter/activity_test/' + id}, function () {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareSuccess'),{duration:"short"});
    // }, function (e) {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareFailed'),{duration:"short"});
    // })
  }
}
OfficialActivity.registerEnum("Status", StatusMap);
