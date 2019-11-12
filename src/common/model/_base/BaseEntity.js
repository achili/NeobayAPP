import Base from './Base'
import {str2Date} from '../../filter/time'
import Filter from './Filter'
import {MessageBox, Notification as NotificationBox} from 'element-ui'
import Schema from '../../../../node_modules/async-validator'

export default class BaseEntity extends Base {

  constructor(args) {
    super(args);
    this.id = null;
    this.sort = null;
    this.createTime = null;
    this.updateTime = null;
    this.deleted = false;
  }

  render(obj) {
    super.render(obj);
    this.createTime = str2Date(this.createTime);
    this.updateTime = str2Date(this.updateTime);
  }

  getFilters() {
    return [
      new Filter('SORT', '创建时间', 'orderCreateTime')
    ]
  };


  //common http detail methods.
  httpDetail(successCallback, errorCallback) {
    let that = this;
    if (!this.id) {
      this.errorMessage = '未找到详情';
      this.defaultErrorHandler(this.errorMessage, errorCallback);
      return
    }
    let url = this.getUrlDetail(this.id);
    if (!url) {
      return
    }
    this.detailLoading = true;
    this.httpPost(url, {}, function (response) {
      that.detailLoading = false;
      that.render(response.data[that.getTAG()]);
      successCallback && successCallback(response)
    }, function (response) {
      that.detailLoading = false;
      if (typeof errorCallback === 'function') {
        errorCallback()
      } else {
        //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
        that.defaultErrorHandler(response)
      }
    })
  }

  httpSave(form, successCallback, errorCallback) {
    let that = this;
    let url = this.getUrlCreate();
    if (this.id) {
      url = this.getUrlEdit()
    }
    this.httpPost(url, form, function (response) {
      that.render(response.data[that.getTAG()]);
      successCallback && successCallback(response)
    }, errorCallback)
  }

  httpDel(successCallback, errorCallback) {
    let that = this;
    let url = null;
    if (!this.id) {
      this.errorMessage = '未找到详情，无法删除';
      that.defaultErrorHandler(this.errorMessage, errorCallback);
      return
    }
    if(this.getTAG() && this.category){
       url = '/' + this.category.toLowerCase().replace(/_/g,'/') + '/del/' + this.id;
    }else {
       url = this.getUrlDel(this.id);
    }
    console.log(url)
    if (url) {
      this.httpPost(url, {}, function (response) {
        successCallback && successCallback(response)
      }, errorCallback)
    }

  }

  httpSort(id1, sort1, id2, sort2, successCallback, failureCallback) {
    let that = this;
    if (!id1 || !id2 || !(sort1 === 0 || sort1) || !(sort2 === 0 || sort2)) {
      this.errorMessage = '参数不齐！';
      that.defaultErrorHandler(this.errorMessage, failureCallback);
      return
    }
    let url = this.getUrlSort();
    if (!url) {
      that.defaultErrorHandler(this.errorMessage, failureCallback);
      return
    }
    let params = {
      id1: id1,
      sort1: sort1,
      id2: id2,
      sort2: sort2
    };
    this.httpPost(url, params, successCallback, failureCallback)
  }

  //确认删除操作.
  confirmDel(successCallback, failureCallback) {
    let that = this;
    MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(function () {
        that.httpDel(function () {
          NotificationBox.success({
            message: '成功删除!'
          })
          if (typeof successCallback === 'function') {
            successCallback()
          }
        }, failureCallback)
      },
      function () {
        if (typeof failureCallback === 'function') {
          failureCallback()
        }
      }
    )
  }

  getUrlCreate() {
    let prefix = this.getUrlPrefix();
    return prefix + '/create'
  }

  getUrlDel(id = null) {
    let prefix = this.getUrlPrefix();
    if (id === null) {
      return prefix + '/del/{id}'
    } else {
      return prefix + '/del/' + id
    }
  }

  getUrlEdit() {
    let prefix = this.getUrlPrefix();
    return prefix + '/edit'
  }

  getUrlDetail(id = null) {
    let prefix = this.getUrlPrefix();
    if (id === null) {
      return prefix + '/detail/{id}'
    } else {
      return prefix + '/detail/' + id
    }
  }


  getUrlPage() {
    let prefix = this.getUrlPrefix();
    return prefix + '/page'
  }

  getUrlSort() {
    let prefix = this.getUrlPrefix();
    return prefix + '/sort'
  }
}

