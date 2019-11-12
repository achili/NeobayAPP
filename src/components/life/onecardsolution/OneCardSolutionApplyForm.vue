<template>
  <div class="one-card-solution-apply-form-content">


    <div class="one-card-solution-apply-form-top">
      <div class="one-card-solution-apply-form-ico"  @click.stop="goClose">
        <div :style=" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
          style="width: 10px;height: 21px;margin-left: 15px;" class="one-card-solution-apply-form-top-ico">
        </div>
      </div>
      <div class="one-card-solution-apply-form-top-title" v-if="!activity.query.itemId">{{$t(solutionApplyJson.title)}} {{$t('message.ApplySingle')}}</div>
      <div class="one-card-solution-apply-form-top-title" v-if="activity.query.itemId">{{$t(solutionApplyJson.name)}} {{$t('message.ApplySingle')}}</div>
      <div class="one-card-solution-apply-form-ico"  style="width: 23px;height: 17px;"></div>
    </div>


    <div class="one-card-solution-apply-form">
      <NbApplyForm :httpForm="httpCreate" callback="callback"
                   createClass="book-confirm" createText="message.SubmitApply"
                   saveClass="book-confirm" saveText="message.SubmitApply"
                   createIcon="" saveIcon=""
                   :successCallback="successCallback" :errorCallback="errorCallback"

      ></NbApplyForm>
    </div>
  </div>
</template>

<script>
  import MakerCard from "../../../common/model/life/OneCardSolutionApplyForm/MakerCard";
  import MakerCardMember from "../../../common/model/life/OneCardSolutionApplyForm/MakerCardMember";
  import NbApplyForm from "../../widget/NbApplyForm";
  import Project from "../../../common/model/project/Project";
  import Pager from "../../../common/model/_base/Pager";
  import Activity from "../../../common/model/_base/Activity";

  export default {
    name: "OneCardSolutionApplyForm",
    data() {
      let lists = new MakerCard().getHttpCreate();
      return {
        pager: new Pager(Project),
        makerCard: new MakerCard(),
        httpCreate: lists,
        user: this.$store.state.user,
        solutionApplyJson: {
          title: "message.Card",
          name:"message.Card"
        },
        one: lists.getFormItem("projectId"),
        opctityList: {
          "NEW": {
            id:"新办",
            val: "新办",
            name: "新办"
          },
          "REPAIR": {
            id:"补办",
            val: "补办",
            name: "补办"
          },
          "ADD": {
            id:"添加",
            val: "添加",
            name: "添加"
          }
        },
        authorizeListOne:{
            "SOUTH":{
              val: "南楼",
              name: "南楼"
            },
            "NORTH":{
              val: "北楼",
              name: "北楼"
            }
        },
        authorizeListTwo:{
            "SOUTH":{
              val: "1F东西",
              name: "1F东西"
            },
            "NORTH":{
              val: "2F东西",
              name: "2F东西"
            },
            "SOUTHANDNORTH":{
              val: "3F西",
              name: "3F西"
            }
        },
        entranceGuardOneTitle:"一号楼",
        entranceGuardTwoTitle:"二号楼"
      }
    },
    props:{
      activity:{
        type: Activity,
        required: false
      }
    },
    watch: {
      "one.value"(newVal) {
        this.assignment(newVal)
      }
    },
    components: {
      NbApplyForm
    },
    methods: {
      goClose() {
        this.$router.closeActivity()
      },
      fetchDetail() {
        this.makerPark.httpDetail();
      },
      fastPage() {
        let that = this;
        this.pager.setFilterValue('isApp','true');
        this.pager.httpFastPage(function () {
          that.$set(that.httpCreate.getFormItem("projectId").rule, "list", that.pager.projects);
        });
      },
      assignment(newVal) {
        this.pager.projects.forEach(data => {
          if (data.id === newVal) {
            this.httpCreate.getFormItem("projectName").value = data.name;
            this.httpCreate.getFormItem("companyName").value = data.registeredCompanyName;
          }
        })
      },
      successCallback() {
        this.$store.state.plus.nativeUI.toast(this.$t('message.ApplySuccess'), {duration: "long"});
        this.$router.closeActivity()
      },
      errorCallback(error) {
        this.$store.state.plus.nativeUI.toast(error.body.error.message, {duration: "long"});
      },
      setList(){
        let that = this;
        that.$set(that.httpCreate.getFormItem("type").rule,"list", that.opctityList);
        that.$set(that.httpCreate.getFormItem("entranceGuardOne").rule,"list", that.authorizeListOne);
        that.$set(that.httpCreate.getFormItem("entranceGuardTwo").rule,"list", that.authorizeListTwo);
        that.$set(that.httpCreate.getFormItem("entranceGuardOne").rule,"title", that.entranceGuardOneTitle);
        that.$set(that.httpCreate.getFormItem("entranceGuardTwo").rule,"title", that.entranceGuardTwoTitle);
      },
      setInfo(){
        this.httpCreate.getFormItem("leaderName").value = this.user.nickname;
        this.httpCreate.getFormItem("leaderPhone").value = this.user.phone;
        this.httpCreate.getFormItem("leaderEmail").value = this.user.email;
      }
    },
    mounted() {
      this.fastPage();
      this.setList();
      this.setInfo();
      let that = this;
      if(this.activity.query.itemId){
        this.makerCard.id = this.activity.query.itemId;
        this.httpCreate.editMode = true;
        this.makerCard.httpDetail(function (response) {
          that.httpCreate.backFill({"makerCard":that.makerCard,"project": {id: that.makerCard.project.id}})
        })
      }
      if (this.makerCard.makerCardMembersInfo.length === 0 && this.makerCard.makerCardMembersInfo) {
          this.makerCard.makerCardMembersInfo.push(new MakerCardMember());
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .one-card-solution-apply-form-content {
    height: 100vh;
    width: 100vw;
    .one-card-solution-apply-form-top {
      background-color: #f5f5f5;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      margin: auto;
      display: flex;
      height: 66px;
      .one-card-solution-apply-form-ico {
        flex: 1;
        .one-card-solution-apply-form-top-ico {
          margin-top: 36px;
        }
      }
      .one-card-solution-apply-form-top-title {
        flex: 5;
        text-align: center;
        line-height: 94px;
        font-size: 18px;
        color: #323232;

      }
    }
    .one-card-solution-apply-form {
      width: 100vw;
      background-color: #f5f5f5;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      height: calc(100vh - 66px);
      margin-top: 66px;
      .book-confirm {
        width: 90%;
        height: 49px;
        background-color: #202020;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        margin: 40px 5% 90px 5%;
        border: none;
        text-decoration: none;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .one-card-solution-apply-form-top{
        padding: 18px 0 0 0 ;
      }
      .one-card-solution-apply-form{
        margin-top:84px ;
      }
    }
  }
</style>
