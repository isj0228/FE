<template>
    <div id="All">
      <!-- 왼쪽 메뉴 바 -->
      <div id="left">
        <v-card class="pa-4" elevation="2" style="height: 100%">
          <v-card-text>
            <div class="list-container">
              <span @click="navigateTo('/Youtube')" class="list-item"> 금융 유튜브 </span>
              <span @click="navigateTo('/Influencer')" class="list-item"> 인플루언서 </span>
              <span @click="navigateTo('/News')" class="list-item"> 뉴스 </span>
            </div>
          </v-card-text>
        </v-card>
      </div>
  
      <!-- 상품명 검색, 제목 -->
      <div id="right">
        <v-container>
          <div id="searchtext" class="search-container">
            <h1 class="sixth">_</h1>
            <div id="search" class="search-filter">
              <i class="fa-solid fa-magnifying-glass" style="font-size: 24px"></i>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="검색어를 입력해 주세요"
              />
            </div>
          </div>
  
          <!-- Main Influencer Title Component -->
          <Influencer_title :searchQuery="searchQuery" @openModal="openModal" />
          
          <!-- Modal for Influencer Details -->
          <InfluencerModal 
            :influencer="selectedInfluencer" 
            :isOpen.sync="modalOpen"
          />
        </v-container>
      </div>
    </div>
  </template>
  
  <script>
  import Influencer_title from './Influencer_title.vue';
  import InfluencerModal from '@/components/Modal/InfluencerModal.vue'; // Updated path
  
  export default {
    name: 'Influencer',
    components: {
      Influencer_title,
      InfluencerModal,
    },
    data() {
      return {
        searchQuery: '',
        modalOpen: false,
        selectedInfluencer: null,
      };
    },
    methods: {
      navigateTo(path) {
        this.$router.push(path);
      },
      openModal(influencer) {
        this.selectedInfluencer = influencer;
        this.modalOpen = true;
      },
    },
  };
  </script>
  
  <style scoped>
  #All {
    display: flex;
    align-items: stretch;
    padding-left: 100px;
  }
  #left {
    width: 300px;
  }
  #right {
    flex: 1;
  }
  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  #search {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .form-control {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  h1.sixth {
    position: relative;
  }
  h1.sixth:before,
  h1.sixth:after {
    content: '금융 ';
    display: inline-block;
    position: relative;
    top: 1px;
    height: 100%;
    font-size: 1.25em;
    color: black;
    transition: all 0.5s ease;
  }
  h1.sixth:after {
    content: '인플루언서';
  }
  h1.sixth:hover:before {
    transform: translateX(-5px);
  }
  h1.sixth:hover:after {
    transform: translateX(5px);
  }
  </style>
  