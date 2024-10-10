<template>
  <div>
    <h1>최근 본 상품</h1>
    <ul>
      <li v-for="item in recentItems" :key="item.productId">
        {{ item.productId }}
        {{ item.productType }}
        {{ item.productName }}
      </li>
    </ul>

    <!-- 상품 추가 폼 -->
    <div>
      <h2>상품 추가</h2>
      <input v-model="newProduct.productId" placeholder="상품 ID" />
      <input v-model="newProduct.productType" placeholder="상품 유형" />
      <input v-model="newProduct.productName" placeholder="상품 이름" />
      <button @click="addRecentViewedItem">최근 본 상품 요청</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      newProduct: { // 새 상품 입력을 위한 데이터 객체
        productId: "",
        productType: "",
        productName: "",
      }
    };
  },
  computed: {
    ...mapGetters('recentView', ['recentItems']) // Vuex의 recentView 모듈에서 최근 본 상품 리스트 가져오기
  },
  methods: {
    ...mapActions('recentView', ['fetchRecentItems', 'addRecentViewItem']), // Vuex의 recentView 모듈에서 액션 가져오기

    // 최근 본 상품 추가
    async addRecentViewedItem() {
      try {
        await this.addRecentViewItem(this.newProduct); // 최근 본 상품 추가
        this.clearNewProduct();
        await this.fetchRecentItems(); // 최근 본 상품 리스트 새로고침
      } catch (error) {
        console.error('Error adding recent viewed item:', error);
      }
    },

    // 입력 필드 초기화
    clearNewProduct() {
      this.newProduct = {
        productId: "",
        productType: "",
        productName: "",
      };
    },
  },

  created() {
    this.fetchRecentItems(); // 컴포넌트 생성 시 최근 본 상품 데이터 가져오기
  }
};
</script>
