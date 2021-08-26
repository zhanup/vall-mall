<template>
  <div class="collection">
    <Header title="我的收藏" :headerLeftStatus="true" />
    <div class="coll-list">
      <div class="coll-item" v-for="(item, index) in collections" :key="index">
        <div class="coll-title">
          <span>库存充足</span>
          <span @click="removeCollection(item)">取消收藏</span>
        </div>
        <div class="coll-info">
          <div class="left-info">
            <img :src="item.image" alt="phone">
            <div class="detail">
              <span class="name">{{item.title}}</span>
              <span class="price">¥{{item.price}}</span>
            </div>
          </div>
          <div class="right-info">
            <button>立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapMutations, mapState } from 'vuex';
import { Dialog } from 'vant';

export default {
  name: 'Collection',
  components: {
    Header
  },
  computed: {
    ...mapState({
      collections: state => state.collections
    }),
  },
  methods: {
    ...mapMutations({
      delCollection: 'DELETE_COLLECTON'
    }),
    removeCollection(item) {
      Dialog.confirm({
        title: '提示',
        message:  `是否取消 ${item.title} 的收藏？`,
      })
        .then(() => {
          this.delCollection(item.title);
        })
        .catch(() => { });
    }
  },
}
</script>

<style scoped>
.coll-list {
  margin-top: 1.45rem;
  background-color: #fff;
}
.coll-item {
  border-bottom: 1px solid #d7d7d7;
}
.coll-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .5rem;
  font-size: .35rem;
  height: 1.3rem;
  border-bottom: 1px solid #eee;
}
.coll-title span:first-child {
  color: #55B451;
}
.coll-info {
  display: flex;
  padding: .3rem 0;
  height: 3.4rem;
}
.left-info {
  width: 68%;
  display: flex;
}

.left-info img {
  display: block;
  width: 2.9rem;
  height: 2.7rem;
}
.left-info .detail {
  width: 50%;
  font-size: 0.45rem;
  display: flex;
  flex-direction: column;
  margin-left: 0.2rem;
}
.left-info .title {
  width: 4rem;
  color: #514E56;
  font-weight: 500;
  margin-top: 0.3rem;
  margin-bottom: 0.2rem;
}
.left-info .price {
  color: #FF0202;
  font-weight: 500;
}
.right-info {
  width: 32%;
  height: 100%;
  position: relative;
}
.right-info button {
  position: absolute;
  bottom: .2rem;
  width: 3rem;
  height: .95rem;
  background-color: #00acff;
  color: #fff;
  border-radius: .5rem;
  font-size: .35em;
}
</style>