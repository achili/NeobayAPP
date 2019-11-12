import Tank from "../../tank/Tank";
import BaseEntity from "../../_base/BaseEntity";
import Filter from "../../_base/Filter";
import KeeperBusinessType from "./KeeperBusinessType";
import FormItem from "../../_base/FormItem";
import User from "../../user/User";
import HttpForm from "../../_base/HttpForm";
import Project from "../../project/Project";
import KeeperBusinessOrganization from "./KeeperBusinessOrganization";
import MakerCard from "../../life/OneCardSolutionApplyForm/MakerCard";
let Status = {
  NEW: "NEW",
  PASS:"PASS",
  REJECT:"REJECT"
};
let StatusMap = {
  NEW: {
    name: "NEW",
    value: "OK",
    style: "success",
    icon: "hourglass"
  },
  PASS: {
    name: "PASS",
    value: "OK",
    style: "success",
    icon: "hourglass"
  },
  REJECT: {
    name: "REJECT",
    value: "OK",
    style: "danger",
    icon: "hourglass"
  }
};
export default class KeeperBusiness extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.project = new Project();
    this.name = null;
    this.companyName = null;
    this.projectName = null;
    this.leaderName = null;
    this.leaderPhone = null;
    this.leaderEmail = null;
    this.reason = null;
    this.no = null;
    this.date = new Date();
    this.archive = false;
    this.status = Status.NEW;
    this.businessType = new KeeperBusinessType();
    this.organization = new KeeperBusinessOrganization();
  }

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    // this.date = str2Date(this.date);
    this.renderEntity("project", Project);
    this.renderEntity("creator", User);
    this.renderEntity("businessType", KeeperBusinessType);
    this.renderEntity("organization", KeeperBusinessOrganization);
  };

  getFilters() {
    return [
      new Filter("SORT", "创建时间", "orderCreateTime")
    ];
  };

  getTAG() {
    return "keeperBusiness"
  };
  getHttpCreate(){
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/keeper/business/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN,"ID",true,true,"id","keeperBusiness.id",null,{}),
        new FormItem(FormItem.prototype.Type.HIDDEN,"关键字",true,true,"keyword","keeperBusiness.keyword",null,{}),
        new FormItem(FormItem.prototype.Type.HIDDEN,"组织标识",true,true,"organizationId","organization.id",null,{}),
        new FormItem(FormItem.prototype.Type.HIDDEN,"商业标识",true,true,"businessTypeId","businessType.id",null,{}),

        new FormItem(FormItem.prototype.Type.SELECT,"message.Project",true,true,"projectId","project.id",null,{},null,"message.Project"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.ProjectName",true,true,"projectName","keeperBusiness.projectName",null,{},null,"message.ProjectName"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.CompanyName",true,true,"companyName","keeperBusiness.companyName",null,{},null,"message.CompanyName"),

        new FormItem(FormItem.prototype.Type.INTERVAL,"message.CompanyName",false,false,"intervalNullO","keeperBusiness.intervalNullO",null,{}),

        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderName",true,true,"leaderName","keeperBusiness.leaderName",null,{},null,"message.LeaderName"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderPhone",true,true,"leaderPhone","keeperBusiness.leaderPhone",null,{},null,"message.LeaderPhone"),
        new FormItem(FormItem.prototype.Type.INPUT,"message.LeaderEmail",true,true,"leaderEmail","keeperBusiness.leaderEmail",null,{},null,"message.LeaderEmail")
      ]
    )
  }
}
KeeperBusiness.registerEnum("Status", StatusMap);
