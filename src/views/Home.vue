<template>
  <div class="home">
    <div class="header">
      <i class="iconfont icon-VIVO"></i>
    </div>
    <div class="official"></div>

    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image
          width="10rem"
          height="6.9rem"
          fit="contain"
          src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg"
        />
      </van-swipe-item>
    </van-swipe>

    <ul class="nav-box">
      <li v-for="(item, index) in routes" :key="index">
        <router-link :to="item.src" >
          <img :src="item.img" alt>
        </router-link>
      </li>
    </ul>

    <div class="main">
      <div class="main-box" v-for="(item1, index1) in shopListData" :key="index1">
        <h2>{{item1.title}}</h2>
        <ul>
          <li 
            v-for="(item2, index2) in item1.data" 
            :key="index2"
            @click="jumpDetail(item1, item2)"
          >
            <div class="list">
              <div class="img">
                <img :src="item2.img_url" alt>
              </div>
              <p class="name f-thide">{{item2.name}}</p>
              <p class="content f-thide2">{{item2.content}}</p>
              <p class="price">￥{{item2.price}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      routes: [
        {
          img: "/img/xuangou.jpg",
          src: "/phone"
        },
        {
          img: "/img/peijian.jpg",
          src: "/parts"
        },
        {
          img: "/img/pingbao.jpg",
          src: "/"
        },
        {
          img: "/img/dingzhi.jpg",
          src: "/"
        }
      ],
      shopListData: []
    }
  },
  created() {
    this.getHomeData();
  },
  methods: {
    getHomeData() {
      this.$axios('/data.json')
      .then(res => {
        this.shopListData = res.data.homeData;
      })
    },
    jumpDetail(item1, item2) {
      this.$router.push({
        path: '/product',
        query: {
          id: item1.id,
          shop_id: item2.id      
        }
      })
      // console.log(item)
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  padding-bottom: 1.6rem;
  height: auto;
}
.home .header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  height: 1.45rem;
  line-height: 1.45rem;
  font-size: 0.35rem;
  background: black;
}
.home .header i {
  font-size: 0.55rem;
  color: white;
  text-align: center;
  display: block;
}
.official {
  width: 100%;
  height: 0.8rem;
  margin-top: 1.45rem;
  background: url('/img/official.png') no-repeat;
  background-size: 100% 100%;
}
.van-swipe {
  margin-top: 1px;
  height: 6.9rem;
}
.nav-box {
  display: flex;
  height: 2rem;
  background-color: #fff;
}
.nav-box li {
  flex: 1;
  height: 100%;
}
.nav-box a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-box img {
  width: 70%;
}
.main h2 {
  height: 1.6rem;
  line-height: 1.6rem;
  background-color: #f7f7f7;
  color: #333;
  font-size: 0.49rem;
  font-weight: 400;
  text-align: center;
}
.main h2::before,
.main .main-box h2::after {
  display: inline-block;
  content: " ";
  width: .4rem;
  height: 1px;
  background-color: #9c9c9c;
  margin: 0 0.12rem;
  position: relative;
  top: -0.16rem;
}
.main ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  background: #fff;
}
.main li {
  width: 50%;
  overflow: hidden;
}
.main .list {
  background: #fff;
  text-align: center;
  border-right: 1px solid #f4f4f4;
  border-top: 1px solid #f4f4f4;
  padding-bottom: 0.25rem;
}
.main .list .img {
  width: 100%;
  padding-top: 0.2rem;
  padding-bottom: 0.3rem;
}
.main .list img {
  display: block;
  width: 2.48rem;
  height: 2.6rem;
  margin: auto;
  margin-top: 0.4rem;
  margin-bottom: 0.2rem;
}
.main .list .name {
  width: 80%;
  height: .64rem;
  line-height: .5rem;
  font-size: 0.38rem;
  font-weight: 700;
  margin: 0 auto;
}
.main .list .content {
  width: 90%;
  font-size: .29rem;
  margin: 0 auto;
}
.main .list .price {
  color: #f81200;
  font-size: .38rem;
  font-weight: 500;
  padding-top: 0.8rem;
  padding-bottom: 0.2rem;
}
</style>