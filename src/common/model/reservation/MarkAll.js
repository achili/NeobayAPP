import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import {str2Date} from "../../filter/time";

export default class MarkAll extends BaseEntity {

  constructor(args) {
    super(args);
    this.id = null;
    this.category = null;
    this.type = null;
    this.createTime = new Date();
  }

  static MARK_ALL_URL = "/maker/simple/apply/mark/all";

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("creator", User);
    this.renderEntity("createTime", Date);
  }

  getFilters(){
    return [
      // new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false)
    ]
  }
  getTAG() {
    return "markAll";
  }
}
