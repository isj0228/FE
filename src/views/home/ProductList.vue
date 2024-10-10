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
          :class="{ active: activeAge === '60대', hovered: hoverAge === '60대' }"
          @mouseover="setHoverAge('60대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('60대')"
        >60대 이상</button>
      </div>

      <div class="product-grid">
        <!-- 연령대 추천 상품을 렌더링 -->
        <div class="product-card" v-for="(product, index) in ageGroupProducts" :key="index">
          <!-- 상품 렌더링 로직 -->
          <div v-if="product.isinCdNm && product.bondIsurNm">
            <h3>{{ product.isinCdNm }}</h3>
            <p>{{ product.bondIsurNm }}</p>
          </div>
          <div v-else-if="product.productNm && product.companyNm">
            <h3>{{ product.productNm }}</h3>
            <p>{{ product.companyNm }}</p>
          </div>
          <div v-else-if="product.savingProduct && product.savingProduct.finPrdtNm && product.savingProduct.korCoNm">
            <h3>{{ product.savingProduct.finPrdtNm }}</h3>
            <p>{{ product.savingProduct.korCoNm }}</p>
          </div>
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
          <!-- 상품 렌더링 로직 -->
          <div v-if="product.isinCdNm && product.bondIsurNm">
            <h3>{{ product.bondIsurNm }}</h3>
            <p>{{ product.isinCdNm }}</p>
          </div>
          <div v-else-if="product.productNm && product.companyNm">
            <h3>{{ product.productNm }}</h3>
            <p>{{ product.companyNm }}</p>
          </div>
          <div v-else-if="product.savingProduct && product.savingProduct.finPrdtNm && product.savingProduct.korCoNm">
            <h3>{{ product.savingProduct.finPrdtNm }}</h3>
            <p>{{ product.savingProduct.korCoNm }}</p>
          </div>
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
import { getTopProductsByAgeGroup, getTopProductsByPreference, getTopProductsBySelectedAgeGroup, getTopProductsBySelectedPreference } from '@/api/hit';

export default {
  name: 'ProductListSection',
  data() {
    return {
      activeAge: '20대',
      hoverAge: null,
      activeInvestment: '공격투자형',
      hoverInvestment: null,
      ageGroupProducts: [],
      investmentProducts: [],
    };
  },
  methods: {
    setActiveAge(age) {
      this.activeAge = age;
      this.hoverAge = null;
      const ageGroup = this.convertAgeToNumber(age);
      this.fetchAgeGroupProducts(ageGroup, true);
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
      const preference = this.convertInvestmentToNumber(investment);
      this.fetchInvestmentProducts(preference, true);
    },
    setHoverInvestment(investment) {
      if (this.activeInvestment !== investment) {
        this.hoverInvestment = investment;
      }
    },
    resetHoverInvestment() {
      this.hoverInvestment = null;
    },
    async fetchAgeGroupProducts(ageGroup, skipAuth = false) {
      try {
        const response = await getTopProductsBySelectedAgeGroup(ageGroup, skipAuth);
        this.ageGroupProducts = response.slice(0, 3); // 최대 3개까지만 가져오기
      } catch (error) {
        console.error('Error fetching top products for age group:', error);
      }
    },
    async fetchInvestmentProducts(preference, skipAuth = false) {
      try {
        const response = await getTopProductsBySelectedPreference(preference, skipAuth);
        this.investmentProducts = response.slice(0, 3);
      } catch (error) {
        console.error('Error fetching top products for preference:', error);
      }
    },
    convertAgeToNumber(age) {
      const ageMapping = {
        '20대': 20,
        '30대': 30,
        '40대': 40,
        '50대': 50,
        '60대': 60,
      };
      return ageMapping[age] || 20;
    },
    convertInvestmentToNumber(investment) {
      const investmentMapping = {
        '안전형': 1,
        '안전추구형': 2,
        '위험중립형': 3,
        '적극투자형': 4,
        '공격투자형': 5,
      };
      return investmentMapping[investment] || 5;
    },
    convertNumberToInvestment(investmentNumber) {
      const investmentMapping = {
        1: '안전형',
        2: '안전추구형',
        3: '위험중립형',
        4: '적극투자형',
        5: '공격투자형',
      };
      return investmentMapping[investmentNumber] || '공격투자형';
    },
  },
  async mounted() {
    // 기본 연령대와 투자 성향에 맞는 데이터를 가져옴
    try {
      const ageResponse = await getTopProductsByAgeGroup();
      const investmentResponse = await getTopProductsByPreference();
      this.activeAge = `${ageResponse[ageResponse.length - 1]}대`;

      if (investmentResponse[investmentResponse.length - 1] === 1) {
        this.activeInvestment = '안전형';
      } else if (investmentResponse[investmentResponse.length - 1] === 2) {
        this.activeInvestment = '안전추구형';
      } else if (investmentResponse[investmentResponse.length - 1] === 3) {
        this.activeInvestment = '위험중립형';
      } else if (investmentResponse[investmentResponse.length - 1] === 4) {
        this.activeInvestment = '적극투자형';
      } else {
        this.activeInvestment = '공격투자형';
      }
      
      if (ageResponse) {
        this.ageGroupProducts = ageResponse.slice(0, 3);
      }
      if (investmentResponse) {
        this.investmentProducts = investmentResponse.slice(0, 3);
      }

    } catch (error) {
      console.error('Error during initial load:', error);
    }
  },
};
</script>

<style scoped>
.product-container {
  display: block;
  padding: 5%;
  background-color: #f9fafb;
}

.product-list,
.investment-section {
  margin-bottom: 5%;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 2%;
}

.age-tabs,
.investment-types {
  display: flex;
  justify-content: center;
  gap: 2%;
  margin-bottom: 3%;
  flex-wrap: wrap;
}

.age-tabs button,
.investment-types button {
  padding: 0.5rem 1rem;
  border: 1px solid #0070f3;
  background-color: #ffffff;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
  width: auto;
  min-width: 10%;
}

.age-tabs .active,
.investment-types .active {
  background-color: #0070f3;
  color: white;
}

.age-tabs .hovered,
.investment-types .hovered {
  background-color: #0056b3;
  color: white;
}

.product-grid,
.investment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  gap: 2%;
}

.product-card {
  background-color: white;
  padding: 5%;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-0.5rem);
}

.product-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #0070f3;
}

@media (max-width: 768px) {
  .product-grid,
  .investment-grid {
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
  }
}

@media (max-width: 576px) {
  .product-grid,
  .investment-grid {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
  .age-tabs button,
  .investment-types button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>