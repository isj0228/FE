<template>
  <div class="layout-wrapper">
    <!-- 사이드바 -->
    <div class="uiNavAside" :class="{ 'expanded': isSidebarExpanded }" ref="sidebar">
      <ul class="nav-aside">
        <div class="button-container">
          <SidebarMenu1
            :activeDropdown="activeDropdown"
            :portfolios="portfolios"
            @toggleDropdown="toggleDropdown"
            @goToCreatePortfolio="goToCreatePortfolio"
          />
          <SidebarMenu2 :activeDropdown="activeDropdown" @toggleDropdown="toggleDropdown" />
          <SidebarMenu3 :activeDropdown="activeDropdown" @toggleDropdown="toggleDropdown" />
        </div>
      </ul>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="main-content" :class="{ 'shifted': isSidebarExpanded }">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarMenu1 from './sideBar/PortfolioSection.vue';
import SidebarMenu2 from './sideBar/CartSection.vue';
import SidebarMenu3 from './sideBar/RecentProductsSection.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'SideBar',
  components: {
    SidebarMenu1,
    SidebarMenu2,
    SidebarMenu3,
  },
  setup() {
    const portfolios = ref([
      { name: '포트폴리오 1', returns: 10.3, risk: 8.74 },
      { name: '포트폴리오 2', returns: -3.0, risk: 4.0 },
      { name: '포트폴리오 3', returns: 10.3, risk: 8.74 },
    ]);

    const activeDropdown = ref(null);
    const isSidebarExpanded = ref(false);
    const router = useRouter();
    const sidebar = ref(null);

    const toggleDropdown = (menuNumber) => {
      if (activeDropdown.value === menuNumber) {
        activeDropdown.value = null;
        isSidebarExpanded.value = false; // 사이드바가 축소될 때 메인 컨텐츠 원위치
      } else {
        activeDropdown.value = menuNumber;
        isSidebarExpanded.value = true; // 사이드바 확장 시 메인 컨텐츠 이동
      }
    };

    const goToCreatePortfolio = () => {
      router.push('/make-portfolio');
    };

    const handleClickOutside = (event) => {
      if (sidebar.value && !sidebar.value.contains(event.target)) {
        activeDropdown.value = null;
        isSidebarExpanded.value = false; // 외부 클릭 시 사이드바 축소
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      portfolios,
      activeDropdown,
      isSidebarExpanded,
      toggleDropdown,
      goToCreatePortfolio,
      sidebar,
    };
  },
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  height: 100vh;
}

.uiNavAside {
  position: fixed;
  right: 0;
  top: 0;
  width: 90px;
  height: 100vh;
  background-color: #f5f6fa;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  border-left: 1px solid #e0e0e0;
  transition: width 0.3s ease;
}

.uiNavAside.expanded {
  width: 250px; /* 확장 시 너비 */
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

.main-content {
  flex-grow: 1;
  margin-right: 90px; /* 기본 사이드바 너비 */
  transition: margin-right 0.3s ease;
}

.main-content.shifted {
  margin-right: 250px; /* 사이드바가 확장되었을 때 마진 조정 */
}

.nav-aside a {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  color: #333;
  text-decoration: none;
  background-color: #fff;
  border-radius: 8px;
  margin: 5px 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.nav-aside a:hover {
  background-color: #f0f0f0;
}

.menu-text {
  font-size: 1rem;
  margin-left: 10px;
}
</style>