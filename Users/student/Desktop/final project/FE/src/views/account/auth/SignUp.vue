<template>
    <div class="signup-wrapper">
      <div class="signup-container">
        <div class="signup-box">
          <form @submit.prevent="handleSubmit" class="signup-form">
            <h2>회원가입</h2>
  
            <!-- Member ID -->
            <div class="form-group">
              <label for="username">아이디</label>
              <input
                type="text"
                id="username"
                placeholder="아이디"
                v-model="memberID"
                @blur="validateMemberID"
                required
              />
              <p v-if="errors.memberID" class="error-message">{{ errors.memberID }}</p>
            </div>
  
            <!-- Member Name -->
            <div class="form-group">
              <label for="displayName">사용자 이름</label>
              <input
                type="text"
                id="displayName"
                placeholder="사용자 이름"
                v-model="memberName"
                required
              />
            </div>
  
            <!-- Password -->
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                v-model="password"
                @blur="validatePassword"
                required
              />
              <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
            </div>
  
            <!-- Confirm Password -->
            <div class="form-group">
              <label for="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="비밀번호 확인"
                v-model="reEnteredPassword"
                @blur="validateReEnteredPassword"
                required
              />
              <p v-if="errors.reEnteredPassword" class="error-message">{{ errors.reEnteredPassword }}</p>
            </div>
  
            <!-- Email -->
            <div class="form-group">
              <label for="email">이메일 주소</label>
              <input
                type="email"
                id="email"
                placeholder="이메일 주소"
                v-model="email"
                required
              />
            </div>
  
            <!-- Birth Date -->
            <div class="form-group">
              <label for="dob">생년월일</label>
              <div class="dob-container">
                <v-select v-model="selectedYear" :items="years" label="년"></v-select>
                <v-select v-model="selectedMonth" :items="months" label="월"></v-select>
                <v-select v-model="selectedDay" :items="days" label="일"></v-select>
              </div>
            </div>
  
            <!-- Gender -->
            <div class="form-group">
              <label>성별</label>
              <v-radio-group v-model="gender" row @change="validateGender">
                <v-radio label="남" value="남" color="teal" class="gender-radio"></v-radio>
                <v-radio label="여" value="여" color="teal" class="gender-radio"></v-radio>
              </v-radio-group>
              <p v-if="errors.gender" class="error-message">{{ errors.gender }}</p>
            </div>
  
            <!-- Submit Button -->
            <button class="create-btn" type="submit" :disabled="!isFormValid">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { registerUser } from '@/api/memberApi';
  import ModalTest from '@/components/Modal/ModalTest.vue';
  
  export default {
    components: {
      ModalTest,
    },
    data() {
      return {
        memberID: '',
        memberName: '',
        password: '',
        reEnteredPassword: '',
        email: '',
        birth: null,
        gender: '',
        selectedYear: null,
        selectedMonth: null,
        selectedDay: null,
        errors: {
          memberID: '',
          password: '',
          reEnteredPassword: '',
          gender: '',
        },
        years: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
        months: Array.from({ length: 12 }, (_, i) => i + 1),
        days: Array.from({ length: 31 }, (_, i) => i + 1),
      };
    },
    computed: {
      isFormValid() {
        return (
          this.validateMemberID() &&
          this.validatePassword() &&
          this.validateReEnteredPassword() &&
          this.validateGender()
        );
      },
    },
    methods: {
      validateMemberID() {
        const pattern = /^(?=.*[a-z0-9])[a-z0-9]{5,15}$/;
        if (!this.memberID) {
          this.errors.memberID = '아이디는 필수 입력입니다.';
          return false;
        }
        if (this.memberID.length < 5 || this.memberID.length > 15) {
          this.errors.memberID = '아이디는 5~15자만 가능합니다.';
          return false;
        }
        if (!pattern.test(this.memberID)) {
          this.errors.memberID = '아이디는 소문자 영어와 숫자의 조합으로 입력해 주세요.';
          return false;
        }
        this.errors.memberID = '';
        return true;
      },
      validatePassword() {
        const pattern = /^(?=.*[A-z])(?=.*\d)(?=.*[#$@!%&*?])[A-z\d#$@!%&*?]{8,30}$/;
        if (!this.password) {
          this.errors.password = '비밀번호는 필수 입력입니다.';
          return false;
        }
        if (this.password.length < 8 || this.password.length > 30) {
          this.errors.password = '비밀번호는 8~30자만 가능합니다.';
          return false;
        }
        if (!pattern.test(this.password)) {
          this.errors.password = '비밀번호는 영어, 숫자, 특수문자(#$@!%&*?)의 조합으로 입력해 주세요.';
          return false;
        }
        this.errors.password = '';
        return true;
      },
      validateReEnteredPassword() {
        if (!this.reEnteredPassword) {
          this.errors.reEnteredPassword = '비밀번호 재입력은 필수 입력입니다.';
          return false;
        }
        if (this.reEnteredPassword !== this.password) {
          this.errors.reEnteredPassword = '비밀번호가 일치하지 않습니다.';
          return false;
        }
        this.errors.reEnteredPassword = '';
        return true;
      },
      validateGender() {
        if (!this.gender.match(/^(남|여)$/)) {
          this.errors.gender = '성별을 선택해주세요.';
          return false;
        }
        this.errors.gender = '';
        return true;
      },
      async handleSubmit() {
        // Trigger all validations before submission
        if (!this.isFormValid) return;
  
        const birthDate = `${this.selectedYear}-${String(this.selectedMonth).padStart(2, '0')}-${String(this.selectedDay).padStart(2, '0')}`;
        const userData = {
          memberID: this.memberID,
          email: this.email,
          memberName: this.memberName,
          password: this.password,
          reEnteredPassword: this.reEnteredPassword,
          birth: birthDate,
          gender: this.gender,
        };
  
        try {
          const result = await registerUser(userData);
          console.log('회원가입 성공:', result);
          this.$router.push('/');
        } catch (error) {
          console.error('회원가입 실패:', error);
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Existing styling */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f4f8;
  }
  
  .signup-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(to bottom, #a0e0d2, #ffffff);
  }
  
  .signup-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .signup-box {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    width: 400px;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #4db6ac;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s;
  }
  
  input:focus {
    border-color: #4db6ac;
    outline: none;
  }
  
  .gender-radio {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .create-btn {
    width: 100%;
    padding: 12px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
  }
  
  .create-btn:hover {
    background-color: #399d91;
  }
  
  .login-link {
    margin-top: 15px;
  }
  
  .login-link a {
    color: #4db6ac;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .login-link a:hover {
    color: #2e8b83;
  }
  
  .dob-container {
    display: flex;
    align-items: center;
  }
  
  .dob-container input {
    width: calc(100% - 50px);
    margin-right: 5px;
  }
  
  /* Error message styling */
  .error-message {
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
  }
  </style>
  