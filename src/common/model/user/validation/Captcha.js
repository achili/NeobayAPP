import BaseEntity from "../../../../common/model/_base/BaseEntity";
import Filter from '../../../model/_base/Filter'


export default function Captcha() {

  BaseEntity.call(this, arguments);

  this.blob = {
    blobUrl:"",
    Token:""
  };
  this.blobUrl = null;
  this.token = null;
  this.value = null;

  //是否可见
  this.visible = true;
}


Captcha.prototype = new BaseEntity();
Captcha.prototype.constructor = Captcha;
Captcha.prototype.URL_CAPTCHA = "/captcha/fetchs";


Captcha.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId")
  ];
};

//We use this method to get the full js Object
Captcha.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);
};

Captcha.prototype.getForm = function () {

  let form = {};
  if (this.id) {
    form.id = this.id;
  }
  return form;

};


Captcha.prototype.validate = function () {

  return true;
}

Captcha.prototype.refresh = function () {
  this.httpCaptcha();
}


Captcha.prototype.httpCaptcha = function (successCallback, failureCallback) {
  let that = this;

  this.httpPost(this.URL_CAPTCHA, {"token": this.token}, function (response) {
    that.errorMessage = null;
    that.blob = response.data;
    let URL = window.URL || window.webkitURL;

    if (typeof successCallback === "function") {
      successCallback();
    }
    }, failureCallback, {responseType: "blob"});
}

Captcha.prototype.reset = function () {
  this.value = null;

}
