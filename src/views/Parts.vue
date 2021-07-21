<template>
  <div class="parts">
    <Header title="手机配件" :headerLeftStatus="true" />
    <div class="parts-wrap">
      <div class="tabs">
        <span 
          v-for="(item, index) in parts" 
          :key="index"
          @click="changeIndex(index)"
          :class="idx === index ? 'active' : ''"
        >
          {{item.name}}
        </span>
      </div>

      <div class="parts-list">
        <div class="parts-item" v-for="(item, index) in list.data" :key="index">
          <img :src="item.img_url" alt>
          <h2 class="f-thide">{{item.name}}</h2>
          <p class="content f-thide2">{{item.content}}</p>
          <p class="price">￥{{item.price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Parts',
  components: {
    Header
  },
  data() {
    return {
      parts: [],
      idx: 0,
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios('/data.json')
      .then(res => {
        this.parts = res.data.accessories
        this.list = this.parts[0]
      })
    },
    changeIndex(index) {
      this.idx = index
      this.list = this.parts[index]
    }
  }
}
</script>

<style scoped>
.parts {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.tabs {
  display: flex;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  position: fixed;
  top: 1.45rem;
  left: 0;
  background-color: #fff;
}
.tabs span {
  flex: 1;
  text-align: center;
  font-size: 0.37rem;
}
.tabs .active {
  color: #25b5fe;
  border-bottom: 2px solid #25b5fe;
}
.parts-list {
  margin-top: 2.65rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.parts-item {
  width: 50%;
  height: 6.3rem;
  background: #fff;
  border-right: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}
.parts-item img {
  height: 3.6rem;
  width: 4rem;
  display: block;
  margin: auto;
  padding: 0.5rem;
}
.parts-item h2 {
  width: 90%;
  font-size: 0.4rem;
  margin: 0 auto;
  text-align: center;
}
.parts-item .content {
  width: 3.8rem;
  margin: 0 auto;
  height: 1.1rem;
  font-size: 0.22rem;
  line-height: 1.4;
  color: #000;
  padding-top: 0.2rem;
  text-align: center;
}
.parts-item .price {
  text-align: center;
  color: red;
  line-height: 1rem;
  font-size: 0.4rem;
}
</style>