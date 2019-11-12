import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import {str2Date} from "../../filter/time";
import Project from "../project/Project";
import OfficialActivity from "../index/OfficialActivity";

let Type = {
  NURSERY: "NURSERY",
  INCUBATOR: "INCUBATOR",
  ACCELERATOR: "ACCELERATOR"
}

let TypeMap = {
  NURSERY: {
    name: "开放式工位",
    value: "NURSERY",
    style: "success"
  },
  INCUBATOR: {
    name: "2号楼独立空间",
    value: "INCUBATOR",
    style: "info"
  },
  ACCELERATOR: {
    name: "1号楼独立空间",
    value: "ACCELERATOR",
    style: "primary"
  }
}

export default class SpaceApply extends BaseEntity {
  constructor(args) {
    super(args);
    this.creator = new User();

    this.project = new Project();


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

    this.type = TypeMap.INCUBATOR;
    this.archive = null;

    //一对一字段
    this.protocolSpace = null;

    this.spaceSeats = [];
    this.spaceRooms = [];
  }



  render(obj) {
    BaseEntity.prototype.render.call(this, obj);

    this.renderEntity("creator", User);
    this.renderEntity("project", Project);
    this.renderEntity("estimatedTime", Date);
    this.renderEntity("signTime", Date);
  }

  getTAG() {
    return "spaceApply";
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
      new Filter(Filter.prototype.Type.INPUT, "公司名称", "companyName"),
      new Filter(Filter.prototype.Type.INPUT, "项目名称", "projectName"),
      new Filter(Filter.prototype.Type.INPUT, "负责人", "leaderName"),
      new Filter(Filter.prototype.Type.CHECK, "有租赁合同", "hasProtocolSpace"),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "创建者", "creatorId", null, User, false),
      new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, "起始时间", "fromDate"),
      new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, "终止时间", "toDate"),
      new Filter(Filter.prototype.Type.CHECK, "归档", "archive"),
      new Filter(Filter.prototype.Type.SORT, "所属", "isApp")
    ]
  };

}
SpaceApply.registerEnum("Type", TypeMap)
