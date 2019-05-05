<template >
  <div id="app">
      <router-view/>
  </div>
</template>

<style>

  #app{
    background-image: url('https://class.imooc.com//static/module/index/img/diff-bg.png')
  }
</style>
<script>
  import QIcon from "quasar-framework/src/components/icon/QIcon";
  export default {
      components: {QIcon},
      data(){
      return{

      }
    },
  }
</script>