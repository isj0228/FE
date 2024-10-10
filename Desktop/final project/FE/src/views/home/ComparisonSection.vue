<template>
  <div class="all">
    <section class="comparison">
      <div class="comparison-item">
        <img
          src="@/assets/img/mainicon-Lcongeek26.png"
          alt="비교 이미지"
          class="comparison-image1"
        />
        <h3>한눈에 상품 비교</h3>
        <p>
          국내 금융상품을 한눈에 보고 <br />
          나에게 필요한 포트폴리오를<br />
          작성해 보세요
        </p>
      </div>
      <div class="comparison-item">
        <img
          src="@/assets/img/mainicon-VectorPortal.png"
          alt="비교 이미지"
          class="comparison-image2"
        />
        <h3>확실한 추천 서비스</h3>
        <p>
          광고 없이 다양한 금융상품을 추천받고<br />
          나만의 포트폴리오를 작성해 보세요
        </p>
      </div>
      <div class="comparison-item">
        <img
          src="@/assets/img/mainicon-Freepik.png"
          alt="비교 이미지"
          class="comparison-image3"
        />
        <h3>데이터 기반 투자 전략</h3>
        <p>
          나의 투자 성향을 확인하고 <br />
          성향에 맞는 추천 서비스를 통해 <br />
          다양한 전략을 세워 보세요
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ComparisonSection',
  components: {},
};
</script>

<style scoped>
.all {
  /* background-color: #d0f5ed; */
}
.comparison {
  display: flex;
  gap: 146px;
  padding: 60px;
  margin-top: 42px;
  justify-content: center;
  border: 2px solid #2d6a4f;

  border-radius: 10px;
}

.comparison-item {
  text-align: center;
}

.comparison-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #2d6a4f; /* Minty green color */
}

.comparison-item p {
  font-size: 16px;
  color: #333;
}
/* 이미지 크기 조절 */
.comparison-image1,
.comparison-image2,
.comparison-image3 {
  width: 100px; /* 원하는 크기로 설정 */
  height: auto;
  margin-bottom: 30px; /* 이미지와 텍스트 사이 간격 */
}
</style>
