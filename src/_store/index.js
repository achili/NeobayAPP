import Vue from 'vue'
import Vuex from 'vuex'

import plus from "./plus"
import User from "../common/model/user/User";
import Pager from "../common/model/_base/Pager";
import Base from "../common/model/_base/Base";
import OfficialPolicy from "../common/model/index/OfficialPolicy"
import OfficialArticle from "../common/model/index/OfficialArticle"
import OfficialActivity from "../common/model/index/OfficialActivity"
import OfficialStar from "../common/model/index/OfficialStar"
import KeeperBusinessOrganization from "../common/model/keeper/business/KeeperBusinessOrganization";
import OfficialCarousel from "../common/model/carousel/OfficialCarousel";
import Project from "../common/model/project/Project";
import OfficialActivityApply from "../common/model/index/OfficialActivityApply";
import ConferenceRoomReservation from "../common/model/conference/room/ConferenceRoomReservation";
import ConferenceRoom from "../common/model/conference/room/ConferenceRoom";
import Preference from "../common/model/preference/Preference";
import InviteVisitor from "../common/model/inviteVisitor/InviteVisitor";

Vue.use(Vuex);

const state = {

  //配置
  version: '3.0',
  kernelVersion: '4',
  needUpdate: "unwanted",//unwanted 是不需要更新 need 是需要更新
  debug: true,
  host: "http://127.0.0.1:8100",
  domainName: "https://neobay.cn",
  //当前登陆用户
  user: new User(),
  downloadUrl: null,
  tankHost: "https://yctank.liyarou.com",
  //系统设置缓存
  preference:new Preference(),
  //以下是数据缓存
  keeperBusinessOrganizationPager: new Pager(KeeperBusinessOrganization),
  keeperBusinessOrganizationCurrentType: null,
  keeperBusinessOrganizationCurrentTypeIndex: 1,
  //园区的数据缓存
  officialPolicyPager: new Pager(OfficialPolicy),
  officialArticlePager: new Pager(OfficialArticle),
  officialStarPager: new Pager(OfficialStar),
  officialActivityPager: new Pager(OfficialActivity),
  officialCarouselPager: new Pager(OfficialCarousel),
  projectPager: new Pager(Project, 10),
  OfficialActivityApplyPager: new Pager(OfficialActivityApply),
  InviteVisitorPager: new Pager(InviteVisitor),
  ConferenceRoomReservationPager: new Pager(ConferenceRoomReservation),
  //会议室数据缓存
  meetingRoomDate: new Date(),
  conferenceRoomPager: new Pager(ConferenceRoom),

  //第三方登陆认证
  auths: null,

  //表单回调
  callback: null,
  temps: {},
  openHomePopUp: null,
  //以下是状态变化
  keyboardHeight: 0,
  activityList: [],//窗体列表
  tabNavigation: {
    home: [
      {active: true, key: "park"},{active: false, key: "services"},{active: false, key: "code"},{active: false, key: "life"},{active: false, key: "more"}
    ],
    homeIndex: [
      {active: true, key: "news"},{active: false, key: "activity"},{active: false, key: "policy"},{active: false, key: "star"}
    ],
    homeSpace: [
      {active: true, key: "introduction"},{active: false, key: "conferenceRoom"},{active: false, key: "activeSite"}
    ],
    homeService: [
      {active: true, key: "spaceApply"},{active: false, key: "meetingRoom"},{active: false, key: "keeperBusiness"},{active: false, key: "financing"}
    ]
  },
  plus: plus
};

//从本地存储中读取用户信息。
state.user.renderFromLocalStorage();

//监听plusready 事件，装配plus
console.log("plus正在加载...");
document.addEventListener("plusready",function () {
  console.log("plus加载完成！");
  state.plus = window.plus;
  state.plus.webview.currentWebview().setStyle({scrollIndicator:'none'});// 隐藏滚动条
  //获取授权服务列表
  state.plus.oauth.getServices(function (services) {
    state.auths = services;
  }, function (e) {
    state.plus.nativeUI.toast(this.$t('message.NetWorkError') + e.message + " - " + e.code,{duration:"short"});
  });
}, false);

export default new Vuex.Store({
  state
})
