<template>
  <div class="profile">
    <Header title="个人中心" :headerLeftStatus="false" />
    <div class="user">
      <div class="user-box">
        <div class="user-left">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1040943398,1147003181&fm=26&gp=0.jpg" alt>
        </div>
        <div class="user-right">
          <span>{{userName}}</span>
          <p>作者微信：zhanup</p>
        </div>
      </div>
    </div>

    <router-link to="/order">
      <div class="order-box">
        <div class="order-box-1">
          <div class="order-left">我的订单</div>
          <div class="order-right">全部订单
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="order-box-2">
          <div v-for="(item, index) in orderList" :key="index">
            <img :src="item.img">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </router-link>

    <div class="account">
      <router-link class="account-item" to="/collection">
        <div class="item-left">
          <van-icon name="star-o" />
          <span>我的收藏</span>
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </router-link>

      <router-link class="account-item" to="/address">
        <div class="item-left">
          <van-icon name="location-o" />
          <span>我的收货地址</span>
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </router-link>

      <router-link class="account-item" to="/cart">
        <div class="item-left">
          <van-icon name="shopping-cart-o" />
          <span>我的购物车</span>
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </router-link>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Profile',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      userName: '',
      orderList: [
        {
          img: "/img/111.png",
          name: "待付款"
        },
        {
          img: "/img/222.png",
          name: "待收货"
        },
        {
          img: "/img/333.png",
          name: "待评价"
        },
        {
          img: "/img/444.png",
          name: "退货/退款"
        }
      ],
    }
  },
  created() {
    this.userName = JSON.parse(localStorage.getItem('user'))['name']
  }
}
</script>

<style scoped>
.user {
  margin-top: 1.45rem;
  width: 100%;
  height: 3rem;
  background: url(/img/bj.png) no-repeat;
  background-size: 100% 100%;
}
.user .user-box {
  display: flex;
  width: 100%;
  height: 100%;
}
.user .user-left {
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user .user-left img {
  width: 65%;
  height: 55%;
  border-radius: 50%;
}
.user .user-right {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user .user-right span {
  font-size: .5rem;
  font-weight: bold;
  color: #fff;
}
.user .user-right p {
  font-size: .35rem;
  color: #fff;
}
.order-box {
  width: 100%;
  height: 3.5rem;
  background: #fff;
  display: block;
  margin-bottom: 0.15rem;
  margin-top: 0.15rem;
  font-size: 0.35rem;
}
.order-box .order-box-1 {
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-box .order-box-1 .order-left {
  line-height: 1.5rem;
  margin-left: 0.5rem;
  font-size: 0.4rem;
}
.order-box .order-box-1 .order-right {
  line-height: 1.5rem;
  margin-right: 0.6rem;
  font-size: 0.4rem;
  display: flex;
  align-items: center;
}
.order-box .order-box-2 {
  width: 100%;
  height: 1.5rem;
  display: flex;
}
.order-box .order-box-2 div {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0.3rem;
}
.order-box .order-box-2 div>img {
  width: 0.8rem;
  height: 0.8rem;
  margin: auto;
}
.order-box .order-box-2 div>span {
  margin-top: .3rem;
  text-align: center;
}
.account {
  width: 100%;
  background-color: #fff;
}
.account .account-item {
  width: 90%;
  height: 1.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.account .item-left {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
}
.account .item-left i {
  font-size: 0.5rem;
  margin-right: 0.2rem;
}
.account .item-left span {
  font-size: 0.4rem;
  padding-left: 0.1rem;
}
.account .item-right {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.account .item-right i {
  font-size: 0.5rem;
}
</style>