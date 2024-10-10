<!-- 만들어 두기만 한 페이지, 현재는 탈퇴하기 질의만 함 -->
<template>
  <div class="deleteAccount-container">
    <div class="deleteAccount-header">
      <h1>회원 탈퇴</h1>
    </div>
    <div class="deleteAccount-box">
      <form @submit.prevent="handleSubmit" class="deleteAccount-form">
        <div class="form-group">
          <label for="password"> .기존 비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            v-model="password"
            required
          />
        </div>

        <button class="deleteAccount-btn" type="submit">탈퇴git</button>
        <v-btn color="teal" block @click="navigateTo('/mypage')">취소</v-btn>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'deleteAccount',
  data() {
    return {
      password: '',
      user_pw: '',
    };
  },

  methods: {
    handleSubmit() {
      // Get the current user's info from local storage
      const userInfo = JSON.parse(localStorage.getItem('user'));
      if (!userInfo) {
        alert('로그인 정보를 찾을 수 없습니다.');
        return;
      }

      // Find the user in dummy data
      const user = dummyUsers.find(
        (user) => user.username === userInfo.username
      );

      if (user && this.password === user.password) {
        alert('회원 탈퇴 성공.');
        this.$router.push('/');
        // Here you would add code to handle account deletion, e.g., removing the user from dummyUsers
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    },

    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.deleteAccount-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    #e0f2f1,
    #ffffff
  ); /* Gradient from light mint to white */
  padding: 20px;
}

.deleteAccount-header {
  margin-bottom: 20px;
}

.deleteAccount-header h1 {
  font-size: 2.5rem;
  color: #4db6ac;
  text-align: center;
}

.deleteAccount-box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px; /* Smaller box */
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
}

input {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.deleteAccount-btn {
  width: 100%;
  padding: 10px;
  background-color: #4db6ac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.deleteAccount-btn:hover {
  background-color: #399d91;
}
</style>
