import BaseEntity from '../../_base/BaseEntity'
import Filter from '../../_base/Filter'
import Tank from '../../tank/Tank'
import KeeperBusinessType from './KeeperBusinessType'
import MakerOrganization from "../../life/Organization/MakerOrganization";

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

export default class KeeperBusinessOrganization extends BaseEntity{

  constructor(args) {
    super(args);

    this.name = null;
    this.description = null;
    this.showDetail = null;
    this.detailName = null;
    this.status = Status.PROCESSING;
    this.logo = new Tank("image", false);
    this.businessType = new KeeperBusinessType();
    this.contactsCompany = null;
    this.contactsName = null;
    this.contactsPhone = null;
    this.contactsAddress = null;
    this.contactsNote = null;
  }

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("businessType", KeeperBusinessType);
    this.renderEntity("logo", Tank);
  };

  getFilters() {
    return [
      new Filter("SORT", "创建时间", "orderCreateTime"),
      new Filter("SELECTION", "十大服务类型", "type", KeeperBusinessType.prototype.getTypeList()),
      new Filter("SELECTION", "状态", "status", this.getStatusList())
    ];
  };

  getTAG() {
    return "keeperBusinessOrganization"
  }

}
KeeperBusinessOrganization.registerEnum("Status", StatusMap);
