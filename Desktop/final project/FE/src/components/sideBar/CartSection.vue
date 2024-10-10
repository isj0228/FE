<template>
    <li class="menu-item">
      <a href="javascript:void(0)" class="sidebar-link" @click="openSidePanel('장바구니')">
        <i class="fas fa-shopping-cart icon"></i>
        <span class="menu-text">장바구니</span>
      </a>
    </li>
  </template>
  
  <script>
  export default {
    name: 'CartSection',
    props: {
      cart: {
        type: Array,
        required: true,
      },
      removeFromCart: {
        type: Function,
        required: true,
      },
    },
    methods: {
      openSidePanel(sectionTitle) {
        this.$emit('openSidePanel', {
          title: sectionTitle,
          section: 'CartSection',
          data: this.cart, // Pass the entire cart data to the side panel
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .menu-item {
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
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
    background-color: #d7dbde;
  }
  .icon {
    font-size: 24px;
    margin-bottom: 5px;
  }
  .menu-text {
    font-size: 0.8rem;
    opacity: 1;
    transition: none;
  }
  </style>
  