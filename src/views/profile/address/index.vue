<template>
  <div class="address">
    <Header title="收货地址" :headerLeftStatus="true" />
    <div class="address-box">
      <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      />
    </div>
    
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Address',
  components: {
    Header
  },
  data() {
    return {
      chosenAddressId: 0
    }
  },
  computed: {
    ...mapGetters({
      addressList: 'addressList'
    })
  },
  methods: {
    onAdd() {
      this.$router.push('/new_address');
    },
    onEdit(item) {
      this.$router.push({
        path: '/edit_address',
        query: {
          id: item.id
        }
      });
    }
  },
  created() {
    this.chosenAddressId = this.addressList[0] ? this.addressList[0].id : ''
  },
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
.address-box .van-tag--danger {
    background-color: #00acff;
}
::v-deep .address-box .van-address-item .van-radio__icon--checked .van-icon-success {
  background-color: #00acff;
  border-color: #00acff;
}
</style>