<template>
  <div class="space-apply-form">
    <div class="meeting-room-title-bar">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.Space')}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="space-apply-form-item-content">


    <!--第一个-->
    <div style="padding-bottom: 10px;">
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell" style="padding: 6px 15px;">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 35px;padding-top: 10px;">
              {{$t('message.Project')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <el-select v-model="spaceApply.project.id" clearable class="nb-select" :placeholder="$t('message.PleaseSelect')">
              <el-option
                v-for="projectItem in pager.projects"
                :key="projectItem.index"
                :label="projectItem.name"
                :value="projectItem.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 15px;">
              {{$t('message.ProjectName')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.projectName" disabled>
          </div>
        </div>
      </div>
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 15px;">
              {{$t('message.CompanyName')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.companyName" disabled>
          </div>
        </div>
      </div>
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 15px;">
              {{$t('message.TeamSize')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.memberNum" disabled>
          </div>
        </div>
      </div>
    </div>

    <!--第二个-->
    <div style="padding-bottom: 10px;">
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory">
              {{$t('message.ChargeName')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.leaderName">
          </div>
        </div>
      </div>
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory">
              {{$t('message.ChargePhone')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.leaderPhone">
          </div>
        </div>
      </div>
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory">
              {{$t('message.ChargeEmail')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.leaderEmail">
          </div>
        </div>
      </div>
    </div>

    <!--第三个-->
    <div style="padding-bottom: 22px;">
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell" style="padding: 6px 15px;">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory" style="padding-top: 10px;">
              {{$t('message.SiteType')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <el-select v-model="spaceApply.type" class="nb-select" :placeholder="$t('message.PleaseSelect')">
              <el-option
                label="开放式工位"
                value="NURSERY">
              </el-option>
              <el-option
                label="1号楼独立空间"
                value="ACCELERATOR">
              </el-option>
              <el-option
                label="2号楼独立空间"
                value="INCUBATOR">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="space-apply-form-input" v-if="spaceApply.type != 'NURSERY'">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 15px;">
              {{$t('message.ApplicationArea')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.area">
          </div>
        </div>
      </div>

      <div class="space-apply-form-input" v-if="spaceApply.type === 'NURSERY'">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title compulsory" style="padding-right: 15px;">
              {{$t('message.StationNumber')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.seatNum">
          </div>
        </div>
      </div>

      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell">
          <nobr>
            <div class="space-apply-form-input-cell-title" style="padding-right: 28px;">
              {{$t('message.SiteUse')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <input type="text" v-model="spaceApply.spacePurpose">
          </div>
        </div>
      </div>
      <div class="space-apply-form-input">
        <div class="space-apply-form-input-cell" style="padding: 11px 15px;">
          <nobr>
            <div class="space-apply-form-input-cell-title" style="padding-top: 10px;">
              {{$t('message.ResidenceDate')}}
            </div>
          </nobr>

          <div class="space-apply-form-input-cell-block">
            <el-date-picker class="data-style"
                            format="yyyy年MM月dd日"
                            v-model="spaceApply.estimatedTime"
                            :editable="false">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>



    </div>
    <div style="background-color: #F5F5F5;width: 100%;height: 89px;position: fixed;bottom: 0;">
      <div class="space-apply-form-button">
        <div class="button-entry" @click.stop="submitApply" :class="spaceApply.project.id && spaceApply.projectName && spaceApply.companyName &&
          spaceApply.memberNum && spaceApply.leaderName && spaceApply.leaderPhone &&
          spaceApply.leaderEmail && spaceApply.type && spaceApply.area &&
          spaceApply.estimatedTime ?'active':''">
          {{$t('message.SubmitApply')}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Activity from "../../common/model/_base/Activity";
  import SpaceApply from "../../common/model/space/SpaceApply";
  import {simpleDateTime} from "../../common/filter/time";
  import Project from "../../common/model/project/Project";

  export default {
    data () {
      return {
        spaceApply: new SpaceApply(),
        pager: this.$store.state.projectPager,
        user: this.$store.state.user,
        newProject: new Project(),
        isFirst:false
      }
    },
    props: {
      activity:{
        type: Activity,
        required: false
      }
    },
    watch: {
      "spaceApply.project.id"(newVal, oldVal) {
        if(!this.isFirst){
          this.spaceApply.projectName = null;
          this.spaceApply.companyName = null;
          this.spaceApply.memberNum = null;
          this.pager.projects.forEach(datas => {
            if (datas.id === newVal) {
              this.spaceApply.projectName = datas.name;
              this.spaceApply.companyName = datas.registeredCompanyName;
              this.spaceApply.memberNum = datas.memberNum;
            }
          });
        }

      }
    },
    computed: {},
    components: {
    },
    methods: {
      goClose() {
        this.$router.closeActivity()
      },
      submitApply() {
        let that = this;
        if (this.spaceApply.project && this.spaceApply.projectName && this.spaceApply.companyName &&
          this.spaceApply.memberNum && this.spaceApply.leaderName && this.spaceApply.leaderPhone &&
          this.spaceApply.leaderEmail && this.spaceApply.type && this.spaceApply.estimatedTime) {
          this.name = this.spaceApply.projectName + "的空间申请";
          let form = {
            projectId: this.spaceApply.project.id,
            name: this.name,
            projectName: this.spaceApply.projectName,
            companyName: this.spaceApply.companyName,
            memberNum: this.spaceApply.memberNum,
            leaderName: this.spaceApply.leaderName,
            leaderPhone: this.spaceApply.leaderPhone,
            leaderEmail: this.spaceApply.leaderEmail,
            type: this.spaceApply.type,
            spacePurpose: this.spaceApply.spacePurpose,
            estimatedTime: simpleDateTime(this.spaceApply.estimatedTime)
          };
          if(this.spaceApply.type !== 'NURSERY'){
            form.area = this.spaceApply.area;
            form.seatNum = 0
          }else if(this.spaceApply.type === 'NURSERY'){
            form.seatNum = this.spaceApply.seatNum;
            form.area = 0
          }
          if (that.id) {
            form.id = that.id
          }else if(that.spaceApply.editMode){
            form.id = that.activity.query.obId
          }
          this.spaceApply.httpSave(form, function () {
            that.$store.state.plus.nativeUI.toast(that.spaceApply.editMode ? that.$t('message.EditSuccess') : that.$t('message.ApplySuccess'), {duration: "long"});
            that.$router.closeActivity();
          })
        } else {
          this.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'), {duration: "long"});
        }
      }
    },
    mounted () {
      let that = this;
      this.spaceApply.leaderName = this.user.nickname;
      this.spaceApply.leaderPhone = this.user.phone;
      this.spaceApply.leaderEmail = this.user.email;
      this.pager.setFilterValue('isApp','true');
      this.pager.httpFastPage();
      this.spaceApply.id = this.activity.query.obId;
      if(this.activity.query.obId){
        this.spaceApply.editMode = true;
        this.isFirst = true;
        this.spaceApply.httpDetail();
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
              width: 84%;
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
