<template>
  <div class="space-apply-form">
    <div class="meeting-room-title-bar">
      <div class="apartment-ico"  @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.Invite')}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="space-apply-form-item-content">


      <!--第一个-->
      <div style="padding-bottom: 10px;">
        <div class="space-apply-form-input">
          <div class="space-apply-form-input-cell">
            <nobr>
              <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 15px;">
                {{$t('message.InviteUserName')}}
              </div>
            </nobr>

            <div class="space-apply-form-input-cell-block">
              <input type="text" v-model="inviteVisitor.inviteName" disabled>
            </div>
          </div>
        </div>
        <div class="space-apply-form-input">
          <div class="space-apply-form-input-cell">
            <nobr>
              <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 30px;">
                {{$t('message.InviteFormName')}}
              </div>
            </nobr>

            <div class="space-apply-form-input-cell-block">
              <input type="text" v-model="inviteVisitor.name">
            </div>
          </div>
        </div>
        <div class="space-apply-form-input">
          <div class="space-apply-form-input-cell" style="padding: 11px 15px;">
            <nobr>
              <div class="space-apply-form-input-cell-title compulsory" style="padding-top: 10px;">
                {{$t('message.VisitDate')}}
              </div>
            </nobr>
            <div class="space-apply-form-input-cell-block" style="margin-left: 10px;">
              <el-date-picker class="data-style"
                              format="yyyy年MM月dd日"
                              v-model="inviteVisitor.invitingTime"
                              :editable="false">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="space-apply-form-input">
          <div class="space-apply-form-input-cell" style="padding: 11px 15px;">
            <nobr>
              <div class="space-apply-form-input-cell-title compulsory" style="padding-top: 10px;">
                {{$t('message.AccessTime')}}
              </div>
            </nobr>
            <div style="margin-left: 10px;">
              <el-time-picker
                is-range
                v-model="dateValue"
                format="HH:mm"
                style="width: 100%;border: none;"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </div>
          </div>
        </div>
        <div class="space-apply-form-input">
          <div class="space-apply-form-input-cell">
            <nobr>
              <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 30px;">
                {{$t('message.VisitorNumber')}}
              </div>
            </nobr>

            <div class="space-apply-form-input-cell-block">
              <input type="number" v-model="inviteVisitor.visitorsNum">
            </div>
          </div>
        </div>

        <div class="space-apply-form-input">
          <div class="space-apply-form-input-cell">
            <nobr>
              <div class="space-apply-form-input-cell-title" style="padding-right: 30px;">
                {{$t('message.Remark')}}
              </div>
            </nobr>

            <div class="space-apply-form-input-cell-block">
              <input type="text" v-model="inviteVisitor.remark">
            </div>
          </div>
        </div>

        <div style="padding: 20px 15px;">
          <div style="color: red;">{{$t('message.FriendlyReminder')}}:</div>
          <div style="margin-top: 10px;">{{$t('message.InviteCancel')}}</div>
        </div>
      </div>
    </div>
    <div style="background-color: #F5F5F5;width: 100%;height: 89px;position: fixed;bottom: 0;">
      <div class="space-apply-form-button">
        <div class="button-entry" @click.stop="submitApply" :class="inviteVisitor.inviteName && inviteVisitor.name &&
          inviteVisitor.invitingTime && inviteVisitor.accessTime && inviteVisitor.visitorsNum ?'active':''">
          {{$t('message.SubmitApply')}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Activity from "../../common/model/_base/Activity";
  import InviteVisitor from "../../common/model/inviteVisitor/InviteVisitor"
  import {simpleDateTime} from "../../common/filter/time";

  export default {
    data () {
      return {
        inviteVisitor: new InviteVisitor(),
        user: this.$store.state.user,
        dateValue: []
      }
    },
    props: {
      activity:{
        type: Activity,
        required: false
      }
    },
    watch: {
      "dateValue"(newVal, oldVal) {
        this.inviteVisitor.invitingTime = newVal[0];
        this.inviteVisitor.accessTime = newVal[1];
      }
    },
    computed: {},
    components: {
    },
    methods: {
      openShare() {
        let title = this.inviteVisitor.name + "的邀请访客";
        this.inviteVisitor.shareSystem(title,this.inviteVisitor.id);
        this.goClose();
      },
      goClose() {
        this.$store.state.temps.inviteClose && this.$store.state.temps.inviteClose();
        this.$router.closeActivity()
      },
      submitApply() {
        let that = this;
        if (this.inviteVisitor.inviteName && this.inviteVisitor.name && this.inviteVisitor.invitingTime &&
          this.inviteVisitor.accessTime && this.inviteVisitor.visitorsNum) {
          let form = {
            inviteName: this.inviteVisitor.inviteName,
            name: this.inviteVisitor.name,
            visitorsNum: this.inviteVisitor.visitorsNum,
            invitingTime: simpleDateTime(this.inviteVisitor.invitingTime),
            accessTime: simpleDateTime(this.inviteVisitor.accessTime),
            remark: this.inviteVisitor.remark
          };

          if (that.id) {
            form.id = that.id
          }else if(that.inviteVisitor.editMode){
            form.id = that.activity.query.inviteId
          }
          this.inviteVisitor.httpSave(form, function (response) {
            that.$store.state.plus.nativeUI.toast(that.inviteVisitor.editMode ? that.$t('message.EditSuccess') : that.$t('message.ApplySuccess'), {duration: "long"});
            that.inviteVisitor.render(response.data.inviteVisitor);
            // that.$router.closeActivity();
            that.openShare();
          })
        } else {
          this.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'), {duration: "long"});
        }
      }
    },
    mounted () {
      let that = this;
      this.inviteVisitor.inviteName = this.user.nickname;
      this.inviteVisitor.name = this.user.nickname;
      this.inviteVisitor.id = this.activity.query.inviteId;
      if(this.activity.query.inviteId){
        this.inviteVisitor.editMode = true;
        this.inviteVisitor.httpDetail(function () {
          that.dateValue.push(that.inviteVisitor.invitingTime);
          that.dateValue.push(that.inviteVisitor.accessTime);
        });
      } else {
        this.dateValue.push(new Date());
        this.dateValue.push(new Date());
      }
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  .space-apply-form {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    .meeting-room-title-bar {
      background-color: #F5F5F5;
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
    }

    .space-apply-form-item-content{
      width: 100vw;
      margin-top: 66px;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling:touch;
      height: calc(100vh - 66px - 89px);
      .space-apply-form-input {
        background-color: #ffffff;
        .space-apply-form-input-cell {
          display: flex;
          padding: 20px 15px;
          border-bottom: 1px solid #dedede;
          .space-apply-form-input-cell-title {
            font-size: 16px;
            color: #555555;
          }
          .space-apply-form-input-cell-block {
            input {
              background: transparent;
              color: #323232;
              resize: none;
              outline: none;
              border: 0;
              width: 90%;
              font-size: 15px;
              padding-left: 37px;
              border-bottom: 1px solid #FFFFFF;
            }

            .nb-select{
              input {
                font-size: 15px;
                color: #323232;
                letter-spacing: 1px;
              }
              margin-left: 15px;
              border: none;
              resize:none;
              outline:none;
              font-size: 15px;
              .el-input__inner{
                border:none;
              }
            }
          }
        }
      }
      .compulsory {
        &:after {
          content: "*";
          color: red;
        }
      }
    }

    .space-apply-form-button {
      width: calc(100% - 30px);
      background-color: #202020;
      color: white;
      height: 49px;
      margin:20px auto 0 auto;
      border-radius: 5px;
      font-size: 16px;
      .button-entry {
        line-height: 49px;
        text-align: center;
        &.active {
          background-color: #ff9600;
        }
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .meeting-room-title-bar{
        padding: 18px 0 0 0 ;
      }
      .space-apply-form-item-content{
        margin-top:84px ;
      }
    }

  }
</style>
