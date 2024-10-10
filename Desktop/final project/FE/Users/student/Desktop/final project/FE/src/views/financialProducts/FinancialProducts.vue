<template>
    <div class="financial-products-container">
        <h1>금융상품 페이지</h1>

        <!-- 탭 버튼 -->
        <div class="tabs">
            <v-btn
                v-for="tab in tabs"
                :key="tab.value"
                :class="{ 'v-btn--active': selectedCategory === tab.value }"
                @click="selectTab(tab.value)"
                class="nav-button"
                :style="selectedCategory === tab.value ? activeButtonStyle : {}"
            >
                {{ tab.label }}
            </v-btn>
        </div>

        <!-- 주식 리스트 -->
        <stock-list v-if="selectedCategory === 'stocks'" />

        <!-- 검색 및 필터링 -->
        <div class="search-filter mb-4" v-if="selectedCategory !== 'stocks'">
            <input
                v-model="searchQuery"
                type="text"
                class="form-control mb-2"
                placeholder="상품명 검색..."
                @input="handleSearch"
            />
        </div>

        <!-- 로딩 중 메시지 -->
        <div v-if="isLoading" class="text-center my-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>상품 정보를 불러오는 중입니다...</p>
        </div>

        <!-- 에러 메시지 -->
        <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
        </div>

        <!-- 상품 리스트 -->
        <div v-else v-if="selectedCategory !== 'stocks'">
            <table class="table">
                <thead>
                    <tr>
                        <th>상품명</th>
                        <template v-if="selectedCategory === 'funds'">
                            <th>회사명</th>
                            <th>펀드유형</th>
                            <th>위험도</th>
                            <th>1개월 수익률</th>
                        </template>
                        <template
                            v-else-if="
                                selectedCategory === 'deposit' || selectedCategory === 'savings'
                            "
                        >
                            <th>금융회사명</th>
                            <th>기본금리</th>
                            <th>최고금리</th>
                        </template>
                        <template v-else-if="selectedCategory === 'bonds'">
                            <th>ISIN 코드명</th>
                            <th>채권발행일자</th>
                            <th>채권금리</th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in filteredProducts" :key="product.productId">
                        <!-- 상품명 -->
                        <td @click="gotoDetail(product.productId)" class="Detail-Link">
                            {{ getProductName(product) }}
                        </td>

                        <!-- 펀드 정보 -->
                        <template v-if="selectedCategory === 'funds'">
                            <td>{{ product.companyNm }}</td>
                            <td>{{ product.fundType }}</td>
                            <td>{{ product.riskLevel }}</td>
                            <td>{{ product.yield1 }}%</td>
                        </template>

                        <!-- 예금 및 적금 정보 -->
                        <template
                            v-else-if="
                                selectedCategory === 'deposit' || selectedCategory === 'savings'
                            "
                        >
                            <td>{{ product.korCoNm }}</td>
                            <td>{{ getRate(product.productId, 12).intrRate }}%</td>
                            <td>{{ getRate(product.productId, 12).intrRate2 }}</td>
                        </template>

                        <!-- 채권 정보 -->
                        <template v-else-if="selectedCategory === 'bonds'">
                            <td>{{ product.isinCdNm }}</td>
                            <td>{{ product.bondIssuDt }}</td>
                            <td>{{ product.bondSrfcInrt }}</td>
                        </template>

                        <!-- 장바구니 버튼 -->
                        <td>
                            <v-btn
                                icon
                                @click="toggleCartAndIncreaseHit(product.productId)"
                                :style="{
                                    backgroundColor: cart.includes(product.productId)
                                        ? '#4caf50'
                                        : '',
                                    color: cart.includes(product.productId) ? 'white' : '',
                                }"
                            >
                                <v-icon>mdi-cart</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 페이지네이션 -->
            <div id="Pagination" class="mt-4 pagination-buttons">
                <button
                    :disabled="currentPage === 1"
                    @click="changePage(currentPage - 1)"
                    class="pagination-btn"
                >
                    이전
                </button>

                <button v-if="currentPage > 3" @click="changePage(1)" class="pagination-btn">
                    1
                </button>

                <span v-if="currentPage > 4" class="pagination-ellipsis">...</span>

                <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="changePage(page)"
                    :class="['pagination-btn', { active: currentPage === page }]"
                >
                    {{ page }}
                </button>

                <span v-if="currentPage < totalPages - 3" class="pagination-ellipsis">...</span>

                <button
                    v-if="currentPage < totalPages - 2"
                    @click="changePage(totalPages)"
                    class="pagination-btn"
                >
                    {{ totalPages }}
                </button>

                <button
                    :disabled="currentPage === totalPages"
                    @click="changePage(currentPage + 1)"
                    class="pagination-btn"
                >
                    다음
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { increaseAgeGroupProductHit, increasePreferenceProductHit } from '@/api/hit';
import { fetchDepositProducts, fetchSavingProducts } from '@/api/financeApi.js';
import StockList from '@/views/stock/StockList.vue'; // StockList 컴포넌트 임포트

