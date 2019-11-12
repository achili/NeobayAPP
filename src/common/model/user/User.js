import Vue from 'vue'
import $ from 'jquery'
import store from '../../../_store'
import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import UserRole from './role/UserRole'
import PhoneValidation from '../user/validation/PhoneValidation'

import {str2Date} from '../../filter/time'
import {validatePhone} from '../../filter/validate'
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../util/Utils";
import Tank from "../tank/Tank";
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import Captcha from "./validation/Captcha";


let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "success"
  },
  LOGIN_LOCK: {
    name: "锁定",
    value: "LOGIN_LOCK",
    style: "warning"
  },
  DISABLE: {
    name: "封禁",
    value: "DISABLE",
    style: "error"
  }
};
let FaceStateMap = {
  OK: {
    name: "认证成功",
    value: "OK",
    style: "success"
  },
  UNDER_WAY: {
    name: "正在认证",
    value: "UNDER_WAY",
    style: "warning"
  },
  FAIL: {
    name: "认证失败",
    value: "FAIL",
    style: "error"
  },
  NOT: {
    name: "未上传",
    value: "NOT",
    style: "error"
  }
};

export default class User extends BaseEntity{

  constructor(args) {
    super(args);
    this.role = new UserRole();
    //手机验证码模块。
    this.phoneValidation = new PhoneValidation();
    this.captcha = new Captcha();
    this.nickname = "";
    this.email = null;
    this.phone = null;
    this.description = null;
    this.city = null;

    //APP新增字段
    this.gender = null;
    this.weChat = null;
    this.companyCode = null;
    this.companyName = null;

    this.password = null;
    this.avatar = new Tank('image', false, 1024 * 1024, '图片不能超过6M');
    this.avatarUrl = null;
    this.lastIp = null;
    this.lastTime = null;
    this.status = StatusMap.OK.value;
    this.emailValidate = null;
    this.session = null;

    this.uploadFace = new Tank('image', false, 1024 * 1024, '图片不能超过2M');
    this.uploadFaceState = FaceStateMap.NOT.value;
    //非持久化
    this.isLogin = false;
    //修改密码用到的字段
    this.oldPassword = null;
    this.repeatPassword = null;
  }

