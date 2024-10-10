<template>
  <div class="find-container">
    <div class="find-header">
      <h2>아이디/비밀번호 찾기</h2>
    </div>
    <div class="find-box">
      <div class="tabs">
        <button
          :class="{ active: activeTab === 'find-id' }"
          @click="setActiveTab('find-id')"
        >
          아이디 찾기
        </button>
        <button
          :class="{ active: activeTab === 'find-pw' }"
          @click="setActiveTab('find-pw')"
        >
          비밀번호 찾기
        </button>
      </div>

      <div v-if="activeTab === 'find-id'" class="find-id">
        <form @submit.prevent="handleFindId">
          <div class="form-group">
            <label for="email">이메일 주소</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group code-group">
            <label for="code">코드 입력</label>
            <div class="code-container">
              <input
                type="text"
                id="code"
                v-model="code"
                v-if="showCodeInput"
                required
              />
              <button
                type="button"
                class="send-button"
                @click="handleSendCode"
                :disabled="isTimerActive"
              >
                {{ isTimerActive ? timer : '코드 보내기' }}
              </button>
            </div>
          </div>
          <button type="submit" class="submit-button" v-if="showCodeInput">
            확인
          </button>
        </form>
      </div>

      <div v-if="activeTab === 'find-pw'" class="find-pw">
        <form @submit.prevent="handleFindPw">
          <div class="form-group">
            <label for="username">아이디</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="email">이메일 주소</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group code-group">
            <label for="code">코드 입력</label>
            <div class="code-container">
              <input
                type="text"
                id="code"
                v-model="code"
                v-if="showCodeInput"
                required
              />
              <button
                type="button"
                class="send-button"
                @click="handleSendCode"
                :disabled="isTimerActive"
              >
                {{ isTimerActive ? timer : '코드 보내기' }}
              </button>
            </div>
          </div>
          <button type="submit" class="submit-button" v-if="showCodeInput">
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: 'find-id', // Default tab
      email: '',
      username: '',
      code: '',
      showCodeInput: false,
      timer: '05:00',
      timerInterval: null,
      isTimerActive: false,
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.resetTimer();
    },
    handleFindId() {
      // Handle find ID logic here
    },
    handleFindPw() {
      // Handle find PW logic here
    },
    handleSendCode() {
      // Handle send code logic here
      this.showCodeInput = true;
      this.startTimer();
    },
    startTimer() {
      let time = 300; // 5 minutes
      this.isTimerActive = true;
      this.timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timer = `${String(minutes).padStart(2, '0')}:${String(
          seconds
        ).padStart(2, '0')}`;
        if (time <= 0) {
          clearInterval(this.timerInterval);
          this.isTimerActive = false;
          this.timer = '코드 보내기';
        }
        time -= 1;
      }, 1000);
    },
    resetTimer() {
      clearInterval(this.timerInterval);
      this.timer = '05:00';
      this.isTimerActive = false;
      this.showCodeInput = false;
    },
    goHome() {
      this.$router.push({ name: 'Home' }); // Navigate to the Home route
    },
  },
  beforeDestroy() {
    clearInterval(this.timerInterval);
  },
};
</script>

<style scoped>
.find-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #e0f2f1, #ffffff);
}

.find-header {
  position: absolute;
  top: 220px;
  left: 48%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 24px;
  color: #4db6ac;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 40px);
}

.home-button {
  position: absolute;
  left: 20px;
  background-color: #4db6ac;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.home-button:hover {
  background-color: #399d91;
}

.find-box {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  text-align: center;
  position: relative;
}

.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  background-color: #4db6ac;
  color: white;
  border: none;
  cursor: pointer;
}

.tabs button.active {
  background-color: #399d91;
}

.tabs button:hover {
  background-color: #399d91;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
}

input {
  width: calc(100% - 120px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.code-group {
  display: flex;
  flex-direction: column;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.send-button {
  padding: 10px;
  background-color: #4db6ac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:disabled {
  background-color: #b2dfdb;
  cursor: not-allowed;
}

.send-button:hover {
  background-color: #399d91;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #4db6ac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #399d91;
}
</style>
