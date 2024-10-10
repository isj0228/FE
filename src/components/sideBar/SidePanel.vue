<template>
  <div v-if="isVisible" class="side-panel">
    <div class="panel-header" @click.self="$emit('close')">
      <h2>{{ panelTitle }}</h2>
    </div>
    <div class="panel-content">
      <div v-if="section === 'PortfolioSection'">
        <table>
          <thead>
            <tr>
              <th>포트폴리오 이름</th>
              <th>총액</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="portfolio in data" :key="portfolio.portfolioId">
              <td>{{ portfolio.portfolioName }}</td>
              <td>{{ portfolio.total }}원</td>
            </tr>
          </tbody>
        </table>
        <p v-if="data.length === 0">포트폴리오 데이터가 없습니다.</p>
      </div>

      <div v-if="section === 'CartSection'">
        <ul>
          <li v-for="item in data" :key="item.id">
            {{ item.name }} - {{ item.price }}원
          </li>
        </ul>
        <p v-if="data.length === 0">장바구니에 항목이 없습니다.</p>
      </div>

      <div v-if="section === 'RecentProductsSection'">
        <ul>
          <li v-for="item in data" :key="item.id">
            {{ item.name }} - {{ item.price }}원
          </li>
        </ul>
        <p v-if="data.length === 0">최근 본 상품이 없습니다.</p>
      </div>

      <div v-if="section === 'NewSection'">
        <!-- Add any new section's content here -->
        <p>새로운 섹션에 대한 내용입니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Props passed from the parent component
const props = defineProps({
  isVisible: Boolean,
  panelTitle: String,
  section: String,
  data: Array, // This will contain the relevant data
});
</script>

<style scoped>
.side-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 450px;
  height: 100vh;
  background-color: white;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow-y: auto;
}

.panel-header {
  margin-bottom: 20px;
}
</style>
