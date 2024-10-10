<template>
    <div class="MyInvestment-container">
        <div class="MyInvestment-header">
            <h1>내 투자성향 페이지</h1>
            <!-- 테스트용 버튼(추후 삭제) -->
            <div class="DevBtn-set">
                <v-btn class="DevBtn-btn" @click="DevSetScore(81)"> 공격투자형 </v-btn>
                <v-btn class="DevBtn-btn" @click="DevSetScore(61)"> 적극투자형 </v-btn>
                <v-btn class="DevBtn-btn" @click="DevSetScore(41)"> 위험중립형 </v-btn>
                <v-btn class="DevBtn-btn" @click="DevSetScore(21)"> 안정추구형 </v-btn>
                <v-btn class="DevBtn-btn" @click="DevSetScore(1)"> 안정형 </v-btn>
                테스트 체크용 버튼(추후삭제)
            </div>
        </div>
        <div class="MyInvestment-body">
            <div class="body-content">
                <div class="top-left">
                    {{ preference_name }}, {{ user_preference }}점 <br /><br />
                    {{ preference_text }}
                </div>
                <div class="top-right">
                    나와 같은 투자성향 인플루언서
                    <div class="influencer-cards">
                        <div
                            v-for="(influencer, index) in influencers"
                            :key="index"
                            class="influencer-card"
                            @click="navigateToInfluencer(influencer)"
                        >
                            <h3>{{ influencer.name }}</h3>
                            <p>{{ influencer.info }}</p>
                        </div>
                    </div>
                </div>
                <div class="bottom-left">
                    투자성향별 적합금융상품 분류표
                    <img :src="shinhanInvestChart" class="investment-chart" />
                </div>
                <div class="bottom-right">
                    <div class="recommendation-square">추천 구성 비율</div>
                </div>
            </div>
        </div>

        <div class="MyInvestment-btn-set">
            <v-btn class="MyInvestment-btn" @click="navigateTo('/investment-test-start'), cancel()">
                다시 분석하기
            </v-btn>
            <v-btn class="MyInvestment-btn" @click="navigateTo('/make-portfolio'), cancel()">
                포트폴리오 작성하기
            </v-btn>
        </div>
    </div>
</template>

<script>
import shinhanInvestChart from '@/assets/img/shinhanInvestChart.jpg';

export default {
    name: 'MyInvestmentAnalyze',
    data() {
        return {
            user_preference: '80',
            preference_name: '',
            preference_text: '',
            shinhanInvestChart,
            influencers: [
                { name: 'Influencer 1', info: 'Influencer 1 정보' },
                { name: 'Influencer 2', info: 'Influencer 2 정보' },
                { name: 'Influencer 3', info: 'Influencer 3 정보' },
            ],
        };
    },

    mounted() {
        // 컴포넌트가 마운트될 때 투자 성향을 구분
        this.distinguish(this.user_preference);
    },

    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        navigateToInfluencer(influencer) {
            // 예시: 인플루언서 이름을 쿼리 파라미터로 넘기는 방식
            this.$router.push({ path: '/Influencer', query: { name: influencer.name } });
        },

        distinguish(user_preference) {
            if (user_preference >= 80) {
                this.preference_name = '공격투자형';
                this.preference_text =
                    '고객님께서는 공격투자형 성향을 보이십니다. 공격투자형은 높은 수익을 추구하는 대신, 위험을 감수할 준비가 되어 있는 투자자입니다. 투자자금의 상당 부분을 주식, 고위험 펀드, 또는 기타 고수익 자산에 투자하며, 장기적인 성장 가능성을 최우선으로 생각하는 경향이 있습니다.';
            } else if (user_preference >= 60) {
                this.preference_name = '적극투자형';
                this.preference_text =
                    '고객님께서는 적극투자형 성향을 보이십니다. 적극투자형은 수익을 추구하면서도 위험을 일부 감수하는 투자자입니다. 대부분의 자산을 주식이나 주식형 펀드에 투자하지만, 일부는 채권이나 안정적인 자산으로 분산하여 리스크를 관리하려는 성향이 있습니다.';
            } else if (user_preference >= 40) {
                this.preference_name = '위험중립형';
                this.preference_text =
                    '고객님께서는 위험중립형 성향을 보이십니다. 위험중립형은 안정성과 수익성의 균형을 중요시하는 투자자입니다. 주식과 채권, 그리고 현금성 자산에 고루 투자하며, 장기적인 안정적인 수익을 추구하는 동시에, 시장 변동에 대한 리스크를 적당히 수용하는 성향을 가지고 있습니다.';
            } else if (user_preference >= 20) {
                this.preference_name = '안정추구형';
                this.preference_text =
                    '고객님께서는 안정추구형 성향을 보이십니다. 안정추구형은 원금 손실을 최소화하면서 적당한 수익을 기대하는 투자자입니다. 자산의 대부분을 채권이나 저위험 펀드에 투자하며, 수익보다는 자산의 안전성을 우선시하는 성향입니다.';
            } else {
                this.preference_name = '안정형';
                this.preference_text =
                    '고객님께서는 안정형 성향을 보이십니다. 안정형은 자산 보호를 최우선으로 하며, 투자 리스크를 거의 감수하지 않는 투자자입니다. 현금성 자산이나 저위험 채권에 주로 투자하며, 자산의 장기적인 보전을 중요하게 생각하는 성향입니다.';
            }
        },

        // 테스트용 메서드(추후 삭제)
        DevSetScore(score) {
            this.user_preference = score;
            this.distinguish(this.user_preference);
        },
    },
};
</script>

