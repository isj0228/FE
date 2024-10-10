<template>
    <div id="wrap">
        <div id="wrap-center">
            <h1 class="header">포트폴리오 구성페이지</h1>
            <v-btn @click="startTutorial">튜토리얼 시작</v-btn>
            <hr />

            <div v-if="isTutorialActive" class="overlay"></div>

            <!-- Explanatory Text Box -->
            <div v-if="isTutorialActive" class="tutorial-message" :style="tutorialStyles">
                {{ currentStep.text }}
                <div class="tutorial-buttons">
                    <v-btn @click="nextStep">다음</v-btn>
                    <v-btn @click="endTutorial">종료</v-btn>
                </div>
            </div>

            <!-- Rest of your content here -->
            <!-- Example target for highlighting -->
            <!-- <div ref="exampleElement" class="example-element">튜토리얼 예시 요소</div> -->

            <div class="recommendProportion">
                <h3>유형 별 추천 포트폴리오 구성 비율</h3>
                <div class="PortfolioChart">
                    <div class="SelectionChar">
                        <label>유형 선택 체크박스 버튼</label>
                        <div class="CharCheck-radio">
                            <label
                                ><input
                                    type="radio"
                                    name="InvestChar"
                                    value="char1"
                                    v-model="chart"
                                />
                                공격투자형</label
                            >
                            <label
                                ><input
                                    type="radio"
                                    name="InvestChar"
                                    value="char2"
                                    v-model="chart"
                                />
                                적극투자형</label
                            >
                            <label
                                ><input
                                    type="radio"
                                    name="InvestChar"
                                    value="char3"
                                    v-model="chart"
                                />
                                위험중립형</label
                            >
                            <label
                                ><input
                                    type="radio"
                                    name="InvestChar"
                                    value="char4"
                                    v-model="chart"
                                />
                                위험회피형</label
                            >
                            <label
                                ><input
                                    type="radio"
                                    name="InvestChar"
                                    value="char5"
                                    v-model="chart"
                                />
                                안정형</label
                            >
                        </div>
                    </div>
                    <div class="ProportionChart">
                        <apexchart
                            type="pie"
                            width="380"
                            :options="chartOptions"
                            :series="series"
                        ></apexchart>
                    </div>
                </div>
            </div>

            <div class="ProductSelection">
                <h1>상품종류</h1>
                <v-btn class="cart-btn" @click="openModalCart">장바구니에서 가져오기</v-btn>
                <hr />
                <div class="Product-filter">
                    <select v-model="selectedCategory">
                        <option value="">모든 카테고리</option>
                        <option value="savings">예/적금</option>
                        <option value="bonds">채권</option>
                        <option value="funds">펀드</option>
                    </select>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>카테고리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filteredProducts" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td>{{ item.category }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ModalCart
                    v-if="isModalCartOpen"
                    @close="isModalCartOpen = false"
                    @add-items="addItemsToPortfolio"
                />
            </div>

            <div class="MakePortfolio-stockList-section">
                <h1>주식 종류</h1>
                <div class="MakePortfolio-btn">
                    <v-btn @click="openModal">{{ modalButtonLabel }}</v-btn>
                </div>
                <hr />
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>주식 코드</th>
                                <th>주식명</th>
                                <th>카테고리</th>
                                <th>종가</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="portfolioStocks.length > 0">
                                <tr
                                    v-for="stock in portfolioStocks"
                                    :key="stock.stockCode"
                                    class="stock-row"
                                >
                                    <td>{{ stock.stockCode }}</td>
                                    <td>{{ stock.stockName }}</td>
                                    <td>{{ stock.category }}</td>
                                    <td>{{ stock.clpr }}</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr v-for="n in 3" :key="n">
                                    <td colspan="4" class="empty-row">빈 항목</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <ModalStock
                    v-if="isModalOpen"
                    @close="isModalOpen = false"
                    @add-stocks="addStocksToPortfolio"
                    :existingStocks="isEditMode ? portfolioStocks : []"
                />
            </div>

            <div class="MakePortfolioEnd-btn">
                <v-btn type="submit" @click="goToMyPortfolio">저장</v-btn>
                <v-btn @click="goToMyPortfolio">취소</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import VueApexCharts from 'vue3-apexcharts';
import ModalStock from '@/components/Modal/ModalStock.vue';
import ModalCart from '@/components/Modal/ModalCart.vue';

