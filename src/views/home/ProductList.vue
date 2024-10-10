<template>
  <section class="product-container">
    <div class="product-list">
      <h2>연령별 금융상품 추천</h2>
      <div class="age-tabs">
        <button
          :class="{ active: activeAge === '20대', hovered: hoverAge === '20대' }"
          @mouseover="setHoverAge('20대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('20대')"
        >20대</button>

        <button
          :class="{ active: activeAge === '30대', hovered: hoverAge === '30대' }"
          @mouseover="setHoverAge('30대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('30대')"
        >30대</button>

        <button
          :class="{ active: activeAge === '40대', hovered: hoverAge === '40대' }"
          @mouseover="setHoverAge('40대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('40대')"
        >40대</button>

        <button
          :class="{ active: activeAge === '50대', hovered: hoverAge === '50대' }"
          @mouseover="setHoverAge('50대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('50대')"
        >50대</button>

        <button
          :class="{ active: activeAge === '60대 이상', hovered: hoverAge === '60대 이상' }"
          @mouseover="setHoverAge('60대 이상')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('60대 이상')"
        >60대 이상</button>
      </div>

      <div class="product-grid">
        <!-- 연령대 추천 상품을 렌더링 -->
        <div class="product-card" v-for="(product, index) in ageGroupProducts" :key="index">
          <!-- 채권 상품일 경우 -->
          <div v-if="product.isinCdNm && product.bondIsurNm">
            <h3>{{ product.isinCdNm }}</h3> <!-- 채권 발행인 이름 -->
            <p>{{ product.bondIsurNm }}</p> <!-- ISIN 코드 -->
          </div>

          <!-- 펀드 상품일 경우 -->
          <div v-else-if="product.productNm && product.companyNm">
            <h3>{{ product.productNm }}</h3> <!-- 펀드 상품명 -->
            <p>{{ product.companyNm }}</p> <!-- 펀드 회사명 -->
          </div>

          <!-- 예/적금 상품일 경우 -->
          <div v-else-if="product.savingProduct && product.savingProduct.finPrdtNm && product.savingProduct.korCoNm">
            <h3>{{ product.savingProduct.finPrdtNm }}</h3> <!-- 예/적금 상품명 -->
            <p>{{ product.savingProduct.korCoNm }}</p> <!-- 금융회사명 -->
          </div>

          <!-- 알 수 없는 상품일 경우 -->
          <div v-else>
            <h3>알 수 없는 상품</h3>
            <p>상품 데이터를 확인해주세요.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="investment-section">
      <h2>투자 성향별 금융상품 추천</h2>
      <div class="investment-types">
        <button
          :class="{ active: activeInvestment === '공격투자형', hovered: hoverInvestment === '공격투자형' }"
          @mouseover="setHoverInvestment('공격투자형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('공격투자형')"
        >공격투자형</button>

        <button
          :class="{ active: activeInvestment === '적극투자형', hovered: hoverInvestment === '적극투자형' }"
          @mouseover="setHoverInvestment('적극투자형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('적극투자형')"
        >적극투자형</button>

        <button
          :class="{ active: activeInvestment === '위험중립형', hovered: hoverInvestment === '위험중립형' }"
          @mouseover="setHoverInvestment('위험중립형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('위험중립형')"
        >위험중립형</button>

        <button
          :class="{ active: activeInvestment === '안전추구형', hovered: hoverInvestment === '안전추구형' }"
          @mouseover="setHoverInvestment('안전추구형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('안전추구형')"
        >안전추구형</button>

        <button
          :class="{ active: activeInvestment === '안전형', hovered: hoverInvestment === '안전형' }"
          @mouseover="setHoverInvestment('안전형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('안전형')"
        >안전형</button>
      </div>

      <div class="investment-grid">
        <!-- 투자 성향 추천 상품을 렌더링 -->
        <div class="product-card" v-for="(product, index) in investmentProducts" :key="index">
          <!-- 채권 상품일 경우 -->
          <div v-if="product.isinCdNm && product.bondIsurNm">
            <h3>{{ product.bondIsurNm }}</h3> <!-- 채권 발행인 이름 -->
            <p>{{ product.isinCdNm }}</p> <!-- ISIN 코드 -->
          </div>

          <!-- 펀드 상품일 경우 -->
          <div v-else-if="product.productNm && product.companyNm">
            <h3>{{ product.productNm }}</h3> <!-- 펀드 상품명 -->
            <p>{{ product.companyNm }}</p> <!-- 펀드 회사명 -->
          </div>

          <!-- 예/적금 상품일 경우 -->
          <div v-else-if="product.savingProduct && product.savingProduct.finPrdtNm && product.savingProduct.korCoNm">
            <h3>{{ product.savingProduct.finPrdtNm }}</h3> <!-- 예/적금 상품명 -->
            <p>{{ product.savingProduct.korCoNm }}</p> <!-- 금융회사명 -->
          </div>

          <!-- 알 수 없는 상품일 경우 -->
          <div v-else>
            <h3>알 수 없는 상품</h3>
            <p>상품 데이터를 확인해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getTopProductsByAgeGroup, getTopProductsByPreference } from '@/api/hit'; // API 호출 함수 임포트

