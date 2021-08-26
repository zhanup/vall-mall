<template>
  <div class="product">
    <Header title="商品详情" :headerLeftStatus="true" />
    <div class="detail-list">

      <van-swipe class="swiper" :autoplay="2000">
        <van-swipe-item v-for="(item, index) in goods.swiper" :key="index">
          <img :src="item.swipe" />
        </van-swipe-item>
      </van-swipe>

      <!-- 商品信息 -->
      <div class="product-info">
        <div class="product-name">{{goods.name}}</div>
        <div class="product-describe">
          <span>【{{goods.bright}}】</span>
          {{goods.title}}
        </div>
        <div class="product-price">￥{{goods.price}}</div>
      </div>

      <!-- 购买数量 -->
      <div class="product-count">
        <span>购买数量：</span>
        <van-stepper v-model="count" min="1" max="99" />
      </div>

      <div class="category" @click="show = true">
        <div class="category-con">
          <i class="iconfont icon-icon--"></i>
          <p>支持花呗分期</p>
        </div>
        <div class="category-con">
          <i class="iconfont icon-icon--"></i>
          <p>支持以旧换新</p>
        </div>
        <div class="category-rigth">
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>

      <!-- 遮罩层 -->
      <div class="overlay" v-show="show">
        <div class="layer">
          <div class="layer-box">
            <div class="layer-box-left"></div>
            <div class="layer-box-center">服务说明</div>
            <div class="layer-box-right" @click="show=false">
              <i class="iconfont icon-cancel-1-copy"></i>
            </div>
          </div>
          <div class="layer-box-2">
            <div class="layer-box-2-1">
              <div class="layer-box-title">
                <i class="iconfont icon-icon--"></i>
                <h3>支持花呗分期</h3>
              </div>
              <p>商品支持花呗分期</p>
            </div>
            <div class="layer-box-2-1 top">
              <div class="layer-box-title">
                <i class="iconfont icon-icon--"></i>
                <h3>可以使用换新鼓励金</h3>
              </div>
              <p>换新鼓励金通过参加以旧换新回收旧手机以后获得，旧手机享受额外补贴。<a href="#">现在换机</a></p>
            </div>       
          </div>
          <div class="layer-box-button">
            <div @click="show = false">关闭</div>
          </div>
        </div>
      </div>

      <!-- 图文详情 -->
      <div class="detail-box">
        <van-tabs line-width="50%" line-height="2px" color="#26a2ff">
          <van-tab title="图文详情">         
            <van-image 
              v-for="(v,i) in goods.Images" 
              :key="i"
              :src="v.one"
              width="100%"
            />
          </van-tab>
          <van-tab title="参数"></van-tab>
        </van-tabs>
      </div>

      <!--  商品导航 -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="length === 0 ? '' : length" />
        <van-goods-action-icon 
          :icon="isCollect ? 'star' : 'star-o'" 
          :color="isCollect ? '#ff5000' : '#323233'"
          :text="isCollect ? '已收藏' : '收藏'" 
          @click="addToCollection"
        />
        <van-goods-action-button type="warning" text="加入购物车" @click="addToCatr" />
        <van-goods-action-button type="danger" text="立即购买" @click="jumpPay" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: 'Product',
  components: {
    Header
  },
  data() {
    return {
      show: false,  // 是否显示遮罩层
      goods: {},  // 商品详细数据
      count: 1,  // 购买数量
    }
  },
  created() {
    this.getGoodsDetails();
  },
  computed:{
    ...mapGetters({
      // 购物车商品数量
      length: 'cartLength'
    }),
    ...mapState({
      // vuex里的收藏
      collections: state => state.collections
    }),
    // 是否已收藏
    isCollect() {
      return this.collections.findIndex(item => item.title === this.goods.name) !== -1;
    }
  },
  methods: {
    ...mapMutations({
      addCart: 'ADD_TO_CART',
      addCollection: 'ADD_COLLECTON'
    }),
    // 获取商品详情信息
    getGoodsDetails() {
      this.$axios('/data.json')
      .then(res => {
        const { shop_id, id } = this.$route.query;
        const goods = res.data.homeData[id-1].data.filter(item => item.id == shop_id)[0];
        this.goods = goods;
      })
    },
    // 加入购物车
    addToCatr() {
      const product = {};
      product.image = this.goods.img_url;
      product.title = this.goods.name;
      product.price = this.goods.price;
      product.desc = this.goods.title;
      
      this.addCart(product);
    },
    // 添加收藏
    addToCollection() {
      const product = {};
      product.image = this.goods.img_url;
      product.title = this.goods.name;
      product.price = this.goods.price;

      this.addCollection(product);
    },
    // 跳转到支付页面
    jumpPay() {
      const { shop_id, id } = this.$route.query;

      this.$router.push({
        path: '/pay',
        query: {
          id,
          shop_id,
          count: this.count
        }
      });
    }
  }
}
</script>

