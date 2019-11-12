import BaseEntity from '../../_base/BaseEntity'
import Filter from '../../_base/Filter'
import Tank from '../../tank/Tank'
import User from '../../user/User'
import FormItem from "../../_base/FormItem";
import HttpForm from "../../_base/HttpForm";
import {simpleDateTime, simpleMinute, str2Date} from "../../../filter/time";


let ServicesMap = {
  "LED":{
    val: "LED",
    name:"两个带有VGA/HDMI连接口的84\" LED",
    ico: require("../../../../assets/svg/service/meeting-room/severs1.svg")
  },
  "DEMONSTRATION":{
    val: "DEMONSTRATION",
    name:"无线演示设备",
    ico: require("../../../../assets/svg/service/meeting-room/severs3.svg")
  },
  "VIDEO":{
    val: "VIDEO",
    name:"企业级视频会议",
    ico: require("../../../../assets/svg/service/meeting-room/severs4.svg")
  },
  "MICROPHONE":{
    val: "MICROPHONE",
    name:"企业级桌面话筒",
    ico: require("../../../../assets/svg/service/meeting-room/severs5.svg")
  },
  "HORN":{
    val: "HORN",
    name:"顶置式喇叭",
    ico: require("../../../../assets/svg/service/meeting-room/severs6.svg")
  },
  "WIFI":{
    val: "WIFI",
    name:"高速WIFI",
    ico: require("../../../../assets/svg/service/meeting-room/severs7.svg")
  },
  "STATIONERY":{
    val: "STATIONERY",
    name:"可移动白板代，带马克笔和文具",
    ico: require("../../../../assets/svg/service/meeting-room/severs8.svg")
  },
  "TEA":{
    val: "TEA",
    name:"免费咖啡/茶水",
    ico: require("../../../../assets/svg/service/meeting-room/severs9.svg")
  }
};
let CapacityMap = {
  MINIMUM:{
    value: "MINIMUM",
    name:"1-6人"
  },
  SECONDARY:{
    value: "SECONDARY",
    name:"6-10人"
  },
  SPACIOUS:{
    value: "SPACIOUS",
    name:"10人以上"
  }
};

export default class ConferenceRoom extends BaseEntity {

  constructor(args) {
    super(args);

    this.name = "会议室";
    this.poster = new Tank('image', false, 1024 * 1024, '图片不能超过1M')

    this.contacts = new User();
    this.introduce = "";
    this.capacity = CapacityMap.MINIMUM.value;
    this.price = "0";
    this.services = [];
    this.address = "";

    //ui
    this.timeInfo = {
      startTime: 0,
      endTime: 0,
      occupyList: []
    }
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, '发布日期', 'createTime'),
      new Filter(Filter.prototype.Type.INPUT, '申请日期', 'date'),
      new Filter(Filter.prototype.Type.SELECTION, '容纳人数', 'capacityType', ConferenceRoom.prototype.CapacityList),
      new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, '楼栋地址', 'spaceBuildingId')
    ]
  };

  getTAG() {
    return "conferenceRoom"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('poster', Tank);
    if(!(this.services instanceof Array)) {
      this.services = JSON.parse( this.services );
    }
  }


  httpDetailByDate(date, id, successCallback, errorCallback) {
    let that = this;
    if (!this.id) {
      this.errorMessage = '没有详情！';
      this.defaultErrorHandler(this.errorMessage, errorCallback);
      return
    }
    this.detailLoading = true;
    this.httpPost("/conference/room/detail/by/date", {
      id: this.id,
      date: simpleDateTime(date),
      tudingId: id
    }, function (response) {
      that.detailLoading = false;
      that.render(response.data.conferenceRoom);
      successCallback && successCallback(response)
    }, function (response) {
      that.detailLoading = false;
      if (typeof errorCallback === 'function') {
        errorCallback()
      } else {
        //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
        that.defaultErrorHandler(response)
      }
    })
  }
}
ConferenceRoom.registerEnum("Capacity", CapacityMap);
ConferenceRoom.registerEnum("Services", ServicesMap);