<style scoped>
.MyInvestment-container {
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: flex-start; /* 좌측 정렬 */
    justify-content: space-between; /* 상단과 하단 요소 배치 */
    height: 100vh; /* 전체 화면 높이 */
    padding: 20px; /* 좌우 여백 */
    /* overflow-y: auto; */
}

.MyInvestment-body {
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    margin-top: 20px;
    width: 100%;
    height: 540px;
}

.body-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 두 개의 열 */
    grid-template-rows: repeat(2, 1fr); /* 두 개의 행 */
    gap: 20px; /* 요소 사이의 간격 */
    width: 100%; /* 가로 길이 전체 차지 */
    padding: 20px; /* 여백 추가 */
    background-color: #f0f0f0; /* 배경색 설정 */
    border-radius: 8px; /* 모서리 둥글게 */
}

.top-left {
    grid-column: 1;
    grid-row: 1;
}

.top-right {
    grid-column: 2;
    grid-row: 1;
}

.bottom-left {
    grid-column: 1;
    grid-row: 2;
}

.bottom-right {
    grid-column: 2;
    grid-row: 2;
}

.recommendation-square {
    width: 100%; /* 가로 길이 전체 차지 */
    height: 150px; /* 세로 길이 */
    background-color: #d0e4f4; /* 추천 구성 비율 영역 배경색 */
    display: flex;
    align-items: center; /* 가운데 정렬 */
    justify-content: center; /* 가운데 정렬 */
    border-radius: 8px; /* 모서리 둥글게 */
}

.investment-chart {
    width: 100%; /* 이미지 가로 길이 전체 차지 */
    height: auto; /* 비율 유지 */
}

.MyInvestment-btn-set {
    display: flex;
    justify-content: flex-end; /* 우측 정렬 */
    width: 100%; /* 가로 길이 전체 차지 */
    /* margin-top: auto; 남는 공간을 채우고 버튼을 아래로 */
}

.MyInvestment-btn {
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

.MyInvestment-btn:hover {
    background-color: #399d91;
}

.influencer-cards {
    display: flex;
    justify-content: space-between; /* 카드 간의 간격 */
    margin-top: 10px;
}
.influencer-card {
    width: 30%; /* 카드의 너비를 3개가 가로로 배치되도록 설정 */
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 기본 그림자 */
    display: flex;
    flex-direction: column;
    align-items: center; /* 텍스트와 카드 내용 가운데 정렬 */
    text-align: center;
    transition: box-shadow 0.3s ease; /* 부드러운 전환 효과 */
    cursor: pointer;
}

.influencer-card:hover {
    box-shadow: 0 4px 15px #7bd5c3; /* hover 시 그림자 확대 */
}

.influencer-card h4 {
    margin-bottom: 10px;
}

.influencer-card p {
    font-size: 14px;
    color: #666;
}
</style>
