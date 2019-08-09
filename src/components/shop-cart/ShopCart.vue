<template>
    <div class="shopcart">        
        <div class="content">         
            <div class="content-left">
                <!-- 图标 -->
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <!-- 价格 -->
                <div class="price">￥{{totalPrice}}</div>
                <!-- 配送费 -->
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay">{{payDesc}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ShopCart',
        props:{   
            //  选中的食物   
            selectFoods:{
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
        computed: {
            // 总价格
            totalPrice() {
                let total = 0
                this.selectFoods.forEach((food) => {
                    total += food.count * food.price
                })
                return total
            },
            // 总数量
            totalCount() {
                let count = 0
                this.selectFood.forEach((food) => {
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
    .content
        display flex
        background-color $bgc-header-xl
        font-size 0
        color $color-light-grey
        .content-left
            display flex
            align-items center
            flex 1
            // 购物车图标
            .logo-wrapper
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
                    .icon-shopping_cart
                        line-height: 44px
                        font-size: $fontsize-large-xxx
                        color: $color-light-grey
            // 价格
            .price
                line-height: 24px
                padding-right: 12px
                border-right: 1px solid rgba(255, 255, 255, 0.1)
                font-weight: 700
                font-size: $fontsize-large
            // 配送费
            .desc
                line-height: 24px
                font-size: $fontsize-small-s
                margin-left 12px
        .content-right
            flex 0 0 105px
            min-width 105px
            .pay
                line-height 56px
                text-align center
                font-weight 700
                font-size $fontsize-small
                background-color $color-dark-grey
                padding 0 5px
</style>