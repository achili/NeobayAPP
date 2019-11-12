import Base from './Base'
import Vue from 'vue'
import $ from 'jquery'
import { isInteger } from '../../util/Utils'

export default class Pager extends Base {

  constructor (Clazz, pageSize = 10, page = 0) {
    super();
    //验证参数
    if (!Clazz || !(Clazz.prototype instanceof Base)) {
      if (Clazz.prototype.getFilters) {
        console.error("new pager验证失败：getFilters未返回值")
      }
      console.error("new pager验证失败：Clazz未继承Base")
    }

    this.page = page;
    this.pageSize = pageSize;
    this.totalItems = 0;
    this.totalPages = 0;
    this.data = [];

    this.Clazz = Clazz;
    this.FILTERS = Clazz.prototype.getFilters();
    this.URL_PAGE = Clazz.prototype.getUrlPage();
    //允许自定义URL_PAGE.
    if(Clazz.prototype.URL_PAGE) {
      this.URL_PAGE = Clazz.prototype.URL_PAGE;
    }
    this.TAGS = Clazz.prototype.getTAGS();
    this[this.TAGS] = [];
  }

  render (obj) {
    super.render(obj)
    this.renderList(this.TAGS, this.Clazz)
  }

  //手动设置过滤器的值
  setFilterValue (key, value) {
    if (!this.FILTERS || !this.FILTERS.length) {
      return
    }
    for (let i = 0; i < this.FILTERS.length; i++) {
      let filter = this.FILTERS[i];
      if (filter.key === key) {
        filter.putValue(value)
      }
    }
  };

  //根据一个key来获取某个filter
  getFilter (key) {
    if (!this.FILTERS || !this.FILTERS.length) {
      return null
    }
    for (let i = 0; i < this.FILTERS.length; i++) {
      let filter = this.FILTERS[i]
      if (filter.key === key) {
        return filter
      }
    }
  };

  //you can specify the page url here.
  httpCustomPage (url, params, successCallback, errorCallback) {
    let that = this;
    this.loading = true;
    this.errorMessage = null;
    this.httpPost(url, params, function (response) {
      that.loading = false;
      that.render(response.data.pager);
      successCallback && successCallback(response)
    }, errorCallback)
  };

  //use default FILTERS as parameters..
  httpFastPage (successCallback, errorCallback) {
    if (!isInteger(this.page)) {
      this.page = 0
    }
    if (!isInteger(this.pageSize)) {
      this.pageSize = 10
    }
    let params = {
      page: this.page,
      pageSize: this.pageSize
    };
    for (let i = 0; i < this.FILTERS.length; i++) {
      let filter = this.FILTERS[i];
      if (filter.getParam() !== null && filter.getParam() !== '') {
        params[filter.key] = filter.getParam()
      }
    }
    this.httpCustomPage(this.URL_PAGE, params, successCallback, errorCallback)
  };


  //用于累计加载下一页
  httpFastNextPage(fullCallback, successCallback, errorCallback, afterConcat) {
    if (!isInteger(this.page)) {
      this.page = 0
    }
    if (!isInteger(this.pageSize)) {
      this.pageSize = 10
    }
    let params = {
      page: this.page,
      pageSize: this.pageSize
    };
    for (let i = 0; i < this.FILTERS.length; i++) {
      let filter = this.FILTERS[i];
      if (filter.getParam() !== null && filter.getParam() !== '') {
        params[filter.key] = filter.getParam()
      }
    }
    this.httpNextPage(this.URL_PAGE, params, fullCallback, successCallback, errorCallback, afterConcat)
  }

  httpNextPage (url, params, fullCallback, successCallback, errorCallback, afterConcat) {
    let that = this;
    this.loading = true;
    this.errorMessage = null;
    this.httpPost(url, params, function (response) {
      that.loading = false;
      let tempPage = new Pager(that.Clazz);
      tempPage.render(response.data.pager);
      if(tempPage[tempPage.TAGS].length === 0) {
        fullCallback && fullCallback(response)
        return;
      }
      afterConcat && afterConcat(tempPage);
      that.page++;
      that[that.TAGS] = that[that.TAGS].concat(tempPage[that.TAGS]);
      successCallback && successCallback(response)
    }, errorCallback)
  };

}




