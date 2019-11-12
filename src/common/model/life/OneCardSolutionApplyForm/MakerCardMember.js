import BaseEntity from "../../_base/BaseEntity";
import MakerCard from "./MakerCard";
import Vue from "vue";



export default function MakerCardMember() {

  BaseEntity.call(this,arguments);

  this.name = null;
  this.idCard = null;
  this.makerCard = new MakerCard();

  if ( Vue.store.state.debug) {
    this.mockData();
  }
};

MakerCardMember.prototype = new BaseEntity();
MakerCardMember.prototype.constructor = MakerCardMember;

MakerCardMember.prototype.mockData = function () {
  this.name = "张三";
  this.idCard = "431024199611133333";
};

MakerCardMember.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);

};

MakerCardMember.prototype.getForm = function () {

  let form = {
    name: this.name,
    idCard: this.idCard
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};
MakerCardMember.prototype.validate = function () {

  if (!this.name) {
    this.errorMessage = "申请人姓名必填！";
    return false;
  }
  if (!this.idCard) {
    this.errorMessage = "身份证必填！";
    return false;
  }
  this.errorMessage = null;
  return true;
};
