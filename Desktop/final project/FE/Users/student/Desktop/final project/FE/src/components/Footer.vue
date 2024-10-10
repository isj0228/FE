<template>
  <footer>
      <span>&copy; 2024 ProPortFolio. All rights reserved.</span>
      <span>고객센터 000-000-0000</span>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
footer {
  background-color: #e9f5e9; /* Light minty green */
  padding: 40px 20px;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.footer-links div {
  flex: 1;
}

.footer-links h4 {
  margin-bottom: 10px;
  color: #2d6a4f; /* Minty green color */
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links ul li {
  margin-bottom: 10px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>
