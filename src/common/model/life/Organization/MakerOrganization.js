import BaseEntity from "../../_base/BaseEntity";
import Filter from "../../_base/Filter";
import User from "../../user/User";
// import Project from "../project/Project";
import {simpleDateTime, str2Date} from "../../../filter/time";
import Vue from "vue";
import {saveToLocalStorage} from "../../../util/Utils";
import HttpForm from "../../_base/HttpForm";
import FormItem from "../../_base/FormItem";
import Project from "../../project/Project";
import MakerCard from "../OneCardSolutionApplyForm/MakerCard";
let Type = {
  //一卡通
  // ONE_CARD: "ONE_CARD",
  //园区市集
  MARKET: "MARKET",
  //人才公寓
  APARTMENT: "APARTMENT",
  //协议酒店
  HOTEL: "HOTEL",
  //体育运动
  SPORT: "SPORT",
  //汽车租赁
  CAR: "CAR",
  //电子维修
  ELECTRONIC: "ELECTRONIC",
  //停车缴费
  PARK: "PARK",
  //美食
  FOOD: "FOOD",
  // //教育培训
  // EDUCATION: "EDUCATION",
  //快递物流
  EXPRESS: "EXPRESS",
  //物业服务
  SERVICE: "SERVICE",
  //心理辅导
  PSYCHOLOGICAL:"PSYCHOLOGICAL",
  //保险经纪
  INSURANCE:"INSURANCE"
};

let TypeMap = {
  // ONE_CARD: {
  //   name: "一卡通",
  //   value: "ONE_CARD"
  // },
  MARKET: {
    name: "园区市集",
    value: "MARKET"
  },
  APARTMENT: {
    name: "人才公寓",
    value: "APARTMENT"
  },
  HOTEL: {
    name: "协议酒店",
    value: "HOTEL"
  },
  SPORT: {
    name: "体育运动",
    value: "SPORT"
  },
  CAR: {
    name: "汽车租赁",
    value: "CAR"
  },
  ELECTRONIC: {
    name: "电子维修",
    value: "ELECTRONIC"
  },
  PARK: {
    name: "停车缴费",
    value: "PARK"
  },
  FOOD: {
    name: "美食",
    value: "FOOD"
  },
  // EDUCATION: {
  //   name: "教育培训",
  //   value: "EDUCATION"
  // },
  EXPRESS: {
    name: "快递物流",
    value: "EXPRESS"
  },
  SERVICE: {
    name: "物业服务",
    value: "SERVICE"
  },
  PSYCHOLOGICAL:{
    name: "心理辅导",
    value: "PSYCHOLOGICAL"
  },
  INSURANCE:{
    name: "保险经纪",
    value: "INSURANCE"
  }
};

let Status = {
  PROCESSING: "PROCESSING",
  FINISH: "FINISH"
};

let StatusMap = {
  PROCESSING: {
    name: "正在进行中",
    value: "PROCESSING",
    style: "info"
  },
  FINISH: {
    name: "审核通过",
    value: "FINISH",
    style: "success"
  }
}
export default class MakerOrganization extends BaseEntity{
  constructor(args) {
    super(args);
  BaseEntity.call(this, arguments);
    this.creator = new User();
    this.name = null;
    this.description = null;
    this.url = null;
    this.type = Type.ONE_CARD;
    this.status = Status.PROCESSING;
    this.orderUrl = "http://nb.com/by/maker/park/create";
    this.leaderName = null;
    this.leaderPhone = null;
    this.leaderEmail = null;
    this.reason = null;
  }
  getFilters(){
    return [
      new Filter("SORT", "ID", "orderId"),
      new Filter("SORT", "创建时间", "orderCreateTime"),
      new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false),
      new Filter("SELECTION", "项目类型", "type", this.getTypeList()),
      new Filter("SELECTION", "状态", "status", this.getStatusList())
    ];
  }
  render(obj){
    BaseEntity.prototype.render.call(this, obj);
    this.date = str2Date(this.date);
    this.renderEntity("creator", User);
  }

  getTAG() {
    return "makerOrganization"
  }
  getHttpCreate(){
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/maker/organization/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN,"项目",true,true,"id","makerOrganization.id",null,{}),
        new FormItem(FormItem.prototype.Type.HIDDEN,"类型",true,true,"type","makerOrganization.type",null,{}),
        new FormItem(FormItem.prototype.Type.SELECT,"项目",true,true,"projectId","project.id",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"项目名称",true,true,"companyName","makerOrganization.companyName",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"公司名称",true,false,"projectName","makerOrganization.projectName",null,{}),

        new FormItem(FormItem.prototype.Type.INTERVAL,"公司名称",false,false,"intervalNull","makerOrganization.intervalNull",null,{}),

        new FormItem(FormItem.prototype.Type.INPUT,"联系人",true,true,"leaderName","makerOrganization.leaderName",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"电话号码",true,true,"leaderPhone","makerOrganization.leaderPhone",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"电子邮箱",true,true,"leaderEmail","makerOrganization.leaderEmail",null,{})
      ]
    )
  }
}
MakerOrganization.registerEnum("Type", TypeMap);
MakerOrganization.registerEnum("Status", StatusMap);


