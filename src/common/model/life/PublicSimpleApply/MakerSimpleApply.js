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
  SERVICE: "SERVICE",
  //人才公寓
  APARTMENT:"APARTMENT"
};

let TypeMap = {
  APARTMENT:{
    name: "人才公寓",
    value: "APARTMENT",
    style: ""
  },
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


export default class MakerSimpleApply extends BaseEntity {

  constructor(args) {
    super(args);
  BaseEntity.call(this, arguments);
  this.creator = new User();
  this.makerOrganization = new MakerOrganization();
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
    return "makerSimpleApply"
  }

  render(obj){
    BaseEntity.prototype.render.call(this, obj);
    this.date = str2Date(this.date);
    this.renderEntity("project", Project);
    this.renderEntity("makerOrganization",MakerOrganization);
    this.renderEntity("creator", User);
    this.renderEntity("startTime", Date);
    this.renderEntity("creatorTime", Date);
  }

  getHttpCreate(){
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/maker/simple/apply/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN,"id",true,true,"id","makerSimpleApply.id",null,{}),
        new FormItem(FormItem.prototype.Type.HIDDEN,"项目",true,true,"makerOrganizationId","makerOrganization.id",null,{}),
        new FormItem(FormItem.prototype.Type.HIDDEN,"类型",true,true,"type","makerSimpleApply.type",null,{}),

        new FormItem(FormItem.prototype.Type.SELECT,"message.Project",true,true,"projectId","project.id",null,{},null,"message.Project"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.ProjectName",true,true,"projectName","makerSimpleApply.projectName",null,{},null,"message.ProjectName"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.CompanyName",true,true,"companyName","makerSimpleApply.companyName",null,{},null,"message.CompanyName"),

        new FormItem(FormItem.prototype.Type.INTERVAL,"公司名称",false,false,"intervalNull","makerSimpleApply.intervalNull",null,{}),

        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderName",true,true,"leaderName","makerSimpleApply.leaderName",null,{},null,"message.LeaderName"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderPhone",true,true,"leaderPhone","makerSimpleApply.leaderPhone",null,{},null,"message.LeaderPhone"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderEmail",true,true,"leaderEmail","makerSimpleApply.leaderEmail",null,{},null,"message.LeaderEmail")
      ]
    )
  }

  saveToLocalStorage(){
    this.errorMessage = null;

    saveToLocalStorage(this.getTAG(), JSON.stringify(this));
  }

}


MakerSimpleApply.registerEnum("Type", TypeMap);
MakerSimpleApply.registerEnum("Status", StatusMap);
