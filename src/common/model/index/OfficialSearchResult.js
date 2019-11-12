import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Tank from "../tank/Tank";

export default class OfficialSearchResult extends BaseEntity{
  constructor(args) {
    super(args);
    this.type = null;

    this.title = null;
    this.content = null;
    this.poster = new Tank();

    this.type = null;
  }

  static SEARCH_ALL_URL = "/official/search/whole";

  getTAG() {
    return "officialSearchResult"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('poster', Tank);
  }

}
