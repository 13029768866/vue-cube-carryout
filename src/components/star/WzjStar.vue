<template>
    <div :class="starSize" class="star">
        <span
            v-for="(starStatus,idx) in starStatusArray"
            :key = idx
            class="star-item"
            :class="starStatus"
        ></span>
    </div>
</template>

<script>
    // 星星状态
    const LENGTH = 5
    const CLS_ON = 'on'
    const CLS_OFF = 'off'
    const CLS_HALF = 'half'

    export default {
        name:'Star',
        props:{
            size:{
                type: Number
            },
            score:{
                type: Number
            }
        },
        computed:{
            starSize(){
                return `star-${this.size}`
            },
            starStatusArray(){
                let res = []
                // 超过4.5显示半星
                const score = Math.floor(this.score * 2)/2
                const halfStar = Number.isInteger(score)
                // 完整星星
                const integerStar = Math.floor(score)

                for(let i = 0; i<integerStar;i++){
                    res.push(CLS_ON)
                }
                if(!halfStar){
                    res.push(CLS_HALF)
                }
                while(res.length < LENGTH){
                    res.push(CLS_OFF)
                }
                return res
            }
        }
    }
</script>

<style lang="stylus" scoped>
 @import "~assets/stylus/_mixin"

 .star
    display: flex
    align-items: center
    justify-content: center
    .star-item
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>