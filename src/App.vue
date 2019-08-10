<template>
  <div id="app">
    <top-header :seller = seller></top-header>
      <div class="tab-wrapper">
         <tab :tabs = tabs></tab>
      </div>
  </div>
</template>

<script>
import TopHeader from 'components/header/TopHeader'
import Tab from 'components/tab/Tab'
import Goods from 'views/goods/Goods'
import Ratings from 'views/ratings/Ratings'
import Seller from 'views/seller/Seller'

import { getSeller } from 'api'
export default {
  name: 'app',
  components:{
    TopHeader,
    Tab
  },
  data(){
    return {
      seller: {}
    }
  },
  mounted(){
    getSeller().then(res => {     
      this.seller = res.data
      console.log(this.seller);
      
    })
  },
  computed: {
      tabs() {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              seller: this.seller
            }
          },
          {
            label: '评论',
            component: Ratings,
            data: {
              seller: this.seller
            }
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller
            }
          }
        ]
      }
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
