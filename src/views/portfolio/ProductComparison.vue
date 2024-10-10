<template>
  <div class="CandidatesPick-container">
    <h1>상품 비교 페이지</h1>
    <div class="search-filter">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="상품명 검색..."
      />

      <div class="button-group">
        <v-btn
          :class="{ active: selectedCategory === 'savings' }"
          @click="selectCategory('savings')"
        >
          예/적금
        </v-btn>
        <v-btn
          :class="{ active: selectedCategory === 'bonds' }"
          @click="selectCategory('bonds')"
        >
          채권
        </v-btn>
        <v-btn
          :class="{ active: selectedCategory === 'funds' }"
          @click="selectCategory('funds')"
        >
          펀드
        </v-btn>
      </div>
    </div>
    <div v-if="warningMessage" class="alert-warning">
      {{ warningMessage }}
    </div>

    <div v-if="confirmMessage" class="alert-confirm">
      {{ confirmMessage }}
    </div>
    <div class="product-list">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product-card card"
      >
        <div class="card-body" @click="addToCompare(product)">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">
            <strong>수익률:</strong><br />
            <span v-if="product.type === 'bonds'">
              3개월: {{ product.yield[0] }}%<br />
              6개월: {{ product.yield[1] }}%<br />
              12개월: {{ product.yield[2] }}%</span
            >
            <span v-else-if="product.type === 'funds'">
              3개월: {{ product.yield[0] }}%<br />
              6개월: {{ product.yield[1] }}%<br />
              12개월: {{ product.yield[2] }}%</span
            >
            <span v-else>수익률 정보 없음<br /><br /><br /></span>
          </p>
        </div>
      </div>
    </div>

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="4"
      ></v-pagination>
    </div>
  </div>

  <div class="CandidatesCompare-container">
    <h1>비교군 목록</h1>
    <div class="CandidatesCompare-body">
      <h3>최대 세 카드(compare) 담을 수 있는 박스</h3>
      <v-btn @click="clearAllProducts">일괄 비우기</v-btn>
      <div class="compare-cards">
        <div
          v-for="(product, index) in compare"
          :key="product.id"
          class="compare-card"
          @click="removeFromCompare(index)"
        >
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">
            <strong>수익률:</strong><br />
            <span v-if="product.type === 'bonds'">
              3개월: {{ product.yield[0] }}%<br />
              6개월: {{ product.yield[1] }}%<br />
              12개월: {{ product.yield[2] }}%</span
            >
            <span v-else-if="product.type === 'funds'">
              3개월: {{ product.yield[0] }}%<br />
              6개월: {{ product.yield[1] }}%<br />
              12개월: {{ product.yield[2] }}%</span
            >
            <span v-else>수익률 정보 없음</span>
          </p>
        </div>
        <div v-if="compare.length === 0" class="no-cards">
          <p>비교할 카드를 선택하세요.</p>
        </div>
      </div>
    </div>
    <div class="CandidatesCompare-desc">
      <h3>열 기준 설명(상품 별 정보) 페이지 + 막대 그래프 비교</h3>
      <div id="chart">
        <VueApexCharts
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>
      </div>
      <!-- 비교한 상품들의 상세 정보 카드 -->
      <div v-if="compare.length > 0" class="product-details-container">
        <h3>비교한 상품 상세 정보</h3>
        <div class="card-container">
          <v-card
            v-for="(product, index) in compare"
            :key="product.id"
            class="desc-card"
            elevation="3"
          >
            <v-card-title
              >{{ product.name }} (ID: {{ product.id }})</v-card-title
            >
            <v-card-text>
              <p>상품 종류: {{ product.type }}</p>
              <p v-if="product.yield && product.yield.length > 0">
                수익률: {{ product.yield.join(', ') }}%
              </p>
              <p v-else>수익률 정보 없음</p>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <div v-else>
        <p>비교할 상품이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { getCartList } from '@/api/cartApi';

