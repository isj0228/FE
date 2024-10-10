<template>
  <div>
    <h1>Saving Products</h1>

    <!-- 적금 상품 정보 리스트 -->
    <div v-if="savingProducts.products && savingProducts.products.length > 0">
      <h2>Products</h2>
      <ul>
        <li v-for="product in savingProducts.products" :key="product.productId">
          <p><strong>Product Name:</strong> {{ product.finPrdtNm }}</p>
          <p><strong>Bank Name:</strong> {{ product.korCoNm }}</p>
          <p><strong>Declaration Month:</strong> {{ product.dclsMonth }}</p>
        </li>
      </ul>
    </div>

    <!-- 적금 상품 기간별 수익률 리스트 -->
    <div v-if="savingProducts.rates && savingProducts.rates.length > 0">
      <h2>Rates</h2>
      <ul>
        <li v-for="rate in savingProducts.rates" :key="rate.productId">
          <p><strong>Term:</strong> {{ rate.saveTrm }} months</p>
          <p><strong>Interest Rate Type:</strong> {{ rate.intrRateTypeNm }}</p>
          <p><strong>Interest Rate:</strong> {{ rate.intrRate }}%</p>
          <p><strong>Max Interest Rate:</strong> {{ rate.intrRate2 }}%</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SavingListView',
  computed: {
    ...mapGetters('saving',['getSavingList']),  // Vuex에서 적금 리스트 상태 가져오기
    savingProducts() {
      return this.getSavingList;  // getter를 통해 적금 상품 리스트 반환
    }
  },
  created() {
    // 컴포넌트가 생성될 때 적금 리스트 데이터 가져오기
    this.fetchSavingList();
  },
  methods: {
    ...mapActions('saving',['fetchSavingList']),  // Vuex에서 API 호출 액션 매핑
  },
};
</script>

<style scoped>
h2 {
  color: #2c3e50;
  margin-top: 20px;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>