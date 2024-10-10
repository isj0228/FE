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
                            <th style="width: 40%">상품 명</th>
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
                        <td>{{ item.name }}</td>
                        <td>
                            <div>
                                데이터 레이블1: {{ item.ProductType || item.fundType }}<br />
                                데이터 레이블2: {{ item.bank || item.baseRate || item.yield }}
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

<script>
import { ref, computed } from 'vue';

export default {
    name: 'ModalCart',
    setup(props, { emit }) {
        const searchQuery = ref('');
        const selected = ref([]);

        // 금융 상품 데이터
        const cartItems = ref([
            {
                id: 1,
                ProductType: '예적금',
                bank: '우리은행',
                name: '정기예금 A',
                baseRate: '2.5%',
                maxRate: '3.0%',
            },
            {
                id: 2,
                ProductType: '예적금',
                bank: '신한은행',
                name: '정기적금 B',
                baseRate: '3.0%',
                maxRate: '3.5%',
            },
            {
                id: 3,
                ProductType: '펀드',
                fundType: '주식형',
                name: '펀드 C',
                yield: '5.0%',
            },
            {
                id: 4,
                ProductType: '채권',
                bank: 'NH농협은행',
                name: '채권 E',
                baseRate: '6.0%',
                maxRate: '7.0%',
            },
        ]);

        const headers = [
            { text: '선택', value: 'select', align: 'center' },
            { text: '상품 명', value: 'name', align: 'center' },
            { text: '상세 정보', value: 'details', align: 'start' },
        ];

        const filteredCartItems = computed(() => {
            return cartItems.value.filter((item) => {
                return item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
            });
        });

        const toggleSelect = (item) => {
            const index = selected.value.indexOf(item.id);
            if (index > -1) {
                selected.value.splice(index, 1); // 선택 해제
            } else {
                selected.value.push(item.id); // 선택
            }
        };

        const toggleAllSelect = () => {
            if (selected.value.length === filteredCartItems.value.length) {
                selected.value = []; // 모든 선택 해제
            } else {
                selected.value = filteredCartItems.value.map((item) => item.id); // 모든 선택
            }
        };

        const addToPortfolio = () => {
            if (selected.value.length === 0) {
                alert('선택한 상품이 없습니다.');
                return;
            }
            // 선택된 상품들을 포트폴리오에 추가하는 로직
            const selectedProducts = cartItems.value.filter((item) =>
                selected.value.includes(item.id)
            );
            console.log('포트폴리오에 추가할 상품:', selectedProducts);
            emit('close'); // 모달 닫기
        };

        const closeModal = () => {
            emit('close');
        };

        // 모든 상품이 선택되었는지 여부
        const allSelected = computed(() => {
            return selected.value.length === filteredCartItems.value.length;
        });

        return {
            searchQuery,
            selected,
            filteredCartItems,
            toggleSelect,
            toggleAllSelect,
            addToPortfolio,
            closeModal,
            allSelected,
            headers,
        };
    },
};
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
    width: auto; /* 헤더 너비를 자동으로 설정 */
}

.cartList td {
    padding: 12px; /* 각 데이터 셀에 패딩 추가 */
    text-align: center; /* 데이터 셀 중앙 정렬 */
}

.cartListTable tr {
    width: 100%; /* 각 행이 100% 너비를 차지하도록 설정 */
}

.selected-row {
    background-color: #e0f7fa; /* 선택된 행의 배경 색상 */
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
