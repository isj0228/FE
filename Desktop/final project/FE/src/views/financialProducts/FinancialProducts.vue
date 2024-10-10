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
        <div class="stock-container">
            <stock-search v-if="selectedCategory === 'stocks'" />
            <stock-list v-if="selectedCategory === 'stocks'" />
        </div>

        <!-- 검색 및 필터링 -->
        <div class="search-box" v-if="selectedCategory !== 'stocks'">
            <input
                v-model="searchQuery"
                type="text"
                class="search-input mb-2"
                placeholder="상품명 검색..."
                @keydown.enter="handleSearch"
            />
            <button @click="handleSearch" class="search-btn">검색</button>
            <button @click="eraseFilter" class="erase-filter-btn">
                {{ isSearched ? '되돌리기' : '지우기' }}
            </button>
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
                    <!-- 검색 결과가 없을 때 메시지 -->
                    <p
                        v-if="
                            filteredProducts.length === 0 && searchQuery.length >= 2 && !isLoading
                        "
                    >
                        검색 결과가 없습니다.
                    </p>
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
                <div class="pagination-container">
                    <button
                        :disabled="currentPage === 1"
                        @click="changePageWithScroll(1, $event)"
                        class="pagination-btn"
                    >
                        처음
                    </button>

                    <button
                        :disabled="currentPage === 1"
                        @click="changePageWithScroll(currentPage - 1, $event)"
                        class="pagination-btn"
                    >
                        이전
                    </button>

                    <span v-if="currentPage > 4" class="pagination-ellipsis">...</span>

                    <button
                        v-for="page in visiblePages"
                        :key="page"
                        @click="changePageWithScroll(page, $event)"
                        :class="['pagination-btn', { active: currentPage === page }]"
                    >
                        {{ page }}
                    </button>

                    <span v-if="currentPage < totalPages - 3" class="pagination-ellipsis">...</span>

                    <button
                        :disabled="currentPage === totalPages"
                        @click="changePageWithScroll(currentPage + 1, $event)"
                        class="pagination-btn"
                    >
                        다음
                    </button>

                    <button
                        :disabled="currentPage === totalPages"
                        @click="changePageWithScroll(totalPages, $event)"
                        class="pagination-btn"
                    >
                        끝
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';
import { useBondStore } from '@/store/modules/bond.js'; // Pinia bond store 사용
import { useFundStore } from '@/store/modules/fund.js'; // Pinia fund store 사용
import cartModule from '@/store/modules/cart.js';
import { useRouter, useRoute } from 'vue-router';
import { increaseAgeGroupProductHit, increasePreferenceProductHit } from '@/api/hit';
import { fetchDepositProducts, fetchSavingProducts } from '@/api/financeApi.js';
import StockList from '@/views/stock/StockList.vue';
import StockSearch from '@/views/stock/StockSearch.vue';

