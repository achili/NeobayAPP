import BaseEntity from "../../_base/BaseEntity";
import Filter from "../../_base/Filter";
import User from "../../user/User";
import Project from "../../project/Project";
import {str2Date} from "../../../filter/time";
import Vue from "vue";
import {saveToLocalStorage} from "../../../util/Utils";
import HttpForm from "../../_base/HttpForm";
import FormItem from "../../_base/FormItem";
import MakerOrganization from "../Organization/MakerOrganization";


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
};

let Type = {
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
  //教育培训
  EDUCATION: "EDUCATION",
  //快递物流
  EXPRESS: "EXPRESS",
  //物业服务
  SERVICE: "SERVICE"
};

let TypeMap = {
  HOTEL: {
    name: "协议酒店",
    value: "HOTEL",
    style: ""
  },
  SPORT: {
    name: "体育运动",
    value: "SPORT",
    style: ""
  },
  CAR: {
    name: "汽车租赁",
    value: "CAR",
    style: ""
  },
  ELECTRONIC: {
    name: "电子维修",
    value: "ELECTRONIC",
    style: ""
  },
  PARK: {
    name: "停车缴费",
    value: "PARK",
    style: ""
  },
  FOOD: {
    name: "美食",
    value: "FOOD",
    style: ""
  },
  // EDUCATION: {
  //   name: "教育培训",
  //   value: "EDUCATION",
  //   style: ""
  // },
  EXPRESS: {
    name: "快递物流",
    value: "EXPRESS",
    style: ""
  },
  SERVICE: {
    name: "物业服务",
    value: "SERVICE",
    style: ""
  }
};
export default class MakerPark extends BaseEntity {

  constructor(args) {
    super(args);
  BaseEntity.call(this, arguments);
  this.creator = new User();
  this.project = new Project();
  this.companyName = null;
  this.projectName = null;
  this.leaderName = null;
  this.leaderPhone = null;
  this.leaderEmail = null;
  this.date = new Date();
  this.opctity = [];
  this.status = Status.PROCESSING;
  this.intervalNull = null;
}
  getFilters(){
    return [
      new Filter("SORT", "ID", "orderId"),
      new Filter("SORT", "创建时间", "orderCreateTime"),
      new Filter("INPUT", "项目名称", "projectName"),
      new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false)
    ]
  }

  getTAG() {
    return "MakerPark"
  }

  render(obj){
    BaseEntity.prototype.render.call(this, obj);
    this.date = str2Date(this.date);
    this.renderEntity("creator", User);
    this.renderEntity("startTime", Date);
    this.renderEntity("creatorTime", Date);
  }

  getHttpCreate(){
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/maker/park/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN,"项目",true,true,"id","makerPark.id",null,{}),
        new FormItem(FormItem.prototype.Type.HIDDEN,"类型",true,true,"type","makerPark.type",null,{}),

        new FormItem(FormItem.prototype.Type.SELECT,"项目",true,true,"projectId","makerPark.projectId",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"项目名称",true,true,"companyName","makerPark.companyName",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"公司名称",true,false,"projectName","makerPark.projectName",null,{}),

        new FormItem(FormItem.prototype.Type.INTERVAL,"公司名称",false,false,"intervalNull","intervalNull",null,{}),

        new FormItem(FormItem.prototype.Type.INPUT,"联系人",true,true,"leaderName","makerPark.leaderName",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"电话号码",true,true,"leaderPhone","makerPark.leaderPhone",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"电子邮箱",true,true,"leaderEmail","makerPark.leaderEmail",null,{})
      ]
    )
  }

  saveToLocalStorage(){
    this.errorMessage = null;

    saveToLocalStorage(this.getTAG(), JSON.stringify(this));
  }

}


MakerPark.registerEnum("Type", TypeMap);
MakerPark.registerEnum("Status", StatusMap);
