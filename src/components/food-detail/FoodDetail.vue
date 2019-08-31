<template>
  <transition
    name="move"  
  >  
    <div  class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <!-- 食品图片 -->
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <!-- 销售详情 -->
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <!-- 存在数量显示 -->
            <div class="cart-control-wrapper">
              <cart-control @increment='incrementFood' :food="food"></cart-control>
            </div>
            <!-- 没有食品数量显示 -->
            <transition name="fade">
              <div @click="addFirst" class="buy" v-show="!food.count">
                加入购物车
              </div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <!-- 商品评价 -->
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <!-- 评价种类 -->
            <rating-select
              :ratings="ratings"
              :selectType="selectType"
              :onlyContent="onlyContent"
              :desc="desc"
              @select='onSelectType'
              @toggle ='onToggle'
            >
            </rating-select>
            <!-- 评价内容区域 -->
            <div class="rating-wrapper">
              <ul v-show="computedRatings && computedRatings.length">
                <li
                  v-for="(rating,index) in computedRatings"
                  class="rating-item border-bottom-1px"
                  :key="index"
                >
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">{{format(rating.rateTime)}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!computedRatings || !computedRatings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import CartControl from 'components/cart-control/CartControl'
  import RatingSelect from 'components/rating-select/RatingSelect'
  import Split from 'components/split/Split'
//   import ratingMixin from 'common/mixins/rating'
  import popupMixin from 'common/mixins/popup'

  const EVENT_SHOW = 'show'
  const EVENT_INCREMENT = 'increment'

  export default {
    name: 'FoodDetail',
    mixins: [ popupMixin],
    props: {
      food: {
        type: Object
      }
    },
    data(){
      return {
        onlyContent: true,
        selectType: 2,
        desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
        }
      }
    },
    components: {     
      Split,
      CartControl,
      RatingSelect
    },
    created(){
      //  监听show事件触发重绘解决不能滚动问题
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      })
    },
    methods:{
      // 首次添加
      addFirst(event) {
         this.$set(this.food,'count',1)
        // 变化通知购物车触发事件的元素
        this.$emit(EVENT_INCREMENT,event.target)
      },
      // 监听触发动画
      incrementFood(target){
        this.$emit(EVENT_INCREMENT,target)
      },
      // moment处理时间戳
      format(time){
        return moment(time).format('YYYY-MM-DD hh:mm')
      },
      onSelectType(type){
        this.selectType = type
      },
      onToggle(){
        this.onlyContent = !this.onlyContent
      }
    },
    computed: {
      ratings(){
        return this.food.ratings
      },
      computedRatings(){
        let res = []
        this.ratings.map(rating => {
          if(this.onlyContent && !rating.text){
            return
          }
          if(this.selectType === 2 || this.selectType === rating.rateType){
            res.push(rating)
          }
        })
        return res
      }
    }
  }
</script>

<style lang="stylus" scoped>
 @import "~assets/stylus/_mixin"
 @import "~assets/stylus/_vars"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 54px
    z-index: 30
    width: 100%
    background: $c-white
    // 左滑过渡
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    // 食品图片
    .image-header
      // position: relative
      // width: 100%
      // height: 0
      // padding-top: 100%
      width 100vw
      height 100vw
      img
        // position: absolute
        // top: 0
        // left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: $fontsize-large-xx
          color: $c-white

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: $fontsize-medium
        font-weight: 700
        color: $color-dark-grey
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        .sell-count, .rating
          font-size: $fontsize-small-s
          color: $color-light-grey
        .sell-count
          margin-right: 12px
      .price
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: $c-red
        .old
          text-decoration: line-through
          font-size: $fontsize-small-s
          color: $color-light-grey
      .cart-control-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: $fontsize-small-s
        color: $c-white
        background: $c-blue
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.3s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .text
        line-height: 24px
        padding: 0 8px
        font-size: $fontsize-small
        color: $color-grey
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          &:last-child
            border-none()
          .user
            position: absolute
            right: 0
            top: 16px
            display: flex
            align-items: center
            line-height: 12px
            .name
              margin-right: 6px
              font-size: $fontsize-small-s
              color: $color-light-grey
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: $fontsize-small-s
            color: $color-light-grey
          .text
            line-height: 16px
            font-size: $fontsize-small
            color: $color-dark-grey
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: $fontsize-small
            .icon-thumb_up
              color: $c-blue
            .icon-thumb_down
              color: $color-light-grey
        .no-rating
          padding: 16px 0
          font-size: $fontsize-small
          color: $color-light-grey
</style>
