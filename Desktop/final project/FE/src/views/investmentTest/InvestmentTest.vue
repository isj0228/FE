<template>
    <div class="InvestmentTest-container">
        <h1>투자성향분석 페이지</h1>

        <!-- 진행 상황 표시 -->
        <div class="question-progress">
            질문 {{ currentQuestionIndex + 1 }} / {{ questions.length }}
        </div>

        <!-- 진행 바 -->
        <div class="progress-bar">
            <div
                class="progress"
                :style="{ width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%' }"
            ></div>
        </div>

        <!-- 질문과 답변 표시 -->
        <div class="InvestmentTest-query">
            <p>{{ currentQuestion.question }}</p>
            <div class="answers">
                <ul>
                    <li
                        v-for="(option, index) in currentQuestion.options"
                        :key="index"
                        @click="selectAnswer(option)"
                        :class="{ selected: isSelected(option) }"
                    >
                        {{ index + 1 }}. {{ option }}
                    </li>
                </ul>
            </div>
        </div>

        <!-- 네비게이션 버튼 -->
        <div class="navigation">
            <v-btn v-if="currentQuestionIndex > 0" class="InvestmentTest-btn" @click="prevQuestion"
                >이전 질문</v-btn
            >
            <v-btn v-if="!isLastQuestion" class="InvestmentTest-btn" @click="nextQuestion"
                >다음 질문</v-btn
            >
        </div>

        <!-- 완료 버튼과 취소 버튼 -->
        <div class="navigation-End-btn">
            <v-btn :disabled="!allQuestionsAnswered" class="InvestmentTest-btn" @click="finishTest">
                테스트 완료
            </v-btn>
            <v-btn class="InvestmentTest-btn" @click="closeTest">취소</v-btn>
        </div>
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
                {
                    question: '3. 세 번째 질문 내용?',
                    options: ['옵션 A', '옵션 B', '옵션 C'],
                },
                // 추가 질문을 여기에 추가하세요
            ],
            currentQuestionIndex: 0,
            selectedAnswers: Array(2).fill(null), // 질문 개수에 맞게 초기화
        };
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        isLastQuestion() {
            return this.currentQuestionIndex === this.questions.length - 1;
        },
        allQuestionsAnswered() {
            return this.selectedAnswers.every((answer) => answer !== null);
        },
    },
    methods: {
        selectAnswer(option) {
            this.selectedAnswers[this.currentQuestionIndex] = option;

            // 다음 질문으로 자동 이동 (0.2초 딜레이)
            if (!this.isLastQuestion) {
                setTimeout(() => {
                    this.nextQuestion();
                }, 200);
            }
        },
        isSelected(option) {
            return this.selectedAnswers[this.currentQuestionIndex] === option;
        },
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            }
        },
        prevQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        finishTest() {
            this.$router.push('/investment-test-end'); // 테스트 완료 페이지로 이동
        },
        closeTest() {
            this.$router.push('/'); //취소 시 홈페이지로 이동
        },
    },
};
</script>

<style scoped>
.InvestmentTest-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 20px;
}

.question-progress {
    font-size: 16px;
    margin-bottom: 20px;
}

.InvestmentTest-query p {
    font-size: 18px;
    margin: 10px 0;
}

.answers ul {
    list-style-type: none;
    padding: 0;
}

.answers li {
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #f0f0f0;
    margin-bottom: 10px;
}

.answers li.selected {
    background-color: #4caf50;
    color: white;
}

.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #eee;
    margin: 20px 0;
    border-radius: 5px;
}

.progress {
    height: 100%;
    background-color: #3f51b5;
    border-radius: 5px;
    transition: width 0.3s ease;
}

.navigation {
    margin-top: 20px;
}

.v-btn {
    margin: 5px;
    background-color: #4caf50;
    color: white;
}

.v-btn:hover {
    background-color: #388e3c;
}
</style>
