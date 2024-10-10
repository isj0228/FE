<template>
  <div>
    <h1>장바구니</h1>
    <ul>
      <li v-for="cartItem in cartItems" :key="cartItem.productId">
        {{ cartItem.cartId }}
        {{ cartItem.productId }}
        {{ cartItem.memberNum }}
        {{ cartItem.productType }}
        {{ cartItem.provider }}
        {{ cartItem.productName }}
        {{ cartItem.expectedReturn }}
        {{ cartItem.interestRate }}
        <!-- 삭제 버튼 추가 -->
        <button @click="removeCartItem(cartItem.productId)">삭제</button>
      </li>
    </ul>

    <!-- 상품 추가 폼 -->
    <div>
      <h2>상품 추가</h2>
      <input v-model="newProduct.productId" placeholder="상품 ID" />
      <input v-model="newProduct.productType" placeholder="상품 유형" />
      <input v-model="newProduct.provider" placeholder="제공자" />
      <input v-model="newProduct.productName" placeholder="상품 이름" />
      <input v-model="newProduct.expectedReturn" placeholder="예상 수익" />
      <input v-model="newProduct.interestRate" placeholder="이자율" />
      <button @click="addCart">장바구니에 추가</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      newProduct: { // 새로운 상품 정보 입력을 위한 데이터 객체
        productId: "",
        productType: "",
        provider: "",
        productName: "",
        expectedReturn: "",
        interestRate: ""
      }
    };
  },
  computed: {
    ...mapGetters('cart', ['cartItems']), // cart 모듈의 cartItems 게터 사용
  },
  methods: {
    ...mapActions('cart', ['getCartItems','addCartItem', 'removeCartItem']), // cart 모듈의 액션 사용

    // 장바구니에 상품 추가
    addCart() {
      this.addCartItem(this.newProduct) // Vuex 액션 호출
          .then(() => {
            this.clearNewProduct(); // 입력 필드 초기화
            this.getCartItems();
          })
          .catch((error) => {
            console.error("장바구니 추가시 에러 발생: ", error);
          });
    },

    // 입력 필드 초기화
    clearNewProduct() {
      this.newProduct = {
        productId: "",
        productType: "",
        provider: "",
        productName: "",
        expectedReturn: "",
        interestRate: ""
      };
    },
  },
  async mounted() {
    try {
      await this.getCartItems();
    } catch (error) {
      console.error("Error loading portfolio list:", error);
    }
  },
};
</script>