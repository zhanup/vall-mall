<template>
  <div class="news">
    <Header title="新闻资讯" :headerLeftStatus="false" />
    <div class="content">
      <div 
        class="content-box" 
        v-for="item in news" 
        :key="item.id" 
        @click="jumpNewsDetail(item)"
      >
        <h2>{{item.newsTitle}}</h2>
        <div class="img">
          <img :src="item.newsImg" alt>
        </div>
        <p class="describe">{{item.newsCon}}</p>
        <p class="time">{{item.newsTime}}</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'News',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      news: []
    }
  },
  created() {
    this.getNewsData();
  },
  methods: {
    getNewsData() {
      this.$axios('/data.json')
      .then(res => {
        this.news = res.data.news
      })
    },
    jumpNewsDetail(item) {
      this.$router.push({
        name: 'Detail',
        // params: item
        query: { id: item.id }
      })
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  margin-top: 1.45rem;
  margin-bottom: 1.6rem;
}
.content-box {
  width: 100%;
  height: auto;
  background: #fff;
  border-bottom: 1px dotted #ccc;
  padding-bottom: 0.3rem;
}
.content-box h2 {
  color: #505b63;
  width: 95%;
  margin: 0 auto;
  text-align: left;
  font-size: 0.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  font-weight: 400;
}
.content-box div.img {
  width: 95%;
  height: 4.3rem;
  margin: auto;
}
.content-box img {
  width: 100%;
  height: 100%;
}
.content-box .describe {
  width: 95%;
  margin: auto;
  line-height: 0.5rem;
  padding-top: 0.3rem;
  color: #696969;
  text-align: justify;
  font-size: 0.3rem;
}
.content-box .time {
  width: 95%;
  margin: auto;
  padding-top: 0.2rem;
  font-size: 0.3rem;
  color: #696969;
}
</style>