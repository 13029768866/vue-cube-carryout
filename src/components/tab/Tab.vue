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
            <cube-slide-item
                v-for="(tab,idx) in tabs"
                :key = 'idx'
            >
                <component
                    :is = 'tab.component'
                    :data = 'tab.data'
                    ref = 'component'
                >
                </component>
            </cube-slide-item>          
         </cube-slide>
     </div>
  </div>
</template>

<script>


export default {
  name: 'Tab',
  props:{
      tabs:{
          type: Array,
          default(){
              return []
          }
      },
      initialIndex:{
          type: Number,
          default: 0
      }
  },
 
  data () {
    return {
      index: this.initialIndex,
      slideOptions: {
          listenScroll: true,
          probeType: 3,
         // 有横向滚动和竖向滚动配置   
          directionLockThreshold: 0
      }
    }
  },
  mounted(){
    // console.log(this.tabs);
    
    this.onChange(this.index)
  },
  methods: {
    // slide组件滑动跟随
    onChange(current){
        this.index = current
        // console.log(current);        
        // // 创建组件实例
        const component =this.$refs.component[current]
        component.fetch && component.fetch()
    },
    onScroll(pos){
        // console.log(pos.x);
        // 获取tabBar宽度
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        // console.log(tabBarWidth);        
        // 获取slide可滚动宽度
        const slideScrollWidth = this.$refs.slide.slide.scrollerWidth
        // console.log(slideScrollWidth);        
        // 根据滚动位置，和上面两个参数计算tabBar位移
        const position = Math.abs(pos.x) / slideScrollWidth * tabBarWidth
        // 通过setSliderTransform方法设置
        this.$refs.tabBar.setSliderTransform(position)
    }
  },
  computed:{
      selectedLabel:{
         get(){
             return this.tabs[this.index].label
         },
         set(newVal){
            this.index = this.tabs.findIndex((val) => {                                       
                 return val.label === newVal
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