import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import OfficialActivity from "./OfficialActivity";

export default class OfficialActivityApply extends BaseEntity {
  constructor(args) {
    super(args);
    this.user = new User();

    this.officialActivity = new OfficialActivity();
    this.personNum = null;
    this.leader = null;

    this.phone = null;
  }

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);

    this.renderEntity("user", User);
    this.renderEntity("officialActivity", OfficialActivity);
  }

  getTAG() {
    return "officialActivityApply";
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
      new Filter(Filter.prototype.Type.INPUT, "活动编号", "officialActivityId")
    ]
  };

}
