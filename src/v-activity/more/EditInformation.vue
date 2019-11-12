<template>
  <div class="edit-information">
    <div class="edit-information-first-block">
      <div class="edit-information-first-block-svg" @click="$router.closeActivity()">
        <div class="edit-information-first-block-svg-content" :style="'background:url(\''+(require('../../assets/svg/register/leftarrow.svg'))+'\') center no-repeat'"></div>
      </div>
      <div class="edit-information-first-block-name">
        {{$t('message.Edit')}}{{$t('message.Archives')}}
      </div>
      <div class="edit-information-first-block-edit"  @click="edit()">
        {{$t('message.Save')}}
      </div>
    </div>

    <div class="edit-information-content">
      <div class="edit-information-index-content">
        <div class="edit-information-header" v-if="user.isLogin">
          <div class="edit-information-header-img">
            <div v-if="tank.exist()">
              <img :src="tank.getUrlBySize(220, 220)">
              <input ref="refFile" type="file" name="avatar" class="edit-information-header-input" @change.prevent.stop="fileChanged"/>
            </div>
            <div v-else>
              <img :src="user.getAvatarUrl(220, 220)">
              <input ref="refFile" type="file" name="avatar" class="edit-information-header-input" @change.prevent.stop="fileChanged"/>
            </div>
          </div>
        </div>
      </div>

    <div class="edit-information-footer">
      <div class="edit-information-footer-description">
        {{$t(cityTest.description)}}
      </div>
      <NbFormItem :formItem="cityTest"></NbFormItem>
      <div class="edit-information-footer-description">
        {{$t(descriptionTest.description)}}
      </div>
      <NbFormItem :formItem="descriptionTest"></NbFormItem>
      <div class="edit-information-footer-description">
        {{$t(emailTest.description)}}
      </div>
      <NbFormItem :formItem="emailTest"></NbFormItem>
      <div style="margin-top: 25px;margin-bottom: 5px;color: #888888;">
        {{$t('message.WeChat')}}
      </div>
      <div v-if="this.user.unionid" style="border-bottom: 1px solid #EAEEEF;padding-bottom: 20px;">
        <input :disabled="true" v-model="user.weChat" style="border: none;background-color: #FFFFFF;font-size: 18px;width: 70%;">
        <span style="color: red;text-align: right;" @click="cancelAssociation">{{$t('message.CancelAssociation')}}</span>
      </div>
      <div v-else style="border-bottom: 1px solid #EAEEEF;padding-bottom: 20px;">
        <!--<input style="border: none;background-color: #FFFFFF;font-size: 18px;width: 70%;resize: none;outline: none;">-->
        <span style="font-size: 18px;" @click="bindWeChat">{{$t('message.BandWeChat')}}</span>
      </div>
      <div class="edit-information-footer-description">
        {{$t(companyNameTest.description)}}
      </div>
      <NbFormItem :formItem="companyNameTest"></NbFormItem>
    </div>

    <div class="popup-box" v-if="cancelWeChatShow">
      <CancelWeChatShow :closeCall="closeAllPopup"></CancelWeChatShow>
    </div>
  </div>
  </div>
