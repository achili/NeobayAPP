import BaseEntity from "../_base/BaseEntity";
import {containStr, endWith, getExtension, humanFileSize, startWith} from "../../filter/str";
import Vue from "vue";
import Filter from "../_base/Filter";
import store from "../../../_store";
import Resumable from "../../fork/resumable/resumable";
import {getMimeType} from "../../util/MimeUtil";


let Status = {
  OK: "OK"
}

let StatusMap = {
  OK: {
    name: "OK",
    value: "OK",
    style: "info"
  }
}


//一种是大文件上传模式，一种是小文件上传模式，默认为NONE
let Mode = {
  NONE: "NONE",
  TINY: "TINY",
  HUGE: "HUGE"
};


//当前tank处于怎样的步骤中
let Procedure = {
  "FREE": "FREE",
  "FETCHING_UPLOAD_TOKEN": "FETCHING_UPLOAD_TOKEN",
  "UPLOADING": "UPLOADING",
  "FETCHING_DOWNLOAD_TOKEN": "FETCHING_DOWNLOAD_TOKEN",
  "DOWNLOADING": "DOWNLOADING"
}

export default class Tank extends BaseEntity{
  constructor(filter = '*', privacy = false, maxSize = 6144 * 6144, uploadHint = null){
    super();

    this.matterUuid = null;
    this.user = null;
    this.name = null;
    this.code = null;
    this.size = null;
    this.type = null;
    this.filter = filter;
    this.privacy = privacy;
    this.url = null;
    this.status = Status.OK;

      /*
    此部分是上传的地址和token，临时信息。
   */
    this.uploadTokenUuid = null;
    this.uploadUrl = null;


    /*
    这部分是辅助UI的字段信息
 */
    //此部分是图像变换
    this.multiple = 1;
    this.moveX = 0;
    this.moveY = 0;

    //local fields
    //允许上传的最大大小。
    this.maxSize = maxSize;
    //给用户的提示文字
    this.uploadHint = uploadHint;
    this.uploadToken = null;
    this.downloadToken = null;
    //浏览器中选择好的原生file，未作任何处理。
    this.file = null;
    this.disabled = false;
    //文件上传的模式，小型文件，大型文件，以及无。
    this.mode = Mode.NONE;
    //当前文件处于哪一个步骤中
    this.procedure = Procedure.FREE;
    //当前上传进度的数值 0-1之间
    this.progress = 0;
    //实时上传速度 byte/s
    this.speed = 0;
    //分块的大小 1M
    this.chunkSize = 1 * 1024 * 1024;
    //用于分块上传的类
    this.resumable = null;
  }
  static URL_DOWNLOAD = "/tank/download/{code}";
  static URL_TOKEN_UPLOAD = "/tank/token/upload";
  static URL_TANK_UPLOAD = "/file/upload";
  static URL_TANK_CHUNK = "/file/chunk";
  static URL_TANK_DOWNLOAD = "/file/download";
  static URL_CONFIRM = '/tank/confirm';

  getTAG() {
    return "Tank";
  }


  render(obj) {
    super.render(obj);
    this.type = getMimeType(this.name);
  }

  getForm() {
    return {
      filename: this.name,
      privacy: this.privacy,
      size: this.size
    }
  }

  downloadUrl () {
    if (this.privacy) {
      return Vue.store.state.tankHost + Tank.URL_TANK_DOWNLOAD + "?code=" + this.code + "&token=" + this.downloadToken;
    } else {
      return this.url;
    }
  }

  download () {
    if (this.privacy) {
      let url = Tank.URL_DOWNLOAD.replace("{code}", this.code);
      window.open(Vue.http.options.root + url);
    } else {
      window.open(this.url);
    }

  };

  getFilters () {
    return [
      new Filter("SORT", "ID", "orderId"),
      new Filter("INPUT", "文件名", "name"),
      new Filter("CHECK", "私有", "privacy")
    ];
  };

