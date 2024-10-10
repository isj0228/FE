<template>
  <div class="MyPortfolio-container">
    <h1>내 포트폴리오 리스트 페이지</h1>
    <div class="MyPortfolio-DataTable">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                v-model="allSelected"
                @change="toggleSelectAll"
              />
            </th>
            <th @click="sortBy('portfolioName')">
              포트폴리오 이름
              <span v-if="sortKey === 'portfolioName'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="sortBy('total')">
              투자 총액
              <span v-if="sortKey === 'total'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="sortBy('expectedReturn')">
              기대 수익률
              <span v-if="sortKey === 'expectedReturn'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="sortBy('riskLevel')">
              위험도
              <span v-if="sortKey === 'riskLevel'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in sortedPortfolioList" :key="item.id">
            <td>
              <input
                type="checkbox"
                v-model="selected"
                :value="item.portfolioId"
                @change="updateSelectAllState"
              />
            </td>
            <td
              class="NameCursor"
              @click="openPortfolioInSidePanel(item)"
            >
              {{ item.portfolioName }}
            </td>
            <td>{{ item.total }}원</td>
            <td>{{ item.expectedReturn }}%</td>
            <td>{{ item.riskLevel }}등급</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="MyPortfolio-btn">
      <button @click="goToCreatePortfolio">포트폴리오 만들러 가기</button>
      <button @click="deleteSelectedPortfolios">삭제하기</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { usePortfolioStore } from '@/store/modules/portfolio';
import { ref, onMounted, computed } from 'vue';

const router = useRouter();
const portfolioStore = usePortfolioStore();

const portfolioList = computed(() => portfolioStore.portfolioList);
const { fetchPortfolioListAction, deletePortfolioAction } = portfolioStore;

const selected = ref([]); // 선택된 포트폴리오
const allSelected = ref(false); // 전체 선택 체크박스 상태
const sortKey = ref('portfolioName'); // 정렬할 컬럼
const sortOrder = ref('asc'); // 오름차순('asc') 또는 내림차순('desc')

// 전체 선택 처리
const toggleSelectAll = () => {
  if (allSelected.value) {
    selected.value = portfolioList.value.map(
      (portfolio) => portfolio.portfolioId // 포트폴리오 이름으로 설정
    );
  } else {
    selected.value = [];
  }
};

// 체크박스 상태 변경 시 전체 선택 체크박스 상태 업데이트
const updateSelectAllState = () => {
  allSelected.value = selected.value.length === portfolioList.value.length; // 전체 선택 여부 업데이트
};

// 포트폴리오 상세 페이지로 이동
const goToPortfolioDetail = (id) => {
  router.push({ name: 'Portfolio', params: { id } });
};

// 포트폴리오 생성 페이지로 이동
const goToCreatePortfolio = () => {
  router.push({ name: 'MakePortfolio' });
};

// 선택된 포트폴리오 데이터를 사이드패널로 전달
const openPortfolioInSidePanel = (portfolio) => {
  emit('openSidePanel', {
    title: '포트폴리오 상세',
    section: 'PortfolioSection',
    data: [portfolio], // 선택된 포트폴리오 데이터 전달
  });
};

// 선택된 포트폴리오 삭제
const deleteSelectedPortfolios = async () => {
  for (const portfolioId of selected.value) {
    try {
      await deletePortfolioAction(portfolioId); // 비동기 요청 대기
    } catch (error) {
      console.error(
        'Error deleting portfolio:',
        error.response?.data || error.message
      );
    }
  }
  selected.value = []; // 선택 해제
  window.location.reload();
};

// 정렬 기준과 방향 변경 함수
const sortBy = (key) => {
  if (sortKey.value === key) {
    // 동일한 키를 클릭했을 때 방향 변경
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc'; // 기본은 오름차순
  }
};

// 정렬된 포트폴리오 리스트 계산
const sortedPortfolioList = computed(() => {
  return portfolioList.value.slice().sort((a, b) => {
    let result = 0;
    if (a[sortKey.value] < b[sortKey.value]) {
      result = -1;
    } else if (a[sortKey.value] > b[sortKey.value]) {
      result = 1;
    }
    return sortOrder.value === 'asc' ? result : -result;
  });
});

// 컴포넌트가 마운트될 때 포트폴리오 리스트를 불러옴
onMounted(() => {
  fetchPortfolioListAction();
});
</script>


<style scoped>
.MyPortfolio-container {
  padding: 20px;
}

.MyPortfolio-DataTable {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

.MyPortfolio-DataTable table {
  width: 100%;
  border: 1px solid #ccc;
}

.MyPortfolio-DataTable th,
.MyPortfolio-DataTable td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  cursor: pointer;
}

.MyPortfolio-btn {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.NameCursor:hover {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>
