import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";

let Type = {
  OFFICIAL: "OFFICIAL",
  ARTICLE: "ARTICLE",
  ACTIVITY: "ACTIVITY",
  POLICY: "POLICY"
};

export default class OfficialSearch extends BaseEntity{
  constructor(args) {
    super(args);
    this.creator = new User();
    this.type = null;
    this.content = null;
  }

  static GET_HOT_URL = "/official/search/hot";
  static SEARCH_ALL_URL = "/official/search/whole";

  getTAG() {
    return "officialSearch"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
  }

  //请求热词
  httpGetHot(successCallback, errorCallback){
    let that = this;
    let form = {
      page: 0,
      pageSize: 3
    };
    this.httpPost(OfficialSearch.GET_HOT_URL, form, function (response) {
      successCallback && successCallback(response.data.list);
    }, errorCallback)
  }


  httpOfficialSearch(successCallback, errorCallback) {

  }
}
