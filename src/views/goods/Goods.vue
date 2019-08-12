<template>
    <div class="goods">
        <div class="scroll-nav-wrapper">
            <!-- 分类侧边栏 -->
            <cube-scroll-nav
                :side=true
                :data=" goods"
                :options="scrollOptions"
                v-if="goods.length"
            >
                <!-- 对应展示内容区域 -->
                <cube-scroll-nav-panel
                    v-for='good in goods'
                    :key = 'good.name'
                    :label = 'good.name'
                    :title = 'good.name'
                >
                    <!-- 默认插槽 -->
                    <ul>
                        <li
                            v-for="food in good.foods"
                            :key = 'food.name'
                            class="food-item"
                        >
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                              <div class="cart-control-wrapper">
                                <cart-control 
                                    :food="food"
                                    @increment = 'onIncrement'
                                ></cart-control>
                            </div>
                        </li>
                    </ul>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
        <!-- 购物车 -->
        <div class="shop-cart-wrapper">
            <shop-cart
                    ref = 'shopCart' 
                    :selectedFoods = 'selectedFoods'
                    :delivery-price = 'seller.deliveryPrice'
                    :min-price = 'seller.minPrice'
            ></shop-cart>
        </div>
    </div>
</template>

<script>
    import { getGoods } from 'api'
    import ShopCart from 'components/shop-cart/ShopCart'
    import CartControl from 'components/cart-control/CartControl'
    export default {
        name: 'Goods',
        components: {
            ShopCart,
            CartControl
        },
        props:{
            data:{
                type: Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return {
                goods: [],
                selecFood: [],
                // 根据better-scroll配置
                scrollOptions: {
                    // 防止点击事件触发两次
                    click: false,
                    directionLockThreshold: 0
                }
            }
        },
        methods:{
            // 获取goods相关数据
            fetch(){
                getGoods().then((goods)=> {                    
                    this.goods = goods.data
                    console.log(this.goods)
                })
            },
            // 添加食物执行的方法
            onIncrement(target){
                console.log(target)
            }
        },
        computed: {
            // 接收动态组件穿的过来的参数
            seller(){
                // console.log(this.data)
                return this.data.seller
            },
            //  通过food的count属性判断是否被选中
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
    }
</script>

<style lang="stylus" scoped>
 @import "~assets/stylus/_mixin"
 @import "~assets/stylus/_vars"

.goods
    position relative
    text-align left 
    height 100%
    .scroll-nav-wrapper
        position absolute
        width 100%
        top 0
        left 0
        bottom 48px
        // 侧边栏样式修改
        >>> .cube-scroll-nav-bar
            width: 80px
            white-space: normal
            overflow: hidden
        >>> .cube-scroll-nav-bar-item
            padding: 0 10px
            display: flex
            justify-content center
            align-items: center
            height: 56px
            line-height: 14px
            font-size: $fontsize-small
            background: $bgc-aside
        >>> .cube-scroll-nav-bar-item_active
            background: $c-white
            color: $c-red
        // 对应展示内容区域
        // 标题
        >>> .cube-scroll-nav-panel-title
            padding-left: 14px
            height: 30px
            line-height: 30px
            border-left: 2px solid #d9dde1
            font-size: $fontsize-small
            color: $c-grey
            background: $bgc-aside
        .food-item
            position relative
            display flex
            margin 18px
            padding-bottom 18px
            &:last-child
                border-none()
                margin-bottom 0
             .icon
                flex: 0 0 57px
                margin-right: 10px
                img
                 height: auto
            .content
                flex: 1
                .name
                    margin: 2px 0 8px 0
                    height: 14px
                    line-height: 14px
                    font-size: $fontsize-medium
                    color: $color-dark-grey
                .desc, .extra
                    line-height: 10px
                    font-size: $fontsize-small-s
                    color: $color-light-grey
                .desc
                    width 200px
                    line-height: 12px
                    margin-bottom: 8px
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                .extra
                    .count
                        margin-right: 12px
                .price
                    font-weight: 700
                    line-height: 24px
                    .now
                        margin-right: 8px
                        font-size: $fontsize-medium
                        color: $c-red
                    .old
                        text-decoration: line-through
                        font-size: $fontsize-small-s
                        color: $color-light-grey
            .cart-control-wrapper
                position: absolute
                right: 0
                bottom: 12px
    // 底部购物车
    .shop-cart-wrapper
        position absolute
        left 0
        bottom 0
        z-index 50
        width 100%
</style>