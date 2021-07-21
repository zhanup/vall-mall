<template>
  <div class="detail">
    <Header title="新闻资讯" :headerLeftStatus="true" />
    <div class="detail-content" v-html="content.newsDetail"></div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Detail',
  components: {
    Header
  },
  data() {
    return {
      content: {}
    }
  },
  created() {
    const { id } = this.$route.query
    this.$axios('/data.json')
    .then(res => {
      const data = res.data.news.filter(item => item.id == id)
      this.content = data[0]
    })
  }
}
</script>

<style scoped>
.detail {
  width: 90%;
  height: auto;
  font-size: 0.42rem;
  line-height: 0.8rem;
  display: flex;
  justify-content: center;
  margin: auto;
}
.detail-content {
  margin-top: 1.45rem;
}
</style>