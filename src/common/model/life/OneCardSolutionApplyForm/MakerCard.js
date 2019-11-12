import BaseEntity from "../../../model/_base/BaseEntity";
import User from "../../user/User";
import Project from "../../project/Project";
import Filter from "../../../model/_base/Filter";
import MakerCardMember from "./MakerCardMember";
import HttpForm from "../../_base/HttpForm";
import FormItem from "../../_base/FormItem";
import Tank from "../../tank/Tank";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../../util/Utils";
import ConferenceRoom from "../../conference/room/ConferenceRoom";

let Status = {
  OK: "OK",
  FAIL:"FAIL",
  ING:"ING"
};
let StatusMap = {
  OK: {
    name: "成功",
    value: "OK",
    style: "success",
    icon: "hourglass"
  },
  FAIL: {
    name: "失败",
    value: "OK",
    style: "danger",
    icon: "hourglass"
  },
  ING: {
    name: "进行中",
    value: "OK",
    style: "success",
    icon: "hourglass"
  }
};


export default class MakerCard extends BaseEntity{

  constructor(args) {
  super(args);

  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.project = new Project();
  this.projectName = null;
  this.companyName = null;
  this.type = null;
  this.entranceGuardOne = [];
  this.entranceGuardTwo = [];
  this.leaderName = null;
  this.leaderPhone = null;
  this.leaderEmail = null;
  this.intervalNull = null;
  this.intervalNullO = null;
    //图片
  this.poster = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
  this.posterUrl = null;
  this.creator = new User();
  this.makerCardMembers = [];
  this.makerCardMembersInfo = [];
  this.status = Status.OK;
  }

  getTAG() {
    return "makerCard"
  }

  render(obj){
    BaseEntity.prototype.render.call(this,obj);
    this.renderEntity("creatorTime", Date);
    this.renderEntity("creator", User);
    this.renderEntity("startTime", Date);
    this.renderEntity("project", Project);
    if(this.makerCardMembersInfo){
      this.renderList("makerCardMembers",MakerCardMember);
    }
  }

  getHttpCreate(){

    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/maker/card/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN,"message.Project",true,true,"id","makerCard.id",null,{}),
        new FormItem(FormItem.prototype.Type.SELECT,"message.Project",true,true,"projectId","project.id",null,{},null,"项目"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.ProjectName",true,true,"projectName","makerCard.projectName",null,{},null,"项目名称"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.CompanyName",true,false,"companyName","makerCard.companyName",null,{},null,"公司名称"),

        new FormItem(FormItem.prototype.Type.SELECT,"message.CardType",true,true,"type","makerCard.type",null,{},null,"办卡类型"),
        new FormItem(FormItem.prototype.Type.CHECKBOX,"message.AccessControl",true,false,"entranceGuardOne","makerCard.entranceGuardOne",[],{},FormItem.jsonTransformation,"授权门禁"),
        new FormItem(FormItem.prototype.Type.CHECKBOX,"二号楼",false,false,"entranceGuardTwo","makerCard.entranceGuardTwo",[],{},FormItem.jsonTransformation),

        new FormItem(FormItem.prototype.Type.INTERVAL,"公司名称",false,false,"intervalNull","makerCard.intervalNull",null,{}),

        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderName",true,true,"leaderName","makerCard.leaderName",null,{},null,"联系人"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderPhone",true,true,"leaderPhone","makerCard.leaderPhone",null,{},null,"电话号码"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderEmail",true,true,"leaderEmail","makerCard.leaderPhone",null,{},null,"电子邮箱"),

        new FormItem(FormItem.prototype.Type.INTERVAL,"公司名称",false,false,"intervalNullO","makerCard.intervalNullO",null,{}),

        new FormItem(FormItem.prototype.Type.ADD_APPLY_USER,"信息",false,true,"makerCardMembersInfo","makerCard.makerCardMembers",[{"name":"","idCard":""}],{},function () {
          let from = [];
          this.value.forEach(e =>{
            from.push({
              name: e.name,
              idCard: e.idCard
            })
          });
          return JSON.stringify(from);
        })
      ]
    )
  }
};

MakerCard.registerEnum("Status", StatusMap);
