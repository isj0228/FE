<template>
    <div class="InvestmentTest-container">
        <div class="MyInvestment-header">
            <h1>투자성향분석 시작</h1>
        </div>
        <div class="InvestmentTest-body">
            <div class="InvestmentTest-content">
                <div class="InvestmentTest-text">
                    투자성향분석 결과는 12개월간 재사용이 가능합니다.다만 당일이 아닐 경우 재사용을
                    하더라도 일부 문항에 대한 답변은 필수입니다.재사용을 원하지 않을 경우 혹은
                    유효기간이 경과된 후에는 영업점 방문 혹은 비대면을 통하여 재분석
                    가능합니다.투자자성향분석은 비대면에서 1일 1회만 분석가능하오니 신중히
                    답변해주시기 바랍니다. 투자자정보 확인 고객님에게 가장 적합한 상품을 제공하기
                    위해서는 고객님의 정확한 답변이 필요합니다.최대한 고객님의 상황에 부합하거나
                    가장 가까운 항목을 선택하여 주시기 바랍니다.
                </div>
                <v-btn class="InvestmentTest-btn" @click="navigateTo('/investment-test'), cancel()">
                    분석하기
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InvestmentTestStart',

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
