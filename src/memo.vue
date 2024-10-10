<template>
  <div>
    <h1>장바구니</h1>
    <ul>
      <li v-for="cartItem in cartItems" :key="cartItem.productId">
        {{ cartItem.cartId }}
        <!-- 고유 id(출력 x) -->
        {{ cartItem.productId }}
        <!-- 상품 id(출력 x) -->
        {{ cartItem.memberNum }}
        <!-- 사용자 id(출력 x) -->
        {{ cartItem.productType }}
        <!-- 상품 종류(S:예적금, B:채권, F:펀드) -->
        {{ cartItem.provider }}
        <!-- 예적금은 은행, 채권은 발행회사, 펀드는 자산운용사 -->
        {{ cartItem.productName }}
        <!-- 상품 이름 -->
        {{ cartItem.expectedReturn }}
        <!-- 기대수익률(예적금은 12개월 기준 최고금리, 펀드는 12개월 기준 수익률, 채권은 금리) -->
        {{ cartItem.rsrvType }}
        <!-- productType이 S인 상품에 대해서 null이면 예금, S면 적금 -->
        <!-- 삭제 버튼 추가 -->
        <button @click="removeCartItem(cartItem.cartId)">삭제</button>
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
      <input v-model="newProduct.rsrvType" placeholder="예적금 여부" />
      <button @click="addCart">장바구니에 추가</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { deleteCartItem, getCartList, postCartItem } from '@/api/cartApi.js';

// 장바구니 아이템 및 추가할 상품 데이터 관리
const cartItems = ref([]);
const newProduct = ref({
  productId: '',
  productType: '',
  provider: '',
  productName: '',
  expectedReturn: '',
  rsrvType: '',
});

// 장바구니 목록 가져오기
const getCartItems = async () => {
  try {
    const data = await getCartList();
    cartItems.value = data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

// 장바구니에 상품 추가
const addCart = async () => {
  try {
    const data = await postCartItem(newProduct.value); // API 호출
    cartItems.value.push(data); // 장바구니 리스트에 새로 추가된 상품 반영
    clearNewProduct(); // 입력 필드 초기화
  } catch (error) {
    console.error('Error adding cart item:', error);
  }
};

// 장바구니에서 상품 삭제
const removeCartItem = async (cartId) => {
  try {
    await deleteCartItem(cartId); // API 호출로 아이템 삭제
    cartItems.value = cartItems.value.filter((item) => item.cartId !== cartId); // 리스트에서 삭제된 아이템 제거
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
};

// 새 상품 입력 필드 초기화
const clearNewProduct = () => {
  newProduct.value = {
    productId: '',
    productType: '',
    provider: '',
    productName: '',
    expectedReturn: '',
    rsrvType: '',
  };
};

// 컴포넌트가 마운트되면 장바구니 데이터를 가져옴
onMounted(async () => {
  await getCartItems();
});
</script>
