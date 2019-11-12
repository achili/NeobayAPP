<template>
  <div class="service-create-content">
    <div class="service-details-top">
      <div class="service-details-ico" @click.stop="goClose">
        <div :style=" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
          style="width: 10px;height: 22px;margin-left: 15px;" class="service-details-i-ico">
        </div>
      </div>
      <div class="service-details-top-title">{{$t('message.CreateServices')}}</div>
      <div class="service-details-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="service-details-form">
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
  import Activity from "../../common/model/_base/Activity";
  import KeeperBusiness from "../../common/model/keeper/business/KeeperBusiness";
  import NbApplyForm from "../widget/NbApplyForm";
  import Pager from "../../common/model/_base/Pager";
  import Project from "../../common/model/project/Project";
  import KeeperBusinessOrganization from "../../common/model/keeper/business/KeeperBusinessOrganization";
  export default {
    name: "ServiceCreate",
    data(){
      let list = new KeeperBusiness().getHttpCreate();
      return{
        keeperBusiness:new KeeperBusiness(),
        pager: new Pager(Project),
        httpCreate: list,
        user: this.$store.state.user,
        one: list.getFormItem("projectId"),
        keeperBusinessOrganization:new KeeperBusinessOrganization(),
        isFirst:false
      }
    },
    components:{NbApplyForm},
    props:{
      activity:{
        type: Activity,
        required: false
      }
    },
    watch: {
      "one.value"(newVal) {
        if(!this.isFirst){
          this.assignment(newVal)
        }

      }
    },
    methods:{
      setInfo(){
        this.httpCreate.getFormItem("leaderName").value = this.user.nickname;
        this.httpCreate.getFormItem("leaderPhone").value = this.user.phone;
        this.httpCreate.getFormItem("leaderEmail").value = this.user.email;
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
            this.httpCreate.getFormItem("projectId").value = data.id;
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
      goClose(){
        this.$router.closeActivity()
      }
    },
    mounted(){
      this.fastPage();
      this.setInfo();
      let that = this;
      if(this.activity.query.obId){
        this.keeperBusiness.id = this.activity.query.obId;
        this.keeperBusiness.editMode = true;
        this.isFirst = true;
        this.keeperBusiness.httpDetail(function (response) {
          let data = response.data.keeperBusiness;
          that.httpCreate.backFill({
            "keeperBusiness":that.keeperBusiness,
            "project": {id: that.keeperBusiness.project.id},
            "organization":that.keeperBusiness.organization,
            "businessType":that.keeperBusiness.businessType
          })
        })
      }else if(this.activity.query.itemId){
        this.keeperBusinessOrganization.id = this.activity.query.itemId;
        this.keeperBusinessOrganization.editMode = true;
        this.keeperBusinessOrganization.httpDetail(function (response) {
          let data = response.data.keeperBusinessOrganization;
          that.httpCreate.getFormItem("organizationId").value = data.id;
          that.httpCreate.getFormItem("businessTypeId").value = data.businessType.id;
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .service-create-content{
    width: 100%;
    .service-details-top {
      background-color: #f5f5f5;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      .service-details-ico {
        flex: 1;
        .service-details-i-ico {
          margin-top: 36px;
        }
      }
      .service-details-top-title {
        flex: 5;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
        text-align: center;
      }
    }
    .service-details-form{
      margin-top: 66px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      height: calc(100vh - 66px);
      background-color: #f5f5f5;
      .book-confirm {
        width: 90%;
        height: 49px;
        background-color: #202020;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        margin: 40px 15px 50px 15px;
        border: none;
        text-decoration: none;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .service-details-top{
        padding: 18px 0 0 0 ;
      }
      .service-details-form{
        margin-top:84px ;
      }
    }
  }
</style>

