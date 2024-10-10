<template>
    <v-dialog :model-value="isOpen" max-width="600px" @update:modelValue="closeModal">
        <v-card v-if="persona" class="modal-card">
            <v-card-title class="headline">{{ persona.personaName || '이름 없음' }}</v-card-title>
            <v-card-subtitle>{{ persona.job || '직업 정보 없음' }}</v-card-subtitle>
            <v-card-text>
                <div class="persona-details">
                    <p>
                        <strong>투자 성향:</strong>
                        <span class="preference">{{
                            getPreferenceText(persona.personaPreference)
                        }}</span>
                        <span class="preference-number">({{ persona.personaPreference }})</span>
                    </p>
                    <h3 class="portfolio-title">
                        {{ persona.personaName }}의 포트폴리오 구성 비율
                    </h3>
                    <div class="portfolio-rates">
                        <p>
                            <strong>주식:</strong>
                            <span class="rate">{{ persona.stockRate || 0 }}%</span>
                        </p>
                        <p>
                            <strong>펀드:</strong>
                            <span class="rate">{{ persona.fundRate || 0 }}%</span>
                        </p>
                        <p>
                            <strong>채권:</strong>
                            <span class="rate">{{ persona.bondRate || 0 }}%</span>
                        </p>
                        <p>
                            <strong>예/적금:</strong>
                            <span class="rate">{{ persona.savingsRate || 0 }}%</span>
                        </p>
                    </div>
                    <div class="portfolio-pie-chart">
                        <div>파이 차트</div>
                        <apexchart
                            type="pie"
                            width="380"
                            :options="chartOptions"
                            :series="series"
                        ></apexchart>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="closeModal">닫기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        persona: {
            type: Object,
            required: true,
        },
    },
    computed: {
        // Chart series including cash holding
        series() {
            const stockRate = this.persona.stockRate || 0;
            const fundRate = this.persona.fundRate || 0;
            const bondRate = this.persona.bondRate || 0;
            const savingsRate = this.persona.savingsRate || 0;

            // Calculate the sum of all rates
            const totalRate = stockRate + fundRate + bondRate + savingsRate;

            // Cash holding is the remaining percentage
            const cashHolding = 100 - totalRate;

            return [stockRate, fundRate, bondRate, savingsRate, cashHolding];
        },
        chartOptions() {
            return {
                chart: {
                    events: {},
                },
                labels: ['주식', '펀드', '채권', '예/적금', '현금보유'],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 300,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
            };
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        getPreferenceText(preference) {
            switch (preference) {
                case 1:
                    return '위험 투자';
                case 2:
                    return '적극 투자';
                case 3:
                    return '위험 중립';
                case 4:
                    return '안정 추구';
                case 5:
                    return '안정형';
                default:
                    return '정보 없음';
            }
        },
    },
};
</script>

<style scoped>
.modal-card {
    padding: 20px;
    background-color: #f9f9f9;
}

.persona-details {
    margin-top: 20px;
}

.preference {
    font-weight: bold;
}

.preference-number {
    font-style: italic;
    color: #999;
}

.portfolio-title {
    margin-top: 20px;
    font-size: 1.2rem;
}

.portfolio-rates p {
    margin: 10px 0;
}

.rate {
    font-size: 1.1rem;
    color: #333;
}
</style>