export default {
    name: 'FinancialProducts',
    components: {
        StockList,
        StockSearch,
    },

    setup() {
        // const store = useStore();
        const bondStore = useBondStore(); // Pinia bond store 호출
        const fundStore = useFundStore(); // Pinia fund store 호출
        const addCart = cartModule;

        const searchQuery = ref('');
        const selectedCategory = ref('');

        const cart = ref([]);
        const displayedProducts = ref([]);
        const currentPage = ref(1);
        const pageSize = ref(10);
        const totalPages = ref(1);
        const isLoading = ref(false);
        const error = ref(null);
        const isSearched = ref(false);

        const router = useRouter();
        const route = useRoute();

        const tabs = [
            { label: '예금', value: 'deposit' },
            { label: '적금', value: 'savings' },
            { label: '채권', value: 'bonds' },
            { label: '펀드', value: 'funds' },
            { label: '주식', value: 'stocks' },
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

        // 상품 리스트 가져오기(load)
        const loadProducts = async (page) => {
            isLoading.value = true;
            error.value = null;
            try {
                if (selectedCategory.value === 'bonds') {
                    await bondStore.fetchBondList(page, pageSize.value);
                    displayedProducts.value = bondStore.getBondList;
                    totalPages.value = bondStore.getTotalPages;
                } else if (selectedCategory.value === 'funds') {
                    await fundStore.fetchFundList(page, pageSize.value);
                    displayedProducts.value = fundStore.getFundList;
                    totalPages.value = fundStore.getTotalPages;
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

                // 상품 리스트가 로드되면 필터링된 상품 리스트 초기화
                filteredProducts.value = displayedProducts.value;
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
        const changePageWithScroll = (page, event) => {
            changePage(page); // 페이지 변경 호출
            event.target.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 부드럽게 스크롤
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

        const toggleCartAndIncreaseHit = async (productId) => {
            const index = cart.value.indexOf(productId);
            if (index === -1) {
                cart.value.push(productId);
            } else {
                cart.value.splice(index, 1);
            }
            if (!cart.value.includes(productId)) {
                cart.value.push(productId);
                cart.value.push(addCart);
                alert(`상품 ID ${productId}이 장바구니에 추가되었습니다.`);

                // await addCartItem(productId);
            }

            try {
                await cartModule.addCartItem();
                await increaseAgeGroupProductHit(productId);
                await increasePreferenceProductHit(productId);
            } catch (error) {
                console.error('조회수 증가 오류: ', error);
                alert('조회수를 증가하는 중 오류가 발생했습니다.');
            }
        };

        const filteredProducts = ref([]); // 필터링된 결과를 저장할 ref

        const handleSearch = () => {
            if (searchQuery.value.length < 2) {
                alert('2글자 이상을 입력하세요');
                return;
            }
            filteredProducts.value = displayedProducts.value.filter((product) => {
                let productName;
                if (selectedCategory.value === 'bonds') {
                    productName = product.isinCdNm;
                } else if (selectedCategory.value === 'funds') {
                    productName = product.productNm;
                } else {
                    productName = product.finPrdtNm;
                }
                return productName?.toLowerCase().includes(searchQuery.value.toLowerCase());
            });
            isSearched.value = true; // 검색 완료 후 상태 변경
        };

        const eraseFilter = () => {
            searchQuery.value = '';
            filteredProducts.value = displayedProducts.value;
            isSearched.value = false; // 검색 상태 초기화
        };

        const selectTab = (category) => {
            searchQuery.value = '';
            selectedCategory.value = category;
            currentPage.value = 1;
            router.push({
                name: 'Products',
                params: { category },
                query: { page: 1, pageSize: pageSize.value },
            });
        };

        const visiblePages = computed(() => {
            const pages = [];
            const total = totalPages.value;
            const current = currentPage.value;

            if (total <= 7) {
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                if (current > 4) pages.push('...');
                const startPage = Math.max(2, current - 2);
                const endPage = Math.min(total - 1, current + 2);

                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }

                if (current < total - 3) pages.push('...');
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
            eraseFilter,
            gotoDetail,
            currentPage,
            totalPages,
            changePage,
            changePageWithScroll,
            isLoading,
            error,
            handleSearch,
            selectTab,
            activeButtonStyle,
            getProductName,
            getRate,
            cart,
            visiblePages,
            toggleCartAndIncreaseHit,
            isSearched,
            // addCartItem,
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

.search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.search-input {
    width: 60%; /* 버튼과 나란히 배치되도록 너비 설정 */
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: #5bc0de;
    outline: none;
}

.search-btn {
    padding: 10px 15px;
    margin-left: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search-btn:hover {
    background-color: #0056b3;
}

.erase-filter-btn {
    padding: 10px 15px;
    margin-left: 10px;
    background-color: #f0f0f0;
    color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.erase-filter-btn:hover {
    background-color: #ddd;
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

.table tbody tr:hover {
    background-color: #f1f1f1;
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

.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px; /* 페이지네이션 너비 고정 */
    margin: 0 auto;
}

.pagination-btn {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 14px;
    margin: 0 5px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.pagination-btn.active {
    background-color: #3961e4;
    color: white;
}

.pagination-btn:hover {
    background-color: #007bff;
    color: white;
}

.pagination-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* 페이지네이션의 ... 표시 */
.pagination-ellipsis {
    margin: 0 8px;
    font-size: 16px;
    color: #333;
}
</style>
