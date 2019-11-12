<template>
  <div class="nb-date-picker">
    <el-date-picker class="data-style"
                    format="M月dd日"
                    v-model="data"
                    :editable="false">
    </el-date-picker>
  </div>
</template>

<script>

  export default {
    data(){
      return {

      }
    },
    props:{
      val:{
        type: Date
      },
      value: {
        type: Date
      }
    },
    computed:{

    },
    watch:{
      "people"() {

      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-date-picker{

  }
</style>
