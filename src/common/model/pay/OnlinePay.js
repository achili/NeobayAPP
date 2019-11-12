import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";

export default class OnlinePay extends BaseEntity {
  constructor(args) {
    super(args);
    this.creator = new User();
    this.name = null;

    this.projectName = null;
    this.companyName = null;
    this.leaderName = null;
    this.leaderPhone = null;
    this.leaderEmail = null;
    this.memberNum = null;
    this.seatNum = null;
    this.area = null;
    this.spacePurpose = null;
    this.estimatedTime = new Date();
    this.address = null;
    this.propertyNo = null;

    this.reason = null;

    this.archive = null;

    //一对一字段
    this.protocolSpace = null;

    this.spaceSeats = [];
    this.spaceRooms = [];
  }

  static URL_ONLINE_PAY_ORDER = "/online/pay/order";
  static URL_ONLINE_PAY_APP_PAYMENT = "/online/pay/app/payment";
  static URL_ONLINE_PAY_SEARCH_ORDER= "/online/pay/search/order";

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("creator", User);
  }

  getTAG() {
    return "onlinePay";
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "创建者", "creatorId", null, User, false)
    ]
  };

  httpPayOrder (successCallback, errorCallback) {
    // let form = {};
    this.httpPost(OnlinePay.URL_ONLINE_PAY_ORDER, {}, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  httpSearchOrder (id, successCallback, errorCallback) {
    let form = {
      id: id
    };
    this.httpPost(OnlinePay.URL_ONLINE_PAY_SEARCH_ORDER, form, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  httpPayment (id, successCallback, errorCallback) {

    let form = {
      id: id
    };
    this.httpPost(OnlinePay.URL_ONLINE_PAY_APP_PAYMENT, form, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }
}
