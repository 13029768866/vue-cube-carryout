<template>
  <div class="tab">
    <!-- 导航切换 -->
     <cube-tab-bar
        v-model="selectedLabel"
        :useTransition = false
        :showSlider = true
        :data="tabs"
        class="border-bottom-1px"
        ref = 'tabBar'
    >
     </cube-tab-bar>
     <!-- 内容区域 -->
     <div class="slide-wrapper">
         <cube-slide
            :loop = false
            :auto-play = false
            :show-dots = false
            :initial-index="index"
            ref = 'slide'
            @change = 'onChange'
            @scroll= "onScroll"
            :options = slideOptions
         >
            <cube-slide-item>
                <goods></goods>
            </cube-slide-item>
             <cube-slide-item>
                <ratings></ratings>
            </cube-slide-item>           
             <cube-slide-item>
                <seller></seller>
            </cube-slide-item>
         </cube-slide>
     </div>
  </div>
</template>

<script>
 import Goods from 'views/goods/Goods'
 import Ratings from 'views/ratings/Ratings'
 import Seller from 'views/seller/Seller'

export default {
  name: 'Tab',
  components:{
      Goods,
      Ratings,
      Seller
  },
  data () {
    return {
      index: 0,
      tabs: [{
        label: '商品'
      }, {
        label: '评论'
      }, {
        label: '商家'
      }],
      slideOptions: {
          listenScroll: true,
          probeType: 3,
         // 有横向滚动和竖向滚动配置   
          directionLockThreshold: 0
      }
    }
  },
  methods: {
    onChange(current){
        this.index = current
    },
    onScroll(pos){
        console.log(pos.x);
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        // 获取slide滚动宽度
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = Math.abs(pos.x) / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
    }
  },
  computed:{
      selectedLabel:{
          get(){
              return this.tabs[this.index].label
          },
          set(newVal){
              this.index = this.tabs.findIndex((value) => {
                  return value.label === newVal
              })
          }
      }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/_vars"

.tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    >>> .cube-tab_active
        color $c-red
    >>> .cube-tab-bar-slider
        background-color $c-red
    .slide-wrapper
      flex: 1
      overflow: hidden

</style>