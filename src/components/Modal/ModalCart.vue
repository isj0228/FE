<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <div class="ModalCart-Header">
                <h1>장바구니 불러오기</h1>
            </div>
            <hr />
            <!-- 상품 종류 필터 -->
            <div class="Cart-filter">
                <select v-model="selectedProductType" class="product-type-filter">
                    <option value="">모든 상품</option>
                    <option value="S">예/적금</option>
                    <option value="B">채권</option>
                    <option value="F">펀드</option>
                </select>
            </div>
            <!-- 장바구니 목록 -->
            <div class="cartList">
                <table class="cartListTable">
                    <thead>
                        <tr>
                            <th style="width: 10%">
                                <input
                                    type="checkbox"
                                    @change="toggleAllSelect"
                                    :checked="allSelected"
                                />
                                전체 선택
                            </th>
                            <th style="width: 30%">상품 명</th>
                            <th style="width: 20%">상품 종류</th>
                            <th style="width: 30%">상세 정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in paginatedCartItems"
                            :key="item.cartId"
                            :class="{ 'selected-row': selected.includes(item.cartId) }"
                            @click="toggleSelect(item)"
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    :checked="selected.includes(item.cartId)"
                                    @change.stop="toggleSelect(item)"
                                />
                            </td>
                            <td>{{ item.productName }}</td>
                            <td>
                                <span v-if="item.productType === 'S'">
                                    {{ item.rsrvType === 'S' ? '적금' : '예금' }}
                                </span>
                                <span v-else-if="item.productType === 'B'">채권</span>
                                <span v-else-if="item.productType === 'F'">펀드</span>
                                <span v-else>기타</span>
                            </td>
                            <td>
                                제공자: {{ item.provider }}<br />
                                기대 수익률: {{ item.expectedReturn }}%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 페이지네이션 -->
            <div class="pagination-controls">
                <button @click="changePage(-1)" :disabled="currentPage === 1">이전 페이지</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button @click="changePage(1)" :disabled="currentPage === totalPages">
                    다음 페이지
                </button>
            </div>

            <div class="ModalCart-btn">
                <button @click="addToPortfolio">포트폴리오에 추가하기</button>
                <button @click="closeModal">모달 닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { getCartList } from '@/api/cartApi'; // Cart.vue에서 사용한 API를 가져옵니다.

export default {
    name: 'ModalCart',
    setup(props, { emit }) {
        const selected = ref([]);
        const selectedProductType = ref('');
        const cartItems = ref([]);
        const currentPage = ref(1);
        const itemsPerPage = ref(4); // 한 페이지에 4개씩 표시

        // 백엔드에서 장바구니 데이터 가져오기
        onMounted(async () => {
            try {
                cartItems.value = await getCartList();
            } catch (error) {
                console.error('장바구니 데이터를 불러오는 중 오류 발생:', error);
                alert('장바구니 정보를 불러오는 중 오류가 발생했습니다.');
            }
        });

        // 선택한 상품 종류로 필터링된 전체 리스트
        const filteredCartItems = computed(() => {
            return cartItems.value.filter((item) => {
                const matchesType = selectedProductType.value
                    ? item.productType === selectedProductType.value
                    : true;
                return matchesType;
            });
        });

        // 페이지네이션을 적용한 리스트
        const paginatedCartItems = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return filteredCartItems.value.slice(start, end);
        });

        // 총 페이지 수 계산
        const totalPages = computed(() => {
            return Math.ceil(filteredCartItems.value.length / itemsPerPage.value) || 1;
        });

        // 개별 상품 선택/해제
        const toggleSelect = (item) => {
            const index = selected.value.indexOf(item.cartId);
            if (index > -1) {
                selected.value.splice(index, 1);
            } else {
                selected.value.push(item.cartId);
            }
        };

        // 전체 선택/해제
        const toggleAllSelect = () => {
            if (allSelected.value) {
                selected.value = [];
            } else {
                selected.value = paginatedCartItems.value.map((item) => item.cartId);
            }
        };

        // 전체 선택 여부 확인
        const allSelected = computed(() => {
            return (
                selected.value.length > 0 &&
                selected.value.length === paginatedCartItems.value.length
            );
        });

        // 페이지 변경
        const changePage = (direction) => {
            currentPage.value += direction;
        };

        // 상품 종류 필터 변경 시 페이지 및 선택 초기화
        watch(selectedProductType, () => {
            currentPage.value = 1;
            selected.value = [];
        });

        // 포트폴리오에 선택된 상품 추가
        const addToPortfolio = () => {
            if (selected.value.length === 0) {
                alert('선택한 상품이 없습니다.');
                return;
            }
            const selectedProducts = cartItems.value.filter((item) =>
                selected.value.includes(item.cartId)
            );
            // 선택된 상품들을 부모 컴포넌트로 전달
            emit('add-items', selectedProducts);
            closeModal();
        };

        const closeModal = () => {
            emit('close');
        };

        return {
            selected,
            selectedProductType,
            paginatedCartItems,
            toggleSelect,
            toggleAllSelect,
            addToPortfolio,
            closeModal,
            allSelected,
            currentPage,
            totalPages,
            changePage,
        };
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background-color: white;
    border-radius: 8px;
    width: 80%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 20px;
}

.ModalCart-Header {
    text-align: center;
}

.Cart-filter {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.product-type-filter {
    padding: 5px;
}

.cartListTable {
    width: 100%;
    border-collapse: collapse;
}

.cartListTable th,
.cartListTable td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.selected-row {
    background-color: #e0f7fa;
}

.ModalCart-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    gap: 10px;
}

.ModalCart-btn button {
    padding: 10px 20px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.ModalCart-btn button:hover {
    background-color: #399d91;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
}

.pagination-controls button {
    padding: 5px 10px;
}
</style>
