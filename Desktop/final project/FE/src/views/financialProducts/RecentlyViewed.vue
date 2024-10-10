<template>
    <div class="recently-viewed-container">
      <h1>최근본 상품</h1>
      <div v-if="recentlyViewed.length === 0" class="empty-recently-viewed">
        <p>최근본 상품이 없습니다.</p>
      </div>
      <div v-else>
        <ul class="recently-viewed-items">
          <li v-for="item in recentlyViewed" :key="item.id" class="recently-viewed-item">
            <h5>{{ item.name }}</h5>
            <p>수익률: {{ item.yield }}%</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'RecentlyViewed',
    setup() {
      // Sample data for recently viewed items
      const recentlyViewed = ref([
        { id: 1, name: '펀드 C', yield: 4.5 },
        { id: 2, name: '채권 D', yield: 3.1 },
      ]);
  
      return {
        recentlyViewed
      };
    }
  };
  </script>
  
  <style scoped>
  .recently-viewed-container {
    padding: 20px;
  }
  
  .empty-recently-viewed {
    text-align: center;
    margin-top: 50px;
  }
  
  .recently-viewed-items {
    list-style: none;
    padding: 0;
  }
  
  .recently-viewed-item {
    margin-bottom: 20px;
  }
  </style>
  