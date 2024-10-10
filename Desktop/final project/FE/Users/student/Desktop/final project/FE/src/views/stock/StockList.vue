<template>
  <div>
    <h3>주식 리스트</h3>
    <table v-if="stocks.length > 0" border="1">
      <thead>
        <tr>
          <th>주식 코드</th>
          <th>주식명</th>
          <th>필드</th>
          <th>시장 구분</th>
          <th>종가</th>
          <th>전일비</th>
          <th>등락률</th>
          <th>시가</th>
          <th>최고가</th>
          <th>최저가</th>
          <th>거래량</th>
          <th>거래대금</th>
          <th>상장주식수</th>
          <th>시가총액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in paginatedStocks" :key="stock.stockCode">
          <td>{{ stock.stockCode }}</td>
          <td>{{ stock.stockName }}</td>
          <td>{{ stock.field }}</td>
          <td>{{ stock.mrktCtg }}</td>
          <td>{{ stock.clpr }}</td>
          <td>{{ stock.vs }}</td>
          <td>{{ stock.fltRt }}%</td>
          <td>{{ stock.mkp }}</td>
          <td>{{ stock.hipr }}</td>
          <td>{{ stock.lopr }}</td>
          <td>{{ stock.trqu }}</td>
          <td>{{ stock.trPrc }}</td>
          <td>{{ stock.istgStCnt }}</td>
          <td>{{ stock.mrktTotAmt }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>주식 데이터가 없습니다.</p>

    <!-- 페이지 네비게이션 -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stocks: [], // 주식 데이터 전체를 저장할 배열
      currentPage: 1, // 현재 페이지
      pageSize: 10, // 페이지 당 항목 수
      totalPages: 0, // 전체 페이지 수
    };
  },
  computed: {
    // 현재 페이지에 표시할 주식 리스트
    paginatedStocks() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.stocks.slice(start, end);
    },
  },
  methods: {
    // 주식 데이터를 가져오는 메서드
    fetchStocks() {
      fetch('/api/stock/all') // 백엔드 API 요청
        .then((response) => response.json())
        .then((data) => {
          this.stocks = data;
          this.totalPages = Math.ceil(this.stocks.length / this.pageSize);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    // 이전 페이지로 이동
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // 다음 페이지로 이동
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    this.fetchStocks(); // 컴포넌트가 생성될 때 주식 데이터를 가져옴
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.container {
  width: 100%;
  max-width: 1200px; /* 테이블 크기를 맞춰 조정 */
  margin: 20px auto; /* 중앙 정렬 */
  padding: 20px;
  background-color: #f9f9f9; /* 배경색 */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 테이블 스타일 */
.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
}

.product-table th,
.product-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.product-table th {
  background-color: #e9ecef;
  font-weight: bold;
  color: #333;
}

/* 테이블의 각 행에 호버 시 배경색 변경 */
.product-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

/* 페이지 네비게이션 스타일 */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  background-color: #5bc0de;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #31b0d5;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 페이지 번호 텍스트 스타일 */
.pagination span {
  font-size: 16px;
  margin: 0 10px;
  color: #333;
}
</style>
