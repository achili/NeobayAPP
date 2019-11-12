import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Tank from "../tank/Tank";
import Filter from "../_base/Filter";

let StatusMap = {
  OK: {
    name: "生效",
    value: "OK"
  },
  DISABLED: {
    name: "未生效",
    value: "DISABLED"
  }
};

export default class OfficialCarousel extends BaseEntity {
  constructor(args) {
    super(args);
    this.user = new User();
    this.name = null;
    //Tank Object
    this.image = new Tank("image", false);
    this.description = null;
    this.title = null;
    this.subtitle = null;
    this.url = null;
    this.status = StatusMap.OK.value;
  }

  static URL_STATUS = "/official/carousel/statue";

  render(obj) {
    super.render(obj);
    this.renderEntity("image", Tank);
  }

  getFilters() {
    return [
      new Filter("SELECTION", "状态", "status", this.getStatusList())
    ];
  }

  getTAG() {
    return "officialCarousel";
  }
}
OfficialCarousel.registerEnum("Status", StatusMap);
