<template>
    <li class="menu-item" @click="toggleDropdown(3)">
      <a href="javascript:void(0)" class="sidebar-link">
        <i class="fas fa-clock icon"></i>
        <span class="menu-text">최근 본 상품</span>
      </a>
      <div v-if="activeDropdown === 3" class="dropdown-content">
        <h3 class="section-title">최근 본 상품 목록</h3>
        <ul>
          <li v-for="item in recentlyViewed" :key="item.name" @click.stop="openSidePanel('최근 본 상품', item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    name: 'RecentProductsSection',
    props: {
      activeDropdown: {
        type: Number,
        required: true,
      },
      recentlyViewed: {
        type: Array,
        required: true,
      },
    },
    methods: {
      toggleDropdown(menuNumber) {
        this.$emit('toggleDropdown', menuNumber);
      },
      openSidePanel(sectionTitle, data) {
        this.$emit('openSidePanel', {
          title: sectionTitle,
          section: 'RecentProductsSection',
          data: data,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .menu-item {
    position: relative; /* Ensures the dropdown is positioned correctly */
  }
  .sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    color: grey;
    text-decoration: none;
    width: 100%;
    transition: background-color 0.3s ease;
  }
  .sidebar-link:hover {
    background-color: #D7DBDE;
  }
  .icon {
    font-size: 24px;
    margin-bottom: 5px;
  }
  .menu-text {
    font-size: 0.7rem;
    opacity: 1; /* Always fully visible */
    transition: none; /* Remove the transition */
    text-align: center; /* Center the text */
  }
  .dropdown-content {
    position: absolute;
    left: 100%; /* Align dropdown to the right of the menu item */
    top: 0;
    background-color: #fff;
    padding: 10px;
    width: 180px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>