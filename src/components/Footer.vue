<template>
  <van-tabbar route class="footer" active-color="#179dfe" inactive-color="#000">
    <van-tabbar-item to="/" name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/news" name="news" icon="star-o">动态</van-tabbar-item>
    <van-tabbar-item to="/profile" name="profile" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'TabBar',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>
.footer {
  height: 1.6rem !important;
  border-top: 1px solid #F4F4F4;
}
.footer ::v-deep .van-icon {
  font-size: .7rem;
}
.footer ::v-deep .van-tabbar-item__text {
  font-size: .25rem;
}
</style>