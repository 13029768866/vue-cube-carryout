<template>
   <div class="shop-cart-sticky" v-show="visible">
        <shop-cart
            ref="shopCart"
            :selectedFoods="selectedFoods"
            :deliveryPrice="deliveryPrice"
            :minPrice="minPrice"  
            :cartListFlag = "cartListFlag"       
        >
        </shop-cart>
  </div>
</template>

<script>
    import ShopCart from 'components/shop-cart/ShopCart'
    export default {
        name: 'ShopCartSticky',
        components: {
            ShopCart
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            show() {
                this.visible = true
            },
            hide() {
                this.visible = false
            }
        },
        props: {
            selectedFoods: {
                type: Array,
                default() {
                    return []
            }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            cartListFlag: {
                type: Boolean,
                default: true
            }
        }       
    }
</script>

<style lang="stylus" scoped>
  .shop-cart-sticky
    position: absolute
    left: 0
    bottom: 0
    z-index: 999
    width: 100%
    height: 44px
</style>