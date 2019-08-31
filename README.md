# 插件形式加载cube 

```
vue add cube-ui
```

# 通过devServer-before返回mock数据

# create-api模块12

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

### cart-control

1. 使用参数：`food`(遍历的时候传进来的食品信息)

2. css

   ```css
   <transition name='move'>
               <!-- 减少按钮 -->
               <div class="cart-decrement" v-show='this.food.count' @click='decrement'>
                   <span class="inner icon-remove_circle_outline"></span> 
               </div>
   </transition> 
   
   .cart-decrement
           padding 6px
           opacity 1    
           .inner   
               // 必须设置成行内块元素,否则滚动不生效
               display: inline-block
               line-height: 24px         
               font-size: $fontsize-large-xxx
               color: $c-blue
               transition: all 0.5s linear
               transform rotate(0)
           // move过渡动画        
           &.move-enter-active, &.move-leave-active
               transition all 0.5s linear
               // 外围盒子位移
           &.move-enter, &.move-leave-active
               opacity 0
               transform translate3d(24px,0,0)
               // 图标翻转
               .inner
                   transform rotate(180deg)               
   ```

3. js

   ```js
   1、设置边界，减少按钮在food.count < 1时候不显示
   ```

### shop-cart 

1. 通过goods组件获取选中选中食物列表完成与cart-control组件联动

   ```js
   computed:{
       selectedFoods(){
                   let res = []
                   this.goods.forEach((good)=>{
                       good.foods.forEach((food) => {
                           if(food.count){
                               res.push(food)
                           }
                       })
                   })
                   return res
               }
   }
   ```

2. 参数:`min-price`（起送费用），`delivery-price`（配送费用），`selectedFoods`（选中商品）

3. css

   ```css
   1、通过food.count控制购物车高亮
   :class="{'highlight': totalCount > 0}"
   .logo                              
       width: 100%
       height: 100%
       border-radius: 50%
       text-align: center
       background: $color-dark-grey
       &.highlight
       	background-color $c-blue              
           .icon-shopping_cart
               line-height: 44px
               font-size: $fontsize-large-xxx
               color: $color-light-grey
           &.highlight
               color $c-white
   2、根据总金额与最低起送费关系
   :class="payDescClass"
    .pay
   line-height 44px
       text-align center
       font-weight 700
       font-size $fontsize-small
       background-color $color-dark-grey
       padding 0 5px
       // 是否满足支付条件
       &.not-enough
      		background: $color-dark-grey
       &.enough
       background: $c-green
       	color: $c-white
   ```

4. js

   ```js
    // 总价格
               totalPrice() {
                   let total = 0
                   this.selectedFoods.forEach((food) => {
                       total += food.count * food.price
                   })
                   return total
               },
               // 总数量
               totalCount() {
                   let count = 0
                   this.selectedFoods.forEach((food) => {
                     count += food.count  
                   })
                   return count
               },
               // 距离可购买描述
               payDesc(){
                   if(this.totalPrice === 0){
                       return `￥${this.minPrice}元起送`
                   }else if(this.totalPrice < this.minPrice){
                       let diff = this.minPrice - this.totalPrice
                       return `还差${diff}元起送`
                   }else{
                       return `去结算`
                   }
               },
               // 可购买样式
               payDescClass(){
                   if(!this.totalPrice || this.totalPrice < this.minPrice){
                       return 'not-enough'
                   }else{
                       return 'enough'
                   }
               }
   ```

### 优化--小球动画

```
// 改变小球显示状态，并赋值元素位置
            drop(el){
               for(let i =0; i< this.balls.length;i++){
                   const ball = this.balls[i]
                  //  判断小球的状态
                   if(!ball.show){
                    ball.show = true
                    ball.el  = el
                    // 存入正在运动数组
                    this.dropingBalls.push(ball)
                    return
                }
               }
            },
            beforeDrop(el){
                // 获取正在运动的最后一个
                const ball = this.dropingBalls[this.dropingBalls.length - 1]
                // 通过getBoundingClientRect可以获取到距离视口的top，left，bottom，right
                const rect = ball.el.getBoundingClientRect()
                // 获取距离小球的垂直，水平位移,(右正下正)
                const x = rect.left - 32
                const y = -(window.innerHeight - rect.top - 22)
                // 给小球赋值,定位到点击元素
                // 外层执行y,内层x，合成抛物线
                el.style.display = ''
                el.style.transfrom = el.style.webkitTransform = `translate3d(0,${y}px,0)`
                const inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            },
            dropping(el,done){
                // 触发重绘,回到原来位置
                this._reflow = document.body.offsetHeight
                el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
                const inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
                // 通知触发afterDrop,done是可选
                el.addEventListener('transitionend', done)
            },
            afterDrop(el){
                // 动画完成，从正在执行动画前面取出，还原状态
                const ball = this.dropingBalls.shift()
                if (ball) {
                    ball.show = false
                    el.style.display = 'none'
                }
            }
```



# 三、功能12