<style scoped>
.detail-list {
  margin-top: 1.45rem;
}
.swiper {
  background-color: #fff;
}
.swiper img {
  display: block;
  width: 70%;
  height: 7rem;
  margin: 0 auto;
}
.product-info {
  background: white;
  border-bottom: 1px solid #cecece;
  padding: 0.4rem;
  margin-top: -15px;
}
.product-count {
  height: 1.6rem;
  padding-left: .4rem;
  background-color: #fff;
  font-size: .35rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cecece;
}
.product-name {
  color: black;
  font-weight: 400;
  font-size: 0.5rem;
  line-height: 1rem;
}
.product-describe {
  text-align: justify;
  font-size: 0.348rem;
}
.product-describe span {
  margin-left: -0.2rem;
  color: rgb(255, 75, 61);
}
.product-price {
  color: #f81200;
  font-size: 0.7rem;
  margin-top: 0.1rem;
}
.category {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.5rem;
  border-bottom: 10px solid #f4f4f4;
  background-color: #fff;
}
.category .category-con {
  display: flex;
  margin-left: 10px;
  line-height: 1.28rem;
  font-size: 0.34rem;

}
.category .category-con i {
  color: #0098df;
  font-size: 0.5rem;
}
.category .category-con p {
  color: #777;
  padding-left: 0.1rem;
}
.category .category-rigth {
  flex: 1;
  text-align: right;
  margin-right: 10px;
  line-height: 1.28rem;
  font-size: .7rem;
  margin-bottom: .1rem;
}
.category .category-rigth .iconfont {
  font-size: .7rem;
  margin-bottom: .1rem;
}
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  bottom: 0;
  z-index: 2;
}
.layer{
  width: 100%;
  height: 8.3rem;
  background: #fff;
  position: absolute;
  bottom: 0;
  z-index: 2;
}
.layer .layer-box {
  display: flex;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
}
.layer .layer-box .layer-box-left,
.layer .layer-box .layer-box-right {
  flex: 1;
  height: 100%;
}
.layer .layer-box .layer-box-center {
  flex: 8;
  text-align: center;
  height: 100%;
  font-size: 0.47rem;
  font-weight: 400;
}
.layer-box-right i.iconfont {
  font-size: .7rem;
  margin-bottom: .1rem;
}
.layer .layer-box-2 {
  width: 85%;
  margin: 20px auto;
}
.layer .layer-box-2 .top {
  margin-top: 0.6rem;
}
.layer .layer-box-2-1 {
  width: 100%;
}
.layer .layer-box-title {
  display: flex;
  align-items: center;
}
.layer .layer-box-title i {
  color: #0098df;
  font-size: 0.5rem;
}
.layer .layer-box-title h3 {
  font-size: 0.4rem;
  padding-left: 0.1rem;
  display: inline-block;
  font-weight: 400;
}
.layer .layer-box-2-1 p {
  font-size: 0.35rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #666;
  margin-top: 0.15rem;
  padding-left: 0.6rem;
}
.layer .layer-box-2-1 p a {
  color: #00acff;
}
.layer .layer-box-button {
  width: 100%;
  height: 1.5rem;
  border-top: 1px solid #eee;
  position: absolute;
  bottom: 0;
}
.layer .layer-box-button div {
  width: 95%;
  height: 0.89rem;
  line-height: 0.89rem;
  display: block;
  text-align: center;
  margin: 0.25rem auto;
  background: #00acff;
  border-radius: 30px;
  color: white;
  font-size: 0.35rem;
}
.detail-box {
  padding-bottom: 50px;
}
.product .van-goods-action {
  z-index: 99;
}
</style>