import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import {str2Date} from "../../filter/time";
import Project from "../project/Project";
import OfficialActivity from "../index/OfficialActivity";
import store from "../../../_store";
import {plusShare} from "../index/plusShare";

export default class InviteVisitor extends BaseEntity {
  constructor(args) {
    super(args);
    this.user = new User();
    //邀请人用户名
    this.inviteName = null;
    //邀请人姓名
    this.name = null;
    //开始时间
    this.invitingTime = new Date();
    //结束时间
    this.accessTime = new Date();
    //邀请人数
    this.visitorsNum = null;
    //备注
    this.remark = null;
  }

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("user", User);
    this.renderEntity("invitingTime", Date);
    this.renderEntity("accessTime", Date);
  }

  getTAG() {
    return "inviteVisitor";
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
      new Filter(Filter.prototype.Type.INPUT, "负责人", "leaderName")
    ]
  };

  shareSystem(title, id) {
    let message = {
      title:title,
      content: '邀请访客函',
      href: store.state.domainName + '/share/invite/visitor/detail?id=' + id, //分享出去后，点击跳转地址
      thumbs: ["https://yctank.liyarou.com/f/jay/20190917/3565ef0d842466db4e7362f3a358cf40/logo.png"]
    }
    plusShare(message, function(res) {
      if(res) {
        store.state.plus.nativeUI.toast("分享成功");
      } else {
        store.state.plus.nativeUI.toast("分享失败");
      }
    })
    // store.state.plus.share.sendWithSystem({content: '' + title, href: store.state.domainName + '/share/invite/visitor/detail?id=' + id}, function () {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareSuccess'),{duration:"short"});
    // }, function (e) {
    //   store.state.plus.nativeUI.toast(this.$t('message.ShareFailed'),{duration:"short"});
    // })
  }
}
