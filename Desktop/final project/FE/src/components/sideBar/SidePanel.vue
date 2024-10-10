<template>
    <transition name="slide">
      <div class="side-panel" v-if="isVisible">
        <div class="panel-header">
          <h2>{{ panelTitle }}</h2>
          <button @click="closePanel" class="close-btn">X</button>
        </div>
        <div class="panel-content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'SidePanel',
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
      panelTitle: {
        type: String,
        default: 'Panel',
      },
    },
    methods: {
      closePanel() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .side-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    overflow-y: auto;
    transform: translateX(100%); /* Start off-screen */
    transition: transform 0.4s ease; /* Gradual opening effect */
  }
  
  .side-panel-enter-active,
  .side-panel-leave-active {
    transition: transform 0.4s ease; /* Same transition duration */
  }
  
  .side-panel-enter,
  .side-panel-leave-to {
    transform: translateX(100%); /* Move off-screen when leaving */
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #2d6a4f;
    color: white;
  }
  
  .panel-content {
    padding: 15px;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  