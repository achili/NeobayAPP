import store from "../../../_store";
export function plusShare(msg) {
  /**
   *如下情况直接打开系统分享
   * 1、未配置微信分享通道
   * 2、用户手机未安装威胁你
   * 3、360浏览器下
   */
  if(isWechatInstalled() && !/360\sAphone/.test(navigator.userAgent)) {
    store.state.plus.nativeUI.actionSheet({
      title: '分享到',
      cancel: "取消",
      buttons: [{
        title: "微信消息"
      }, {
        title: "微信朋友圈"
      }, {
        title: "更多分享"
      }]
    }, function(e) {
      let index = e.index;
      switch(index) {
        case 1: //分享到微信好友
          msg.title = msg.title;
          msg.extra = {
            scene: 'WXSceneSession'
          };
          share('weixin', msg);
          break;
        case 2: //分享到微信朋友圈
          msg.title = msg.title;
          msg.extra = {
            scene: 'WXSceneTimeline'
          };
          share('weixin', msg);
          break;
        case 3: //更多分享
          let url = msg.href ? ('( ' + msg.href + ' )') : '';
          msg.title = msg.title + url;
          msg.content = msg.content + url;
          openSystem(msg);
          break;
      }
    })
  } else {
    //系统分享
    let url = msg.href ? ('( ' + msg.href + ' )') : '';
    msg.title = msg.title + url;
    msg.content = msg.content + url;
    openSystem(msg);
  }
}
function init(successCallback) {
  store.state.plus.share.getServices(function(services) {
    let shareServices = {};
    for(let i = 0, len = services.length; i < len; i++) {
      shareServices[services[i].id] = services[i];
    }
    successCallback && successCallback(shareServices);
  });
};

function isWechatInstalled() {
  return  store.state.plus.runtime.isApplicationExist &&  store.state.plus.runtime.isApplicationExist({
    pname: 'com.tencent.mm',
    action: 'weixin://'
  });
};

function share(id, msg) {
  init(function (shareServices) {
    let service = shareServices[id];
    if(!service) {
      store.state.plus.nativeUI.toast("分享失败：service不存在");
      return;
    }
    function _share() {
      service.send(msg, function() {

      }, function(e) {
        store.state.plus.nativeUI.toast("分享到\"" + service.description + "\"失败:" + e.message);
      })
    };
    if(service.authenticated) {
      _share(service, msg);
    } else {
      service.authorize(function() {
        _share(service, msg);
      }, function(e) {
        console.log("认证授权失败");
      })
    }
  });
};

function openSystem(msg) {
  if( store.state.plus.share.sendWithSystem) {
    store.state.plus.share.sendWithSystem(msg, function() {
    }, function() {
    });
  } else {
  }
}
