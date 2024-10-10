<template>
  <div id="wrap"></div>
  <div id="wrap-center">
    <h1 class="header">포트폴리오 구성페이지</h1>
    <v-btn @click="startTutorial">튜토리얼 시작</v-btn>
    <hr />

    <div class="overlay" v-if="isTutorialActive"></div>

    <!-- Tutorial message box that moves with the highlighted element -->
    <div
      v-if="isTutorialActive"
      class="tutorial-message"
      :style="tutorialStyles"
    >
      {{ currentMessage }}
      <v-btn @click="highlightNextElement">다음 단계</v-btn>
      <v-btn @click="endTutorial">튜토리얼 끝내기</v-btn>
    </div>

    <div class="recommendProportion">
      <h3>유형 별 추천 포트폴리오 구성 비율</h3>
      <div class="PortfolioChart">
        <div class="SelectionChar">
          <label>유형 선택 체크박스 버튼</label>
          <div class="CharCheck-radio">
            <label>
              <input
                type="radio"
                name="InvestChar"
                value="char1"
                v-model="chart"
              />
              공격투자형
            </label>
            <label>
              <input
                type="radio"
                name="InvestChar"
                value="char2"
                v-model="chart"
              />
              적극투자형
            </label>
            <label>
              <input
                type="radio"
                name="InvestChar"
                value="char3"
                v-model="chart"
              />
              위험중립형
            </label>
            <label>
              <input
                type="radio"
                name="InvestChar"
                value="char4"
                v-model="chart"
              />
              위험회피형
            </label>
            <label>
              <input
                type="radio"
                name="InvestChar"
                value="char5"
                v-model="chart"
              />
              안정형
            </label>
          </div>
        </div>
        <div class="ProportionChart">
          파이 차트
          <div id="chart">
            <apexchart
              type="pie"
              width="380"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="ProductSelection">
      <h1>상품종류</h1>
      <div class="MakePortfolio-btn">
        <v-btn @click="openModalCart">장바구니에서 가져오기</v-btn>
      </div>
      <hr />
      <!-- 일반 상품 페이지 -->
      <div class="Product-filter">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="상품명 검색..."
        />
        <select v-model="selectedCategory" class="form-select">
          <option value="">모든 카테고리</option>
          <option value="savings">예/적금</option>
          <option value="bonds">채권</option>
          <option value="funds">펀드</option>
        </select>
      </div>
      <v-data-table
        v-model="selected"
        :items="filteredProducts"
        item-value="name"
        show-select
      ></v-data-table>

      <ModalCart
        v-if="isModalCartOpen"
        :isOpen="isModalCartOpen"
        @close="isModalCartOpen = false"
        @finished="InvestMentTest = true"
        @investMentTestStarted="InvestMentTest = true"
      />

      <br />

      <!-- 주식 상품 페이지 -->
      <h1>주식 종류</h1>
      <div class="MakePortfolio-btn">
        <v-btn @click="openModal">주식 추가하기</v-btn>
      </div>
      <hr />
      <div class="Stock-filter">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="상품명 검색..."
        />
      </div>
      <v-data-table
        v-model="selected"
        :items="filteredProducts"
        item-value="id"
        show-select
      ></v-data-table>

      <ModalStock
        v-if="isModalOpen"
        :isOpen="isModalOpen"
        @close="isModalOpen = false"
        @finished="InvestMentTest = true"
        @investMentTestStarted="InvestMentTest = true"
      />

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
import VueApexCharts from 'vue3-apexcharts'; // apexcharts 파이 차트 사용.
import ModalStock from '@/components/Modal/ModalStock.vue'; // 모달 컴포넌트 import
import ModalCart from '@/components/Modal/ModalCart.vue'; // ModalCart 추가

