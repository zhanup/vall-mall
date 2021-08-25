<template>
  <div>
    <Header title="编辑地址" :headerLeftStatus="true" />
    <div class="edit-address-box">
      <van-address-edit
        show-search-result
        show-delete
        show-set-default
        :address-info="address"
        :area-list="areaList"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
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
      areaList,
      address: {}
    }
  },
  created() {
    this.initAddress();
  },
  methods: {
    ...mapMutations({
      deleteAddress: 'DELETE_ADDRESS',
      updateAddress: 'UPDATE_ADDRESS'

    }),
    initAddress() {
      const { id } = this.$route.query;
      this.address = JSON.parse(localStorage.getItem('addresses')).find(item => item.id === id) || {};
    },
    onSave(address) {
      this.updateAddress(address);
      this.$router.back();
      Toast('修改成功！');
    },
    onDelete(content) {
      if (content) {
        this.deleteAddress(content.id);
        this.$router.back();
        Toast('删除成功！');
      }
    }
  }
}
</script>

<style scoped>
.edit-address-box {
  margin-top: 1.45rem;
}
::v-deep .edit-address-box .van-button--danger {
  background-color: #00acff;
  border-color: #00acff;
}
</style>