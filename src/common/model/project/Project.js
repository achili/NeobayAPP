import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Tank from "../tank/Tank";
import Filter from "../_base/Filter";
import {str2Date} from "../../filter/time";

export default class Project extends BaseEntity {
  constructor(args) {
    super(args);
    this.creator = new User();
    this.isHot = null;
    this.name = null;
    this.leader = null;
    this.leaderPhone = null;
    this.leaderEmail = null;
    this.no = null;
    this.entryTime = new Date();
    this.entryAddress = "零号湾全球创新创业集聚区";
    this.subordinateBase = "零号湾创业苗圃";
    this.projectSource = null;
    this.technologyDirection = null;
    this.marketTypes = [];

    this.isRegisteredCompany = null;
    this.registeredCompanyTime = new Date();
    this.registeredCompanyName = null;
    this.registeredCompanyAddress = null;
    this.businessLicense = new Tank('image', false, 2 * 1024 * 1024, '最大不超过2M');
    this.moveTime = new Date();
    this.quitTime = new Date();
    this.graduationTime = new Date();
    this.description = null;
    this.implementation = null;
    this.memberNum = null;
    this.businessPlan = new Tank(".doc|.docx|.pdf", true);
    this.attachments = [];
    this.projectMembers = [];
    this.projectFinancings = [];

    this.spaceApplies = [];

    this.company = null;


    //当前这段
    this.currentAttachments = []
  }



  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("creator", User);
    this.renderEntity("entryTime", Date);
    this.renderEntity("registeredCompanyTime", Date);
  }

  getTAG() {
    return "project";
  }

  getFilters() {
    return [
      new Filter("SORT", "ID", "orderId"),
      new Filter("SORT", "项目编号", "orderProjectNo"),
      new Filter("INPUT", "项目名称", "name"),
      new Filter("INPUT", "关键字", "keyword"),
      new Filter("SORT", "所属", "isApp")
    ]
  };

}
