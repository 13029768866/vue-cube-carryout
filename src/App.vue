<template>
  <div id="app">
    <top-header :seller = seller></top-header>
  </div>
</template>

<script>
import TopHeader from 'components/header/TopHeader'
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
    HomeMask
  }
}
</script>
<style lang="stylus">

</style>
