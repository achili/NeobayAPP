import Vue from 'vue'
import Router from 'vue-router'
import store from '../_store'

import Activity from '../view/Activity'
import Blank from '../view/Blank'
import ActivityClass from "../common/model/_base/Activity";

//打开一个新的Activity
Router.prototype.openActivity = function (activityName, transition = "slide-left", query = {}) {
  transition = "slide-left";
  this.transition = transition;
  this.push({path: store.state.route.path + "/" + activityName, query: query})
};
//关闭最上层的Activity  目前还不支持关闭中间的Activity
Router.prototype.closeActivity = function (transition = "slide-right", toActivity) {
  transition = "slide-right";
  let lastActivity = ActivityClass.getTopActivity();
  if(lastActivity.name === 'home') {
    if(!store.state.tabNavigation.home[0].active) {
      store.state.tabNavigation.home.forEach(e => {
        e.active = false;
      });
      store.state.tabNavigation.home[0].active = true;
      return;
    }
    let stratTime = new Date();
    if(this.closeStratTime && stratTime.getTime() - this.closeStratTime.getTime() < 2000) {
      store.state.plus.runtime.quit();
    } else {
      store.state.plus.nativeUI.toast(this.$t('message.ReturnDesktop'),{duration:"short"});
      this.closeStratTime = stratTime;
    }
  } else {
    let path = store.state.route.path;
    let newPath = path;
    if(toActivity) {
      console.log("toActivity")
      while(ActivityClass.getTopActivity().name !== "home") {
        console.log(ActivityClass.getTopActivity().name)
        this.transition = transition;
        store.state.activityList.pop();
        newPath = newPath.slice(0, newPath.lastIndexOf("/"));
        console.log(newPath)
        this.push({path: newPath, query: ActivityClass.getTopActivity().query})
      }
    } else {
      this.transition = transition;
      store.state.activityList.pop();
      newPath = path.slice(0, path.lastIndexOf("/"));
      this.push({path: newPath, query: ActivityClass.getTopActivity().query})
    }
  }
};

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/app',
      component: Blank,
      children: [{
        path: ':app1',
        component: Activity,
        children: [{
          path: ':app2',
          component: Activity,
          children: [{
            path: ':app3',
            component: Activity,
            children: [{
              path: ':app4',
              component: Activity,
              children: [{
                path: ':app5',
                component: Activity,
                children: [{
                  path: ':app6',
                  component: Activity,
                  children: [{
                    path: ':app7',
                    component: Activity,
                    children: [{
                      path: ':app8',
                      component: Activity,
                      children: [{
                        path: ':app9',
                        component: Activity,
                        children: [{
                          path: ':app10',
                          component: Activity,
                          children: [{
                            path: ':app11',
                            component: Activity,
                            children: [{
                              path: ':app12',
                              component: Activity,
                              children: [{
                                path: ':app13',
                                component: Activity,
                                children: [{
                                  path: ':app14',
                                  component: Activity,
                                  children: [{
                                    path: ':app15',
                                    component: Activity,
                                    children: [{
                                      path: ':app16',
                                      component: Activity,
                                      children: [{
                                        path: ':app17',
                                        component: Activity,
                                        children: [{
                                          path: ':app18',
                                          component: Activity,
                                          children: [{
                                            path: ':app19',
                                            component: Activity
                                          }]
                                        }]
                                      }]
                                    }]
                                  }]
                                }]
                              }]
                            }]
                          }]
                        }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(transition => {

});

export default router
