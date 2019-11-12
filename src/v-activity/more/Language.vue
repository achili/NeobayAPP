<template>
  <div class="language-cell">
    <div class="about-header">
      <div class="apartment-ico"  @click.stop="$router.closeActivity()">
        <div :style =" 'background:url(\''+(require('../../assets/img/life/left.png'))+'\')  no-repeat; background-size: cover;'"
             style="width: 10px;height: 22px;margin-left: 15px;" class="apartment-top-ico"
        >
        </div>
      </div>
      <div class="apartment-top-title">{{$t('message.Language')}}</div>
      <div class="apartment-ico" style="width: 23px;height: 17px;"></div>
    </div>

    <div class="about-content">
      <div @click.stop="chooseZH" style="display: flex;justify-content: space-between;margin: 20px 20px 0;color: #555;border-bottom: 1px solid rgb(204, 204, 204);">
        <div style="padding-bottom: 15px;">简体中文</div>
        <div v-if="isZH" style="height: 17px;width: 17px;" :style="'background:url(\''+(require('../../assets/svg/more/check.svg'))+'\') no-repeat'"></div>
      </div>
      <div @click.stop="chooseEN" style="display: flex;justify-content: space-between;padding: 20px;margin-top: 10px;color: #555;">
        <div>English</div>
        <div v-if="!isZH" style="height: 17px;width: 17px;" :style="'background:url(\''+(require('../../assets/svg/more/check.svg'))+'\') no-repeat'"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {saveToLocalStorage} from "../../common/util/Utils";
  export default {
    data() {
      return {
        user: this.$store.state.user,
        language: 0,
        isZH: null,
        lang: [{
          label: this.$t('message.zh'),       //模板语法的一种
          value: 0
        }, {
          label: this.$t('message.en'),
          value: 1
        }]
      }
    },
    watch: {

    },
    components: {

    },
    methods: {
      chooseZH() {
        this.$i18n.locale = 'zh';
        this.isZH = true;
        Vue.set(this.lang, 0, {label: this.$t('message.zh'), value: 0});
        saveToLocalStorage('appLocale', 'zh')
      },
      chooseEN() {
        this.$i18n.locale = 'en';
        this.isZH = false;
        Vue.set(this.lang, 1, {label: this.$t('message.en'), value: 1})
        saveToLocalStorage('appLocale', 'en')
      }
    },
    mounted(){
      console.log(this.$i18n.locale)
      this.$i18n.locale === 'zh' ? this.language = 0 : this.language = 1
      this.$i18n.locale === 'zh' ? this.isZH = true : this.isZH = false
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .language-cell {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
    .about-header {
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin: auto;
      display: flex;
      height: 66px;
      border-bottom: 1px solid #ccc;
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

    .about-content {
      padding: 67px 0;
    }

  }
</style>
