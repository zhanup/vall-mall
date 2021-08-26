<template>
  <div class="pay">
    <Header title="支付详情" :headerLeftStatus="true" />

    <!-- 收获地址 -->
    <div class="pay-address">
      <div v-if="!address" class="add-address" @click="$router.push('/new_address')">
        <p>添加收货地址</p>
        <van-icon name="arrow" />
      </div>
      <div v-else>
        <div class="info">
          <span>收货人：{{ address.name }}</span>
          <span>{{ address.tel }}</span>
        </div>
        <div class="address">收货地址：{{ address.address }}</div>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="pay-shop">
      <!-- 商品清单 -->
      <div class="pay-shop-list">
        <h3 class="title">商品清单</h3>
        <div class="shop-list-1">
          <img :src="goods.img_url" alt="goods" />
          <div class="shop-list-1-2">
            <div class="shop-list-1-2-3">
              <span>{{ goods.name }}</span>
              <span>X{{ $route.query.count }}</span>
            </div>
            <div class="price">￥{{ goods.price }}</div>
          </div>
        </div>
      </div>

      <!-- 发票信息 -->
      <div class="pay-shop-invoice">
        <h3 class="title">发票信息</h3>
        <div class="shop-invoice-1">
          <p>*请输入发票抬头:</p>
          <input type="text" placeholder="请输入发票信息" />
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="pay-shop-fs">
        <h3 class="title">支付方式</h3>
        <div class="shop-fs-content">
          <div class="shop-fs-1">
            <span
              v-for="(v, i) in paymentType"
              :key="i"
              :class="paymentTypeIndex === i ? 'active' : ''"
              @click="selectPaymentType(i)"
            >
              {{ v }}
            </span>
          </div>
          <div class="shop-fs-2">
            <div :style="{ display: paymentTypeIndex === 0 ? 'block' : 'none' }">
              支持支付宝支付、微信支付、银行卡支付、财付通等
            </div>
            <div :style="{ display: paymentTypeIndex === 1 ? 'block' : 'none' }">
              花呗分期是花呗联合天猫淘宝推出的，面向互联网的赊购服务，通过支付宝轻松还款，0首付
            </div>
            <div :style="{ display: paymentTypeIndex === 2 ? 'block' : 'none' }">
              货到再付款，支持现金交易
            </div>
          </div>
        </div>
      </div>
      <!-- 订单留言 -->
      <div class="pay-shop-liuyan">
        <h3 class="title">订单留言</h3>
        <div class="shop-liuyan-content">
          <textarea
          v-model="content"
            rows="5"
            placeholder="限300字（若有特殊需求，请联系商城在线客服)"
            maxlength="300"
          ></textarea>
          <p>商品总金额：¥{{goods.price * $route.query.count}}</p>
          <p>运费：0.00</p>
          <p>优惠：¥0.00</p>
          <p>赠送积分：{{toFixed(goods.price * $route.query.count * 0.05)}}</p>
        </div>
      </div>
    </div>

    <van-submit-bar
      :price="goods.price * $route.query.count * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { mapGetters } from "vuex";
import { Toast } from 'vant';

export default {
  name: "Pay",
  components: {
    Header,
  },
  data() {
    return {
      goods: {},
      paymentType: ["在线支付", "花呗分期", "货到付款"],
      paymentTypeIndex: 0,
      content: ''
    };
  },
  created() {
    this.getGoodsDetails();
  },
  computed: {
    ...mapGetters({
      address: "defaultAddress",
    }),
  },
  methods: {
    getGoodsDetails() {
      this.$axios("/data.json").then((res) => {
        const { shop_id, id } = this.$route.query;
        const goods = res.data.homeData[id - 1].data.filter((item) => item.id == shop_id)[0];
        this.goods = goods;
      });
    },
    selectPaymentType(index) {
      this.paymentTypeIndex = index;
    },
    toFixed(value) {
      return value.toFixed(2);
    },
    onSubmit() {
      if (!this.address) {
        Toast("请选择收货地址");
        return false;
      }
      if (this.content.trim() === '') {
        Toast('请输入发票抬头！');
        return false;
      }
    }
  }
}
</script>

