import Vue from 'vue'
import { createAPI } from 'cube-ui'
import HomeMask from 'components/mask/HomeMask'
import ShopCartList from 'components/shop-cart-list/ShopCartList'
import ShopCart from 'components/shop-cart/ShopCart'
import FoodDetail from 'components/food-detail/FoodDetail'

createAPI(Vue, HomeMask)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCart)
createAPI(Vue, FoodDetail)
