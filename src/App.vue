<template>
  <div id="app">
    <top-header :seller = seller></top-header>
      <div class="tab-wrapper">
         <tab></tab>
      </div>
  </div>
</template>

<script>
import TopHeader from 'components/header/TopHeader'
import Tab from 'components/tab/Tab'

import { getSeller } from 'api'
export default {
  name: 'app',
  data(){
    return {
      seller: {}
    }
  },
  mounted(){
    getSeller().then(res => {
      console.log(res);      
      this.seller = res.data
    })
  },
  components:{
    TopHeader,
    Tab
  }
}
</script>
<style lang="stylus">
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
