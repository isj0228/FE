<template>
  <div class="portfolio-container">
    <!-- 포트폴리오 상단 헤더 -->
    <header class="portfolio-header">
      <h1>나의 포트폴리오(상세정보)</h1>
      <h2>포트폴리오 이름 {{ portfolio.PortfolioName }}</h2>
      <!-- 포트폴리오 이름 표시 -->
    </header>

    <main class="portfolio-main">
      <!-- 포트폴리오 요약 섹션 -->
      <section class="portfolio-summary">
        <h2>포트폴리오 요약</h2>

        <!-- 투자 경과 선 그래프 -->
        <h4>포트폴리오 투자 경과</h4>
        <v-card class="mt-8 mx-auto overflow-visible" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
            rounded="lg"
          >
          </v-sheet>
        </v-card>

        <!-- 투자 비중 파이 차트 -->
        <h4>포트폴리오 투자 비중</h4>
        <VueApexCharts
          type="pie"
          width="380"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>
        <!-- ApexCharts를 이용한 파이 차트 -->
      </section>

      <!-- 포트폴리오 상세 정보 섹션 -->
      <section class="portfolio-details">
        <h2>상세 정보</h2>

        <h4>종합 예상 투자 결과</h4>
        <p>Expected return: {{ portfolio.expectedReturn }}</p>
        <!-- 예상 수익률 표시 -->
        <p>Investment duration: {{ portfolio.investmentDuration }} months</p>
        <!-- 투자 기간 표시 -->
        <p>Investment type: {{ portfolio.investmentType }}</p>
        <!-- 투자 유형 표시 -->
      </section>

      <!-- 포트폴리오 수정 및 삭제 버튼 -->
      <section class="portfolio-actions">
        <v-btn color="primary" @click="editPortfolio(portfolioId)"
          >수정하기</v-btn
        >
        <!-- 수정 버튼 -->
        <v-btn color="red" @click="deletePortfolio(portfolioId)"
          >삭제하기</v-btn
        >
        <!-- 삭제 버튼 -->
      </section>
    </main>

    <!-- 하단 푸터 -->
    <footer class="portfolio-footer">
      <p>Footer content here</p>
      <!-- 푸터 내용 -->
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'; // Composition API
import { useRoute } from 'vue-router'; // 라우트 정보 접근을 위한 useRoute import
import VueApexCharts from 'vue3-apexcharts'; // ApexCharts 컴포넌트 import

// 현재 라우트에서 포트폴리오 ID를 가져옴
const route = useRoute();
const portfolioId = route.params.id; // 라우트 파라미터에서 포트폴리오 ID 추출

// 포트폴리오 데이터를 가져오는 함수
const fetchPortfolioData = (id) => {
  // 예시용 더미 데이터, 실제 API 요청으로 대체 가능
  const portfolios = [
    {
      id: '1',
      InvestmentStartDate: '2024-09-01',
      PortfolioName: 'Growth Portfolio',
      expectedReturn: '8%',
      investmentDuration: '12',
      investmentType: 'Long-term',
    },
    {
      id: '2',
      InvestmentStartDate: '2024-06-01',
      PortfolioName: 'Income Portfolio',
      expectedReturn: '5%',
      investmentDuration: '24',
      investmentType: 'Short-term',
    },
  ];

  // 포트폴리오 ID와 일치하는 데이터를 반환
  return portfolios.find((portfolio) => portfolio.id === id) || {};
};

// 포트폴리오 데이터 상태 관리
const portfolio = ref(fetchPortfolioData(portfolioId));

// 투자 경과 그래프용 데이터
const labels = ref([]);
const investmentProgress = ref([]);

// 투자 경과를 계산하는 함수 (시작 날짜로부터 경과 일수 계산)
const calculateInvestmentProgress = () => {
  const startDate = new Date(portfolio.value.InvestmentStartDate); // 포트폴리오 시작일 가져오기
  const today = new Date(); // 현재 날짜
  const daysDifference = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  ); // 경과 일수 계산
  labels.value = Array.from(
    { length: daysDifference },
    (_, i) => `Day ${i + 1}`
  ); // 라벨 생성
  investmentProgress.value = Array.from(
    { length: daysDifference },
    () => Math.random() * 100 // 임의의 투자 경과값 생성 (실제 데이터로 교체 가능)
  );
};

// 24시간마다 투자 경과 업데이트 (2628000000 ms는 한 달)
let intervalId;

onMounted(() => {
  calculateInvestmentProgress(); // 컴포넌트 마운트 시 투자 경과 계산
  intervalId = setInterval(calculateInvestmentProgress, 2628000000); // 한 달 주기로 업데이트
});

onBeforeUnmount(() => {
  clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
});

// ApexCharts 옵션 계산
const chartOptions = computed(() => ({
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['예/적금', '채권', '펀드', '주식'], // 차트 라벨 설정
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
}));

// ApexCharts 파이 차트 데이터 (임시값)
const series = computed(() => {
  return [30, 40, 20, 10]; // 각 투자 비중 (예시 데이터)
});

// 포트폴리오 수정 함수
const editPortfolio = (id) => {
  // 포트폴리오 수정 로직
  console.log(`Editing portfolio with ID: ${id}`);
};

// 포트폴리오 삭제 함수
const deletePortfolio = (id) => {
  // 포트폴리오 삭제 로직
  console.log(`Deleting portfolio with ID: ${id}`);
};
</script>

<style scoped>
/* 스타일은 그대로 유지 */
</style>