const searchQuery = ref('');
const selectedCategory = ref('savings');
const compare = ref([]);
const currentProductType = ref(null); // 현재 선택된 상품의 타입 저장
const page = ref(1);
const itemsPerPage = 4; // 페이지당 아이템 수
const warningMessage = ref('');
const confirmMessage = ref('');

const products = ref([]); // API에서 받아온 데이터를 저장할 배열

// API를 호출하여 데이터를 가져오는 함수
async function fetchProducts() {
  try {
    const cartData = await getCartList(); // getCartList 함수로 데이터를 가져옵니다
    products.value = cartData; // 가져온 데이터를 products에 저장합니다
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// 컴포넌트가 마운트될 때 데이터를 가져옵니다
onMounted(() => {
  fetchProducts();
});

// 차트 옵션 및 시리즈 생성
const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
    },
  },
  xaxis: {
    categories: ['3개월', '6개월', '12개월'],
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    title: {
      text: '수익률 (%)',
    },
  },
});

// 비교한 상품의 수익률 데이터를 차트에 표시
const series = computed(() => {
  return compare.value.map((product) => {
    const productYield =
      product.yield && product.yield.length > 0 ? product.yield : [0, 0, 0];
    return {
      name: product.name,
      data: productYield,
    };
  });
});

// 필터링된 제품 목록
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesCategory = selectedCategory.value
      ? product.type === selectedCategory.value
      : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// 카테고리 선택
const selectCategory = (category) => {
  selectedCategory.value = category;
};

// 페이지네이션된 제품 목록
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

// 전체 페이지 수
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

// 비교 리스트에 상품을 추가하는 함수
const addToCompare = (product) => {
  if (compare.value.length < 3) {
    if (!compare.value.find((item) => item.id === product.id)) {
      if (compare.value.length === 0) {
        currentProductType.value = product.type;
      }

      if (product.type === currentProductType.value) {
        compare.value.push(product);
        warningMessage.value = '';
        confirmMessage.value = `${product.name}이(가) 비교 리스트에 추가되었습니다.`;
      } else {
        warningMessage.value = '같은 종류의 상품만 비교할 수 있습니다.';
        confirmMessage.value = '';
      }
    } else {
      warningMessage.value = '이미 비교 리스트에 있는 상품입니다.';
      confirmMessage.value = '';
    }
  } else {
    warningMessage.value = '비교 리스트가 가득 찼습니다.(최대 3 상품)';
    confirmMessage.value = '';
  }
};

// 비교 리스트에서 상품을 제거하는 함수
const removeFromCompare = (index) => {
  const removedProduct = compare.value[index]; // 제거 상품 이름 저장.
  compare.value.splice(index, 1);
  confirmMessage.value = '';
  warningMessage.value = `${removedProduct.name}이(가) 비교 목록에서 제거되었습니다.`;
  if (compare.value.length === 0) {
    currentProductType.value = null;
  }
};

// 비교 리스트 비우기
const clearAllProducts = () => {
  compare.value = [];
  currentProductType.value = null;
  warningMessage.value = '';
  confirmMessage.value = '';
};
</script>

<style scoped>
.financial-products-container {
  padding: 20px;
}

.search-filter {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.form-control {
  flex: 1;
}

.form-select {
  flex: 0.3;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  flex: 0 1 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.card-body {
  padding: 20px;
}

.product-card:hover {
  box-shadow: 0 0 20px 10px #e9f5e9;
  cursor: pointer;
}

.compare-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.compare-card {
  flex: 0 1 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.compare-card:hover {
  box-shadow: 0 0 20px 10px #e9f5e9;
}

.no-cards {
  flex: 0 1 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  margin: 20px;
}

.alert-warning {
  background-color: #ffcc00;
  color: #000;
  border: 2px solid #e6b800;
  padding: 15px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.alert-confirm {
  background-color: #48e2b4;
  color: #000;
  border: 2px solid #48e2b4;
  padding: 15px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