export default {
  name: 'MakePortfolio',
  components: {
    apexchart: VueApexCharts,
    ModalStock,
    ModalCart,
  },
  setup() {
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const selected = ref([]);
    const chart = ref('char1'); // 기본 선택 값
    const isModalOpen = ref(false); // 모달 상태 관리
    const isModalCartOpen = ref(false);

    const isTutorialActive = ref(false);
    const currentStep = ref(0);
    const tutorialMessages = ref([
      '여기에 포트폴리오를 구성하세요.',
      '여기서 상품을 검색할 수 있습니다.',
      '이 버튼을 클릭하여 상품을 추가하세요.',
      '이곳에서 최종 포트폴리오를 저장할 수 있습니다.',
    ]);
    const highlightedElement = ref(null);
    const currentMessage = computed(
      () => tutorialMessages.value[currentStep.value]
    );

    const tutorialStyles = computed(() => {
      if (!highlightedElement.value) return {};

      const rect = highlightedElement.value.getBoundingClientRect();
      return {
        position: 'absolute',
        top: `${rect.top + window.scrollY + rect.height}px`, // Adjust to place below the highlighted element
        left: `${rect.left + window.scrollX}px`,
        transform: 'translate(-50%, 0)', // Center the message box
        zIndex: 2,
      };
    });

    const startTutorial = () => {
      isTutorialActive.value = true;
      currentStep.value = 0;
      highlightNextElement();
    };

    const highlightNextElement = () => {
      console.log('Highlighting next element');
      highlightedElement.value = null;

      currentStep.value++;

      // Set highlight based on the current step
      switch (currentStep.value) {
        case 0:
          highlightedElement.value = document.querySelector('.header');
          break;
        case 1:
          highlightedElement.value = document.querySelector('.Product-filter');
          break;
        case 2:
          highlightedElement.value =
            document.querySelector('.MakePortfolio-btn');
          break;
        case 3:
          highlightedElement.value = document.querySelector(
            '.MakePortfolioEnd-btn'
          );
          break;
        default:
          endTutorial();
          return;
      }

      // Scroll to the highlighted element
      if (highlightedElement.value) {
        highlightedElement.value.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    };

    const endTutorial = () => {
      isTutorialActive.value = false;
      highlightedElement.value = null;
    };

    const chartOptions = computed(() => {
      return {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['예/적금', '채권', '펀드', '주식'], // 필요에 따라 수정
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
      };
    });

    const series = computed(() => {
      switch (chart.value) {
        case 'char1':
          return [60, 20, 10, 10]; // 공격투자형 비율
        case 'char2':
          return [50, 30, 15, 5]; // 적극투자형 비율
        case 'char3':
          return [40, 45, 10, 5]; // 위험중립형 비율
        case 'char4':
          return [35, 50, 10, 5]; // 위험회피형 비율
        case 'char5':
          return [20, 65, 10, 5]; // 안정형 비율
        default:
          return [0, 0, 0, 0, 0];
      }
    });

    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        const matchesCategory = selectedCategory.value
          ? product.category === selectedCategory.value
          : true;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    });

    const openModal = () => {
      isModalOpen.value = true;
    };
    const openModalCart = () => {
      isModalCartOpen.value = true;
    };
    const router = useRouter();
    const goToMyPortfolio = () => {
      router.push('/my-portfolio'); // 포트폴리오 페이지로 이동
    };

    return {
      searchQuery,
      selectedCategory,
      selected,
      products,
      chart,
      isModalOpen,
      isModalCartOpen,
      isTutorialActive,
      currentStep,
      tutorialMessages,
      tutorialStyles,
      highlightedElement,
      currentMessage,
      startTutorial,
      highlightNextElement,
      endTutorial,
      chartOptions,
      series,
      filteredProducts,
      openModal,
      openModalCart,
      goToMyPortfolio,
    };
  },
};
</script>

<style>
#wrap {
  width: 100%;
  background-color: black;
}
#wrap-center {
  width: 100%; /* 요소의 너비를 100%로 설정하여 부모 요소의 전체 너비를 사용 */
  max-width: 1280px; /* 요소의 최대 너비를 1280px로 제한 */
  margin: 0 auto; /* 상하 여백은 0으로, 좌우 여백을 자동으로 설정하여 중앙 정렬 */
  padding: 0 40px; /* 상하 패딩은 0, 좌우 패딩은 40px으로 설정 */
}

.v-btn {
  background-color: #4db6ac;
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
  right: 200px; /* 화면 오른쪽에서 20px 위치 */
  max-width: 600px; /* 최대 너비 설정 */
  overflow: auto;
}

.recommendProportion {
  position: relative;
}

.ProductSelection {
  position: relative;
}

.MakePortfolioEnd-btn {
  margin-top: 20px;
}

.highlighted {
  background-color: rgba(255, 255, 0, 0.5); /* Yellow highlight */
  border: 2px solid red; /* Optional border for better visibility */
}
</style>
