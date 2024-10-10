<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/')">홈페이지</v-btn>
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/find')"
          >아디비번찾기</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/my-investment-analyze')"
          >투자성향분석</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/login')">로그인</v-btn>
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/signup')"
          >회원가입</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/mypage')"
          >개인정보</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/product-')"
          >상품 비교</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/financial-products')"
          >금융상품</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/cart')">장바구니</v-btn>
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/recently-viewed')"
          >최근본상품</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/my-portfolio')"
          >포트폴리오</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/changePW')"
          >비밀번호 변경</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/bonds')"
          >채권 리스트</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/deposits')"
          >예금 리스트</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/savings')"
          >적금 리스트</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/funds')"
          >펀 리스트</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/stocks')"
          >주식 리스트</v-btn
        >
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-btn color="teal" block @click="navigateTo('/stock-search')"
          >주식 검색</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DevBtn',
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.v-btn {
  background-color: #4db6ac;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

.v-btn:hover {
  background-color: #399d91;
}
</style>
