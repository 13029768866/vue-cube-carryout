<template>
    <div class="header" @click="showMask">
    <!-- 商品信息 -->
    <div class="content-wrapper">
        <!-- 店家头像 -->
        <div class="avatar">
            <img :src="seller.avatar">
        </div>
        <!-- 相关描述 -->
        <div class="content">
            <div class="title">
                <div class="brand"></div>
                <div class="name">{{seller.name}}</div>
            </div>
            <div class="description">
                {{seller.description}}/{{seller.deliveryTime}}分钟送达
            </div>
            <div v-if="seller.supports" class="support">
                <support-ico :size=2 :type="seller.supports[0].type"></support-ico>
                <span class="text">{{seller.supports[0].description}}</span>
            </div>
        </div>
        <!-- 优惠信息数量 -->
        <div v-if="seller.supports" class="support-count">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <!-- 商品公告 -->
    <div class="bulletin-wrapper">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 背景图 -->
    <div class="background">
        <img :src="seller.avatar">
    </div>
</div>    
    
</template>

<script>
    import SupportIco from 'components/support-ico/support-ico'
    export default {
        name: 'TopHeader',
        props:{
            seller: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            showMask(){
                this.HomeMaskComp = this.HomeMaskComp || this.$createHomeMask({
                    $props: {
                        seller : 'seller'
                    }
                })
                this.HomeMaskComp.maskShow()
            }
        },
        components: {
            SupportIco
        }
    }
</script>

<style lang="stylus" scoped>
 @import "~assets/stylus/_mixin"
 @import "~assets/stylus/_vars"

.header
    position relative
    overflow hidden
    color $c-white
    background-color $bgc-header-sm
    // 商品信息
    .content-wrapper
        position relative
        display flex
        align-items center
        padding: 24px 12px 18px 24px
        // 店家头像
        .avatar
            flex: 0 0 64px
            width: 64px
            margin-right: 16px
            img 
                width 64px
                height 64px
                border-radius $radius-xs
        // 相关描述
        .content
            flex 1
            .title
                display flex
                align-items center
                margin-bottom 8px
                .brand
                    width: 30px
                    height: 18px
                    bg-image('brand')
                    background-size: 30px 18px
                    background-repeat: no-repeat
                .name
                    margin-left: 6px
                    font-size: $fontsize-large
                    font-weight: bold
            .description
                margin-bottom: 8px
                line-height: 12px
                font-size: $fontsize-small
              .support
                display: flex
                align-items: center
                .support-ico
                    margin-right: 4px
                .text
                    line-height: 12px
                    font-size: $fontsize-small-s
        // 优惠信息数量
        .support-count
            position: absolute
            right: 12px
            bottom: 14px
            display: flex
            align-items: center
            padding: 0 8px
            height: 24px
            line-height: 24px
            text-align: center
            border-radius: 14px
            background: $bgc-header-sm
            .count
                font-size: $fontsize-small-s
            .icon-keyboard_arrow_right
                margin-left: 2px
                line-height: 24px
                font-size: $fontsize-small-s
    // 商品公告
    .bulletin-wrapper
        position: relative
        display: flex
        align-items: center
        height: 28px
        line-height: 28px
        padding: 0 8px
        background: $bgc-header-xs
        .bulletin-title
            flex: 0 0 22px
            width: 22px
            height: 12px
            margin-right: 4px
            bg-image('bulletin')
            background-size: 22px 12px
            background-repeat: no-repeat
        .bulletin-text
            flex: 1
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            font-size: $fontsize-small-s
        .icon-keyboard_arrow_right
            flex: 0 0 10px
            width: 10px
            font-size: $fontsize-small-s   
    // 背景图
    .background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter blur(10px)
        img 
            width 100%
            height 100%
</style>