export default {
    name: 'MakePortfolio',
    components: { apexchart: VueApexCharts, ModalStock, ModalCart },
    setup() {
        const searchQuery = ref('');
        const selectedCategory = ref('');
        const selectedProducts = ref([]);
        const selectedStocks = ref([]);
        const portfolioStocks = ref([]);
        const chart = ref('char1');
        const isModalOpen = ref(false);
        const isModalCartOpen = ref(false);
        const products = ref([
            { name: '상품 1', category: 'savings' },
            { name: '상품 2', category: 'bonds' },
            { name: '상품 3', category: 'funds' },
        ]);

        const isTutorialActive = ref(false);
        const currentStepIndex = ref(0);

        // Define tutorial steps
        const tutorialSteps = [
            {
                element: 'exampleElement',
                text: '이것은 튜토리얼의 첫 번째 단계입니다.',
            },
            // Define additional steps here
        ];

        const currentStep = ref(tutorialSteps[0]);

        const startTutorial = () => {
            isTutorialActive.value = true;
            highlightElement(currentStep.value.element);
        };

        const highlightElement = (elementRefName) => {
            const element = this.$refs[elementRefName];
            if (element) {
                const rect = element.getBoundingClientRect();
                tutorialStyles.value = {
                    top: `${rect.top}px`,
                    left: `${rect.left}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                };
            }
        };

        const nextStep = () => {
            if (currentStepIndex.value < tutorialSteps.length - 1) {
                currentStepIndex.value++;
                currentStep.value = tutorialSteps[currentStepIndex.value];
                highlightElement(currentStep.value.element);
            } else {
                endTutorial();
            }
        };

        const endTutorial = () => {
            isTutorialActive.value = false;
            currentStepIndex.value = 0;
        };

        const addStocksToPortfolio = (stocks) => {
            if (isEditMode.value) {
                portfolioStocks.value = stocks;
            } else {
                portfolioStocks.value.push(...stocks);
            }
        };

        const isEditMode = computed(() => portfolioStocks.value.length > 0);
        const modalButtonLabel = computed(() => (isEditMode.value ? '수정하기' : '추가하기'));

        const filteredProducts = computed(() => {
            return products.value.filter(
                (product) =>
                    (!selectedCategory.value || product.category === selectedCategory.value) &&
                    (!searchQuery.value || product.name.includes(searchQuery.value))
            );
        });

        const chartOptions = ref({
            chart: {
                type: 'pie',
                width: 380,
            },
            labels: ['예/적금', '채권', '펀드', '주식'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        });

        const series = computed(() => {
            switch (chart.value) {
                case 'char1':
                    return [60, 20, 10, 10];
                case 'char2':
                    return [50, 30, 15, 5];
                case 'char3':
                    return [40, 45, 10, 5];
                case 'char4':
                    return [35, 50, 10, 5];
                case 'char5':
                    return [20, 65, 10, 5];
                default:
                    return [0, 0, 0, 0];
            }
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const openModalCart = () => (isModalCartOpen.value = true);
        const router = useRouter();
        const goToMyPortfolio = () => router.push('/my-portfolio');

        return {
            searchQuery,
            selectedCategory,
            selectedProducts,
            selectedStocks,
            products,
            chart,
            portfolioStocks,
            isModalOpen,
            isModalCartOpen,
            chartOptions,
            series,
            filteredProducts,
            addStocksToPortfolio,
            openModal,
            openModalCart,
            goToMyPortfolio,
            isEditMode,
            modalButtonLabel,
            isTutorialActive,
            currentStep,
            startTutorial,
            nextStep,
            endTutorial,
            tutorialStyles: ref({}),
        };
    },
};
</script>

<style scoped>
/* Overlay */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
}

/* Highlighted element */
.highlighted {
    position: relative;
    z-index: 1000;
    border: 2px solid yellow;
    background-color: rgba(255, 255, 0, 0.3);
}

/* Tutorial message box */
.tutorial-message {
    position: absolute;
    background-color: #fff;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    z-index: 1001;
}

/* Tutorial buttons */
.tutorial-buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
#wrap {
    width: 100%;
    background-color: black;
}

#wrap-center {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    background-color: #fff;
    border-radius: 8px;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.v-btn {
    background-color: #4db6ac;
    color: white;
}

.tutorial-btn-group,
.MakePortfolioEnd-btn {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 15px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.tutorial-message {
    background-color: white;
    padding: 20px;
    border: 2px solid black;
    position: absolute;
    z-index: 2;
    right: 200px;
    max-width: 600px;
}

.recommendProportion,
.ProductSelection,
.MakePortfolio-stockList-section {
    margin-bottom: 30px;
}

.Product-filter,
.CharCheck-radio {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 15px;
}

.search-input,
.select-category {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.table-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
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

.stock-row:hover {
    background-color: #f1f1f1;
}

.empty-row {
    color: #aaa;
    text-align: center;
    font-style: italic;
}
</style>