export default {
  name: 'ProductListSection',
  data() {
    return {
      activeAge: '20대',
      hoverAge: null,
      activeInvestment: '공격투자형',
      hoverInvestment: null,
      ageGroupProducts: [], // 연령대에 맞는 추천 상품 리스트
      investmentProducts: [], // 투자 성향에 맞는 추천 상품 리스트
    };
  },
  methods: {
    setActiveAge(age) {
      this.activeAge = age;
      this.hoverAge = null;
      // 연령대에 맞는 상품을 불러오는 API 호출
      this.fetchAgeGroupProducts();
    },
    setHoverAge(age) {
      if (this.activeAge !== age) {
        this.hoverAge = age;
      }
    },
    resetHoverAge() {
      this.hoverAge = null;
    },
    setActiveInvestment(investment) {
      this.activeInvestment = investment;
      this.hoverInvestment = null;
      // 투자 성향에 맞는 상품을 불러오는 API 호출
      this.fetchInvestmentProducts();
    },
    setHoverInvestment(investment) {
      if (this.activeInvestment !== investment) {
        this.hoverInvestment = investment;
      }
    },
    resetHoverInvestment() {
      this.hoverInvestment = null;
    },
    // 연령대에 맞는 상품을 API로부터 가져오는 함수
    async fetchAgeGroupProducts() {
      try {
        const response = await getTopProductsByAgeGroup(); // 연령대별 상위 3개 상품 API 호출
        const ageGroup = response.pop(); // 마지막에 연령대 정보가 추가됨
        this.ageGroupProducts = response.map((p) => {
          if (p.isinCdNm && p.bondIsurNm) {
            return {
              isinCdNm: p.isinCdNm,
              bondIsurNm: p.bondIsurNm,
            };
          } else if (p.productNm && p.companyNm) {
            return {
              productNm: p.productNm,
              companyNm: p.companyNm,
            };
          } else if (p.savingProduct && p.savingProduct.finPrdtNm && p.savingProduct.korCoNm) {
            return {
              savingProduct: {
                finPrdtNm: p.savingProduct.finPrdtNm,
                korCoNm: p.savingProduct.korCoNm,
              },
            };
          }
          return { message: '알 수 없는 상품' };
        });
        this.activeAge = `${ageGroup}대`; // 연령대 탭 업데이트
      } catch (error) {
        console.error('Error fetching age group products:', error);
      }
    },
    // 투자 성향에 맞는 상품을 API로부터 가져오는 함수
    async fetchInvestmentProducts() {
      try {
        const response = await getTopProductsByPreference(); // 투자 성향별 상위 3개 상품 API 호출
        const preference = response.pop(); // 마지막에 투자 성향 정보가 추가됨
        this.investmentProducts = response.map((p) => {
          if (p.isinCdNm && p.bondIsurNm) {
            return {
              isinCdNm: p.isinCdNm,
              bondIsurNm: p.bondIsurNm,
            };
          } else if (p.productNm && p.companyNm) {
            return {
              productNm: p.productNm,
              companyNm: p.companyNm,
            };
          } else if (p.savingProduct && p.savingProduct.finPrdtNm && p.savingProduct.korCoNm) {
            return {
              savingProduct: {
                finPrdtNm: p.savingProduct.finPrdtNm,
                korCoNm: p.savingProduct.korCoNm,
              },
            };
          }
          return { message: '알 수 없는 상품' };
        });
        this.activeInvestment = this.getInvestmentType(preference); // 투자 성향 탭 업데이트
      } catch (error) {
        console.error('Error fetching investment products:', error);
      }
    },
    getInvestmentType(preference) {
      const types = {
        1: '안전형',
        2: '안전추구형',
        3: '위험중립형',
        4: '적극투자형',
        5: '공격투자형',
      };
      return types[preference] || '공격투자형';
    },
  },
  // 컴포넌트가 마운트되면 연령대 및 투자성향에 맞는 상품을 처음 불러옴
  mounted() {
    this.fetchAgeGroupProducts();
    this.fetchInvestmentProducts();
  },
};
</script>

<style scoped>
.product-container {
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background-color: #f9fafb;
}

.product-list {
  flex: 1;
  padding: 20px;
}

.age-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.age-tabs button {
  padding: 10px 15px;
  border: 1px solid #0070f3;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
}

.age-tabs .active {
  background-color: #0070f3;
  color: white;
}

.age-tabs .hovered {
  background-color: #0056b3;
  color: white;
}

.product-grid,
.investment-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-card {
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #0070f3;
}

.investment-section {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.investment-types {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.investment-types button {
  padding: 10px 15px;
  border: 1px solid #0070f3;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
}

.investment-types .active {
  background-color: #0070f3;
  color: white;
}

.investment-types .hovered {
  background-color: #0056b3;
  color: white;
}
</style>