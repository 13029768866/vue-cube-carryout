import Vue from 'vue'
import { createAPI } from 'cube-ui'
import HomeMask from 'components/mask/HomeMask'
import ShopCartList from 'components/shop-cart-list/ShopCartList'

createAPI(Vue, HomeMask)
createAPI(Vue, ShopCartList)
