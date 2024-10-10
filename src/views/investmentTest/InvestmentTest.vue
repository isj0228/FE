<template>
  <div class="InvestmentTest-container">
    <h1>투자성향분석 페이지</h1>

    <!-- 진행 상황 표시 -->
    <div class="question-progress">질문 {{ currentQuestionIndex + 1 }} / {{ questions.length }}</div>

    <!-- 진행 바 -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%' }"></div>
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
      <v-btn v-if="currentQuestionIndex > 0" class="InvestmentTest-btn" @click="prevQuestion">이전 질문</v-btn>
      <v-btn v-if="!isLastQuestion" class="InvestmentTest-btn" @click="nextQuestion">다음 질문</v-btn>
    </div>

    <!-- 완료 버튼과 취소 버튼 -->
    <div class="navigation-End-btn">
      <v-btn :disabled="!allQuestionsAnswered" class="InvestmentTest-btn" @click="finishTest"> 테스트 완료 </v-btn>
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
          question: "1. 고객님의 연령대가 어떻게 되십니까?",
          options: ["19세이하", " 20세~ 40세", "41세~ 50세", "51세~ 64세", "65세이상"],
        },
        {
          question: "2. 투자하려는 자금의 투자가능기간 어떻게 되십니까?",
          options: ["6개월미만", "6개월이상~ 1년미만", " 1년이상~ 2년미만", "2년 이상~ 3년미만", "3년 이상"],
        },
        {
          question: "3. 현재와 미래소득에 대한 예상을 선택해 주십시오",
          options: [
            "현재 일정한 소득이 발생하고 있으며, 미래에도 현재 수준을 유지하거나 늘어날 것으로 예상",
            "현재일정한소득이발생하고있으나, 미래에는줄어들거나불안정할 것으로예상",
            "현재일정한소득이없으며, 연금이주소득임",
          ],
        },
        {
          question: "4. 연간소득 금액이 어떻게 되십니까?",
          options: ["1천만원 미만", "3천만원 이하", "5천만원 이하", "1억원 이하", "1억원 초과"],
        },
        {
          question: "5. 전체 자산(부동산 포함)중 금융자산 비중이 어떻게 되십니까?",
          options: ["10%이하", "20%이하", "30%이하", "40%이하", "40%초과"],
        },
        {
          question: "6. 투자 또는 이용해 본 적이 있는 금융투자상품",
          options: [
            "국채, 지방채, 보증채, MMF등",
            "금융채, 신용도가높은회사채, 채권형펀드, 원금보장형ELS 등",
            "신용도중간등급의회사채, 원금의일부만보장되는ELS, 혼합형 펀드 등",
            "주식, 원금이 보장되지 않는 ELS, 신용도가 낮은 회사채, 시장수익률 수준의 수익을 추구하는주식형펀드등",
            " ELW, 선물옵션, 시장수익률 이상의 수익을 추구하는 주식형펀드, 파생상품 펀드, 주식 신용거래등",
          ],
        },
        {
          question:
            "7. 금융투자상품(주식, 채권, 펀드, 선물/옵션 등) 투자 (가입) 기간 (투자했던 기간이 가장 긴 상품의 가입 기간) ",
          options: ["전혀 없음", "1년 미만", "3년 미만", "5년 미만", "5년 이상"],
        },
        {
          question: "8. 일반적 투자목적이 어떻게 되십니까? ※기대수익높을수록손실위험도커짐",
          options: [
            "적극적매매를통한수익을원하며원금을초과하는손실위험도감당 가능",
            "적극적매매를통한수익실현목적",
            "시장(예: 주가지수) 가격변동추이와비슷한수준의수익실현",
            " 채권이자·주식배당정도의수익실현목적",
            " 기존보유자산에대한위험헤지목적",
          ],
        },
        {
          question: "9. 금융투자상품 취득 및 처분 목적이 어떻게 되십니까?",
          options: ["학비", "생활비", "주택마련", "자산증식", "채무상환"],
        },
        {
          question: "10. 금융지식 수준/이해도가 어떻게 되십니까?",
          options: [
            "금융투자상품에투자해본경험이없음",
            "널리 알려진 금융투자상품(주식, 채권 및 펀드 등)의 구조 및 위험을 일정 부분 이해하고 있음",
            " 널리 알려진 금융투자상품(주식, 채권 및 펀드 등)의 구조 및 위험을 깊이 있게 이해하고 있음",
            "파생상품을포함한대부분의금융투자상품의구조및위험을이해하고 있음",
          ],
        },
        {
          question: "11. 기대이익 수준이 어떻게 되십니까?",
          options: ["원금기준±10% 범위", "원금기준±20% 범위", " 원금기준±50% 범위", " 원금기준±100% 범위"],
        },
        {
          question: "12. 감당할 수 있는 손실 수준",
          options: [
            "투자원금보전을선호함",
            "투자원금에서최소한의손실만을감당할수있음",
            "투자원금중일부의손실을감당할수있음",
            "기대수익이높다면위험이높아도상관하지않음",
          ],
        },
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
      this.$router.push("/investment-test-end"); // 테스트 완료 페이지로 이동
    },
    closeTest() {
      this.$router.push("/"); //취소 시 홈페이지로 이동
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
