<template>
    <li class="menu-item">
      <a href="javascript:void(0)" class="sidebar-link" @click.stop="openSidePanel">
        <i class="fas fa-briefcase icon"></i>
        <span class="menu-text">포트폴리오</span>
      </a>
    </li>
  </template>
  
  <script>
  export default {
    name: 'PortfolioSection',
    props: {
      portfolios: {
        type: Array,
        required: true,
      },
    },
    methods: {
      openSidePanel() {
        this.$emit('openSidePanel', {
          title: '포트폴리오',
          section: 'PortfolioSection',
          data: this.portfolios,
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
  