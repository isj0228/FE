<template>
    <div class="app-container">
      <div class="uiNavAside" ref="sidebar">
        <ul class="nav-aside">
          <div class="button-container">
            <!-- Portfolio Menu -->
            <SidebarMenu1
              :activeDropdown="activeDropdown"
              :portfolios="portfolios"
              @goToCreatePortfolio="goToCreatePortfolio"
            />
  
            <!-- Cart Menu -->
            <SidebarMenu2
              :cart="cart"
              @openSidePanel="openSidePanel"
            />
  
            <!-- Recently Viewed Products Menu -->
            <SidebarMenu3 :activeDropdown="activeDropdown" />
          </div>
        </ul>
      </div>
  
      <!-- Side Panel -->
      <SidePanel
        :isVisible="isSidePanelOpen"
        :panelTitle="panelTitle"
        @close="isSidePanelOpen = false"
      >
        <div v-if="activeSection === 'CartSection'">
          <ul>
            <li v-for="item in panelData" :key="item.name">
              {{ item.name }} - {{ item.price }}원
              <button @click="$emit('removeFromCart', item)">Remove</button>
            </li>
          </ul>
        </div>
        <!-- Add additional sections as necessary -->
      </SidePanel>
    </div>
  </template>
  
  <script>
  import SidebarMenu1 from './sideBar/PortfolioSection.vue';
  import SidebarMenu2 from './sideBar/CartSection.vue';
  import SidebarMenu3 from './sideBar/RecentProductsSection.vue';
  import SidePanel from './sideBar/SidePanel.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'SideBar',
    components: {
      SidebarMenu1,
      SidebarMenu2,
      SidebarMenu3,
      SidePanel,
    },
    setup() {
      const portfolios = ref([]);
      const cart = ref([]);
      const isSidePanelOpen = ref(false);
      const panelTitle = ref('');
      const activeSection = ref('');
      const panelData = ref([]);
      const router = useRouter();
  
      const openSidePanel = (payload) => {
        panelTitle.value = payload.title; // Set the title
        activeSection.value = payload.section; // Set the active section
        panelData.value = payload.data; // Pass the data to the panel
        isSidePanelOpen.value = true; // Open the panel
      };
  
      return {
        portfolios,
        cart,
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
  .app-container {
    display: flex; /* Use flex to align sidebar and side panel */
  }
  
  .uiNavAside {
    position: fixed;
    right: 0;
    top: 0;
    width: 90px; /* Adjusted width */
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
  