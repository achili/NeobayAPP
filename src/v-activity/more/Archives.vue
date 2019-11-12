<template>
  <div class="archive">
    <div class="archive-first-block">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.Archives')}}</div>
      <div class="archive-first-block-edit"  @click="$router.openActivity('edit_information')">
        {{$t('message.Edit')}}
      </div>
    </div>

    <div class="archive-second-block" style="padding: 0 20px 30px;">
      <div class="archive-index-content">
        <div class="archive-header" v-if="user.isLogin">
          <div class="archive-header-img">
            <img :src="user.getAvatarUrl(80, 80)">
          </div>
          <div class="archive-header-word">
            <div v-if="user.nickname" class="archive-header-word-name">
              {{user.nickname}}
            </div>
            <div v-else class="archive-header-word-name">
              {{user.phone}}
            </div>
            <div class="archive-header-word-description">
              {{user.city}}
            </div>
          </div>
        </div>
      </div>

      <div class="archive-content">
        <div class="archive-content-title">
          {{$t('message.AboutMe')}}
        </div>
        <div class="archive-content-description">
          {{user.description}}
        </div>
      </div>
      <div class="archive-content">
        <div class="archive-content-title">
          {{$t('message.Email')}}
        </div>
        <div class="archive-content-description">
          {{user.email}}
        </div>
      </div>
      <div class="archive-content" @click="bindWeChat">
        <div class="archive-content-title">
          {{$t('message.WeChat')}}
        </div>
        <div class="archive-content-description">
          <span v-if="user.unionid">{{user.weChat}}</span>
          <span v-else>{{$t('message.BandWeChat')}}</span>
        </div>
      </div>
      <div class="archive-content">
        <div class="archive-content-title">
          {{$t('message.Company')}}
        </div>
        <div class="archive-content-description">
          {{user.companyName}}
        </div>
      </div>
      <div class="archive-content">
        <div class="archive-content-title">
          {{$t('message.UploadFace')}}
          <span v-if="user.uploadFaceState === 'OK'">({{$t('message.AuthenticationOk')}})</span>
          <span v-if="user.uploadFaceState === 'UNDER_WAY'">({{$t('message.Authentication')}})</span>
          <span v-if="user.uploadFaceState === 'FAIL'">({{$t('message.AuthenticationFailed')}})</span>
          <span v-if="user.uploadFaceState === 'NOT'">({{$t('message.NotUploaded')}})</span>
        </div>
        <div class="edit-information-header-img">
          <div v-if="tank.exist()">
            <div class="header-img" :style="'background:url(\''+ tank.getUrlBySize(220, 220) +'\')  no-repeat;'"></div>
            <input ref="refFiles" type="file" name="uploads" class="edit-information-header-input" @change.prevent.stop="uploadFaces"/>
          </div>
          <div v-else>
            <div class="header-img" :style="'background:url(\''+ user.getFaceUrl(220, 220) +'\')  no-repeat;'"></div>
            <input ref="refFiles" type="file" name="uploads" class="edit-information-header-input" @change.prevent.stop="uploadFaces"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Tank from '../../common/model/tank/Tank';
  export default {
    data() {
      return {
        user: this.$store.state.user,
        tank: new Tank("image", false, 1024 * 1024),
        plus: this.$store.state.plus
      }
    },
    watch: {
      "tank.errorMessage"(newView) {
        this.$store.state.plus.nativeUI.toast(this.$t('message.UploadFailed') + newView + this.tank.errorMessage,{duration:"short"})
      }
    },
    components: {

    },
    methods: {
      bindWeChat() {
        let that = this;
        if (!this.user.unionid) {
          that.user.httpBindWeChat(that.user.unionid, function () {
            that.$store.state.plus.nativeUI.toast(that.$t('message.BindWeChatSuccess'),{duration:"short"});
          })
        }
      },
      uploadFaces(){
        let that = this;
        this.codeId = '';
        let value = that.$refs['refFiles'].value;
        if (!value) {
          return
        }
        this.tank.file = this.$refs['refFiles'].files[0];
        this.$store.state.temps.headCutTank = this.tank;
        this.$store.state.temps.headCutCallBack = function () {
          that.user.httpUploadFace(that.$store.state.temps.headCutTank.code, function () {
            that.user.uploadFace = new Tank("image", false);
            that.user.uploadFace.render(that.tank);
            that.user.uploadFace.keepLocal(220, 220);
            that.tank.render(new Tank("image", false));
            that.tank.keepLocal(220, 220);
            that.user.httpUpdateFace();
          }, function () {
            that.plus.nativeUI.toast(that.$t('message.UploadFailed'),{duration:"short"});
          });
          that.$store.state.temps.headCutCallBack = undefined;
        };
        this.$router.openActivity('head_cut',"slide-left",{fixedNumber:'face'});
        this.$refs['refFiles'].value = '';
      }
    },
    mounted(){
      let that = this;
      if (this.user.unionid) {
        this.user.getWeChatName();
      }
      this.user.httpUpdateFace();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .archive {
    .archive-first-block {
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .apartment-ico{
        flex: 1;
        .apartment-top-ico{
          margin-top: 36px;
        }
      }
      .apartment-top-title{
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
      }
      .archive-first-block-edit {
        flex: 1;
        font-size: 15px;
        line-height: 94px;
        color: #ff7200;
      }
    }
    .archive-second-block {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      height: calc(100vh - 66px);
      margin-top: 66px;
      .archive-index-content {
        .archive-header {
          padding: 20px 0 20px 0;
          border-bottom: 1px solid #ECEEEF;
          height: 80px;
          text-align: left;
          .archive-header-img {
            float: left;
            padding-right: 32px;
            img {
              border-radius: 50%;
              width: 80px;
              height: 80px;
            }
          }
          .archive-header-word {
            width: auto;
            line-height: 30px;
            height: 20px;
            padding-top: 10px;
            .archive-header-word-name {
              font-size: 18px;
              font-weight: 600;
            }
            .archive-header-word-description {
              color: #888888;
            }
          }
        }

      }
      .archive-content {
        padding: 25px 0;
        border-bottom: 1px solid #ECEEEF;
        .edit-information-header-img {
          position: relative;
          height: 90px;
          width: 68px;
          .header-img {
            width: 68px;
            height: 90px;
            background-size: cover !important;
            background-position:center !important;
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
        .archive-content-title {
          font-size: 16px;
          color: #666666;
          padding-bottom: 5px;
        }
        .archive-content-description {
          font-size: 18px;
          color: #323232;

        }
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .archive-first-block{
        padding: 18px 0 0 0 ;
      }
      .archive-second-block{
        margin-top:84px ;
      }
    }
  }
</style>
