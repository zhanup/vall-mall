<template>
  <div class="collection">
    <Header title="我的收藏" :headerLeftStatus="true" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Collection',
  components: {
    Header
  }
}
</script>

<style scoped>

</style>