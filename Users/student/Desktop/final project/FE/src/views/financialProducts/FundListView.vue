<template>
    <div>
      <h1>Fund Products</h1>
      <input type="text" v-model="keyword" placeholder="펀드 검색..." />
      <button @click="searchFunds">Search</button>
  
      <!-- 검색된 리스트가 있으면 검색된 리스트를, 없으면 전체 리스트를 출력 -->
      <div v-if="currentFundList && currentFundList.length > 0">
        <ul>
          <li v-for="fund in currentFundList" :key="fund.productId">
            <div class="fund-item">
              <h2>{{ fund.productNm }}</h2>
              <p><strong>Company:</strong> {{ fund.companyNm }}</p>
              <p><strong>Fund Type:</strong> {{ fund.fundType }}</p>
              <p><strong>Risk Level:</strong> {{ fund.riskLevel }}</p>
              <p><strong>Yield (1 year):</strong> {{ fund.yield1 }}%</p>
              <p><strong>Yield (3 years):</strong> {{ fund.yield3 }}%</p>
              <p><strong>Yield (6 years):</strong> {{ fund.yield6 }}%</p>
              <p><strong>Yield (12 years):</strong> {{ fund.yield12 }}%</p>
              <p><strong>Total Payoff Rate:</strong> {{ fund.totalPayoffRate }}%</p>
              <p><strong>Advanced Fee:</strong> {{ fund.advancedFee === 1 ? 'Yes' : 'No' }}</p>
              <p><strong>Hit:</strong> {{ fund.hit }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No fund products available.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'FundListView',
    data() {
      return {
        keyword: '', // 검색어 바인딩
        searchMode: false, // 검색 모드 여부
      };
    },
    computed: {
      ...mapGetters('fund', ['getFundList', 'getSearchFundList']), // Vuex에서 펀드 리스트 상태 가져오기
      // 검색모드일 때는 검색된 리스트, 아닐 때는 전체 리스트 반환
      currentFundList() {
        return this.searchMode && this.getSearchFundList.length > 0
          ? this.getSearchFundList
          : this.getFundList;
      },
    },
    created() {
      // 컴포넌트가 생성될 때 전체 펀드 리스트 데이터 가져오기
      this.fetchFundList();
    },
    methods: {
      ...mapActions('fund', ['fetchFundList', 'searchFundList']), // Vuex에서 API 호출 액션 매핑
      searchFunds() {
        if (this.keyword.trim().length > 1) {
          this.searchFundList(this.keyword)
            .then(() => {
              this.searchMode = true; // 검색이 완료되면 검색 모드로 전환
            })
            .catch((error) => {
              console.error('Error during search:', error);
              this.searchMode = false;
            });
        } else {
          alert('검색어는 2자 이상 입력해야 합니다.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  li {
    margin-bottom: 15px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .fund-item {
    line-height: 1.8;
  }
  .fund-item h2 {
    margin: 0;
    color: #1e88e5;
  }
  </style>