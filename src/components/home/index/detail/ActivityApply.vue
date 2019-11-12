<template>
  <div class="activity-apply">
    <div class="meeting-room-title-bar">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.ActivityApply')}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>
    <div class="activity-apply-content">
      <div class="activity-apply-input" v-if="$store.state.route.query.appId">
        <div class="activity-apply-input-cell">
          <div class="activity-apply-input-cell-title">
            {{$t('message.ActivityContent')}}
          </div>
          <div class="activity-apply-input-cell-block">
            <input type="text" v-model="officialActivityApply.officialActivity.title">
          </div>
        </div>
      </div>
      <div class="activity-apply-input">
        <div class="activity-apply-input-cell">
          <div class="activity-apply-input-cell-title">
            {{$t('message.ActivityName')}}
          </div>
          <div class="activity-apply-input-cell-block" style="padding-left: 15px;">
            <input type="text" :placeholder="$t('message.InputName')" v-model="officialActivityApply.leader">
          </div>
        </div>
      </div>
      <div class="activity-apply-input">
        <div class="activity-apply-input-cell">
          <div class="activity-apply-input-cell-title">
            {{$t('message.Phone')}}
          </div>
          <div class="activity-apply-input-cell-block">
            <input type="tel" :placeholder="$t('message.InputPhone')" v-model="officialActivityApply.phone">
          </div>
        </div>
      </div>
      <div class="activity-apply-input">
        <div class="activity-apply-input-cell">
          <div class="activity-apply-input-cell-title">
            {{$t('message.ActivityNumber')}}
          </div>
          <div class="activity-apply-input-cell-block">
            <input type="number" :placeholder="$t('message.InputNumber')" v-model="officialActivityApply.personNum">
          </div>
        </div>
      </div>

      <div class="activity-apply-button"
           :class="officialActivityApply.leader && officialActivityApply.phone && officialActivityApply.personNum ?'active':''" @click="activityApply">
        {{$t('message.SubmitApply')}}
      </div>
    </div>

  </div>
</template>
<script>
  import Activity from "../../../../common/model/_base/Activity";
  import OfficialActivity from "../../../../common/model/index/OfficialActivity"
  import OfficialActivityApply from "../../../../common/model/index/OfficialActivityApply"

  export default {
    data () {
      return {
        officialActivity: new OfficialActivity(),
        officialActivityApply: new OfficialActivityApply()
      }
    },
    props: {
      activity:{
        type: Activity,
        required: false
      }
    },
    watch: {},
    computed: {},
    components: {

    },
    methods: {
      activityApply() {
        let that = this;
        if (this.$store.state.route.query.id) {
          if (this.officialActivityApply.leader && this.officialActivityApply.phone && this.officialActivityApply.personNum) {
            let form = {
              officialActivityId: this.$store.state.route.query.id,
              leader: this.officialActivityApply.leader,
              phone: this.officialActivityApply.phone,
              personNum: this.officialActivityApply.personNum
            };
            if (this.id) {
              form.id = this.id
            }
            this.officialActivityApply.httpSave(form, function () {
              that.$store.state.plus.nativeUI.toast(that.$t('message.ActivityApplySuccess'), {duration: "long"});
              that.$router.closeActivity();

            })
          } else {
            this.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'), {duration: "long"});
          }
        } else {
          if (this.officialActivityApply.leader && this.officialActivityApply.phone && this.officialActivityApply.personNum) {
            console.log(this.officialActivityApply.officialActivity.id + "ww")
            let form = {
              officialActivityId: this.officialActivityApply.officialActivity.id,
              leader: this.officialActivityApply.leader,
              phone: this.officialActivityApply.phone,
              personNum: this.officialActivityApply.personNum
            };
            if (this.$store.state.route.query.appId) {
              form.id = this.$store.state.route.query.appId
            }
            this.officialActivityApply.httpSave(form, function (response) {
              that.$store.state.plus.nativeUI.toast(that.$t('message.ActivityApplySuccess'), {duration: "long"});
              that.officialActivityApply.render(response.data.officialActivityApply);
              // that.$store.state.callback();
              that.$router.closeActivity();
            })

          } else {
            this.$store.state.plus.nativeUI.toast(that.$t('message.FillAllInformation'), {duration: "long"});
          }
        }

      }
    },
    mounted () {
      if (this.$store.state.route.query.appId) {
        this.officialActivityApply.id = this.$store.state.route.query.appId;
        this.officialActivityApply.editMode = true;
        this.officialActivityApply.httpDetail()
      }
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  .activity-apply {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    .meeting-room-title-bar {
      background-color: #f5f5f5;
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
          margin-top: 35px;
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
    .activity-apply-content{
    margin-top: 66px;
    .activity-apply-input {
      background-color: #ffffff;
      .activity-apply-input-cell {
        display: flex;
        padding: 22px 15px;
        border-bottom: 1px solid #dedede;
        .activity-apply-input-cell-title {
          font-size: 16px;
          color: #555555;
        }
        .activity-apply-input-cell-block {
          input {
            background: transparent;
            color: #323232;
            resize: none;
            outline: none;
            border: 0;
            width: 100%;
            font-size: 15px;
            padding-left: 37px;
            border-bottom: 1px solid #FFFFFF;
          }
        }
      }
    }

    .activity-apply-button {
      width: calc(100vw - 30px);
      background-color: #202020;
      border-radius: 5px;
      color: #ffffff;
      padding: 8px 0;
      text-align: center;
      line-height: 34px;
      margin: 40px auto 0;
      &.active {
        background-color: #ff9600;
      }
    }
  }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
      .meeting-room-title-bar{
        padding: 18px 0 0 0 ;
      }
      .activity-apply-content{
        margin-top:84px ;
      }
    }
  }
</style>
