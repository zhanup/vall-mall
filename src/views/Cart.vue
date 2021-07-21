<template>
  <div class="cart">
    <Header title="我的购物车" :headerLeftStatus="true" />

    <div class="cart-list">
      <div class="cart-item" v-for="(item, index) in carts" :key="index">
        <div class="item-selector">
          <i 
            class="iconfont"
            :class="item.checked ? 'icon-xuanzekuangxuanzhong' : 'icon-xuanzekuangmoren'"
            :style="{color: item.checked ? '#25B5FE' : ''}"
            @click="select(item.title)"
          >
          </i>
        </div>
        <div class="item-img">
          <img :src="item.image" alt>
        </div>
        <div class="item-info">
          <div class="item-title">{{item.title}}</div>
          <div class="item-desc f-thide">描述：{{item.desc}}</div>
          <div class="info-bottom">
            <div class="item-price">¥{{item.price}}</div>
            <div class="item-count">
              <span @click="decrement(item.title)">-</span>
              <span>{{item.count}}</span>
              <span @click="increment(item.title)">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="buttom-bar">
      <div class="check-content">
        <div class="check-btn">
          <i 
            class="iconfont"
            :class="checkLength ? 'icon-xuanzekuangxuanzhong' : 'icon-xuanzekuangmoren'"
            :style="{color: checkLength ? '#25B5FE' : ''}"
            @click="selectAll"
          >
          </i>
        </div>
        <span>全选</span>
      </div>
      <div class="price">合计：<span>￥{{totalPrice}}</span></div>
      <div class="calculate">
        <span>结算</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Cart',
  components: {
    Header
  },
  computed: {
    ...mapState({
      carts: state => state.carts
    }),
    checkLength() {
      let length = 0;
      this.carts.forEach(item => {
        if (item.checked) length++;
      })
      return this.carts.length === length;
    },
    totalPrice() {
      let total = 0;
      this.carts.forEach(item => {
        if (item.checked) {
          total += item.count * item.price
        }
      })
      return total
    }
  },
  methods: {
    ...mapMutations({
      increment: 'ADD_COUNT',
      decrement: 'DEDUCT_COUNT',
      select: 'SELECT_GOODS',
      selectAll: 'SELECT_ALL_GOODS'
    }),

  }
}
</script>

<style scoped>
.cart-list {
  margin-top: 1.45rem;
}
.cart-item {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: .1rem .2rem;
  border-bottom: 1px solid #dedede;
}
.cart-item .item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-item .item-img {
  padding: 0 .1rem;
}
.cart-item .item-img img {
  width: 2.4rem;
  height: 2.67rem;
}
.cart-item .item-title {
  font-size: .46rem;
}
.cart-item .item-info {
  padding: .1rem .2rem;
  position: relative;
  overflow: hidden;
}
.cart-item .item-desc {
  font-size: .38rem;
  margin-top: .25rem;
  color: #666;
}
.info-bottom {
  margin-top: .3rem;
  display: flex;
  justify-content: space-between;
  font-size: .46rem;
}
.info-bottom .item-price {
  color: #f81200;
}
.info-bottom .item-count {
  display: flex;
}
.info-bottom .item-count span {
  border: 1px solid #dedede;
  width: .7rem;
  height: .7rem;
  line-height: .7rem;
  text-align: center;
}
.buttom-bar {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.18rem;
  border-top: 1px solid #f4f4f4;
  background-color: #fff;
}
.check-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-content div {
  display: flex;
  align-items: center;
  line-height: 1.18rem;
}
.check-content span {
  font-size: .38rem;
  vertical-align: auto;
  line-height: 1.18rem;
}
.price {
  flex: 2;
  font-size: .43rem;
  line-height: 1.18rem;
  text-align: center;
}
.price span {
  color: rgb(227, 33, 30);
}
.calculate {
  flex: 1;
  height: 70%;
  margin-right: .3rem;
}
.calculate span {
  width: 100;
  height: 100%;
  display: block;
  background: #f81200;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  line-height: 0.82rem;
  font-size: 0.35rem;
} 
</style>