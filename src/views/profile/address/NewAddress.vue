<template>
  <div>
    <Header title="新增地址" :headerLeftStatus="true" />
    <div class="new-address-box">
      <van-address-edit
        show-search-result
        :area-list="areaList"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { areaList } from '@vant/area-data';
import { mapMutations } from 'vuex';
import { Toast } from 'vant';

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
    ...mapMutations({
      saveAddress: 'ADD_ADDRESS'
    }),
    onSave(address) {
      this.saveAddress(address);
      Toast('保存成功！');
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.new-address-box {
  margin-top: 1.45rem;
}
.new-address-box ::v-deep .van-button--danger {
  background-color: #00acff;
  border-color: #00acff;
}
</style>