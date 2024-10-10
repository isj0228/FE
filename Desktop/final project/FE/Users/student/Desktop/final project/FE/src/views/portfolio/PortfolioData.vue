<template>
  <div>
    <h1>내 포트폴리오</h1>
    <ul>
      <li v-for="portfolio in portfolioList" :key="portfolio.portfolioId">
        {{ portfolio.portfolioId }}
        {{ portfolio.portfolioName }}
        {{ portfolio.creationDate }}
        {{ portfolio.total }}
        {{ portfolio.expectedReturn }}
        {{ portfolio.riskLevel }}
        {{ portfolio.memberNum }}
        <button @click="handleDeletePortfolio(portfolio.portfolioId)">
          삭제
        </button>
      </li>
    </ul>

    <h1>내 포트폴리오 구성 상품</h1>
    <ul>
      {{
        portfolioDetail
      }}
    </ul>

    <!-- 상품 추가 폼 -->
    <div>
      <h2>포트폴리오 추가</h2>

      <!-- 포트폴리오 이름 입력 -->
      <input
        v-model="newPortfolio.portfolioName"
        placeholder="포트폴리오 이름"
      />

      <!-- 첫 번째 상품 항목 -->
      <h3>첫 번째 상품</h3>
      <input
        v-model.number="newPortfolioItems[0].productId"
        placeholder="상품 ID"
      />
      <input v-model="newPortfolioItems[0].stockCode" placeholder="주식 코드" />
      <input
        v-model.number="newPortfolioItems[0].amount"
        placeholder="상품 수량"
      />

      <!-- 두 번째 상품 항목 -->
      <h3>두 번째 상품</h3>
      <input
        v-model.number="newPortfolioItems[1].productId"
        placeholder="상품 ID"
      />
      <input v-model="newPortfolioItems[1].stockCode" placeholder="주식 코드" />
      <input
        v-model.number="newPortfolioItems[1].amount"
        placeholder="상품 수량"
      />

      <!-- 세 번째 상품 항목 -->
      <h3>세 번째 상품</h3>
      <input
        v-model.number="newPortfolioItems[2].productId"
        placeholder="상품 ID"
      />
      <input v-model="newPortfolioItems[2].stockCode" placeholder="주식 코드" />
      <input
        v-model.number="newPortfolioItems[2].amount"
        placeholder="상품 수량"
      />

      <!-- 포트폴리오 추가 버튼 -->
      <button @click="addPortfolio">포트폴리오 추가</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    // 상태 정의
    const newPortfolio = reactive({
      portfolioName: '',
      portfolioItems: [],
    });

    const newPortfolioItems = reactive([
      { productId: null, stockCode: '', amount: null },
      { productId: null, stockCode: '', amount: null },
      { productId: null, stockCode: '', amount: null },
    ]);

    // Vuex 상태와 액션을 가져옴
    const portfolioList = store.getters['portfolio/portfolioList'];
    const portfolioDetail = store.getters['portfolio/portfolioDetail'];
    const fetchPortfolioList = store.dispatch('portfolio/fetchPortfolioList');
    const postPortfolio = store.dispatch('portfolio/postPortfolio');
    const deletePortfolio = store.dispatch('portfolio/deletePortfolio');

    // 포트폴리오 추가 함수
    const addPortfolio = async () => {
      if (newPortfolio.portfolioName.trim()) {
        try {
          await postPortfolio(newPortfolio);
          resetNewPortfolio(); // 포트폴리오 추가 후 리셋
        } catch (error) {
          console.error('Error adding portfolio:', error);
        }
      } else {
        alert('포트폴리오 이름을 입력해주세요.');
      }
    };

    // 포트폴리오 초기화 함수
    const resetNewPortfolio = () => {
      newPortfolio.portfolioName = '';
      newPortfolioItems.forEach((item) => {
        item.productId = null;
        item.stockCode = '';
        item.amount = null;
      });
    };

    // 포트폴리오 삭제 함수
    const handleDeletePortfolio = async (portfolioId) => {
      if (confirm('정말 삭제하시겠습니까?')) {
        try {
          await deletePortfolio(portfolioId);
        } catch (error) {
          console.error('Error deleting portfolio:', error);
        }
      }
    };

    // 컴포넌트가 마운트될 때 포트폴리오 목록 가져오기
    onMounted(async () => {
      try {
        await fetchPortfolioList;
      } catch (error) {
        console.error('Error loading portfolio list:', error);
      }
    });

    return {
      portfolioList,
      portfolioDetail,
      newPortfolio,
      newPortfolioItems,
      addPortfolio,
      handleDeletePortfolio,
    };
  },
};
</script>

<style scoped>
/* 추가 스타일 */
</style>
