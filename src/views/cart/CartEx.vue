<template>
  <div class="Cart-container">
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-else-if="cart.length === 0" class="empty-cart">
      장바구니가 비어 있습니다.
    </div>
    <v-card v-else>
      <v-card-title>
        <h2>장바구니 목록</h2>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-for="item in paginatedCart" :key="item.cartID" class="cart-item">
          <div class="cart-row">
            <!-- 상품 종류: S = 예적금, B = 채권, F = 펀드 -->
            <p>상품 종류: {{ getProductType(item.productType) }}</p>
            <p>제공자: {{ item.provider }}</p>
            <!-- 예적금은 은행, 채권은 발행회사, 펀드는 자산운용사 -->
            <p>상품 이름: {{ item.productName }}</p>
            <!-- 상품 이름 -->
            <p>기대 수익률: {{ item.expectedReturn }}%</p>
            <!-- 기대수익률 (예적금은 12개월 기준 최고금리, 펀드는 12개월 기준 수익률, 채권은 금리) -->
            <p>적금 여부: {{ item.rsrvType === 'S' ? '적금' : '예금' }}</p>
            <!-- productType이 S인 상품에 대해서 null이면 예금, S면 적금 -->
            <v-btn
              class="cart-trashcanBtn"
              @click="removeFromCart(item.cartID)"
              icon
            >
              <v-icon>mdi-delete</v-icon>
              <!-- 삭제 버튼 추가 -->
            </v-btn>
          </div>
          <v-divider></v-divider>
          <div v-if="item.showDetails" class="item-details">
            <!-- Add any additional details here if needed -->
            <p>추가 세부정보: {{ item.additionalInfo }}</p>
          </div>
        </div>

        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="updatePagination"
        ></v-pagination>
      </v-card-text>

      <div class="Cart-Btn-Set">
        <v-btn class="cart-Btn-Gotocompare" @click="goToCompare"
          >상품 비교해보기</v-btn
        >
        <v-btn class="cart-Btn-GotoPortfolio" @click="goToMakePortfolio"
          >포트폴리오 구성하기</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCartList, deleteCartItem } from '@/api/cartApi';

export default {
  name: 'Cart',
  setup() {
    const router = useRouter();
    const cart = ref([]);
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const loading = ref(true); // Loading state

    // Fetch initial cart data
    onMounted(async () => {
      try {
        cart.value = await getCartList(); // Fetch cart data
        // Initialize showDetails property for each item
        cart.value.forEach((item) => {
          item.showDetails = false; // Set initial state for details
        });
      } catch (error) {
        console.error('Failed to fetch cart list:', error);
        alert('장바구니 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        loading.value = false; // Stop loading after fetch
      }
    });

    const totalPages = computed(() =>
      Math.ceil(cart.value.length / itemsPerPage)
    );

    const paginatedCart = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return cart.value.slice(start, start + itemsPerPage);
    });

    const removeFromCart = async (cartID) => {
      try {
        await deleteCartItem(cartID);
        cart.value = cart.value.filter((item) => item.cartID !== cartID);
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
        alert('장바구니에서 항목을 제거하는 중 오류가 발생했습니다.');
      }
    };

    const updatePagination = (page) => {
      currentPage.value = page;
    };

    const goToCompare = () => {
      router.push('/product-comparison');
    };

    const goToMakePortfolio = () => {
      router.push('/make-portfolio');
    };

    // Method to determine the product type display
    const getProductType = (type) => {
      switch (type) {
        case 'S':
          return '예적금'; // 예적금
        case 'B':
          return '채권'; // 채권
        case 'F':
          return '펀드'; // 펀드
        default:
          return '기타'; // 기타 (if applicable)
      }
    };

    return {
      cart,
      removeFromCart,
      currentPage,
      totalPages,
      paginatedCart,
      updatePagination,
      goToCompare,
      goToMakePortfolio,
      loading,
      getProductType, // Expose the method
    };
  },
};
</script>

<style scoped>
.Cart-container {
  padding: 20px;
}

.empty-cart {
  text-align: center;
  margin: 20px 0;
  color: #ff5722;
  font-weight: bold;
}

.cart-item {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.cart-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.cart-trashcanBtn {
  flex: 0 0 auto;
  margin-left: auto;
}

/* Additional styles can be added as needed */
</style>