export default {
    name: 'FinancialProducts',
    components: {
        StockList, // StockList 컴포넌트 등록
    },
    setup() {
        const store = useStore();
        const searchQuery = ref('');
        const selectedCategory = ref('');

        const cart = ref([]);
        const displayedProducts = ref([]);
        const currentPage = ref(1);
        const pageSize = ref(10);
        const totalPages = ref(1);
        const isLoading = ref(false);
        const error = ref(null);

        const router = useRouter();
        const route = useRoute();

        const tabs = [
            { label: '예금', value: 'deposit' },
            { label: '적금', value: 'savings' },
            { label: '채권', value: 'bonds' },
            { label: '펀드', value: 'funds' },
            { label: '주식', value: 'stocks' }, // 주식 탭 추가
        ];

        const activeButtonStyle = {
            backgroundColor: '#3961e4',
            color: 'white',
        };

        const getProductName = (product) => {
            if (selectedCategory.value === 'bonds') {
                return product.isinCdNm || '상품명 없음';
            } else if (selectedCategory.value === 'funds') {
                return product.productNm || '상품명 없음';
            } else {
                return product.finPrdtNm || '상품명 없음';
            }
        };

        const getRate = (productId, term) => {
            const product = displayedProducts.value.find((p) => p.productId === productId);
            if (product && product.yield) {
                const rate = product.yield.find((r) => r.saveTrm === term);
                return rate || {};
            }
            return {};
        };

        const loadProducts = async (page) => {
            isLoading.value = true;
            error.value = null;
            try {
                if (selectedCategory.value === 'bonds') {
                    await store.dispatch('bond/fetchBondList', { page, pageSize: pageSize.value });
                    const bonds = store.getters['bond/getBondList'];
                    if (!Array.isArray(bonds)) {
                        throw new Error('채권 리스트가 배열이 아닙니다.');
                    }
                    displayedProducts.value = bonds.map((product) => ({
                        ...product,
                        yield: [],
                        type: selectedCategory.value,
                    }));
                    totalPages.value = store.getters['bond/getTotalPages'] || 1;
                } else if (selectedCategory.value === 'funds') {
                    await store.dispatch('fund/fetchFundList', { page, pageSize: pageSize.value });
                    const funds = store.getters['fund/getFundList'];
                    if (!Array.isArray(funds)) {
                        throw new Error('펀드 리스트가 배열이 아닙니다.');
                    }
                    displayedProducts.value = funds.map((product) => ({
                        ...product,
                        yield: [],
                        type: selectedCategory.value,
                    }));
                    totalPages.value = store.getters['fund/getTotalPages'] || 1;
                } else if (selectedCategory.value === 'deposit') {
                    const data = await fetchDepositProducts(page, pageSize.value);
                    if (data.products && data.rates) {
                        const productRatesMap = data.rates.reduce((acc, rate) => {
                            if (!acc[rate.productId]) {
                                acc[rate.productId] = [];
                            }
                            acc[rate.productId].push(rate);
                            return acc;
                        }, {});

                        displayedProducts.value = data.products.map((product) => ({
                            ...product,
                            finPrdtNm: product.finPrdtNm || '상품명 없음',
                            yield: productRatesMap[product.productId]
                                ? productRatesMap[product.productId]
                                      .sort((a, b) => a.saveTrm - b.saveTrm)
                                      .map((r) => ({
                                          saveTrm: r.saveTrm,
                                          intrRate: r.intrRate,
                                          intrRate2: r.intrRate2 || r.intrRate,
                                      }))
                                : [],
                            type: selectedCategory.value,
                        }));
                        totalPages.value = data.totalPages || 1;
                    } else {
                        throw new Error('예금 데이터를 불러오는데 문제가 있습니다.');
                    }
                } else if (selectedCategory.value === 'savings') {
                    const data = await fetchSavingProducts(page, pageSize.value);
                    if (data.products && data.rates) {
                        const productRatesMap = data.rates.reduce((acc, rate) => {
                            if (!acc[rate.productId]) {
                                acc[rate.productId] = [];
                            }
                            acc[rate.productId].push(rate);
                            return acc;
                        }, {});

                        displayedProducts.value = data.products.map((product) => ({
                            ...product,
                            finPrdtNm: product.finPrdtNm || '상품명 없음',
                            yield: productRatesMap[product.productId]
                                ? productRatesMap[product.productId]
                                      .sort((a, b) => a.saveTrm - b.saveTrm)
                                      .map((r) => ({
                                          saveTrm: r.saveTrm,
                                          intrRate: r.intrRate,
                                          intrRate2: r.intrRate2 || r.intrRate,
                                      }))
                                : [],
                            type: selectedCategory.value,
                        }));
                        totalPages.value = data.totalPages || 1;
                    } else {
                        throw new Error('적금 데이터를 불러오는데 문제가 있습니다.');
                    }
                }
            } catch (err) {
                console.error('상품 정보를 불러오는 중 오류 발생:', err);
                error.value = '상품 정보를 불러오는 중 오류가 발생했습니다.';
            } finally {
                isLoading.value = false;
            }
        };

        const changePage = (page) => {
            if (page < 1 || page > totalPages.value) return;

            router
                .push({
                    name: 'Products',
                    params: { category: selectedCategory.value },
                    query: { page, pageSize: pageSize.value },
                })
                .then(() => {
                    console.log('라우터 변경 완료:', router.currentRoute.value.fullPath);
                })
                .catch((error) => {
                    console.error('라우터 변경 중 오류:', error);
                });
        };

        const gotoDetail = (productId) => {
            const productTypeMap = {
                savings: 'saving',
                bonds: 'bond',
                funds: 'fund',
                deposit: 'deposit',
            };

            const productType = productTypeMap[selectedCategory.value] || 'deposit';

            if (!productType) {
                console.error('productType이 설정되지 않았습니다.');
                return;
            }

            router.push({
                path: `/list/${productId}`,
                query: { productType },
            });
        };

        // 장바구니 기능
        const toggleCartAndIncreaseHit = async (productId) => {
          
          // 장바구니 토글
          const index = cart.value.indexOf(productId);
          if (index === -1) {
            cart.value.push(productId);
          } else {
            cart.value.splice(index, 1);
          }
          if (!cart.value.includes(productId)) {
                cart.value.push(productId);
                alert(`상품 ID ${productId}이 장바구니에 추가되었습니다.`);
          }

          // 조회수 증가 API 호출 (연령대 및 투자성향)
          try {
            
            // 연령대에 따른 조회수 증가
            await increaseAgeGroupProductHit(productId);

            // 투자성향에 따른 조회수 증가
            await increasePreferenceProductHit(productId);
          } catch (error) {
            console.error('조회수 증가 오류: ', error);
            alert('조회수를 증가하는 중 오류가 발생했습니다.');
          }
        };

        const filteredProducts = computed(() => {
            return displayedProducts.value.filter((product) => {
                let productName =
                    selectedCategory.value === 'bonds' ? product.isinCdNm : product.finPrdtNm;

                return productName?.toLowerCase().includes(searchQuery.value.toLowerCase());
            });
        });

        const handleSearch = () => {
            currentPage.value = 1;
            router.push({
                name: 'Products',
                params: { category: selectedCategory.value },
                query: { page: 1, pageSize: pageSize.value },
            });
        };

        const selectTab = (category) => {
            selectedCategory.value = category;
            currentPage.value = 1;
            router.push({
                name: 'Products',
                params: { category },
                query: { page: 1, pageSize: pageSize.value },
            });
        };

        // visiblePages 계산 속성 추가
        const visiblePages = computed(() => {
            const pages = [];
            const total = totalPages.value;
            const current = currentPage.value;

            if (total <= 7) {
                // 총 페이지 수가 7 이하일 때 모든 페이지 표시
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                // 첫 번째 페이지는 항상 표시
                pages.push(1);

                // 첫 번째 이후부터 currentPage 앞에 "..." 표시
                if (current > 4) {
                    pages.push('...');
                }

                // 현재 페이지를 중심으로 ±2 페이지씩 표시
                const startPage = Math.max(2, current - 2);
                const endPage = Math.min(total - 1, current + 2);

                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }

                // 마지막 페이지 앞에 "..." 표시
                if (current < total - 3) {
                    pages.push('...');
                }

                // 마지막 페이지는 항상 표시
                pages.push(total);
            }

            return pages;
        });

        watch(
            () => [route.params.category, route.query.page, route.query.pageSize],
            ([newCategory, newPage, newPageSize]) => {
                console.log('watch로 경로 변경 감지:', newCategory, newPage, newPageSize);

                selectedCategory.value = newCategory || 'all';
                currentPage.value = parseInt(newPage) || 1;
                pageSize.value = parseInt(newPageSize) || 10;

                loadProducts(currentPage.value);
            },
            { immediate: true }
        );

        return {
            searchQuery,
            selectedCategory,
            tabs,
            filteredProducts,
            gotoDetail,
            currentPage,
            totalPages,
            changePage,
            isLoading,
            error,
            handleSearch,
            selectTab,
            activeButtonStyle,
            getProductName,
            getRate,
            cart,
            visiblePages, // visiblePages 추가
            toggleCartAndIncreaseHit // 장바구니 추가 및 조회수 증가
        };
    },
};
</script>

<style scoped>
.financial-products-container {
    width: 100%;
    padding: 20px;
}

.tabs {
    display: flex;
    margin-bottom: 20px;
}

.nav-button {
    text-align: center;
    width: 20%; /* 각 탭 버튼이 동일한 너비를 가지도록 설정 */
    margin: 0;
}

.active-button {
    background-color: #3961e4;
    color: white;
}

.search-filter {
    display: flex;
    justify-content: center;
}

.search-filter input {
    width: 300px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table th,
.table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.Detail-Link {
    cursor: pointer;
    color: #007bff;
}

.Detail-Link:hover {
    text-decoration: underline;
}

.v-btn--active {
    background-color: #3961e4 !important;
    color: white !important;
}

.pagination-btn {
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    font-size: 14px;
}

.pagination-btn.active {
    background-color: #3961e4;
    color: white;
}

.pagination-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
