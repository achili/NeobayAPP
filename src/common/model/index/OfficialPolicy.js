import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import {str2Date} from "../../filter/time";
import Tank from "../tank/Tank";

let StatusMap = {
  OK: {
    name: "正常",
    value: "OK"
  },
  ERROR: {
    name: "错误",
    value: "ERROR"
  }
};

export default class OfficialPolicy extends BaseEntity {
  constructor(args) {
    super(args);
    this.user = new User();

    this.title = null;
    this.tags = [];

    this.createTime = new Date();
    this.author = null;
    this.digest = null;
    this.content = null;
    this.statue = StatusMap.OK.value;
  }

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);

    this.renderEntity("releaseTime", Date);
  }

  getTAG() {
    return "officialPolicy";
  }

  getFilters() {
    return [
      new Filter("SORT", "ID", "orderId"),
      new Filter("SORT", "发布时间", "orderReleaseTime"),
      new Filter("INPUT", "标题", "title"),
      new Filter("INPUT", "标签", "tag"),
      new Filter("INPUT", "地区", "area"),
      new Filter("INPUT", "关键字", "keyword"),
      new Filter("INPUT", "标题", "title"),
      new Filter("INPUT", "摘要", "digest")
    ]
  };
}
