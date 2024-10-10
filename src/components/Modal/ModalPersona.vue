<template>
  <div class="black-bg" v-if="isOpen" @click="closeModal">
    <div class="white-bg" @click.stop>
      <div class="content-wrapper">
        <div class="details">
          <div class="box1">
            <div class="persona_image">
              <PersonaImage :persona="persona" />
            </div>
            <div class="persona-comment">
              <PersonaComment :persona="persona" />
            </div>
          </div>
          <div class="persona-chart">
            <PersonaChart :persona="persona" />
          </div>
        </div>

        <div class="chatbot">
          <h4 class="chatbotName">{{ persona.personaName }}</h4>
          <div class="chatbox">
            <div class="messages" ref="messageContainer">
              <p
                v-for="(msg, index) in messages"
                :key="index"
                :class="{
                  'bot-message': msg.isBot,
                  'user-message': !msg.isBot,
                }"
                v-html="msg.text"
              ></p>
            </div>
            <div class="input-box">
              <input
                v-model="userMessage"
                type="text"
                placeholder="메시지를 입력하세요"
                @keyup.enter="sendMessage"
              />
              <button @click="sendMessage">전송</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
  nextTick,
} from "vue";
import sendMessageToChatbot from "@/api/chatbot"; // API 파일 import
import PersonaImage from "@/components/persona/PersonaImage.vue";
import PersonaComment from "@/components/persona/PersonaComment.vue";
import PersonaChart from "@/components/persona/PersonaChart.vue";

export default defineComponent({
  name: "ModalPersona",
  components: {
    PersonaImage,
    PersonaComment,
    PersonaChart,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    persona: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const userMessage = ref(""); // 사용자의 메시지를 저장
    const messages = ref([]); // 대화 내용을 저장
    const messageContainer = ref(null);

    const scrollToBottom = async () => {
      await nextTick(); // DOM 업데이트 후 실행
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight; // 스크롤을 맨 아래로 이동
      }
    };

    const sendMessage = async () => {
      if (!userMessage.value.trim()) return; // 빈 메시지 전송 방지

      const message = userMessage.value; // 사용자가 입력한 메시지

      // 사용자 메시지 추가
      messages.value.push({ text: message, isBot: false });
      userMessage.value = ""; // 입력창 초기화

      // 사용자가 메시지 추가할 때 스크롤 이동
      await scrollToBottom();

      // 챗봇에게 메시지 전송
      try {
        const response = await sendMessageToChatbot(
          props.persona.personaName,
          message
        ); // 챗봇에 메시지 전송
        messages.value.push({ text: response, isBot: true }); // 챗봇 응답 추가
      } catch (error) {
        messages.value.push({ text: "응답을 받을 수 없습니다.", isBot: true }); // 오류 메시지
      }

      // 챗봇 응답 메시지가 추가될 때도 스크롤 이동
      await scrollToBottom();
    };

    const closeModal = () => {
      messages.value = [];
      emit("close");
    };

    watch(
      () => props.isOpen,
      (newVal) => {
        if (!newVal) {
          messages.value = []; // 모달이 닫힐 때 대화 기록 초기화
        }
      }
    );

    onMounted(() => {
      // document.body.style.overflow = "hidden";
    });

    onUnmounted(() => {
      // document.body.style.overflow = "";
    });

    return {
      closeModal,
      sendMessage,
      userMessage,
      messages,
      messageContainer,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}

.black-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.white-bg {
  height: 80vh; /* 뷰포트 높이의 70% */
  width: 75vw; /* 뷰포트 너비의 65% */
  background: white;
  border-radius: 1rem; /* 둥근 모서리 반응형 */
}

/* 챗봇 화면 style css */
.content-wrapper {
  display: flex;
  height: 100%;
}

.details {
  flex: 6.5; /* 왼쪽 65% */
  padding-right: 0.3vw; /* 반응형 간격 */
  border-right: 1px solid #ddd; /* 구분선 */
}

.personaImage {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5vh; /* 반응형 여백 */
}

.box1 {
  display: flex;
  margin: 10%;
}

.persona-comment {
  flex: 1;
  margin-left: 15%;
}

.chatbot {
  flex: 3.5; /* 오른쪽 35% */
  padding-right: 1vw;
  padding-left: 1vw;
  font-family: "Nanum Gothic", sans-serif;
  font-size: 0.8em;
}

.chatbotName {
  font-size: 2rem; /* 반응형 글자 크기 */
  font-weight: 900;
  color: #333; /* 글자 색상 */
  text-align: center; /* 텍스트 정렬 */
  margin-top: 1.5vh; /* 상하 여백을 반응형으로 설정 */
  margin-bottom: 0.2vh;
}

.chatbox {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  height: 88%; /* 전체 높이 */
}

.messages {
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 1vh; /* 반응형 하단 여백 */
  padding: 1vw; /* 반응형 패딩 */
  display: flex;
  flex-direction: column; /* 아래에서 위로 쌓이게 설정 */
}

.bot-message {
  align-self: flex-start; /* 챗봇 메시지는 왼쪽 정렬 */
  background-color: #7bd5c3; /* 챗봇 메시지 배경 */
  border-radius: 1rem; /* 반응형 둥근 모서리 */
  padding: 0.6vw; /* 반응형 패딩 */
  color: white;
  margin: 0.5vh 0; /* 상하 간격 반응형 설정 */
  margin-right: 20%; /* 반응형 너비 조정 */
}

.user-message {
  align-self: flex-end; /* 사용자 메시지는 오른쪽 정렬 */
  background-color: #e0e0e0; /* 사용자 메시지 배경 */
  border-radius: 1rem; /* 반응형 둥근 모서리 */
  padding: 0.6vw; /* 반응형 패딩 */
  margin: 0.5vh 0; /* 상하 간격 반응형 설정 */
  margin-left: 20%; /* 반응형 너비 조정 */
}

.input-box {
  display: flex;
  margin-top: auto; /* 위쪽에 여백 없이 고정 */
}

.input-box input {
  flex: 8.5;
  padding: 0.6vw; /* 반응형 패딩 */
  border: 1px solid #ddd;
  border-radius: 0.5rem; /* 반응형 둥근 모서리 */
}

.input-box button {
  flex: 1.5;
  padding: 0.6vw; /* 반응형 패딩 */
  margin-left: 0.5vw; /* 반응형 여백 */
  background-color: #61cafa;
  color: white;
  border: none;
  border-radius: 0.5rem; /* 반응형 둥근 모서리 */
}
</style>
