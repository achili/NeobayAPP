import BaseEntity from "../../_base/BaseEntity";
import Filter from "../../_base/Filter";
import Tank from "../../tank/Tank";

let Type = {
  //工商服务
  BUSINESS_SERVICE: "BUSINESS_SERVICE",
  //金融服务
  FINANCE_SERVICE: "FINANCE_SERVICE",
  //财税服务
  FISCAL_SERVICE: "FISCAL_SERVICE",
  //法律法规
  LAW_SERVICE: "LAW_SERVICE",
  //知识产权
  KNOWLEDGE_SERVICE: "KNOWLEDGE_SERVICE",
  //人力资源
  RESOURCES_SERVICE: "RESOURCES_SERVICE",
  //广告会展
  ADVERTISEMENT_SERVICE: "ADVERTISEMENT_SERVICE",
  //IT服务
  IT_SERVICE: "IT_SERVICE",
  //创业服务
  BUSINESS_START_SERVICE: "BUSINESS_START_SERVICE",
  //其他服务
  OTHER_SERVICE: "OTHER_SERVICE"
};

let TypeMap = {
  BUSINESS_SERVICE: {
    name: "工商服务",
    value: "BUSINESS_SERVICE",
    style: ""
  },
  FINANCE_SERVICE: {
    name: "金融服务",
    value: "FINANCE_SERVICE",
    style: ""
  },
  FISCAL_SERVICE: {
    name: "财税服务",
    value: "FISCAL_SERVICE",
    style: ""
  },
  LAW_SERVICE: {
    name: "法律法规",
    value: "LAW_SERVICE",
    style: ""
  },
  KNOWLEDGE_SERVICE: {
    name: "知识产权",
    value: "KNOWLEDGE_SERVICE",
    style: ""
  },
  RESOURCES_SERVICE: {
    name: "人力资源",
    value: "RESOURCES_SERVICE",
    style: ""
  },
  ADVERTISEMENT_SERVICE: {
    name: "广告会展",
    value: "ADVERTISEMENT_SERVICE",
    style: ""
  },
  IT_SERVICE: {
    name: "IT服务",
    value: "IT_SERVICE",
    style: ""
  },
  BUSINESS_START_SERVICE: {
    name: "创业服务",
    value: "BUSINESS_START_SERVICE",
    style: ""
  },
  OTHER_SERVICE: {
    name: "其他服务",
    value: "OTHER_SERVICE",
    style: ""
  }
};

export default class KeeperBusinessType extends BaseEntity{

  constructor(args) {
    super(args);

    this.name = null;
    this.description = null;
    this.poster = new Tank("image", false, 1024 * 1024, "图片大小不超过1M");
    this.posterUrl = null;
    this.type = Type.OTHER_SERVICE;
  }

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("poster", Tank);
  };

  getFilters() {
    return [
      new Filter("SELECTION", "十大服务类型", "type", this.getTypeList())
    ];
  };

  getTAG() {
    return "keeperBusinessType"
  }

}
KeeperBusinessType.registerEnum("Type", TypeMap)
