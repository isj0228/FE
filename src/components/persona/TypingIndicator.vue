<template>
    <div class="typing-indicator">
      <span class="dot" v-for="n in 3" :key="n" :class="'dot-' + n">·</span>
    </div>
  </template>
  
  <script>
  export default {
    name: "TypingIndicator",
  };
  </script>
  
  <style scoped>
  .typing-indicator {
    display: flex;
    justify-content: space-between;
    width: 2rem; /* 세 점이 고정된 공간 내에서 움직이도록 설정 */
  }
  
  .dot {
    font-size: 1.5rem;
    color: #888;
    opacity: 0.5;
    animation: typing 1.5s infinite ease-in-out;
  }
  
  .dot-1 {
    animation-delay: 0s;
  }
  
  .dot-2 {
    animation-delay: 0.3s;
  }
  
  .dot-3 {
    animation-delay: 0.6s;
  }
  
  @keyframes typing {
    0%, 100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
  }
  </style>
  