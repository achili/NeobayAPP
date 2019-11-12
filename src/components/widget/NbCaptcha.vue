<template>
	<span class="nb-captcha">
		<img class="cursor" :src="'data:image/png;base64,'+ captcha.blob.blobUrl" @click.stop.prevent="refresh"/>
		<span class="text-danger" v-if="captcha.errorMessage">{{captcha.errorMessage}}</span>
	</span>

</template>

<script>
  import Captcha from "../../common/model/user/validation/Captcha";
  export default {
    data () {
      return {}
    },
    components: {},
    watch: {
    },
    props: {
      captcha: {
        type: Captcha,
        required: true
      }
    },
    methods: {
      refresh(){
        let that = this;
        this.captcha.httpCaptcha();
      }
    },
    mounted(){
      this.refresh();
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .nb-captcha {
    .cursor {
      width: 100px;
    }
    .text-danger {
      color: #ff2347;
    }
  }
</style>


