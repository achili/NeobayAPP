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

export default class MakerHotel extends BaseEntity{
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
    this.hotelStyle = null;
    this.numberPerson = null;
    this.numberHotel = null;
    this.startTime = new Date();
    this.endTime = new Date();
    this.isIncubatingEnterprise = null;
    this.isBusinessTravel = null;
    this.isAgree = null;
  }
  getFilters(){
    return [
      new Filter("SORT", "ID", "orderId"),
      new Filter("SORT", "创建时间", "orderCreateTime"),
      new Filter("INPUT", "项目名称", "projectName"),
      new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false)
    ];
  }
  render(obj){
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("creator", User);
    this.renderEntity("project", Project);
    this.renderEntity("startTime", Date);
    this.renderEntity("endTime", Date);
  }

  getTAG() {
    return "makerHotel"
  }
  getHttpCreate(){
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/maker/hotel/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN,"项目",true,true,"id","makerHotel.id",null,{}),
        new FormItem(FormItem.prototype.Type.SELECT,"项目",true,true,"projectId","project.id",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"项目名称",true,true,"companyName","makerHotel.companyName",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"公司名称",true,false,"projectName","makerHotel.projectName",null,{}),

        new FormItem(FormItem.prototype.Type.INTERVAL,"公司名称",false,false,"intervalNull","makerHotel.intervalNull",null,{}),

        new FormItem(FormItem.prototype.Type.INPUT,"联系人",true,true,"leaderName","makerHotel.leaderName",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"电话号码",true,true,"leaderPhone","makerHotel.leaderPhone",null,{}),
        new FormItem(FormItem.prototype.Type.INPUT,"电子邮箱",true,true,"leaderEmail","makerHotel.leaderEmail",null,{})
      ]
    )
  }
}

