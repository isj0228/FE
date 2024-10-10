<template>
    <div>
        <h1>투자성향분석 페이지</h1>
        <div class="question-progress">
            질문 {{ currentQuestionIndex + 1 }} / {{ questions.length }}
        </div>
        <div class="InvestmentTest-query">
            <p>{{ currentQuestion.question }}</p>
            <div v-for="(option, index) in currentQuestion.options" :key="index">
                <p>{{ option }}</p>
            </div>
        </div>
        <div class="progress-bar">
            <div
                class="progress"
                :style="{ width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%' }"
            ></div>
        </div>
        <v-btn class="InvestmentTest-btn" @click="nextQuestion"> 다음 문제 </v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questions: [
                {
                    question: '1. 첫 번째 질문 내용?',
                    options: ['옵션 1', '옵션 2', '옵션 3'],
                },
                {
                    question: '2. 두 번째 질문 내용?',
                    options: ['옵션 A', '옵션 B', '옵션 C'],
                },
                // 추가 질문을 여기에 추가하세요
            ],
            currentQuestionIndex: 0,
        };
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
    },
    methods: {
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            } else {
                // 모든 질문이 끝났을 경우 /investment-test-end로 이동
                this.$router.push('/investment-test-end'); // Use this for Vue Router
            }
        },
    },
};
</script>

<style scoped>
.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #eee;
    margin: 20px 0;
    border-radius: 5px;
}

.progress {
    height: 100%;
    background-color: #3f51b5; /* Customize this color */
    border-radius: 5px;
    transition: width 0.3s ease;
}

.question-progress {
    font-size: 16px; /* Adjust font size as needed */
    margin: 10px 0;
}
</style>
