<template>
  <div>
    <Header title="新增地址" :headerLeftStatus="true" />
    <div class="new-address-box">
      <van-address-edit
        show-delete
        show-search-result
        :area-list="areaList"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { areaList } from '@vant/area-data'

export default {
  name: 'NewAddress',
  components: {
    Header
  },
  data() {
    return {
      areaList
    }
  },
  methods: {
    onSave() {

    },
    onDelete() {

    }
  }
}
</script>

<style scoped>
.new-address-box {
  margin-top: 1.45rem;
}
.new-address-box .van-button--danger {
  background-color: #00acff;
  border-color: #00acff;
}
</style>