<template>
    <div class="shopcart">        
        <div class="content" @click="toggleList">         
            <div class="content-left">
                <!-- 图标 -->
                <div class="logo-wrapper">
                    <div 
                        class="logo"
                        :class="{'highlight': totalCount > 0}"
                    >
                        <i 
                            class="icon-shopping_cart"
                            :class="{'highlight': totalCount > 0}"
                        ></i>
                        <!-- 漂浮总数量 -->
                        <div class="num" v-show="totalCount > 0">
                            <bubble :num ='totalCount'></bubble>
                        </div>
                    </div>
                </div>
                <!-- 价格 -->
                <div class="price">￥{{totalPrice}}</div>
                <!-- 配送费 -->
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div 
                    class="pay"
                    :class="payDescClass"
                >{{payDesc}}</div>
            </div>                        
        </div>
        <!-- 小球动画容器 -->
        <div class="ball-wrapper">
            <div v-for="(ball,index) in balls" :key='index'>
                <transition
                    @before-enter = 'beforeDrop'
                    @enter = 'dropping'
                    @after-enter = 'afterDrop'
                >
                    <div class="ball" v-show='ball.show'>
                        <div class="inner inner-hook">
                        </div>
                    </div>
                </transition>
            </div>        
        </div>
    </div>
</template>

<script>
    import Bubble from 'components/bubble/Bubble'
    // 创建带有显示状态的小球
    const BALL_LEN = 10
    function createBalls(){
        let balls = []
        for(let i = 0;i<BALL_LEN; i++){
            balls.push({show: false})
        }
        // console.log(balls)
        return balls
    }

    export default {
        name: 'ShopCart',
        props:{   
            //  选中的食物   
            selectedFoods:{
                type: Array,
                default(){
                    return []
                }
            },
            // 配送费用
            deliveryPrice:{
                type: Number,
                default: 0
            },
            // 最低起送
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                // 所有小球
                balls: createBalls()
            }
        },
        components:{
            Bubble
        },
        created(){
            // 运动状态中小球数组
            this.dropingBalls = []
            // 购物车清单列表标识
            this.cartListFlag = true
        },
        methods:{
            // 根据小球状态分类,存储位置信息
            drop(el){
                for(let i = 0; i < this.balls.length; i++){
                    const ball = this.balls[i]
                    if(!ball.show){
                        ball.show = true
                        ball.el = el
                        this.dropingBalls.push(ball)
                        return
                    }
                }
            },
            beforeDrop(el){
                // 获取运动状态的最后一个,通过getBoundingClientRect获取触发元素位于视口中的位置
                const ball = this.dropingBalls[this.dropingBalls.length - 1]
                const rect = ball.el.getBoundingClientRect()
                // 获取小球距离触发元素位置
                const x  = rect.left - 32
                const y = -(window.innerHeight - rect.top - 22)
                // 通过translate3d使小球位置到触发元素位置
                el.style.display = ''
                el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
                const inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            },
            dropping(el,done){
                // 必须触发重绘,否则动画不会执行
                this._reflow = document.body.offsetHeight
                // 执行动画回到原来位置
                el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
                const inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
                // 监听transitionend,执行回调
                el.addEventListener('transitionend',done)
            },
            afterDrop(el){
                const ball = this.dropingBalls.shift()
                if(ball.show){
                    ball.show = false
                    el.style.display ='none'
                }
            },
            toggleList(){
                if(this.cartListFlag){
                    if(!this.totalCount){
                        return
                    }
                    this.cartListFlag = false
                    this._showShopCartList()
                }else{
                    this.cartListFlag = true
                    this._hideShopCartList()
                }
            },
            _showShopCartList(){
               this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
                    $props:{
                         selectedFoods: 'selectedFoods'
                    },
                    $events: {
                        hide: () => {
                            this.cartListFlag = true
                        }
                    }
                })
                this.shopCartListComp.show()
            },
            _hideShopCartList(){
                this.shopCartListComp.hide()
            }  
        },
        computed: {
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

        }
    }
</script>

<style lang="stylus" scoped>
 @import "~assets/stylus/_mixin"
 @import "~assets/stylus/_vars"

.shopcart
    height 44px
    .content
        display flex
        background-color $bgc-header-xl
        font-size 0
        color $color-light-grey
        .content-left
            flex 1
            // 购物车图标
            .logo-wrapper
                position relative
                display: inline-block
                vertical-align: top
                position: relative
                top: -10px
                margin:  0 12px 
                padding: 6px
                width: 56px
                height: 56px
                box-sizing: border-box
                border-radius: 50%
                background: $bgc-header-xl
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
                // 漂浮总数量
                .num
                    position: absolute
                    top: 0
                    right: 0
            // 价格
            .price
                display: inline-block
                vertical-align: top
                margin-top: 12px
                line-height: 24px
                padding-right: 12px
                border-right: 1px solid rgba(255, 255, 255, 0.1)
                font-weight: 700
                font-size: $fontsize-large
            // 配送费
            .desc
                display: inline-block
                vertical-align: top
                margin-top: 12px
                line-height: 24px
                font-size: $fontsize-small-s
                margin-left 12px
        .content-right
            flex 0 0 105px
            min-width 105px
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
    .ball-wrapper
        .ball
            position fixed
            left 32px
            bottom 22px
            z-index 200
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            .inner
                width: 16px
                height: 16px
                border-radius: 50%
                background: $c-blue
                transition: all 0.4s linear
</style>