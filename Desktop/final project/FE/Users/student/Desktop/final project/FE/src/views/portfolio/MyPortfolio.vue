<template>
  <div class="MyPortfolio-container">
    <h1>내 포트폴리오 리스트 페이지</h1>
    <div class="MyPortfolio-DataTable">
      <!-- 기본 HTML 테이블로 대체 -->
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
            <th>포트폴리오 이름</th>
            <th>투자 총액</th>
            <th>위험도</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in portfolioList" :key="item.id">
            <td>
              <input
                type="checkbox"
                v-model="selected"
                :value="item.PortfolioName"
              />
            </td>

            <td class="NameCursor" @click="goToPortfolioDetail(item.id)">
              {{ item.PortfolioName }}
            </td>

            <td>{{ item.ExpectedReturn }}%</td>

            <td>{{ item.RiskLevel }}</td>
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

<script>
// API 함수들 import
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 라우터 추가
import {
  fetchPortfolioList, // API 호출 함수
  deletePortfolio,
} from '@/api/portfolioApi'; // 기존 API 호출 함수

export default {
  setup() {
    const router = useRouter(); // useRouter로 라우터 접근

    // 상태
    const portfolioList = ref([]); // 포트폴리오 목록 데이터를 저장할 변수
    const selected = ref([]); // 선택된 포트폴리오
    const allSelected = ref(false); // 전체 선택 체크박스 상태

    // 포트폴리오 데이터 가져오기 (API 호출)
    const fetchPortfolioListData = async () => {
      try {
        const data = await fetchPortfolioList(); // fetchPortfolioList API 호출
        portfolioList.value = data;
      } catch (error) {
        console.error('Error fetching portfolio list:', error);
      }
    };

    // 포트폴리오 삭제 (API 호출)
    const deletePortfolioData = async (portfolioId) => {
      try {
        await deletePortfolio(portfolioId); // deletePortfolio API 호출
        portfolioList.value = portfolioList.value.filter(
          (portfolio) => portfolio.id !== portfolioId
        );
      } catch (error) {
        console.error('Error deleting portfolio:', error);
      }
    };

    // 전체 선택 처리
    const toggleSelectAll = () => {
      if (allSelected.value) {
        selected.value = portfolioList.value.map(
          (portfolio) => portfolio.PortfolioName
        );
      } else {
        selected.value = [];
      }
    };

    // 포트폴리오 상세 페이지로 이동
    const goToPortfolioDetail = (id) => {
      router.push({ name: 'PortfolioDetail', params: { id } });
    };

    // 포트폴리오 생성 페이지로 이동
    const goToCreatePortfolio = () => {
      router.push({ name: 'CreatePortfolio' });
    };

    // 선택된 포트폴리오 삭제
    const deleteSelectedPortfolios = () => {
      selected.value.forEach((portfolioName) => {
        const portfolio = portfolioList.value.find(
          (p) => p.PortfolioName === portfolioName
        );
        if (portfolio) {
          deletePortfolioData(portfolio.id);
        }
      });
      selected.value = [];
    };

    // 컴포넌트가 마운트될 때 포트폴리오 리스트를 불러옴
    onMounted(() => {
      fetchPortfolioListData(); // 포트폴리오 목록을 불러오는 함수 호출
    });

    return {
      selected,
      allSelected,
      portfolioList, // 포트폴리오 데이터를 저장한 변수
      toggleSelectAll,
      goToPortfolioDetail,
      goToCreatePortfolio,
      deleteSelectedPortfolios,
    };
  },
};
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
