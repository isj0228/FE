<template>
  <!-- 포트폴리오 단일 페이지 -->
  <div>
    <h1>내 포트폴리오</h1>
    <ul>
      <li v-for="portfolio in portfolioList" :key="portfolio.productId">
        <!-- 포트폴리오 아이디, 식별자 -->
        {{ portfolio.portfolioId }}
        <!-- 포트폴리오 이름 -->
        {{ portfolio.portfolioName }}
        <!-- 생성 일자(날짜, 시간) 데이터 타입을 숫자로 날라오면 날짜 시간으로 처리 -->
        {{ portfolio.creationDate }}
        <!-- 포트폴리오 투자총액
         /총액에 * 기대 수익률을 한다면 투자손익
         /투자금액 + 투자손익 = 총 평가금액 -->
        {{ portfolio.total }}
        <!-- 포트폴리오 기대 수익률 -->
        {{ portfolio.expectedReturn }}
        <!-- 위험도(% -> int 데이터 타입 변경 예정) -->
        {{ portfolio.riskLevel }}
        <!-- 사용자 번호 -->
        {{ portfolio.memberNum }}
        <button @click="deletePortfolio(portfolio.portfolioId)">삭제</button>
      </li>
    </ul>

    <h1>내 포트폴리오 구성 상품</h1>
    <ul>
      <li v-for="item in portfolio.portfolioItems" :key="item.productId">
        <!-- 포트폴리오 구성상품 식별 아이디 -->
        {{ item.portfolioItemId }}
        <!-- 포트폴리오 식별 아이디 -->
        {{ item.portfolioId }}
        <!-- 상품 아이디 -->
        {{ item.productId }}
        <!-- 주식코드 -->
        {{ item.stockCode }}
        <!-- 타입이 C일 경우 개수 나머지 타입은 해당 상품 투자 금액 -->
        {{ item.amount }}
        <!-- 개별상품 기대 수익률 -->
        {{ item.expectedReturn }}
        <!-- 상품종류(S:예적금, F:펀드, B:채권, C:주식 ) -->
        {{ item.productType }}
        <!-- 주식상품 종가 -->
        {{ item.dailyPrice }}
      </li>
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
export default {
  data() {
    return {
      portfolioList: [], // 최근 본 상품 리스트
      portfolio: {
        // 포트폴리오 데이터를 저장할 객체
        portfolioId: null,
        portfolioName: '',
        creationDate: null,
        total: 0,
        expectedReturn: 0,
        riskLevel: 0,
        memberNum: null,
        portfolioItems: [], // 포트폴리오 항목 리스트
        portion: {
          totalSaving: 0,
          totalBond: 0,
          totalFund: 0,
          totalStock: 0,
        },
      },
      newPortfolio: {
        // 새 포트폴리오 입력을 위한 데이터 객체
        portfolioName: '',
        total: 0,
        memberNum: 1,
        portfolioItems: [], // 포트폴리오 항목 리스트
      },
      newPortfolioItems: [
        {
          productId: '',
          stockCode: '',
          amount: 0,
        },
        {
          productId: '',
          stockCode: '',
          amount: 0,
        },
        {
          productId: '',
          stockCode: '',
          amount: 0,
        },
      ],
    };
  },
  methods: {
    fetchPortfolioList() {
      fetch('/api/portfolio/list')
        .then((response) => response.json())
        .then((data) => {
          this.portfolioList = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchPortfolio() {
      fetch('/api/portfolio/details/1')
        .then((response) => response.json())
        .then((data) => {
          this.portfolio = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 최근 본 상품 추가 (POST 요청)
    addPortfolio() {
      // 포트폴리오 항목 합산
      const totalAmount = this.newPortfolioItems.reduce(
        (acc, item) => acc + item.amount,
        0
      );

      // newPortfolio에 항목 추가 및 total 값 설정
      this.newPortfolio.portfolioItems = [...this.newPortfolioItems];
      this.newPortfolio.total = totalAmount;

      // POST 요청으로 서버에 전송
      fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newPortfolio), // 새로운 포트폴리오 정보 전송
      })
        .then((response) => {
          // 응답이 성공적이지 않으면 에러 처리
          if (!response.ok) {
            throw new Error('네트워크 에러');
          }
          // 응답이 비어 있지 않으면 JSON 파싱
          return response.text().then((text) => (text ? JSON.parse(text) : {}));
        })
        .then(() => {
          // 포트폴리오 추가 후 입력 필드 초기화 및 새 데이터 가져오기
          this.clearNewPortfolio();
          this.fetchPortfolio();
        })
        .catch((error) => {
          console.error('포트폴리오 추가 시 에러 발생: ', error);
        });
    },

    deletePortfolio(portfolioId) {
      fetch(`/api/portfolio/${portfolioId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          this.fetchPortfolioList();
        })
        .catch((error) => {
          console.error('포트폴리오 삭제시 에러 발생: ', error);
        });
    },

    // 입력 필드 초기화
    clearNewPortfolio() {
      this.newPortfolio = {
        portfolioName: '',
        total: 0,
        memberNum: 1,
        portfolioItems: [],
      };
      this.newPortfolioItems = [
        { productId: '', stockCode: '', amount: 0 }, // 첫 번째 항목 초기화
        { productId: '', stockCode: '', amount: 0 }, // 두 번째 항목 초기화
        { productId: '', stockCode: '', amount: 0 }, // 세 번째 항목 초기화
      ];
    },
  },

  created() {
    this.fetchPortfolioList();
    this.fetchPortfolio();
  },
};
</script>
