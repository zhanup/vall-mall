<template>
  <div class="address">
    <Header title="收货地址" :headerLeftStatus="true" />
    <div class="address-box">
      <van-address-list
      :list="list"
      @add="onAdd"
      />
    </div>
    
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Address',
  components: {
    Header
  },
  data() {
    return {
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        }
      ]
    }
  },
  methods: {
    onAdd() {
      this.$router.push('/new_address')
    }
  }
}
</script>

<style scoped>
.address-box {
  margin-top: 1.45rem;
}
.address-box .van-button--danger {
  background-color: #00acff;
  border-color: #00acff;
}
</style>