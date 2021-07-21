<template>
  <div class="header">
    <div class="header-left">
      <i class="iconfont icon-zuojiantou" v-if="headerLeftStatus"  @click="$router.back()"></i>
    </div>
    <div class="header-center">{{title}}</div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['title', 'headerLeftStatus']
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 1.45rem;
  background: #fff;
  position: fixed;
  z-index: 1;
  display: flex;
  top: 0;
  border-bottom: 1px solid #f4f4f4;
}

.header .header-left {
  width: 10%;
  height: 100%;
}

.header .header-left i {
  font-size: 0.6rem;
  line-height: 1.45rem;
  text-align: center;
  display: block;
}

.header .header-center {
  width: 80%;
  height: 100%;
  line-height: 1.45rem;
  text-align: center;
  font-size: 0.45rem;
  display: block;
}

.header .header-right {
  width: 10%;
  height: 100%;
}
</style>