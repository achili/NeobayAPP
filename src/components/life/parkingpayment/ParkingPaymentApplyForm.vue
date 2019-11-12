<template>
    <div class="parking-payment-apply-form-content">
      <div class="parking-payment-apply-form-top">
        <div class="parking-payment-apply-form-ico"   @click.stop="goClose">
          <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
               style="width: 10px;height: 21px;margin-left: 15px;" class="parking-payment-apply-form-top-ico">
          </div>
        </div>
        <div class="parking-payment-apply-form-top-title">{{$t(paymentApplyJson.title)}} {{$t('message.ApplySingle')}}</div>
        <div class="parking-payment-apply-form-ico"  style="width: 23px;height: 17px;"></div>
      </div>
      <div class="parking-payment-apply-form">
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
  import NbApplyForm from "../../widget/NbApplyForm";
  import Pager from "../../../common/model/_base/Pager";
  import Project from "../../../common/model/project/Project"
  import MakerSimpleApply from "../../../common/model/life/PublicSimpleApply/MakerSimpleApply";
    export default {
        name: "ParkingPaymentApplyForm",
      data(){
          let lists = new MakerSimpleApply().getHttpCreate();
          return{
            pager:new Pager(Project),
            makerSimpleApply: new MakerSimpleApply(),
            httpCreate:lists,
            user: this.$store.state.user,
            paymentApplyJson:{
              title:"message.Park"
            },
            one:lists.getFormItem("projectId")
          }
      },
      components:{
        NbApplyForm
      },
      watch:{
        "one.value"(newVal,oldVal){
          this.assignment(newVal)
        }
      },
      methods:{
        goClose(){
          this.$router.closeActivity()
        },
        fetchDetail(){
          this.makerSimpleApply.httpDetail();
        },
        fastPage(){
          let that = this;
          this.pager.setFilterValue('isApp','true');
          this.pager.httpFastPage(function () {
            // that.httpCreate.getFormItem("projectId").rule.list = that.pager.projects;
            that.$set(that.httpCreate.getFormItem("projectId").rule,"list",that.pager.projects)
          });
        },
        assignment(newVal){
          this.pager.projects.forEach(data => {
            if(data.id === newVal){
              this.httpCreate.getFormItem("companyName").value = data.registeredCompanyName;
              this.httpCreate.getFormItem("projectName").value = data.name;
            }
          })
        },
        successCallback(){
          this.$store.state.plus.nativeUI.toast(this.$t('message.ApplySuccess'), {duration: "long"});
          this.$router.closeActivity()
        },
        errorCallback(error) {
          this.$store.state.plus.nativeUI.toast(error.body.error.message, {duration: "long"});
        }
      },
      mounted(){
        let that = this;
        this.fastPage();
        this.httpCreate.getFormItem("leaderName").value = this.user.nickname;
        this.httpCreate.getFormItem("leaderPhone").value = this.user.phone;
        this.httpCreate.getFormItem("leaderEmail").value = this.user.email;
        this.httpCreate.getFormItem("type").value = "PARK";
        this.httpCreate.getFormItem("makerOrganizationId").value = "1000";
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .parking-payment-apply-form-content{
    width: 100vw;
    height: 100vh;
    .parking-payment-apply-form-top{
      background-color: #f5f5f5;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      margin: auto;
      display: flex;
      height: 66px;
      .parking-payment-apply-form-ico{
        flex: 1;
        .parking-payment-apply-form-top-ico{
          margin-top: 36px;
        }
      }
      .parking-payment-apply-form-top-title{
        text-align: center;
        flex: 5;
        line-height: 94px;
        font-size: 18px;
        color: #323232;

      }
    }
    .parking-payment-apply-form{
      margin-top:66px ;
      width: 100vw;
      background-color: #f5f5f5;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      height: calc(100vh - 66px);
      .book-confirm{
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
      .parking-payment-apply-form-top{
        padding: 18px 0 0 0 ;
      }
      .parking-payment-apply-form{
        margin-top:84px ;
      }
    }
  }
</style>
