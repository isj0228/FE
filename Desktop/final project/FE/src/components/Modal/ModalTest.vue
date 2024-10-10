<template>
    <div v-if="isOpen" class="modal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>

            <div v-if="step === 'start'">
                <h2>테스트 시작 설명</h2>
                <div class="InvestmentTest-body">
                    <div class="InvestmentTest-content">
                        <div class="InvestmentTest-text">
                            투자성향분석 결과는 12개월간 재사용이 가능합니다. 다만 당일이 아닐 경우
                            재사용을 하더라도 일부 문항에 대한 답변은 필수입니다...
                        </div>
                        <v-btn class="ModalTest-btn" @click="startTest">시작하기</v-btn>
                        <v-btn class="ModalTest-btn" @click="closeModal">취소</v-btn>
                    </div>
                </div>
            </div>

            <div v-else-if="step === 'test'">
                <h2>투자 성향 분석 테스트</h2>
                <v-progress-linear :model-value="progress" :height="9"></v-progress-linear>

                <div class="question-container">
                    <div class="question-progress">
                        질문 {{ currentQuestionIndex + 1 }} / {{ questions.length }}
                    </div>
                    <div class="question-text">{{ currentQuestion.question }}</div>
                    <div class="answers">
                        <ul>
                            <li
                                v-for="(option, index) in currentQuestion.options"
                                :key="index"
                                @click="selectAnswer(option)"
                                :class="{
                                    selected: selectedAnswers[currentQuestionIndex] === option,
                                }"
                            >
                                {{ index + 1 }}. {{ option }}
                            </li>
                        </ul>
                    </div>
                    <div class="navigation">
                        <div class="navigation-buttons">
                            <v-btn
                                v-if="currentQuestionIndex > 0"
                                class="ModalTest-btn"
                                @click="prevQuestion"
                            >
                                이전 질문
                            </v-btn>
                            <v-btn
                                v-if="!isLastQuestion"
                                class="ModalTest-btn"
                                @click="nextQuestion"
                            >
                                다음 질문
                            </v-btn>
                        </div>
                        <div class="navigation-End-btn">
                            <v-btn
                                :disabled="!allQuestionsAnswered"
                                class="ModalTest-btn"
                                @click="finishTest"
                            >
                                테스트 완료
                            </v-btn>
                            <v-btn class="ModalTest-btn" @click="closeModal">취소</v-btn>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="step === 'end'">
                <h2>테스트 완료</h2>
                <div class="test-end-message">
                    투자 성향 분석이 완료되었습니다. 결과를 확인하세요.
                </div>
                <v-btn class="ModalTest-btn" @click="closeModal">완료</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, defineComponent, watch } from 'vue';

export default defineComponent({
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const step = ref('start');
        const currentQuestionIndex = ref(0);
        const selectedAnswers = ref([]);

        // 임시 질문 데이터
        const questions = [
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
        ];

        const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
        const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1);
        const progress = computed(
            () => ((currentQuestionIndex.value + 1) / questions.length) * 100
        );
        const allQuestionsAnswered = computed(() => {
            return (
                selectedAnswers.value.length === questions.length &&
                selectedAnswers.value.every((answer) => answer !== null)
            );
        });

        const startTest = () => {
            step.value = 'test';
        };

        const nextQuestion = () => {
            if (currentQuestionIndex.value < questions.length - 1) {
                currentQuestionIndex.value++;
            }
        };

        const prevQuestion = () => {
            if (currentQuestionIndex.value > 0) {
                currentQuestionIndex.value--;
            }
        };

        const selectAnswer = (option) => {
            const currentAnswer = selectedAnswers.value[currentQuestionIndex.value];
            if (currentAnswer === option) {
                selectedAnswers.value[currentQuestionIndex.value] = null;
            } else {
                selectedAnswers.value[currentQuestionIndex.value] = option;
            }

            if (currentAnswer !== option) {
                setTimeout(() => {
                    if (currentQuestionIndex.value < questions.length - 1) {
                        nextQuestion();
                    }
                }, 200);
            }
        };

        const finishTest = () => {
            step.value = 'end';
            emit('finishTest');
        };

        const closeModal = () => {
            emit('close');
            resetModal();
        };

        const resetModal = () => {
            step.value = 'start';
            currentQuestionIndex.value = 0;
            selectedAnswers.value = [];
        };

        watch(
            () => props.isOpen,
            (newValue) => {
                if (!newValue) {
                    resetModal();
                }
            }
        );

        return {
            step,
            currentQuestionIndex,
            selectedAnswers,
            currentQuestion,
            isLastQuestion,
            allQuestionsAnswered,
            progress,
            startTest,
            nextQuestion,
            prevQuestion,
            selectAnswer,
            finishTest,
            closeModal,
            questions, // 컴포넌트에서 사용할 질문 리스트
        };
    },
});
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
}

.close {
    float: right;
    cursor: pointer;
}

.InvestmentTest-body,
.question-container {
    margin: 20px 0;
}

.ModalTest-btn {
    margin: 10px 5px;
}

.selected {
    color: blue;
    font-weight: bold;
}

.answers {
    margin-top: 15px;
}

.answers ul {
    list-style: none;
    padding: 0;
}

.answers li {
    padding: 5px;
    cursor: pointer;
}

.navigation {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.navigation-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.navigation-End-btn {
    display: flex;
    justify-content: center;
}
</style>
