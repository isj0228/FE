<template>
    <div>
        <h1>투자분석 종료</h1>
        <div class="InvestmentTest-body">
            <div class="InvestmentTest-content">
                <div class="InvestmentTest-text">
                    고객님의 성실한 답변에 감사드리며, 답변해 주신 본 질문지에 기초해 고객님께
                    적합한 상품을 제공하도록 노력하겠습니다. 본 질문지에서 수집된 개인정보는
                    고객님께 적합한 상품을 제공하기 위한 기초자료만으로 활용할 예정이며 우리은행에
                    의하여 기밀로 보호될 것을 약속드립니다. 다음 화면에서 제공되는 투자자성향 분석
                    결과는 고객님께서 제공하신 정보를 바탕으로 분석되었으며, 거래목적,
                    투자기간·기대이익·기대손실을 고려한 위험에 대한 태도, 금융상품에 대한 이해도,
                    재산상황, 투자성상품의 취득·처분 경험, 연령 등에 비추어 적합하지 않은 상품은
                    투자권유가 불가합니다. 본인은 투자위험에 대한 본인의 성향이 올바르게 선택되어
                    있음을 확인합니다.
                </div>
                <v-btn
                    class="InvestmentTest-btn"
                    @click="navigateTo('/my-investment-analyze'), cancel()"
                >
                    결과보기
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InvestmentTestEnd',

    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped>
.InvestmentTest-container {
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: flex-start; /* 좌측 정렬 */
    justify-content: space-between; /* 상단과 하단 요소 배치 */
    height: 100vh; /* 전체 화면 높이 */
    padding: 20px; /* 좌우 여백 */
}

.InvestmentTest-body {
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    margin-top: 20px;
    width: 100%;
    height: 540px;
}

.InvestmentTest-content {
    display: flex; /* flexbox 사용 */
    flex-direction: column; /* 세로 정렬 */
    align-items: center; /* 수평 중앙 정렬 */
    justify-content: center; /* 수직 중앙 정렬 */
    width: 100%; /* 가로 길이 전체 차지 */
    padding: 20px; /* 여백 추가 */
    background-color: #f0f0f0; /* 배경색 설정 */
    border-radius: 8px; /* 모서리 둥글게 */
}

.InvestmentTest-text {
    white-space: normal; /* 기본 줄바꿈 사용 */
    line-height: 1.5; /* 줄 간격 조정 */
}

.InvestmentTest-btn {
    width: 180px;
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 20px;
}

.InvestmentTest-btn:hover {
    background-color: #399d91;
}
</style>
