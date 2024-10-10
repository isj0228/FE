<template>
  <div class="modal" @click.self="closeModal">
    <div class="ModalCart-Header">
      <h1>장바구니 불러오기</h1>
    </div>
    <hr />
    <!-- 장바구니 상품 검색 -->
    <div class="Cart-filter">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="상품명 검색..."
      />
    </div>
    <div class="cartList">
      <v-data-table
        class="cartListTable"
        :items="filteredCartItems"
        item-value="id"
        :headers="headers"
      >
        <template #top>
          <thead>
            <tr>
              <th @click="toggleAllSelect" style="cursor: pointer; width: 10%">
                <input type="checkbox" :checked="allSelected" />
                전체 선택
              </th>
              <th style="width: 40%">상품명</th>
              <th style="width: 40%">은행</th>
              <th style="width: 50%">상세 정보</th>
            </tr>
          </thead>
        </template>
        <template #item="{ item }">
          <tr
            :class="{ 'selected-row': selected.includes(item.id) }"
            @click="toggleSelect(item)"
          >
            <td>
              <input
                type="checkbox"
                :checked="selected.includes(item.id)"
                @change="toggleSelect(item)"
              />
            </td>
            <td>{{ item.productName }}</td>
            <td>{{ item.provider }}</td>
            <td>
              <div>
                상품 유형: {{ item.productType }}<br />
                기대수익률: {{ item.expectedReturn }}
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <div class="ModalCart-btn">
      <v-btn @click="addToPortfolio">포트폴리오에 추가하기</v-btn>
      <v-btn @click="closeModal">모달 닫기</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/store/modules/cart';
import { onMounted } from 'vue';

// Pinia 스토어를 호출하여 사용
const cartStore = useCartStore();

// 모달 닫기용 emit
const emit = defineEmits(['close']);

// 장바구니 아이템을 가져오는 메서드 호출
onMounted(async () => {
  await cartStore.getCartItems(); // 데이터 가져오기
  console.log(cartStore.cartItems); // 데이터 로드 후 출력
});

// 검색어와 선택된 항목을 관리
const searchQuery = ref('');
const selected = ref([]);

// 테이블 헤더
const headers = [
  { text: '선택', value: 'select', align: 'center' },
  { text: '상품 명', value: 'productName', align: 'center' },
  { text: '은행/제공자', value: 'provider', align: 'center' },
  { text: '상세 정보', value: 'details', align: 'start' },
];

// // 필터된 장바구니 아이템 (cartStore.cartItems를 사용)
// const filteredCartItems = computed(() => {
//   return cartStore.cartItems.filter((item) => {
//     return item.productName
//       .toLowerCase()
//       .includes(searchQuery.value.toLowerCase());
//   });
// });

// 아이템 선택/해제 토글
const toggleSelect = (item) => {
  const index = selected.value.indexOf(item.id);
  if (index > -1) {
    selected.value.splice(index, 1); // 선택 해제
  } else {
    selected.value.push(item.id); // 선택
  }
};

// 전체 선택/해제 토글
const toggleAllSelect = () => {
  if (selected.value.length === filteredCartItems.value.length) {
    selected.value = []; // 모든 선택 해제
  } else {
    selected.value = filteredCartItems.value.map((item) => item.id); // 모든 선택
  }
};

// 포트폴리오에 추가
const addToPortfolio = () => {
  if (selected.value.length === 0) {
    alert('선택한 상품이 없습니다.');
    return;
  }
  const selectedProducts = cartStore.cartItems.filter((item) =>
    selected.value.includes(item.id)
  );
  console.log('포트폴리오에 추가할 상품:', selectedProducts);
  closeModal(); // 모달 닫기
};

// 모달 닫기
const closeModal = () => {
  emit('close');
};

// // 모든 상품이 선택되었는지 여부
// const allSelected = computed(() => {
//   return selected.value.length === filteredCartItems.value.length;
// });
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1080px;
  height: auto;
  display: flex;
  flex-direction: column;
}

.ModalCart-Header {
  text-align: center;
  padding: 10px;
}

.Cart-filter {
  margin: 10px;
}

.cartListTable {
  width: 100%;
}

.cartList th {
  text-align: center;
  background-color: #f2f2f2;
  padding: 12px;
  height: auto;
  width: auto;
}

.cartList td {
  padding: 12px;
  text-align: center;
}

.selected-row {
  background-color: #e0f7fa;
}

.ModalCart-btn {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.ModalCart-btn v-btn {
  background-color: #4db6ac;
  margin-left: 10px;
}
</style>
