<template>
  <div class="main-app-1">
    <Text1 v-if="activity.name==='text1'" :activity="activity"></Text1>
    <Text2 v-if="activity.name==='text2'" :activity="activity"></Text2>
    <Splash v-if="activity.name==='splash'" :activity="activity"></Splash>
    <PayTest v-if="activity.name==='pay_test'" :activity="activity"></PayTest>

    <ActivityApply v-if="activity.name==='activity_apply'" :activity="activity"></ActivityApply>
    <ActivityOrder v-if="activity.name==='activity_order'" :activity="activity"></ActivityOrder>
    <PayOrder v-if="activity.name==='pay_order'" :activity="activity"></PayOrder>
    <InviteOrder v-if="activity.name==='invite_order'" :activity="activity"></InviteOrder>
    <MeetingOrder v-if="activity.name==='meeting_order'" :activity="activity"></MeetingOrder>
    <ImgDetail v-if="activity.name==='img-detail'" :activity="activity"></ImgDetail> <!--??-->
    <SearchResult v-if="activity.name==='search_result'" :activity="activity"></SearchResult>
    <WcListDetails v-if="activity.name==='wc_list_details'" :activity="activity"></WcListDetails> <!------->
    <!--服务-->
    <ConferenceReservationForm v-if="activity.name==='conference_reservation'" :activity="activity"></ConferenceReservationForm>
    <SpaceApplyForm v-if="activity.name==='space_apply'" :activity="activity"></SpaceApplyForm>

    <InviteApplyForm v-if="activity.name==='invite_apply'" :activity="activity"></InviteApplyForm>
    <Login v-if="activity.name==='login'" :activity="activity"></Login><!------->
    <ReLogin v-if="activity.name==='re_login'" :activity="activity"></ReLogin><!------->
    <Register v-if="activity.name==='register'" :activity="activity"></Register><!------->
    <WeChatRegister v-if="activity.name==='weChat_register'" :activity="activity"></WeChatRegister><!--??--><!------->
    <Edit v-if="activity.name==='edit'" :activity="activity"></Edit><!------->
    <FindPassword v-if="activity.name==='find_password'" :activity="activity"></FindPassword><!------->
    <Archives v-if="activity.name==='archives'" :activity="activity"></Archives><!------->
    <EditInformation v-if="activity.name==='edit_information'" :activity="activity"></EditInformation><!------->
    <About v-if="activity.name==='about'" :activity="activity"></About><!------->
    <Language v-if="activity.name==='language'" :activity="activity"></Language><!------->
    <UserManual v-if="activity.name==='user_manual'" :activity="activity"></UserManual><!------->
    <ServiceCreate v-if="activity.name==='service_create'" :activity="activity"></ServiceCreate><!------->
    <MeetingRoomDetail v-if="activity.name==='meeting-room-detail'" :activity="activity"></MeetingRoomDetail><!------->
    <HeadCut v-if="activity.name==='head_cut'" :activity="activity"></HeadCut>

    <div @touchstart="touchstart" @touchend="touchend">
      <ArticleDetail v-if="activity.name==='article_detail'" :activity="activity"></ArticleDetail><!------->
      <ActivityDetail v-if="activity.name==='activity_detail'" :activity="activity"></ActivityDetail><!------->
      <PolicyDetail v-if="activity.name==='policy_detail'" :activity="activity"></PolicyDetail><!------->
      <StarDetail v-if="activity.name==='star_detail'" :activity="activity"></StarDetail><!------->
      <OneCardSolution v-if="activity.name==='one_card_solution'" :activity="activity"></OneCardSolution><!------->
      <PartyMember v-if="activity.name==='party_member'" :activity="activity"></PartyMember><!------->
      <PartyMemberOut v-if="activity.name==='party_member_out'" :activity="activity"></PartyMemberOut><!------->
      <ElectronicMaintenanceApply  v-if="activity.name==='electronic_maintenance_apply'" :activity="activity"></ElectronicMaintenanceApply><!------->
      <ElectronicMaintenance v-if="activity.name==='electronic_maintenance'" :activity="activity"></ElectronicMaintenance><!------->
      <Hotel v-if="activity.name==='hotel'" :activity="activity"></Hotel><!------->
      <Apartment v-if="activity.name==='apartment'" :activity="activity"></Apartment><!------->
      <FoodAndBeverage v-if="activity.name==='food_and_beverage'" :activity="activity"></FoodAndBeverage><!------->
      <FoodAndBeverageApply v-if="activity.name==='food_and_beverage_apply'" :activity="activity"></FoodAndBeverageApply><!------->
      <FoodAndBeverageApplyCanteen v-if="activity.name==='food_and_beverage_apply_canteen'" :activity="activity"></FoodAndBeverageApplyCanteen><!------->
      <ParkingPayment v-if="activity.name==='parking_payment'" :activity="activity"></ParkingPayment><!------->
      <ParkSupermarket v-if="activity.name==='park_supermarket'" :activity="activity"></ParkSupermarket><!------->
      <!--生活公共列表-->
      <PublicList v-if="activity.name==='public_list'" :activity="activity"></PublicList>
      <PartyMemberList v-if="activity.name==='party_member_list'" :activity="activity"></PartyMemberList>
    </div>
      <Home v-if="activity.name==='home'" :activity="activity"></Home><!------->

    <!--生活-->
    <OneCardSolutionApply v-if="activity.name==='one_card_solution_apply'" :activity="activity"></OneCardSolutionApply><!------->
    <ApartmentApply v-if="activity.name==='apartment_apply'" :activity="activity"></ApartmentApply><!------->
    <HotelApplyManhattan v-if="activity.name==='hotel_apply_manhattan'" :activity="activity"></HotelApplyManhattan><!------->
    <HotelApplyPullman v-if="activity.name==='hotel_apply_pullman'" :activity="activity"></HotelApplyPullman><!------->
    <HotelApplySheraton v-if="activity.name==='hotel_apply_sheraton'" :activity="activity"></HotelApplySheraton><!------->
    <ParkingPaymentApplyForm v-if="activity.name==='parking_payment_apply_form'" :activity="activity"></ParkingPaymentApplyForm><!------->
    <OneCardSolutionApplyForm v-if="activity.name==='one_card_solution_apply_form'" :activity="activity"></OneCardSolutionApplyForm><!------->
    <HotelApplyForm v-if="activity.name==='hotel_apply_form'" :activity="activity"></HotelApplyForm><!------->

    <!--生活公共表单-->
    <PublicApplyFrom v-if="activity.name==='public_apply_from'" :activity="activity"></PublicApplyFrom>
    <!--问题首页-->
    <CommonProblem  v-if="activity.name==='common_problem'" :activity="activity"></CommonProblem><!------->
    <!--常见问题-->
    <PostsProblem  v-if="activity.name==='posts_problem'" :activity="activity"></PostsProblem><!------->
    <!--软件许可及服务协议-->
    <SoftwareLicense v-if="activity.name==='software_license'" :activity="activity"></SoftwareLicense><!------->
    <!--我的项目-->
    <ProjectOrder  v-if="activity.name==='project_order'" :activity="activity"></ProjectOrder><!------->
    <!--我的空间申请-->
    <SpaceOrder v-if="activity.name==='space_order'" :activity="activity"></SpaceOrder>
    <!--隐私政策-->
    <Privacy v-if="activity.name==='privacy'" :activity="activity"></Privacy><!------->
    <!--注册协议-->
    <Protocol v-if="activity.name==='protocol'" :activity="activity"></Protocol>
    <!--关于neoBay-->
    <AboutUs v-if="activity.name==='about_us'" :activity="activity"></AboutUs>

    <transition :name="transition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import HelloWorld from "../v-activity/other/HelloWorld"
  import Text1 from "../v-activity/other/Text1"
  import Text2 from "../v-activity/other/Text2"
  import PayTest from "../v-activity/other/PayTest"

  import Splash from "../v-activity/other/Splash"
  import Home from "../v-activity/home/Home"
  import ArticleDetail from "../components/home/index/detail/ArticelDetail"
  import ActivityDetail from "../components/home/index/detail/ActivityDetail"
  import ActivityApply from "../components/home/index/detail/ActivityApply"
  import StarDetail from "../components/home/index/detail/StarDetail"
  import PolicyDetail from "../components/home/index/detail/PolicyDetail"
  import ImgDetail from "../v-activity/home/ImgDetail"
  import WcListDetails from "../components/home/index/WcListDetails"

  import MeetingRoomDetail from "../v-activity/service/MeetingRoomDetail"
  import ConferenceReservationForm from "../v-activity/service/ConferenceReservationForm"

  import Activity from "../common/model/_base/Activity";
  import Login from "../v-activity/login/Login"
  import ReLogin from "../v-activity/login/ReLogin"
  import Register from "../v-activity/login/Register"
  import WeChatRegister from "../v-activity/login/WeChatRegister"
  import Edit from "../v-activity/login/Edit"
  import FindPassword from "../v-activity/login/FindPassword"
  import Archives from "../v-activity/more/Archives"
  import EditInformation from "../v-activity/more/EditInformation"
  import ActivityOrder from "../v-activity/more/order/ActivityOrder"
  import PayOrder from "../v-activity/more/order/PayOrder"
  import InviteOrder from "../v-activity/more/invite/InviteOrder"
  import MeetingOrder from "../v-activity/more/order/MeetingOrder"
  import About from "../v-activity/more/About"
  import Language from "../v-activity/more/Language"
  import UserManual from "../v-activity/more/UserManual"
  import SoftwareLicense from "../v-activity/login/SoftwareLicense"
  import CommonProblem from "../v-activity/more/CommonProblem";
  import PostsProblem from "../v-activity/more/problem/PostsProblem";
  import SpaceApplyForm from "../components/service/SpaceApplyForm";
  import InviteApplyForm from "../components/service/InviteApplyForm";
  import SearchResult from "../components/home/index/SearchResult";
  import ServiceCreate from "../components/service/ServiceCreate";
  import PublicList from "../components/life/public/PublicList";
  import PublicApplyFrom from "../components/life/public/PublicApplyFrom";
  import HeadCut from "../v-activity/more/HeadCut";

  import OneCardSolution from "../components/life/onecardsolution/OneCardSolution";
  import PartyMember from "../components/life/member/PartyMember";
  import PartyMemberOut from "../components/life/member/PartyMemberOut";
  import PartyMemberList from "../components/life/member/PartyMemberList";
  import OneCardSolutionApply from "../components/life/onecardsolution/OneCardSolutionApply";
  import Apartment from "../components/life/apartment/Apartment"
  import ApartmentApply from "../components/life/apartment/ApartmentApply";
  import Hotel from "../components/life/hotel/Hotel";
  import ElectronicMaintenance from "../components/life/electronicmaintenance/ElectronicMaintenance";
  import FoodAndBeverage from "../components/life/foodandbeverage/FoodAndBeverage";
  import ParkingPayment from "../components/life/parkingpayment/ParkingPayment";
  import ParkSupermarket from "../components/life/parkingpayment/ParkSupermarket";
  import ElectronicMaintenanceApply from "../components/life/electronicmaintenance/ElectronicMaintenanceApply";
  import FoodAndBeverageApply from "../components/life/foodandbeverage/FoodAndBeverageApply";
  import HotelApplyManhattan from "../components/life/hotel/HotelApplyManhattan";
  import ParkingPaymentApplyForm from "../components/life/parkingpayment/ParkingPaymentApplyForm";
  import FoodAndBeverageApplyCanteen from "../components/life/foodandbeverage/FoodAndBeverageApplyCanteen";
  import HotelApplyPullman from "../components/life/hotel/HotelApplyPullman";
  import HotelApplySheraton from "../components/life/hotel/HotelApplySheraton";
  import OneCardSolutionApplyForm from "../components/life/onecardsolution/OneCardSolutionApplyForm";
  import HotelApplyForm from "../components/life/hotel/HotelApplyForm";
  import ProjectOrder from "../v-activity/more/project/ProjectOrder";
  import Privacy from "../v-activity/login/Privacy";
  import Protocol from "../v-activity/login/Protocol";
  import AboutUs from "../v-activity/login/AboutUs";
  import SpaceOrder from "../v-activity/more/space/SpaceOrder"
  export default {
    name: 'activity',
    data() {
      return {
        activity: new Activity(),
        transition: "",
        index: 0,
        //触发距离
        triggerDistance: 70,
        triggerSpeed: 0.6,
        startX: 0,
        startTime: 0
      }
    },
    components: {
      HelloWorld,
      Text1,
      Text2,
      PayTest,
      Splash,

      Home,
      ArticleDetail,
      ActivityDetail,
      ActivityApply,
      ActivityOrder,
      PayOrder,
      InviteOrder,
      MeetingOrder,
      StarDetail,
      PolicyDetail,
      SearchResult,
      WcListDetails,
      HeadCut,

      MeetingRoomDetail,
      SpaceApplyForm,
      InviteApplyForm,
      ConferenceReservationForm,

      Login,
      ReLogin,
      Register,
      WeChatRegister,
      Edit,
      FindPassword,
      Archives,
      EditInformation,
      About,
      Language,
      UserManual,
      SoftwareLicense,
      ImgDetail,
      CommonProblem,
      PostsProblem,
      OneCardSolution,
      PartyMember,
      PartyMemberOut,
      PartyMemberList,
      OneCardSolutionApply,
      Apartment,
      ApartmentApply,
      Hotel,
      ElectronicMaintenance,
      FoodAndBeverage,
      ParkingPayment,
      ParkSupermarket,
      ElectronicMaintenanceApply,
      FoodAndBeverageApply,
      HotelApplyManhattan,
      ParkingPaymentApplyForm,
      FoodAndBeverageApplyCanteen,
      HotelApplyPullman,
      HotelApplySheraton,
      OneCardSolutionApplyForm,
      HotelApplyForm,
      ProjectOrder,
      ServiceCreate,
      Privacy,
      Protocol,
      AboutUs,
      PublicList,
      PublicApplyFrom,
      SpaceOrder
    },
    methods: {
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startTime = e.timeStamp
      },
      touchend(e) {
        let distance = e.changedTouches[0].clientX - this.startX;
        let speed = Math.abs(distance) / (e.timeStamp - this.startTime);
        if(distance > this.triggerDistance) {
          if(speed > this.triggerSpeed) {
            this.$router.closeActivity()
          }
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.transition = this.$router.transition;
      let myNext = next;
      //就是那么骚！╮(╯▽╰)╭
      setTimeout(function () {
        myNext();
      },"5");
    },
    beforeMount(){
      //设置沉浸式状态栏的字体颜色为黑色
      this.$store.state.plus.navigator.setStatusBarStyle('dark');
    },
    mounted() {
      let a = Activity.initActivity(this.$route.query);
      if(a) {
        this.activity = a;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .main-app-1 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: white;
    transition: all .4s cubic-bezier(.55,0,.1,1);

    .slide-left-enter, .slide-right-leave-active {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
      -webkit-transform: translate(-100%, 0);
      transform: translate(-100%, 0);
    }

    .slide-top-enter, .slide-top-leave-active {
      -webkit-transform: translate(0 100%);
      transform: translate(0, 100%);
    }
    .slide-bottom-leave-active, .slide-bottom-enter {
      -webkit-transform: translate(0, -100%);
      transform: translate(0, -100%);
    }
  }
  @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
    .fit-ipx-view{
      padding: 18px 0 0 0 ;
    }
  }
</style>

