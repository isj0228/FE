<template>
  <div class="background-container">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <div class="input-container">
            <input type="text" v-model="memberID" id="memberID" required />
            <label for="memberID" :class="{ active: memberID }">아이디</label>
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <input type="password" v-model="password" id="password" required />
            <label for="password" :class="{ active: password }">비밀번호</label>
          </div>
        </div>
        <div class="button-container">
          <button type="submit" class="login-btn">Login</button>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
      <div class="link-container">
        <a href="#" class="link">비밀번호를 잊으셨나요?</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import {fetchCartList} from "@/api/cartApi.js";
export default {
  data() {
    return {
      memberID: '',
      password: '',
      errorMessage: '',
      isMemberIDFocused: false,
      isPasswordFocused: false,
    };
  },
  methods: {
    checkMemberID() {
      this.isMemberIDFocused = this.memberID.length > 0;
    },
    checkPassword() {
      this.isPasswordFocused = this.password.length > 0;
    },
    async handleLogin() {
      const { cookies } = useCookies();
      this.errorMessage = ''; // Reset error message
      try {
        const response = await axios.post('http://localhost:8080/api/member/login', {
          memberID: this.memberID,
          password: this.password,
        });
        console.log('Login successful:', response.data);
        const user = {
          username: response.data.responseData.data.name,
          picture: response.data.responseData.data.picture, // Assuming your response has a picture field
        };
        const authHeader =
            response.headers['authorization'] || response.headers['Authorization'];
        const refreshToken =
            response.headers['refresh-token'] || response.headers['Refresh-Token'];
        if (authHeader && refreshToken) {
          cookies.set('Authorization', authHeader, { secure: true, sameSite: 'Lax' });
          cookies.set('Refresh-Token', refreshToken, { secure: true, sameSite: 'Lax' });
          localStorage.setItem('user', JSON.stringify(user));
          this.$emit('login', user);
          this.$router.push('/');

          await fetchCartList();
        } else {
          throw new Error('Missing authorization or refresh token');
        }
      } catch (error) {
        if (error.response) {
          this.errorMessage = '아이디 혹은 비밀번호가 틀렸습니다.'; // Error message in Korean
          console.error('Error logging in user:', error.response.data);
        } else {
          this.errorMessage = '로그인 중 오류 발생: ' + error.message; // General error message
          console.error('Error during login:', error.message);
        }
      }
    },
  },
};
</script>
<style scoped>
.background-container {
  background: linear-gradient(to bottom right, #A0E0D2, #FFFFFF); /* Minty gradient background */
  min-height: 100vh; /* Full height for background */
  display: flex; /* Center login container vertically */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}
.login-container {
  max-width: 400px; /* Decreased max width for a more compact box */
  padding: 40px; /* Adjusted padding */
  background-color: #FFFFFF; /* Solid background for the login box */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Slightly larger shadow */
  text-align: center;
  min-height: 350px; /* Minimum height for a more substantial appearance */
}
h2 {
  margin-bottom: 20px;
  color: #4DB6AC; /* Title color */
  font-size: 28px; /* Slightly larger title */
}
.form-group {
  margin-bottom: 20px; /* More space between form groups */
}
.input-container {
  position: relative;
  margin-top: 10px;
}
input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 12px; /* Increased padding for better touch target */
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s; /* Smooth transition on focus */
}
input[type='text']:focus,
input[type='password']:focus {
  outline: none;
  border-color: #4CAF50; /* Focus border color */
}
label {
  position: absolute;
  top: 50%;
  left: 12px; /* Adjusted position for better alignment */
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
  transition: 0.3s ease all;
}
input[type='text']:focus + label,
input[type='password']:focus + label,
label.active {
  top: -10px;
  left: 5px;
  font-size: 12px;
  color: #4CAF50; /* Active label color */
  background-color: #FFFFFF; /* Match background */
  padding: 0 5px;
}
.button-container {
  display: flex;
  justify-content: center; /* Center the login button */
  align-items: center; /* Align items vertically */
  margin-top: 15px;
}
.login-btn {
  background-color: #4DB6AC; /* Minty button background */
  color: white; /* Button text color */
  border: none; /* No border */
  padding: 12px 20px; /* Adjusted button padding */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Font size */
  transition: background-color 0.3s; /* Smooth transition */
  cursor: pointer; /* Cursor pointer for button */
}
.login-btn:hover {
  background-color: #399D91; /* Darker mint color on hover */
}
.link-container {
  text-align: right; /* Align the link to the right */
  margin-top: 10px; /* Space above the link */
}
.link {
  font-size: 12px; /* Smaller font size for the link */
  color: #4DB6AC; /* Minty link color */
  text-decoration: underline; /* Underline the link */
}
.link:hover {
  color: #399D91; /* Darker link color on hover */
}
.error-message {
  color: red;
  margin-top: 1rem;
}
</style>