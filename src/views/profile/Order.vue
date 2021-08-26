<template>
  <div class="order">
    <Header title="我的订单" :headerLeftStatus="true" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Order',
  components: {
    Header
  }
}
</script>

<style scoped>

</style>