</template>
<script>
  import FormItem from "../../common/model/_base/FormItem";
  import NbFormItem from "../../components/widget/NbFormItem";
  import Tank from '../../common/model/tank/Tank';
  import CancelWeChatShow from './CancelWeChatShow';
  import NbTank from "../../components/widget/NbTank";
  export default {
    data() {
      let tank = new Tank("image", false, 1024 * 1024);
      tank.render(this.$store.state.user.avatar);
      return {
        user: this.$store.state.user,
        tank: tank,
        cancelWeChatShow: false,
        cityTest: new FormItem(FormItem.prototype.Type.INPUT, "message.Locale",true, false, "city", "user.city", this.$store.state.user.city,{max: 100, placeholder: "地点"}),
        descriptionTest: new FormItem(FormItem.prototype.Type.INPUT, "message.AboutMe",true, false, "description", "user.description", this.$store.state.user.description,{max: 100, placeholder: "关于我"}),
        emailTest: new FormItem(FormItem.prototype.Type.INPUT, "message.Email",true, false, "email", "user.email", this.$store.state.user.email,{max: 100, placeholder: "邮箱", isEmail: true}),
        weChatTest: new FormItem(FormItem.prototype.Type.INPUT, "微信",true, false, "weChat", "user.weChat", this.$store.state.user.weChat,{max: 100, readonly: "readonly"}),
        companyNameTest: new FormItem(FormItem.prototype.Type.INPUT, "message.Company",true, false, "companyName", "user.companyName", this.$store.state.user.companyName,{max: 100, placeholder: "公司"})
      }
    },
    components: {
      NbFormItem,
      CancelWeChatShow,
      NbTank
    },
    watch: {
      "tank.errorMessage"(newView) {
        this.$store.state.plus.nativeUI.toast(this.$t('message.PictureUploadFailed') + newView + this.tank.errorMessage,{duration:"short"})
      }
    },
    methods: {
      fileChanged() {
        let that = this;
        this.codeId = '';
        let value = that.$refs['refFile'].value;
        if (!value) {
          return
        }
        this.tank.file = this.$refs['refFile'].files[0];
        this.$store.state.temps.headCutTank = this.tank;
        this.$router.openActivity('head_cut');
        this.$refs['refFile'].value = '';
      },
      edit() {
        let that = this;
        this.user.httpEditInformation(that.tank.uuid, this.cityTest.value,
          this.descriptionTest.value, this.emailTest.value, this.weChatTest.value, this.companyNameTest.value,that.tank.code, function (response) {
          that.$store.state.plus.nativeUI.toast(that.$t('message.EditSuccess'),{duration:"short"});
          that.$router.closeActivity();
        });
      },
      bindWeChat() {
        let that = this;
        if (!this.user.unionid) {
          that.user.httpBindWeChat(that.user.unionid, function () {
            that.$store.state.plus.nativeUI.toast(that.$t('message.BindWeChatSuccess'),{duration:"short"});
          })
        }
      },
      cancelAssociation() {
        this.cancelWeChatShow = true;
      },
      closeAllPopup() {
        this.cancelWeChatShow = false;
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .edit-information {
    height: 100vh;
    .edit-information-first-block {
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      margin: auto;
      display: flex;
      height: 66px;
      .edit-information-first-block-svg {
        flex: 1;
        .edit-information-first-block-svg-content{
          margin-top: 35px;
          height: 16px;
          width: 8px;
          display: inline-block;
          padding-left: 20px;
        }
      }
      .edit-information-first-block-name {
        flex: 5;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
        text-align: center;
      }
      .edit-information-first-block-edit {
        flex: 1;
        line-height: 92px;
        text-align: right;
        padding-right: 18px;
      }
    }
    .edit-information-content{
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      height: calc(100vh - 66px);
      margin-top: 66px;
      .edit-information-index-content {
        padding: 35px 0;
        /*background-color: red;*/
        background-color: #f5f5f5;
        .edit-information-header {
          /*padding: 20px 0 20px 0;*/
          .edit-information-header-img {
            position: relative;
            height: 180px;
            width: 180px;
            margin: 0 auto;
            img {
              border-radius: 50%;
              width: 180px;
              height: 180px;
            }
            .edit-information-header-input {
              position: absolute;
              width: 100%;
              height: 100%;
              margin: 0 auto;
              left: 0;
              top: 0;
              opacity: 0;
              background-color: black;
            }
          }
        }
      }
      .edit-information-footer {
        color: #666666;
        padding: 0 20px 50px;
        input {
          color: #323232;
        }
        .edit-information-footer-description {
          margin-bottom: -25px;
          margin-top: 25px;
          font-size: 15px;
        }
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .edit-information-first-block{
        padding: 18px 0 0 0 ;
      }
      .edit-information-content{
        margin-top:84px ;
      }
    }
  }
</style>