  static URL_LOGIN = "/user/login";
  static URL_APP_LOGIN = "/user/app/login";
  static URL_BIND_WECHAT = "/user/bind/weChat";
  static URL_WECHAT_LOGIN = "/user/weChat/login";
  static URL_UPDATE = "/user/update";
  static URL_LOGOUT = "/user/logout";
  static URL_APP_REGISTER = "/user/app/register";
  static URL_WECHAT_REGISTER = "/user/weChat/register";
  static URL_FAST_LOGIN = "/user/fast/login";
  static URL_PASSWORD_CHANGE = "/user/change/password";
  static URL_CALL_VERIFICATION = "/user/callVerification";
  static URL_EMAIL_VERIFICATION = "/user/emailVerification";
  static URL_PASSWORD_RESET = "/user/password/reset";
  static URL_PHONE_CHANGE = "/user/phone/change";
  static URL_PHONE_VALIDATION = "/user/phone/validation";
  static URL_EMAIL_SEND = "/user/email/send";
  static URL_CANCEL_ASSOCIATION = "/user/cancel/association";
  static URL_EMAIL_VALIDATE = "/user/email/validate";
  //上传人脸
  static URL_UPLOAD_FACE = "/user/upload/face";
  static URL_QUERY_FACE = "/user/query/face";
  // 门禁
  static GET_QR_CODE = '/user/qr/get-qr-code';

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.lastTime = str2Date(this.lastTime);
    this.renderEntity("avatar", Tank);
  };

  getTAG() {
    return "User";
  }

  httpEntranceGuard (successCallback, errorCallback) {
    this.httpPost(User.GET_QR_CODE, {}, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

  //登陆
  httpLogin (successCallback, errorCallback) {
    let that = this;
    let form = {
      phone: this.phone,
      password: this.password
    };
    this.httpPost(User.URL_LOGIN, form, function (response) {
      that.innerLogin(response);
      successCallback && successCallback(response)
    }, function (response) {
      that.errorMessage = that.getErrorMessage(response);
      errorCallback && errorCallback(response)
    })
  }

  httpUploadFace(uploadFaceCode,successCallback, errorCallback){
    let form = {
      uploadFaceCode : uploadFaceCode,
      id : this.id
    };
    this.httpPost(User.URL_UPLOAD_FACE,form,function (response) {
      successCallback && successCallback(response)
    },errorCallback);
  }
  httpUpdateFace(successCallback, errorCallback){
    let form = {
      id : this.id
    };
    let that = this;
    this.httpPost(User.URL_QUERY_FACE,form,function (response) {
      let data = {
        uploadFaceType: "OK",
        uploadFace: new Tank()
      };
      data = response.data.data;
      that.uploadFaceState = data.uploadFaceType;

      if(!that.uploadFace){
        that.uploadFace = new Tank("image");
      }
      that.uploadFace.render(data.uploadFace);
      that.uploadFace.keepLocal(220, 220);
      successCallback && successCallback(response)
    }, errorCallback);
  }
  httpAppLogin (phone,password, successCallback, errorCallback) {
    let form = {
      phone: phone,
      password: password
    };

    this.httpPost(User.URL_APP_LOGIN, form, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  httpResetPassword (phone, phoneCode, password, successCallback, errorCallback) {
    let form = {
      phone: phone,
      phoneCode: phoneCode,
      password: password
    };
    this.httpPost(User.URL_PASSWORD_RESET, form, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  httpWeChatLogin (unionid, successCallback, errorCallback) {
    let form = {
      unionid: unionid
    };
    this.httpPost(User.URL_WECHAT_LOGIN, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

  weChatLogin(successCallback, needPerfectCallback, errorCallback) {
    let weChatAuth = store.state.auths[0];
    if (!this.isLogin) {
      let that = this;
      weChatAuth.login(function () {
        weChatAuth.getUserInfo(function () {
          that.httpWeChatLogin(weChatAuth.userInfo.unionid, function (response) {
            if (!response.data.user) {
              needPerfectCallback && needPerfectCallback();
            } else {
              successCallback && successCallback(response);
            }
          }, function (response) {
            that.defaultErrorHandler(response);
            errorCallback && errorCallback();
          })
        }, function (e) {
          errorCallback && errorCallback();
        });
      }, function (e) {
        store.state.plus.nativeUI.toast(that.$t('message.WeChatLoginFailed') + e.message ,{duration:"short"});
        errorCallback && errorCallback();
      });
    } else {
      store.state.plus.nativeUI.toast(this.$t('message.LoginSuccess') ,{duration:"short"});
    }
  }

  httpWeChatRegister (phone, phoneCode, password, name, gender, unionid, avatar, successCallback, errorCallback) {
    let that = this;
    let form = {
      phone: phone,
      phoneCode: phoneCode,
      password: password,
      name: name,
      gender: gender,
      unionid: unionid,
      avatar: avatar
    };
    this.httpPost(User.URL_WECHAT_REGISTER, form, function (response) {
      that.innerLogin(response);
      successCallback && successCallback(response);
    }, errorCallback);
  };

  httpBindWeChat (unionid, successCallback, errorCallback) {
    let weChatAuth = store.state.auths[0];
    let that = this;
    weChatAuth.login(function () {
      weChatAuth.getUserInfo(function () {
        let form = {
          unionid: weChatAuth.userInfo.unionid
        };
        that.httpPost(User.URL_BIND_WECHAT, form, function (response) {
          that.unionid = weChatAuth.userInfo.unionid;
          that.getWeChatName();
          successCallback && successCallback(response);
        }, errorCallback);
      }, function (e) {
        errorCallback && errorCallback();
      });
    },function (e) {
      store.state.plus.nativeUI.toast(this.$t('message.WeChatLoginFailed') + e.message ,{duration:"short"});
      errorCallback && errorCallback();
    });
  }

  getWeChatName(successCallback, errorCallback) {
    if(!store.state.auths[0]) {
      return;
    }
    let weChatAuth = store.state.auths[0];
    let that = this;
    if (this.isLogin) {
      weChatAuth.getUserInfo(function () {
        that.weChat = weChatAuth.userInfo.nickname;
        successCallback && successCallback(weChatAuth.userInfo.nickname);
      }, function () {
        errorCallback && errorCallback();
      })
    }
  }

  httpCancelAssociation (unionid, successCallback, errorCallback) {
    let form = {
      unionid: unionid
    };
    this.httpPost(User.URL_CANCEL_ASSOCIATION, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);

  }

  innerLogin (response) {
    this.errorMessage = null;
    this.isLogin = true;
    this.render(response.data.user);
    //从localStorage读取对应用户的所有消息store.state.allMessage = "XXX"
    // store.state.allMessage = store.state.messageLetter.renderMessageFromLocalStorage(store.state.user.uuid);
    //登录成功后去本地保存一下用户的简单信息，方便下次自动填入个别字段。
    Vue.http.headers.common['Authorization'] = this.session;
    this.saveUser(response.data.user)
  }

  //将用户信息存储在本地。
  saveUser(rawUserObject = null) {
    if (rawUserObject) {
      rawUserObject.isLogin = true;
    }
    saveToLocalStorage(this.getTAG(), JSON.stringify(rawUserObject));
  }

  //获取用户头像的url.
  getAvatarUrl = function (h = 200, w = 200) {
    if (this.avatar && this.avatar.url) {
      return this.avatar.getLocalUrlBySize(h, w, require("../../../assets/img/common/avatar.png"));
    } else {
      return require("../../../assets/img/common/avatar.png");
    }
  };

  getFaceUrl = function (h = 200, w = 200) {
    if (this.uploadFace && this.uploadFace.url) {
      return this.uploadFace.getLocalUrlBySize(h, w);
    } else {
      return require("../../../assets/img/common/avatar-face.png");
    }
  };



  //登录页面查询手机号是否已注册
  httpInquiryCellRepeat(phone,successCallback,errorCallback){
    let form = {
      phone: phone
    };
    this.httpPost(User.URL_CALL_VERIFICATION, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  };
  //注册页面查询邮箱是否已注册
  httpInquiryEmailRepeat(email,successCallback,errorCallback){
    let form = {
      email: email
    };
    this.httpPost(User.URL_EMAIL_VERIFICATION, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  };
  httpLogout (successCallback, errorCallback) {
    let that = this;
    that.innerLogout();
    this.httpPost(User.URL_LOGOUT, {}, function (response) {
      delete Vue.http.headers.common['Authorization'];
      successCallback && successCallback(response);
    }, function () {
      delete Vue.http.headers.common['Authorization'];
      errorCallback && errorCallback();
    })
  }

  getHttpLogin() {
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/user/app/login", [
      new FormItem(FormItem.prototype.Type.INPUT, "手机号码",false, true, "phone", "user.phone", null,{max: 100, placeholder: "手机号码"}),
      new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "密码",false, true, "password",  "user.password", null,{min: 6, placeholder: "密码"})
    ]);
  };

  getHttpRegister() {
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/user/register", [
      new FormItem(FormItem.prototype.Type.INPUT, "姓名",false, false, "name", "user.name", null,{max: 100, placeholder: "姓名"}),
      new FormItem(FormItem.prototype.Type.INPUT, "邮箱",false, false, "email",  "user.email", null,{max: 100, placeholder: "邮箱", isEmail: true}),
      new FormItem(FormItem.prototype.Type.VALIDATION, "验证码",false, true, "phoneCode", "user.phoneCode", null,{max: 100, placeholder: "验证码"})
    ]);
  };

  getHttpResetPassword() {
    let httpForms =  new HttpForm(HttpForm.prototype.Type.ORDINARY, "/user/reset/password", [
      new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "设置密码",false, true, "password", "user.password", null,{min: 6, placeholder: "设置密码"}),
      new FormItem(FormItem.prototype.Type.HIDDEN, "UUID",false, true, "id",  "user.id", this.id),
      new FormItem(FormItem.prototype.Type.HIDDEN, "UUID",false, true, "phone",  "user.phone", store.state.temps.phone),
      new FormItem(FormItem.prototype.Type.HIDDEN, "UUID",false, true, "phoneCode",  "user.phoneCode", store.state.temps.phoneCode)
    ]);
    httpForms.form.push(
      new FormItem(
        FormItem.prototype.Type.INPUT_PASSWORD, "确认密码",false, true, "repeatPassword",  "user.repeatPassword", null,
        {max: 100, placeholder: "确认密码", equal: httpForms.getFormItem("password")}
      ));
    return httpForms;
  };

  //保存用户基本信息
  getHttpEdit() {
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/user/edit", [
      new FormItem(FormItem.prototype.Type.INPUT, "姓名",false, false, "name", "user.name", null,{max: 100, placeholder: "姓名"}),
      new FormItem(FormItem.prototype.Type.SINGER_CHECK, "性别",false, false, "gender", "user.gender", null,{placeholder: "性别",
        list: [
          {
            name: "男",
            val: "MALE"
          } ,
          {
            name: "女",
            val: "FEMALE"
          }
        ]}),
      new FormItem(FormItem.prototype.Type.INPUT, "电子邮箱",false, false, "email",  "user.email", null,{max: 100, placeholder: "电子邮箱", isEmail: true}),
      new FormItem(FormItem.prototype.Type.COMPANY_CODE, "公司码",false, false, "companyCode",  "user.companyCode", null,{max: 100, placeholder: "公司码"}),
      new FormItem(FormItem.prototype.Type.INPUT, "公司名称",false, false, "companyName",  "user.companyName", null,{max: 100, placeholder: "公司名称"}),
      new FormItem(FormItem.prototype.Type.HIDDEN, "ID",false, false, "id",  "user.id", this.id)
    ]);
  };

  httpAppRegister (phone, phoneCode, password, name, email, captcha,token, successCallback, errorCallback) {
    let that = this;
    let form = {
      phone: phone,
      phoneCode: phoneCode,
      password: password,
      name: name,
      email: email,
      captcha: captcha,
      token:token
    };
    this.httpPost(User.URL_APP_REGISTER, form, function (response) {
      that.innerLogin(response);
      successCallback && successCallback(response);
    }, errorCallback);
  };

  httpEditInformation (avatar, city, description, email, weChat, companyName,avatarCode, successCallback, errorCallback) {
    let that = this;
    let form = {
      avatar: avatar,
      avatarCode: avatarCode,
      city: city,
      description: description,
      email: email,
      weChat: weChat,
      companyName: companyName
    };
    if (this.id) {
      form.id = this.id;
    }
    this.httpPost("/user/edit", form, function(response) {
      let ss = that.session;

      that.render(response.data.user);
      that.session = ss;
      that.avatar.keepLocal(50, 50);
      that.avatar.keepLocal(80, 80);
      that.avatar.keepLocal(100, 100);
      that.avatar.keepLocal(160, 160);
      that.avatar.keepLocal(220, 220);
      that.saveUser(response.data.user);
      successCallback && successCallback(response);
    }, errorCallback);
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    let form = {
      name: this.name,
      password: this.password,
      phone: this.phone,
      description: this.description,
      email: this.email
    };
    if (this.id) {
      form.id = this.id;
    }
    BaseEntity.prototype.httpSave.call(this,form, function (response) {
      if (Vue.store.state.user.id === that.id) {
        Vue.store.state.user.name = that.name;
        Vue.store.state.user.password = that.password;
        Vue.store.state.user.phone = that.phone;
        Vue.store.state.user.description = that.description;
      }
      successCallback && successCallback(response);
    }, errorCallback);
  }

  httpPhoneValidation (phone, phoneCode, successCallback, errorCallback) {
    let that = this;
    let form = {
      phone: phone,
      phoneCode: phoneCode
    };
    this.httpPost(User.URL_PHONE_VALIDATION, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  };

  //手机快速登录
  httpFastLogin (successCallback, errorCallback) {

    if (!this.phone) {
      this.errorMessage = "手机必填！";
      return;
    }
    if (!this.phoneValidation.value) {
      this.errorMessage = "手机验证码必填！";
      return;
    }

    let that = this;
    this.errorMessage = null;
    let form = {
      phone: this.phone,
      phoneCode: this.phoneValidation.value
    };
    this.httpPost(User.URL_FAST_LOGIN, form, function (response) {
      that.innerLogin(response);

      successCallback && successCallback(response);
    }, errorCallback)

  }

  httpUserChangePassword (successCallback, errorCallback) {
    if (!this.oldPassword || !this.password || !this.repeatPassword) {
      Notification.error({
        message: '不能为空！'
      });
      return
    }

    if (this.repeatPassword !== this.password) {
      Notification.error({
        message: '两次输入不一致！'
      });
      return
    }

    let form = {
      oldPassword: this.oldPassword,
      newPassword: this.password
    };
    this.httpPost(User.URL_PASSWORD_CHANGE, form, successCallback, errorCallback);
  }

  httpPhoneChange (newPhone,phoneCode,successCallback, errorCallback) {
    if (!newPhone) {
      this.errorMessage = "新手机必填";
      return;
    }

    this.errorMessage = null;
    let form = {
      phone: newPhone,
      phoneCode: phoneCode
    };

    this.httpPost(User.URL_PHONE_CHANGE, form, successCallback, errorCallback);
  }

  //从本地存储中读取用户信息
  renderFromLocalStorage() {

    try {
      let userString = readLocalStorage(this.getTAG());
      if (userString) {
        let json = JSON.parse(userString);
        this.render(json);

      }
    } catch (e) {
      removeLocalStorage(this.getTAG());
    }

  }

  //清除本地的user信息
  clearLocalStorage() {
    removeLocalStorage(this.getTAG());
  };

  //退出登陆
  innerLogout() {
    this.render(new User());
    this.clearLocalStorage();
  };

  hasPermission(featureType) {
    if (this.role) {
      return this.role.hasPermission(featureType);
    } else {
      console.error("该用户没有角色，请及时排查。");
      return false;
    }
  };

  //自动登陆的更新用户信息
  httpUpdateInfo(successCallback, errorCallback) {
    if (this.isLogin) {
      let that = this;
      let session = this.session;
      this.httpPost(User.URL_UPDATE, {}, function (response) {
        that.errorMessage = null;
        that.isLogin = true;
        that.render(response.data.user);
        that.session = session;
        //从localStorage读取对应用户的所有消息store.state.allMessage = "XXX"
        // store.state.allMessage = store.state.messageLetter.renderMessageFromLocalStorage(store.state.user.id);
        let tempUser = response.data.user;
        tempUser.session = session;
        that.saveUser(tempUser);
        that.avatar.keepLocal(50, 50);
        that.avatar.keepLocal(80, 80);
        that.avatar.keepLocal(100, 100);
        that.avatar.keepLocal(160, 160);
        that.avatar.keepLocal(220, 220);
        successCallback && successCallback(response);
      }, function () {
        //失败了说明已丢失登陆状态
        that.isLogin = false;
        that.render(new User());
      });
    }
  };

  authLogoutAll() {
    if (store.state.auths) {
      this.authLogout(store.state.auths[0]);
    }
  }

  authLogout(auth) {
    auth.logout(function () {
      console.log("success logout")
      // store.state.plus.nativeUI.toast("success logout！" ,{duration:"short"});
    }, function (e) {
      // store.state.plus.nativeUI.toast("error logout！" ,{duration:"short"});
      console.log("error logout" + e.message)
    })
  }

  authLogin(successCallback, errorCallback) {
    let s = store.state.auths[0];
    let that = this;
    if (!s.authResult) {
      s.login(function () {
        let result = s.authResult;
        that.authUserInfo(successCallback, errorCallback);
      }, errorCallback);
    }
  }

  // 获取登录用户信息操作
  authUserInfo(successCallback, errorCallback) {
    let s = store.state.auths[0];
    let that = this;
    if (!s.authResult) {
      store.state.plus.nativeUI.toast(that.$t('message.WeChatLoginFailed'),{duration:"short"});
      errorCallback && errorCallback();
    } else {
      s.getUserInfo(function (e) {
        console.log("userInformation.nickname" + s.userInfo.nickname);

        Vue.store.state.user.name = s.userInfo.nickname;
        Vue.store.state.user.city = s.userInfo.country;
        if (s.userInfo.sex === 1) {
          Vue.store.state.user.gender = "MALE";
        } else {
          Vue.store.state.user.gender = "FEMALE";
        }
        Vue.store.state.user.unionid = s.userInfo.unionid;
        Vue.store.state.user.avatar = s.userInfo.headimgurl;
        successCallback && successCallback();
      }, function (e) {
        errorCallback && errorCallback();
      })
    }
  }
}





