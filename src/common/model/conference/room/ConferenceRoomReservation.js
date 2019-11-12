import BaseEntity from '../../_base/BaseEntity'
import User from '../../user/User'
import {filterDay, getDayStart, simpleDateTime, str2Date} from "../../../filter/time";
import ConferenceRoom from "./ConferenceRoom";
import Filter from "../../_base/Filter";
import OnlinePay from "../../pay/OnlinePay";
import MakerCard from "../../life/OneCardSolutionApplyForm/MakerCard";

let Status = {
  NOT_RECEIVE:'NOT_RECEIVE',
  RECEIVE:'RECEIVE',
  BE_OVERDUE:'BE_OVERDUE',
  MEETING:'MEETING',
  END:'END',
  WAIT:'WAIT',
  CONFIRMATION:'CONFIRMATION',
  FAILED:'FAILED',
  REFUNDED:'REFUNDED',
  CANCEL:'CANCEL'
};
let StatusMap = {
  NOT_RECEIVE:{
    value: "NOT_RECEIVE",
    name:"未处理",
    style: "warning"
  },
  RECEIVE:{
    value: "RECEIVE",
    name:"已处理",
    style: "success"
  },
  BE_OVERDUE:{
    value: "BE_OVERDUE",
    name:"已过期",
    style: "danger"
  },
  MEETING:{
    value: "MEETING",
    name:"正在开会",
    style: "warning"
  },
  END:{
    value: "END",
    name:"已结束会议",
    style: "success"
  },
  WAIT:{
    value: "WAIT",
    name:"等待支付",
    style: "success"
  },
  CONFIRMATION:{
    value: "CONFIRMATION",
    name:"已支付",
    style: "success"
  },
  FAILED:{
    value: "FAILED",
    name:"支付失败",
    style: "success"
  },
  REFUNDED:{
    value: "REFUNDED",
    name:"已退款",
    style: "success"
  },
  CANCEL:{
    value: "CANCEL",
    name:"已取消",
    style: "success"
  }
};
export default class ConferenceRoomReservation extends BaseEntity {

  constructor(args) {
    super(args);

    this.creator = new User();
    this.conferenceRoom = new ConferenceRoom();
    this.startTime = new Date();
    this.endTime = new Date();

    //价格
    this.price = "￥0";
    this.location = "上海";
    this.remarks = "";

    //ui
    this.timeInfo = {
      startTime: 0,
      endTime: 0,
      occupyList: []
    }
  }

  static URL_ONLINE_PAY_ORDER_REFUND= "/conference/room/reservation/order/refund";

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('conferenceRoom', ConferenceRoom);
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
  }
  getTAG() {
    return "conferenceRoomReservation"
  }
  getFilters(){
    return [
      new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
      new Filter(Filter.prototype.Type.SORT, "所属", "isApp")
    ]
  }

  httpDeleteReservation (id, successCallback, errorCallback) {
    let form = {
      id: id
    };
    this.httpPost(ConferenceRoomReservation.URL_ONLINE_PAY_ORDER_REFUND, form, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }
}

ConferenceRoomReservation.registerEnum("Status", StatusMap);
