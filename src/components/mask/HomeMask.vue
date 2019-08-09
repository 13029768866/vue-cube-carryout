<template>
    <transition name="fade">
        <div class="home-mask-wrapper" v-show='visible'>
            <div   class="mask-wrapper">                                 
                <!-- 星级 -->
                <h1 class="name">{{seller.name}}</h1>
                <div class="star-wrapper">
                    <star 
                        :size = 48
                        :score = seller.score
                    ></star>
                </div>
                <!-- 优惠信息 -->
                <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
                    <support-ico :size=2 :type="seller.supports[index].type"></support-ico>
                    <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
                <!-- 商家公告 -->
                <div class="title">
                    <div class="line"></div>
                    <div class="text">商家公告</div>
                    <div class="line"></div>
                </div>
                <div class="bulletin">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <!-- 关闭按钮 -->
                <div class="mask-close" @click="maskHide">
                    <i class="icon-close"></i>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import SupportIco from 'components/support-ico/support-ico'
    import Star from 'components/star/Star'


    export default {
        name: 'HomeMask',
        components:{
            SupportIco,
            Star
        },
        props:{
            seller: {
                type: Object,
                default(){
                    return {}
                }
            }
        },   
        data(){
            return {
                visible: false
            }
        },
        methods: {
            maskShow(){
                this.visible =true
            },
            maskHide(){
                this.visible = false
            }
        }
        
    }
</script>

<style lang="stylus" scoped>
 @import "~assets/stylus/_mixin"
 @import "~assets/stylus/_vars"

.home-mask-wrapper
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    backdrop-filter: blur(10px)
    opacity: 1
    color: $c-white
    background: $bgc-header-md
    // fade过渡动画
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.75s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: $color-background
    .mask-wrapper
        padding 64px 10vw
        // 星级
        .name
          line-height: 16px
          text-align: center
          font-size: $fontsize-large
          font-weight: 700
        .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
        // 优惠信息
        .title
          display: flex
          width: 80vw
          margin: 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            padding: 0 12px
            font-weight: 700
            font-size: $fontsize-medium
        .supports
          width: 80vw
          margin: 0 auto
          .support-item
            display: flex
            align-items: center
            padding: 0 12px
            margin-bottom: 12px
            &:last-child
              margin-bottom: 0
            .support-ico
              margin-right: 6px
            .text
              line-height: 16px
              font-size: $fontsize-small
        // 商家公告
        .bulletin
            width: 80vw
            margin: 0 auto
            .content
                padding: 0 12px
                line-height: 24px
                text-align justify
                font-size: $fontsize-small
        // 关闭按钮
        .mask-close
            position: absolute
            width: 30px
            height: 30px
            left 50%
            bottom 5vh
            transform translateX(-50%)
            font-size: $fontsize-large-xxxx
</style>