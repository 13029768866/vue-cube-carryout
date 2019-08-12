<template>
    <div class="cartcontrol">
        <!-- move过渡动画 -->
        <transition name='move'>
            <!-- 减少按钮 -->
            <div class="cart-decrement" v-show='this.food.count' @click='decrement'>
                <span class="inner icon-remove_circle_outline"></span> 
            </div>
        </transition>        
        <!-- 食物数量 -->
        <div class="cart-count" v-show="this.food.count">{{this.food.count}}</div>
        <!-- 增加按钮 -->
        <div class="cart-increment icon-add_circle" @click ='increment'></div>
    </div>
</template>

<script>
    // 设置常量
    const EVENT_INCREMENT = 'increment'
    export default {
        name: 'CartControl',
        data(){
           return {

           }
        },
        props:{
            food:{
                type: Object,
                dafault(){
                    return {};
                }
            }
        },
        methods: {
            // 增加
            increment(event){
                // 如果存在count属性增加，没有添加其count属性，并且val为1                
               !this.food.count? this.$set(this.food,'count',1) :this.food.count++; 
                // 变化通知购物车
                this.$emit(EVENT_INCREMENT,event.target)   
            },
            // 减少
            decrement(){
                if(this.food.count){
                    this.food.count--
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/_vars"

.cartcontrol
    display flex
    align-items center
    // margin-left -100px
    // 减少按钮
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
        &.move-enter, &.move-leave-active
            opacity 0
            transform translate3d(24px,0,0)
            .inner
                transform rotate(180deg)
    // 食物数量
    .cart-count
        width 12px
        line-height 24px
        text-align center
        font-size: $fontsize-small-s
        color: $color-grey
    // 增加按钮
    .cart-increment      
        padding: 6px
        font-size: $fontsize-large-xxx
        color: $c-blue
</style>