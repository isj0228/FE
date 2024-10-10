<template>
    <div class="app-container">
      <div class="uiNavAside" ref="sidebar">
        <ul class="nav-aside">
          <div class="button-container">
            <!-- Sidebar Menu Components -->
            <SidebarMenu1
              :activeDropdown="activeDropdown"
              :portfolios="portfolios"
              @goToCreatePortfolio="goToCreatePortfolio"
              @openSidePanel="openSidePanel"
            />
            <SidebarMenu2 :cart="cart" @openSidePanel="openSidePanel" />
            <RecentProductsSection
              :recentProducts="recentProducts"
              @openSidePanel="openSidePanel"
            />
          </div>
        </ul>
      </div>
  
      <!-- Side Panel -->
      <SidePanel
    :isVisible="isSidePanelOpen"
    :panelTitle="panelTitle"
    @close="isSidePanelOpen = false"
    >
    <div v-if="activeSection === 'PortfolioSection'">
        <ul v-if="panelData.length > 0">
        <li v-for="portfolio in panelData" :key="portfolio.id">
            {{ portfolio.portfolioName }} - 총액: {{ portfolio.total }}원
        </li>
        </ul>
        <p v-else>포트폴리오 데이터가 없습니다.</p>
    </div>
    </SidePanel>
    </div>
  </template>
  
  <script>
  import SidebarMenu1 from './sideBar/PortfolioSection.vue';
  import SidebarMenu2 from './sideBar/CartSection.vue';
  import RecentProductsSection from './sideBar/RecentProductsSection.vue';
  import SidePanel from './sideBar/SidePanel.vue';
  import { ref } from 'vue';
  
  export default {
    name: 'SideBar',
    components: {
      SidebarMenu1,
      SidebarMenu2,
      RecentProductsSection,
      SidePanel,
    },
    setup() {
      const portfolios = ref([]);
      const cart = ref([]);
      const recentProducts = ref([]);
  
      const isSidePanelOpen = ref(false);
      const panelTitle = ref('');
      const activeSection = ref('');
      const panelData = ref([]); // The data to be passed to the side panel
  
      // Function to open the side panel with the relevant data
      const openSidePanel = (payload) => {
        panelTitle.value = payload.title; // Set the title of the panel
        activeSection.value = payload.section; // Set the active section
        panelData.value = payload.data; // Set the data to be displayed in the panel
        isSidePanelOpen.value = true; // Open the side panel
      };
  
      return {
        portfolios,
        cart,
        recentProducts,
        isSidePanelOpen,
        panelTitle,
        activeSection,
        panelData,
        openSidePanel,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles for the sidebar and side panel */
  .app-container {
    display: flex;
  }
  
  .uiNavAside {
    position: fixed;
    right: 0;
    top: 0;
    width: 90px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    border-radius: 5px;
    padding: 10px;
    background-color: rgb(233, 233, 233);
  }
  
  .nav-aside {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .nav-aside li {
    text-align: center;
    flex-grow: 0;
    margin: 0;
  }
  
  .nav-aside a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 10px;
    text-decoration: none;
    background-color: #e2dfdf;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .nav-aside li:hover a {
    background-color: #575757;
  }
  
  .menu-text {
    font-size: 0.9rem;
    margin-top: 5px;
  }
  </style>
  