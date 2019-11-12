import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from "../tank/Tank";

let Status = {
	OK: "OK"
};

let StatusMap = {
	OK: {
		name: "正常",
		value: "OK",
		style: "info"
	}
};

export default function Preference() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	//合同签订方
	this.party = null;

	//法人或者授权人
	this.representative = null;

	//法人或者授权人电话
	this.representativePhone = null;

	//开户银行
	this.bank = null;

	//户名
	this.bankName = null;

	//开户银行账号
	this.bankNo = null;
  //纳税人识别号
  this.taxpayerCode = null;
  //甲方地址
  this.partyAAddress = null;
  //甲方电话
  this.partyASignPhone = null;

	//签约地点
	this.signAddress = null;

	//财务信息，在付款信息单中用到
	//财务部联系人
	this.financeDuty = null;
	//财务部联系电话
	this.financePhone = null;
	//财务部地址
	this.financeAddress = null;

	//孵化空间
	this.incubatorSpace = null;

	//入驻地址
	this.entryAddress = null;

	//版本号
  this.versionNumber = null;

  //上传文件
  this.versionFile = new Tank(".apk",false);

  //ios版本url
  this.appStoreUrl = null;


	this.status = Status.OK;
}


//extend BaseEntity
Preference.prototype = new BaseEntity();
Preference.prototype.constructor = Preference;
Preference.prototype.URL_FETCH = "/preference/fetch";
Preference.prototype.URL_GET_VERSION = "/preference/show";

Preference.prototype.Status = Status;
Preference.prototype.StatusMap = StatusMap;
Preference.prototype.StatusList = Preference.prototype.getStatusList();

Preference.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId")
	];
};

//We use this method to get the full js Object.
Preference.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("versionFile", Tank);

};

Preference.prototype.getForm = function () {

	return {
		party: this.party,
		representative: this.representative,
		representativePhone: this.representativePhone,
		bank: this.bank,
		bankName: this.bankName,
		bankNo: this.bankNo,
    taxpayerCode: this.taxpayerCode,
    partyAAddress: this.partyAAddress,
    partyASignPhone: this.partyASignPhone,
		signAddress: this.signAddress,
		incubatorSpace: this.incubatorSpace,
		entryAddress: this.entryAddress,
		//财务部联系人
		financeDuty: this.financeDuty,
		//财务部联系电话
		financePhone: this.financePhone,
		//财务部地址
		financeAddress: this.financeAddress,
    versionNumber: this.versionNumber,
    versionFileCode: this.versionFile.code,
    appStoreUrl: this.appStoreUrl
	};

};


Preference.prototype.validate = function () {


	if (!this.party) {
		this.errorMessage = "合同签订方必填";
		return false;
	}

	if (!this.representative) {
		this.errorMessage = "法人或者授权人必填";
		return false;
	}

	if (!this.representativePhone) {
		this.errorMessage = "法人或者授权人电话必填";
		return false;
	}

	if (!this.bank) {
		this.errorMessage = "开户银行必填";
		return false;
	}

	if (!this.bankName) {
		this.errorMessage = "开户银行户名必填";
		return false;
	}

	if (!this.bankNo) {
		this.errorMessage = "开户银行账号必填";
		return false;
	}
  if (!this.taxpayerCode) {
    this.errorMessage = '纳税人识别号必填';
    return false
  }
  if (!this.partyAAddress) {
    this.errorMessage = '甲方地址必填';
    return false
  }
  if (!this.partyASignPhone) {
    this.errorMessage = '甲方电话必填';
    return false
  }

	if (!this.signAddress) {
		this.errorMessage = "签约地点必填";
		return false;
	}

	if (!this.incubatorSpace) {
		this.errorMessage = "孵化空间必填";
		return false;
	}

	if (!this.entryAddress) {
		this.errorMessage = "入驻地址必填";
		return false;
	}


	if (!this.financeDuty) {
		this.errorMessage = "财务部联系人必填";
		return false;
	}
	if (!this.financePhone) {
		this.errorMessage = "财务部联系电话必填";
		return false;
	}
	if (!this.financeAddress) {
		this.errorMessage = "财务部地址必填";
		return false;
	}
  if (!this.versionNumber) {
    this.errorMessage = "版本号必填";
    return false;
  }
  if (!this.versionFile.code) {
    this.errorMessage = "版本文件必须上传";
    return false;
  }
  if (!this.appStoreUrl) {
    this.errorMessage = "ios版本url必填";
    return false;
  }

	this.errorMessage = null;
	return true;
};


Preference.prototype.httpFetch = function (successCallback, errorCallback) {

	let that = this;

	this.httpPost(this.URL_FETCH, {}, function (response) {

		that.render(response.data[that.getTAG()]);

		successCallback && successCallback(response);

	}, errorCallback);

};

Preference.prototype.httpVersion = function (successCallback, errorCallback) {
  let that = this;
  this.httpPost(this.URL_GET_VERSION,{},function (response) {
     that.render(response.data);

    successCallback && successCallback(response);
  },errorCallback);
};