  fileIcon (inUeditor = false) {

    //给不同的文件准备不同的图标
    if (startWith(this.type, "application/pdf")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/9fc1b626a38e773bfed764474e66af4a/pdf.png";
      } else {
        return "fa fa-file-pdf-o color-pdf";
      }
    }
    if (startWith(this.type, "application/msword") || startWith(this.type, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/df876da59aee11299fe00b967e62b099/doc.png";
      } else {
        return "fa fa-file-word-o color-doc";
      }
    }
    if (startWith(this.type, "application/vnd.ms-powerpoint") || startWith(this.type, "application/vnd.openxmlformats-officedocument.presentationml.presentation")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/f333fe404d02940370802de7e1b5213e/ppt.png";
      } else {
        return "fa fa-file-powerpoint-o color-ppt";
      }
    }
    if (startWith(this.type, "application/vnd.ms-excel") || startWith(this.type, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/50af9d1134c7e28c462340b161a48571/xls.png";
      } else {
        return "fa fa-file-excel-o color-xls";
      }
    }
    if (startWith(this.type, "audio")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/17ed44946dbbbf204bd0c45502800708/audio.png";
      } else {
        return "fa fa-file-audio-o color-audio";
      }
    }
    if (startWith(this.type, "video")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/7285a52fa4025c5b4d6992a9a873a3da/video.png";
      } else {
        return "fa fa-file-movie-o color-video";
      }
    }
    if (startWith(this.type, "text")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/231bf79a1e374d48905ced08bed8edf9/text.png";
      } else {
        return "fa fa-file-text-o color-text";
      }
    }
    if (startWith(this.type, "image")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/2b3acde2323d8b2e6868df118ab8c9a4/image.png";
      } else {
        return "fa fa-file-image-o color-image";
      }
    }
    if (endWith(this.name, "zip") || endWith(this.name, "rar") || endWith(this.name, "7z") || endWith(this.name, "gz")) {
      if (inUeditor) {
        return "https://yctank.liyarou.com/f/jay/20170815/6fa2ea70f99ca0e5d9ad397e36a63096/archive.png";
      } else {
        return "fa fa-file-archive-o color-archive";
      }
    }

    if (inUeditor) {
      return "https://yctank.liyarou.com/f/jay/20170815/0b71631cda64805415fec20cd504e84e/file.png";
    } else {
      return "fa fa-file-o text-success";
    }

  };

  publicImgUrl() {
    if (!this.exist()) {
      return null;
    }
    if (!this.tank.privacy) {
      if (startWith(this.tank.type, "image")) {
        return this.tank.url;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  //验证过滤器有没有误填写，这个方法主要给开发者使用。
  validateFilter() {

    let filter = this.filter;
    if (filter === null || filter === "") {
      // this.errorMessage = "过滤器设置错误，请检查-1" + filter;
      // console.error("过滤器设置错误，请检查.-1");
      return true;
    }
    if (filter !== "*") {
      let regex1 = /^(image|audio|video|text)(\|(image|audio|video|text))*$/g;
      let regex2 = /^(\.[\w]+)(\|\.[\w]+)*$/g;
      // 测试几种特殊类型 image|audio|video|text
      if (!regex1.test(filter)) {
        //测试后缀名
        if (!regex2.test(filter)) {
          this.errorMessage = "过滤器设置错误，请检查-2";
          console.error("过滤器设置错误，请检查.-2");
          return false;
        }
      }
    }

    //validate privacy
    let privacy = this.privacy;
    if (privacy !== true) {
      if (privacy !== false) {
        this.errorMessage = "privacy属性为Boolean类型";
        console.error("privacy属性为Boolean类型.");
        return false;
      }
    }

    return true;
  };


  //验证用户上传的文件是否符合过滤器
  validateFileType() {
    if (!this.filter) {
      this.errorMessage = '该过滤条件有问题';
      return false
    }
    if (this.filter === '*') {
      this.errorMessage = null;
      return true
    }
    let extension = getExtension(this.name);
    console.log(this.type + "+++++++++++++");
    let simpleType = this.type.substring(0, this.type.indexOf('/'));
    //专门解决android微信浏览器中名字乱命名的bug.
    if (startWith(this.name, 'image%3A')) {
      extension = 'jpg';
      simpleType = 'image'
    } else if (startWith(this.name, 'video%3A')) {
      extension = 'mp4';
      simpleType = 'video'
    } else if (startWith(this.name, 'audio%3A')) {
      extension = 'mp3';
      simpleType = 'audio'
    }
    if (containStr(this.filter, extension)) {
      this.errorMessage = null;
      return true
    }
    if (simpleType) {
      if (containStr(this.filter, simpleType)) {
        this.errorMessage = null;
        return true
      }
    }
    this.errorMessage = '您上传的文件格式不符合要求';
    return false
  }

  validates() {
    if (!this.file) {
      this.errorMessage = '请选择上传文件';
      return false
    }
    this.name = this.file.name;
    if (!this.name) {
      this.errorMessage = '请选择上传文件';
      return false
    }
    if(this.file.size > this.maxSize){
      this.errorMessage = '文件超出指定大小';
      return false
    }
    this.size = this.file.size;
    this.type = getMimeType(this.name)
    this.type = this.file.type;
    //安卓手机端拍照 this.type 会获取到数字
    if (!this.type || typeof this.type === "number") {
      this.type = getMimeType(this.name)
    }
    this.errorMessage = null;
    return true
  }
  //上传之前的验证工作。
  validate() {
    if (!this.file) {
      console.error("请选择文件！");
      return false;
    }
    if (this.maxSize > 0) {
      if (this.file.size > this.maxSize) {
        this.errorMessage = "文件大小不能超过" + humanFileSize(this.maxSize) + "，当前文件大小为" + humanFileSize(this.file.size);
        return false;
      }
    }

    if (this.file.size > this.chunkSize) {
      this.mode = Mode.HUGE;
    } else {
      this.mode = Mode.TINY;
    }


    //下面验证选择的文件和过滤器是否吻合。
    let filename = this.file.name;
    let type = this.file.type;
    if (!this.validateFilter()) {
      return false;
    }
    if (this.filter === "*") {
      this.errorMessage = null;
      return true;
    }

    if (containStr(this.filter, getExtension(filename))) {
      this.errorMessage = null;
      return true;
    }

    let simpleType = type.substr(0, type.indexOf("/"));
    if (simpleType) {
      if (containStr(this.filter, simpleType)) {
        this.errorMessage = null;
        return true;
      }
    }
    this.errorMessage = "只允许上传以下类型的文件：" + this.filter;
    return true;

  }

  //具有了这最基本的四种属性，才能叫做“存在”
  exist() {
    return this.name && this.code && this.size && this.type;
  }

  httpTokenUpload (successCallback, failureCallback) {

    let that = this;

    //保证有了file才去获取TokenUpload，否则白跑一趟。
    if (!this.validate()) {
      this.defaultErrorHandler(this.errorMessage, failureCallback);
      return;
    }

    let form = {
      filter: this.filter,
      privacy: this.privacy
    };

    that.procedure = Procedure.FETCHING_UPLOAD_TOKEN;
    this.httpPost(Tank.URL_TOKEN_UPLOAD, form, function (response) {

      that.uploadToken = response.data.token;

      if (typeof successCallback === "function") {
        successCallback(response);
      }

    }, function (response) {
      that.procedure = Procedure.FREE;

      that.defaultErrorHandler(response, failureCallback);

    });
  }


  //小文件上传。
  httpUpload (successCallback, failureCallback) {

    let that = this;

    if (!this.validate()) {
      this.defaultErrorHandler(this.errorMessage, failureCallback);
      return;
    }

    let formData = new FormData();

    formData.append('file', this.file);
    formData.append("token", this.uploadToken);
    formData.append("privacy", this.privacy);


    that.procedure = Procedure.UPLOADING;

    this.httpPost(Vue.store.state.tankHost + Tank.URL_TANK_UPLOAD, formData, function (response) {

      that.procedure = Procedure.FREE;

      that.render(response["data"]["file"]);


      if (typeof successCallback === "function") {
        successCallback(response);
      }

    }, function (response) {

      that.procedure = Procedure.FREE;

      that.defaultErrorHandler(response, failureCallback);

    });
  }


  //大文件上传。
  httpChunk (successCallback, failureCallback) {

    let that = this;

    if (!this.validate()) {
      this.defaultErrorHandler(this.errorMessage, failureCallback);
      return;
    }

    let url = Vue.store.state.tankHost + Tank.URL_TANK_CHUNK;

    this.resumable = new Resumable({
      target: url,
      query: {
        token: this.uploadToken,
        privacy: this.privacy
      },


      //,
      //XDEBUG_SESSION_START: 15736
      //分块大小为1M
      chunkSize: that.chunkSize
    });

    // Resumable.js isn't supported, fall back on a different method
    if (!this.resumable.support) {
      console.error("不支持分块上传");
      this.errorMessage = "您的浏览器不支持分块上传，推荐使用Chrome浏览器进行操作";
      that.procedure = Procedure.FREE;
      return;
    }
    this.resumable.on('fileAdded', function (file) {
      that.procedure = Procedure.UPLOADING;

      that.progress = 0;
      that.speed = 0;
      that.resumable.upload();
    });
    this.resumable.on('fileSuccess', function (file, message) {


      let fileJson = {};
      try {
        fileJson = JSON.parse(message)["file"];
      } catch (e) {
        that.errorMessage = "返回File信息错误";
        if (message) {
          that.errorMessage = message;
        }
        that.defaultErrorHandler(that.errorMessage, failureCallback);
        return;
      }

      that.render(fileJson);

      that.procedure = Procedure.FREE;

      if (typeof successCallback === "function") {
        successCallback();
      }

    });
    this.resumable.on('fileError', function (file, message) {


      that.errorMessage = "上传过程中出现错误，请稍后重试";
      if (message) {
        that.errorMessage = message;
      }
      console.error(message);

      that.procedure = Procedure.FREE;
      //清空一些东西。
      that.defaultErrorHandler(that.errorMessage, failureCallback);

    });

    //ms
    let lastTimeStamp = (new Date()).getTime();
    let lastSize = 0;
    this.resumable.on('fileProgress', function (file) {
      that.progress = file.progress();
      let currentTime = (new Date()).getTime();
      let deltaTime = currentTime - lastTimeStamp;


      //每2s计算一次速度
      if (deltaTime > 2000) {
        lastTimeStamp = currentTime;

        let currentSize = that.resumable.getSize() * that.progress;
        let deltaSize = currentSize - lastSize;
        lastSize = currentSize;


        that.speed = (deltaSize / (deltaTime / 1000)).toFixed(0);
      }

    });

    this.resumable.addFile(this.file);

  }

  //用户选择好了文件，就开始上传了。
  upload (successCallback, failureCallback) {
    let that = this;
    this.httpTokenUpload(function () {
      if (that.mode === Mode.TINY) {
        that.httpUpload(function () {
          if (typeof successCallback === "function") {
            successCallback();
          }
        }, function (response) {
          that.defaultErrorHandler(response, failureCallback);
        });
      } else if (that.mode === Mode.HUGE) {
        that.httpChunk(function () {
          if (typeof successCallback === "function") {
            successCallback();
          }
        }, function (response) {
          that.defaultErrorHandler(response, failureCallback);
        });
      } else {
        console.error("mode错误，请检查");
      }
    }, function (response) {
      that.defaultErrorHandler(response, failureCallback);
    });
  }

  //在上传的途中，清空一切，从头开始。
  clear () {
    this.user = null;
    this.name = null;
    this.code = null;
    this.size = 0;
    this.type = null;
    //this.filter = "*";
    //this.privacy = true;
    this.url = null;
    //this.status = Status.OK;
    this.uploadToken = null;
    this.downloadToken = null;
    this.file = null;
    this.mode = Mode.NONE;
    this.procedure = Procedure.FREE;
    this.progress = 0;

    if (this.resumable) {
      this.resumable.cancel();
      this.resumable = null;
    }

  }

  //提供不同类型的测试数据。
  mockDataDocxPrivacy () {
    this.user = null;
    this.name = "TestDocFile.docx";
    this.code = "57e3f0127a588bb4e78c61cf7329ce6d";
    this.size = 11958;
    this.type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    this.filter = ".doc|.docx|.pdf";
    this.privacy = true;
    this.url = null;
    this.status = "OK";
  }

  getUrlBySize(h,w){
    // let sh = "";
    // let sw = "";
    // let ff = "&imageResizeM=fit";
    // if(h) {
    //   sh = "&imageResizeH=" + h;
    // }
    // if(w) {
    //   sw = "&imageResizeW=" + w;
    // }
    // if(h && w) {
    //   ff = "&imageResizeM=fill";
    // }
    return this.url;
    // return this.url + '?imageProcess=resize' +  ff + sh + sw;
  }


  getLocalUrlBySize(h, w, loadingUrl = require("../../../assets/gif/loadloading.gif")) {
    let key;
    if(h && w) {
      key = "localUrl" + h + "_" + w;
    } else if(h) {
      key = "localUrl" + h + "_0";
    } else if(w) {
      key = "localUrl" + "0_" + w;
    } else {
      key = "localUrl";
    }

    if(!this[key]) {
      Vue.set(this, key, loadingUrl);
    }
    return this[key];
  }

  //只有需要缓存到本地的tank才需要调用 key 可查;
  keepLocal(h, w, errorUrl = require("../../../assets/gif/loadloading.gif")) {
    let key;
    if(h && w) {
      key = "localUrl" + h + "_" + w;
    } else if(h) {
      key = "localUrl" + h + "_0";
    } else if(w) {
      key = "localUrl" + "0_" + w;
    } else {
      key = "localUrl";
    }
    let that = this;
    if(!this.url || !store.state.plus.isReady) {
      if(!store.state.plus.isReady) {
        setTimeout(function () {
          Vue.set(that, key, that.getUrlBySize(h, w));
        }, 1000)
      }
      return;
    }
    //文件名字符上限255以上matterUuid 长36
    let fileName = this.code + h + "-" + w + "-tank" + getExtension(this.name);
    let path = "_downloads/cache/img" + fileName;
    //查找是否有本地文件
    store.state.plus.io.resolveLocalFileSystemURL(path, function () {
      //图片存在
      let localUrl = store.state.plus.io.convertLocalFileSystemURL(path);
      Vue.set(that, key, localUrl);
    }, function () {
      //图片不存在 需要下载
      let downloaderTask = store.state.plus.downloader.createDownload((new URL(that.getUrlBySize(h,w)).toString()), {filename:path, retryInterval: 2}, function(d, status) {
        if (status === 200) {
          store.state.plus.io.resolveLocalFileSystemURL(path, function () {
            //图片存在
            let localUrl = store.state.plus.io.convertLocalFileSystemURL(path);
            Vue.set(that, key, localUrl);
          }, function () {
            Vue.set(that, key, errorUrl);
          });
        } else {
          store.state.plus.nativeUI.toast(that.$t('message.DownloadFailed') + status + " - " + e.code,{duration:"short"});
          that.plus.io.resolveLocalFileSystemURL(path, function(entry) {
            entry.remove(function() {}, function(e) {
              console.error("文件删除失败");
            });
          });
          Vue.set(that, key, errorUrl);
        }
      });
      //启动下载任务
      downloaderTask.start();
    });
  }

  mockDataPptxPrivacy () {
    this.user = null;
    this.name = "TestPPTFile.pptx";
    this.code = "f747e80ddf01b9b74a8cec4d4bce601b";
    this.size = 32245;
    this.type = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    this.filter = ".ppt|.pptx|.pdf";
    this.privacy = true;
    this.url = null;
    this.status = "OK";
  }


  mockDataPdfPrivacy() {
    this.user = null;
    this.name = "ProjectDemands.pdf";
    this.code = "3ec72928f34a0939ae1b8f9cb4fffc90";
    this.size = 4819098;
    this.type = "application/pdf";
    this.filter = ".ppt|.pptx|.pdf";
    this.privacy = true;
    this.url = null;
    this.status = "OK";
  }

  mockDataImage () {
    this.id = 69;
    this.user = null;
    this.name = "1383154-55218731c91b91cc.jpg";
    this.code = "bee61e0ef64f34306e49379767b4c548";
    this.size = 24864;
    this.type = "image/jpeg";
    this.filter = "*";
    this.privacy = false;
    this.url = "http://tank.neobay.cn/f/jay/20161226/bee61e0ef64f34306e49379767b4c548/1383154-55218731c91b91cc.jpg";
    this.status = "OK";
  }

  static keepLocalList(tankArr, h, w) {
    tankArr.forEach(tank => {
      tank.keepLocal(h, w);
    })
  }
  resetChange() {
    this.multiple = 1;
    this.moveX = 0;
    this.moveY = 0;
  }
}

Tank.prototype.Mode = Mode;
Tank.prototype.Procedure = Procedure;
Tank.prototype.Status = Status;
Tank.prototype.StatusMap = StatusMap;
Tank.prototype.StatusList = Tank.prototype.getStatusList();