<style scoped>
.pay {
  padding-top: 1.45rem;
  padding-bottom: 50px;
}
.pay-address {
  width: 100%;
  background: url(https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/prod/bg-addr-box-line_d380baa.png)
    #fff left bottom repeat-x;
  background-size: 1.6rem;
  padding-bottom: 0.43rem;
}
.add-address {
  height: 1rem;
  line-height: 1rem;
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add-address p {
  font-size: 0.45rem;
  color: #666;
}
.add-address .van-icon-arrow {
  font-size: 0.4rem;
}
.pay-address .info {
  width: 87%;
  margin: auto;
  font-size: 0.4rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  display: flex;
  justify-content: space-between;
}
.pay-address .address {
  width: 87%;
  margin: auto;
  color: #666;
  font-size: 0.38rem;
  padding-bottom: 0.2rem;
}
.pay-shop .title {
  height: 1.5rem;
  line-height: 1.5rem;
  border-bottom: 1px solid #eaeaea;
  font-size: 0.4rem;
  padding-left: 0.7rem;
  font-weight: normal;
}
.pay-shop-list {
  height: 4.5rem;
  margin-top: 0.3rem;
  background: #fff;
}
.shop-list-1 {
  display: flex;
}
.shop-list-1 img {
  width: 2.5rem;
  margin: 0.2rem;
}
.shop-list-1-2 {
  flex: 1;
}
.shop-list-1-2 .price {
  color: red;
  font-size: 0.4rem;
  font-weight: 500;
  height: 0.6rem;
}
.shop-list-1-2-3 {
  font-size: 0.4rem;
  margin-top: 0.3rem;
  height: 0.6rem;
  padding-right: 0.5rem;
  display: flex;
  justify-content: space-between;
}
.pay-shop-invoice {
  width: 100%;
  height: 4.3rem;
  background: #fff;
  margin-bottom: 10px;
  margin-top: 10px;
}
.shop-invoice-1 {
  width: 92%;
  height: 70%;
  margin: auto;
  font-size: 0.35rem;
}
.shop-invoice-1 p {
  margin-top: 0.3rem;
  margin-bottom: 10px;
}
.shop-invoice-1 input {
  width: 100%;
  height: 1.18rem;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 0.2rem;
}
.pay-shop-fs {
  width: 100%;
  height: 5rem;
  background: #ffffff;
}
.pay-shop-fs .shop-fs-1 {
  width: 100%;
  height: 40%;
  font-size: 0.35rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shop-fs-content {
  height: 3.5rem;
}

.pay-shop-fs .shop-fs-1 span {
  display: block;
  width: 2.88rem;
  height: 0.9rem;
  line-height: 0.9rem;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  margin: 0.1rem;
  text-align: center;
}
.pay-shop-fs .shop-fs-1 span.active {
  color: red;
}
.pay-shop-fs .shop-fs-2 {
  width: 100%;
  height: 60%;
  font-size: 0.35rem;
}
.pay-shop-fs .shop-fs-2 div {
  width: 90%;
  height: auto;
  border-radius: 3px;
  border: 1px solid #d1d1d1;
  margin: auto;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.3rem;
}
.pay-shop .pay-shop-liuyan {
  height: 6.5rem;
  background: #fff;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.shop-liuyan-content {
  width: 90%;
  margin: auto;
}
.shop-liuyan-content textarea{
  width: 100%;
  height: 2rem;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding: 0.15rem 0.2rem;
  font-size: 0.35rem;
  margin: 0.3rem auto;
  display: block;
  resize: none;
  overflow: auto;
}
.shop-liuyan-content p {
  color: #888;
  height: 0.48rem;
  font-size: 0.34rem;
}
</style>