<template>
    <div class="shopcart">        
        <div class="content">         
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
    </div>
</template>

<script>
    import Bubble from 'components/bubble/Bubble'

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
        components:{
            Bubble
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
</style>