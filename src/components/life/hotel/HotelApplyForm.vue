<template>
  <div class="hotel-apply-form-content">
    <div class="hotel-apply-form-top">
      <div class="hotel-apply-form-ico" @click.stop="goClose">
        <div :style =" 'background:url(\''+(require('../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 21px;margin-left: 15px;" class="hotel-apply-form-top-ico">
        </div>
      </div>
      <div class="hotel-apply-form-top-title" v-if="!activity.query.itemId">{{hotelApplyJson.title}}</div>
      <div class="hotel-apply-form-top-title" v-if="activity.query.itemId">{{hotelApplyJson.name}}</div>
      <div class="hotel-apply-form-ico"  style="width: 23px;height: 17px;"></div>
    </div>
    <div class="hotel-apply-form">
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
  import MakerHotel from "../../../common/model/life/HotelApplyForm/MakerHotel";
  import Pager from "../../../common/model/_base/Pager";
  import Project from "../../../common/model/project/Project";
  import Activity from "../../../common/model/_base/Activity";
  import FormItem from "../../../common/model/_base/FormItem";
  export default {
    name: "HotelApplyForm",
    data(){
      let lists = new MakerHotel().getHttpCreate();
      return{
        pager:new Pager(Project),
        makerHotel:new MakerHotel(),
        httpCreate:lists,
        user: this.$store.state.user,
        hotelApplyJson:{
          title:"酒店申请",
          name:"酒店订单修改"
        },
        one:lists.getFormItem("projectId"),
        addressT : {
          "ADDRESST":{
            val:"ADDRESS",
            name:"申请单位是否属于零号湾在孵企业",
            now:false
          }
        },
        missionT :{
          "MISSIONT":{
            val:"MISSION",
            name:"申请人是否有出差任务",
            now:false
          }
        } ,
        regulations : {
          "REGULATIONS":{
            val:"REGULATIONS",
            name:"本人同意以上人才公寓管理条例，并将遵守人才公寓的规定，如有违规的行为，本人愿意承担相关责任。",
            now:true
          }
        }
      }
    },
    watch:{
      "one.value"(newVal){
        this.assignment(newVal);
      }
    },
    props:{
      activity:{
        type: Activity,
        required: false
      }
    },
    components:{
      NbApplyForm
    },
    methods:{
      goClose(){
        this.$router.closeActivity()
      },
      fastPage(){
        let that = this;
        this.pager.setFilterValue('isApp','true');
        this.pager.httpFastPage(function () {
          that.$set(that.httpCreate.getFormItem("projectId").rule,"list",that.pager.projects);
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
        this.$router.closeActivity();
      },
      errorCallback(){},
      //管理条例
      setList(){
        let that = this;
        that.$set(that.httpCreate.getFormItem("isIncubatingEnterprise").rule,"list",that.addressT);
        that.$set(that.httpCreate.getFormItem("isBusinessTravel").rule,"list",that.missionT);
        that.$set(that.httpCreate.getFormItem("isAgree").rule,"list",that.regulations);
      },
      setInfo(){
        this.httpCreate.getFormItem("leaderName").value = this.user.nickname;
        this.httpCreate.getFormItem("leaderPhone").value = this.user.phone;
        this.httpCreate.getFormItem("leaderEmail").value = this.user.email;
      }
    },
    mounted(){
      // this.setList();
      this.fastPage();
      this.setInfo();
      let that = this;
      if(this.activity.query.itemId){
        this.makerHotel.id = this.activity.query.itemId;
        this.httpCreate.editMode = true;
        this.makerHotel.httpDetail(function (response) {
          that.httpCreate.backFill({"makerHotel":that.makerHotel,"project": {id: that.makerHotel.project.id}})
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .hotel-apply-form-content{
    height: 100vh;
    width: 100vw;

    .hotel-apply-form-top{
      background-color: #f5f5f5;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      margin: auto;
      display: flex;
      height: 66px;
      .hotel-apply-form-ico{
        flex: 1;
        .hotel-apply-form-top-ico{
          margin-top: 36px;
        }
      }
      .hotel-apply-form-top-title{
        flex: 5;
        line-height: 94px;
        font-size: 18px;
        color: #323232;
        text-align: center;

      }
    }
    .hotel-apply-form{
      margin-top:66px ;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      width: 100vw;
      height: calc(100vh - 66px);
      background-color: #f5f5f5;
      .book-confirm{
        width: 90%;
        height: 49px;
        background-color: #202020;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        margin: 40px 5% 50px 5%;
        border: none;
        text-decoration: none;
      }
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .hotel-apply-form-top{
        padding: 18px 0 0 0 ;
      }
      .hotel-apply-form{
        margin-top:84px ;
      }
    }
  }
</style>
