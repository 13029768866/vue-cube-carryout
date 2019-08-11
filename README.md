# 插件形式加载cube

```
vue add cube-ui
```

# 通过devServer-before返回mock数据

# create-api模块

mask类型组件挂载到body

# 运用tabBar组件和slide组件完成切换

通过`tab-bar`的`v-model`,和`slide`的`initialIndex`和计算属性的get，set方法实现点击切换功能

# 二、组件

## icon组件

1. 参数

   ```js
   size: 控制图标大小(Number)
   type： 控制图片类型(Number)
   ```

2.  css

   ```css
   .icon-1
   	width 12px
       height 12px
       background-size: 12px 12px
       &.decrease
         bg-image('decrease_1')
       &.discount
         bg-image('discount_1')
       &.guarantee
         bg-image('guarantee_1')
       &.invoice
         bg-image('invoice_1')
       &.special
         bg-image('special_1')
   
    .icon-2
       width: 16px
       height: 16px
       background-size: 16px 16px
       &.decrease
         bg-image('decrease_2')
       &.discount
         bg-image('discount_2')
       &.guarantee
         bg-image('guarantee_2')
       &.invoice
         bg-image('invoice_2')
       &.special
         bg-image('special_2')
   ```

3. js

   ```js
   计算属性控制
   computed: {
       iconClass(){
       	const typeMap =  ['decrease', 'discount', 'special', 'invoice', 'guarantee']
           return `icon-${this.size} ${typeMap[this.type]}`
       }
   }
   ```

## star组件

1. 参数

   ```js
   size: 控制星星大小(Number)
   score: 得分（Number）超过4.5显示半颗
   ```

2. css

   ```css
   通过class控制星星显示样式
   &.star-48
         .star-item
           width: 20px
           height: 20px
           margin-right: 22px
           background-size: 20px 20px
           &:last-child
             margin-right: 0
   		&.on
   			bg-image('start48_on')
   		&.half
             bg-image('star48_half')
           &.off
             bg-image('star48_off')
   ```

3. js

   ```js
   	// 星星状态
       const LENGTH = 5
       const CLS_ON = 'on'
       const CLS_HALF = 'half'
       const CLS_OFF = 'off'
       
       computed:{
           starStatusArr(){
               let res = []
         		// 获取完整星星
               const integer = Math.floor(this.score)
            	// 判断是否有半颗星
               const isHalf = Number.integer(Math.floor(this.score * 2) / 2)
               // 返回要渲染的星星class
               for(let i=0;i<integer;i++){
                   res.push(CLS_ON)
               }
               if(!isHalf){
                   res.push(CLS_HALF)
               }
               while(res.length < LENGTH){
                   res.push(CLS_OFF)
               }
               return res
           }
       }
   ```

## mask组件

1. 使用组件：icon, star

2. css

   ```css
   过渡特效
   .home-mask-wrapper
   	// 毛玻璃效果
   	backdrop-filter: blur(10px)
   	// fade过渡动画
       &.fade-enter-active, &.fade-leave-active
         transition: all 0.75s
       &.fade-enter, &.fade-leave-active
         opacity: 0
         background: $color-background
   ```


## header组件

1. 使用组件: `icon` , `mask`

2. `背景滤镜`：filter blur(10px)

3. js

   ```js
   // 通过createAPI调用组件
   main中引入
   import Vue from 'vue'
   import { createAPI } from 'cube-ui'
   import HomeMask from 'components/mask/HomeMask'
   
   createAPI(Vue, HomeMask)
   
   中间中使用
   showMask(){
       this.HomeMaskComponent = this.HomeMaskComponent || this.$createAPI({
           props:{
               
           }
       })
    // 直接调用实例方法   
       this.HomeMaskComponent.maskShow()
   }
   ```

## tab组件

1. 使用组件： `cube-tab-bar`,`cube-slide`，动态组件`component`

2. 参数

   ```js
   tabs:[
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
   initiaIndex: 默认展示的页数
   ```

3. css

   ```css
   根据需求修改默认样式
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
   ```

4. js

   ```js
   1、tab-cube-bar点击切换功能
   通过cube-tab-bar的v-model修改label完成切换
   slide组件的initia-index属性完成切换
   通过index完成联动
   
   computed:{
       tabChange:{
           get(){
               return this.tabs[this.index].label
           },
           set(newVal){
               this.index = this.tabs.findIndex(val => {
                   return val.label === newVal
               })
          }
       }
   }
   
   2、cube-slide滑动，cube-tab跟随
   监听cube-slide的chane事件，可获取current修改index
   <cube-slide @change = 'onChange'></cube-slide>
   
   methods:{
       onChange(current){
           this.index = current
       }
   }
   2.1、优化，滚动时实现tab栏下划线跟随效果
   监听cube-slide的scroll事件，可获取滚动的实时位置pos(x,y)
   <cube-slide @scroll = 'onScroll'></cube-slide>
   methods:{
       onScroll(current){
            // 获取tabBar宽度
           const tabBarWidth = this.$refs.tabBar.$el.clientWidth
           // 获取slide可滚动宽度
           // console.log(this.$refs.slide)
           const slideWidth = this.$refs.slide.slide.scrollerWidth
           // 根据滚动位置，和上面两个参数计算tabBar位移
           const transform = Math.abs(pos.x) / slideWidth * tabBarWidth
           this.$refs.tabBar.setSliderTransform(transform)
       }
   }
   ```

5. 动态组件

   ```js
    <component
        :is = 'tab.component'
        :data = 'tab.data'
        ref = 'component'
   >
   </component>
   ```

## goods组件

1. 使用组件：`cube-scroll-nav` ,`cube-scroll-nav-panel`,`shop-cart`,`cart-control`

2. 参数： data(动态组件传参)

3. js

   ```js
   // 1、数据请求
   // 如果在生命周期中请求，页面加载时三个组件都已加载，会造成性能浪费
   // 可以在Tab组件切换时发送请求
   onChange(current){
           this.index = current
           // console.log(current);        
           // 创建组件实例
           const component =this.$refs.component[current]
           component.fetch && component.fetch()
       }
   // 第一次进入没有切换，需要初始化一下
   mounted(){
       this.onChange(this.index)
   }
   ```
