<template>
  <div>
    <h3>주식 검색</h3>
    <!-- 검색 입력 폼 -->
    <input type="text" v-model="searchTerm" placeholder="주식명 또는 주식코드를 입력하시오" />
    <button @click="searchStock">Search</button>

    <!-- 주식 결과 테이블 -->
    <table v-if="stocks.length > 0" border="1">
      <thead>
        <tr>
          <th>주식 코드</th>
          <th>주식명</th>
          <th>종가</th>
          <th>전일비</th>
          <th>등락률</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stocks" :key="stock.stockCode">
          <td>{{ stock.stockCode }}</td>
          <td>{{ stock.stockName }}</td>
          <td>{{ stock.clpr }}</td>
          <td>{{ stock.vs }}</td>
          <td>{{ stock.fltRt }}%</td>
        </tr>
      </tbody>
    </table>

    <p v-else>검색 결과가 없습니다.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "", // 검색어 입력
      stocks: [], // 주식 데이터를 저장할 배열
    };
  },
  methods: {
    // 주식 검색 메서드
    searchStock() {
      if (!this.searchTerm) {
        alert("검색어를 입력하세요!");
        return;
      }

      // API에 요청을 보내 주식 데이터를 가져옴
      fetch(`/api/stock/searchStock?searchTerm=${encodeURIComponent(this.searchTerm)}`)
        .then((response) => response.json())
        .then((data) => {
          this.stocks = data; // 검색된 주식 데이터를 배열에 저장
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
/* 전체 박스 크기 및 레이아웃 초기화 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* 페이지 전체 컨테이너 */
.container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto; /* 위아래 마진 추가 */
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9; /* 배경색 추가 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

/* 검색 박스 스타일 */
.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-box input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-right: 40px;
  font-size: 16px;
  transition: border-color 0.3s ease; /* 검색창에 초점이 가면 부드럽게 변화 */
}

/* 검색창에 초점을 맞추었을 때 테두리 색상 변화 */
.search-box input[type="text"]:focus {
  border-color: #5bc0de;
  outline: none;
}

.search-box .fas.fa-search {
  position: absolute;
  right: 15px;
  top: 12px;
  color: #999;
  font-size: 20px;
  cursor: pointer; /* 커서 포인터 추가 */
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
  font-size: 16px;
}

.product-table th {
  background-color: #e9ecef;
  font-weight: bold;
  color: #333;
}

/* 테이블의 각 행에 호버 시 배경색 변경 */
.product-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer; /* 행 위에 마우스를 올렸을 때 포인터 */
}

/* 기본적으로 '검색 결과가 없습니다' 문구는 회색으로 */
p {
  color: #777;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}
</style>
