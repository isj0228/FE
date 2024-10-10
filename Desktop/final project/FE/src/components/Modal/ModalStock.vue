<template>
    <div class="modal" @click.self="closeModal">
        <div class="ModalStock-Header">
            <h1>주식 검색/추가 페이지</h1>
        </div>
        <hr />
        <!-- 주식 상품 페이지 -->
        <div class="Stock-filter">
            <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="종목명 검색..."
            />
        </div>
        <v-data-table class="stockList" :items="filteredStocks" :headers="headers" item-value="id">
            <template #top>
                <th>
                    <input type="checkbox" :checked="isAllSelected" @change="toggleAll" />
                </th>
            </template>

            <template #item="{ item }">
                <tr
                    @click="toggleSelect(item)"
                    :class="{ 'selected-row': selected.includes(item.id) }"
                >
                    <td>
                        <input
                            type="checkbox"
                            :checked="selected.includes(item.id)"
                            @change="toggleSelect(item)"
                        />
                    </td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.StockName }}</td>
                    <td>{{ item.itmsNm }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.DailyPrice }}</td>
                    <td>
                        <input
                            type="number"
                            v-model.number="quantities[item.id]"
                            placeholder="개수 입력"
                        />
                    </td>
                    <td>{{ item.clpr }}</td>
                    <td>{{ (item.fltRt * 100).toFixed(2) }}%</td>
                    <td>{{ item.Field }}</td>
                </tr>
            </template>
        </v-data-table>

        <div class="ModalStock-btn">
            <v-btn @click="addToPortfolio">포트폴리오에 추가하기</v-btn>
            <v-btn @click="closeModal">모달 닫기</v-btn>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'ModalStock',
    setup(props, { emit }) {
        const searchQuery = ref('');
        const selected = ref([]);
        const quantities = ref({});

        const products = ref(dummyStocks); // 더미 데이터 사용

        const filteredStocks = computed(() => {
            return products.value.filter((product) => {
                const matchesSearch = product.StockName.toLowerCase().includes(
                    searchQuery.value.toLowerCase()
                );
                return matchesSearch;
            });
        });

        const isAllSelected = computed(() => {
            return (
                filteredStocks.value.length > 0 &&
                filteredStocks.value.every((item) => selected.value.includes(item.id))
            );
        });

        const toggleAll = () => {
            if (isAllSelected.value) {
                selected.value = [];
            } else {
                selected.value = filteredStocks.value.map((item) => item.id);
            }
        };

        const toggleSelect = (item) => {
            const index = selected.value.indexOf(item.id);
            if (index > -1) {
                // 이미 선택된 경우 선택 해제
                selected.value.splice(index, 1);
            } else {
                // 선택되지 않은 경우 선택
                selected.value.push(item.id);
            }
        };

        const addToPortfolio = () => {
            if (selected.value.length === 0) {
                alert('선택한 주식이 없습니다.');
                return; // 선택된 주식이 없으면 함수를 종료
            }
            // 선택한 주식을 포트폴리오에 추가하는 로직
            const selectedStocks = products.value.filter((product) =>
                selected.value.includes(product.id)
            );
            console.log('포트폴리오에 추가할 주식:', selectedStocks, quantities, '개');
            emit('close');
            // 실제로 포트폴리오에 추가하는 로직을 구현해야 함
        };

        const closeModal = () => {
            emit('close');
        };

        return {
            searchQuery,
            selected,
            quantities,
            filteredStocks,
            isAllSelected,
            toggleAll,
            toggleSelect,
            addToPortfolio,
            closeModal,
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
    z-index: 1000; /* 필요한 경우 */
    background-color: white; /* 배경색 */
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    width: 90%; /* 기본 너비 */
    max-width: 1080px; /* 최대 너비 */
    height: auto; /* 자동 높이 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 배치 */
}

.ModalStock-Header {
    text-align: center;
    padding: 10px; /* 패딩 추가 */
}

.Stock-filter {
    margin: 10px; /* 여백 추가 */
}

.stockList {
    flex-grow: 1; /* 남은 공간을 차지 */
    overflow-y: auto; /* 세로 스크롤 가능 */
    max-height: 450px; /* 최대 높이 조정 */
}

.selected-row {
    background-color: #e0f7fa; /* 선택된 행의 배경 색상 */
}

.ModalStock-btn {
    display: flex;
    justify-content: flex-end; /* 버튼을 우측 끝으로 정렬 */
    margin: 10px; /* 여백 추가 */
}

.ModalStock-btn v-btn {
    background-color: #4db6ac;
    margin-left: 10px; /* 버튼 간격을 추가 */
}
</style>
