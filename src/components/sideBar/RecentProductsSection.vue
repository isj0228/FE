<template>
    <li class="menu-item">
      <a href="javascript:void(0)" class="sidebar-link" @click.stop="openRecentProducts">
        <i class="fas fa-history icon"></i>
        <span class="menu-text">최근 본 상품</span>
      </a>
    </li>
  </template>
  
  <script>
  export default {
    name: 'RecentProductsSection',
    props: {
      recentProducts: {
        type: Array,
        required: true,
      },
    },
    methods: {
      openRecentProducts() {
        this.$emit('openSidePanel', {
          title: '최근 본 상품',
          section: 'RecentProductsSection',
          data: this.recentProducts,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .menu-item {
    position: relative;
  }
  
  .sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    color: grey;
    text-decoration: none;
    width: 100%;
    transition: background-color 0.3s ease;
  }
  
  .sidebar-link:hover {
    background-color: #d7dbde;
  }
  
  .icon {
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  .menu-text {
    font-size: 0.7rem;
    opacity: 1;
    transition: none;
  }
  </style>
  