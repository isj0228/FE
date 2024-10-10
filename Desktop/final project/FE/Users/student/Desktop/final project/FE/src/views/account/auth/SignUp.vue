<template>
    <div class="signup-wrapper">
        <div class="signup-container">
            <div class="signup-box">
                <form @submit.prevent="handleSubmit" class="signup-form">
                    <h2>회원가입</h2>
                    <div class="form-group">
                        <label for="username">아이디</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="아이디"
                            v-model="memberID"
                            required
                        />
                    </div>

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

                    <div class="form-group">
                        <label for="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호"
                            v-model="password"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">비밀번호 확인</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="비밀번호 확인"
                            v-model="reEnteredPassword"
                            required
                        />
                    </div>

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

                    <div class="form-group">
                        <label for="dob">생년월일</label>
                        <div class="dob-container">
                            <v-select v-model="selectedYear" :items="years" label="년"></v-select>

                            <v-select v-model="selectedMonth" :items="months" label="월"></v-select>

                            <v-select v-model="selectedDay" :items="days" label="일"></v-select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>성별</label>
                        <v-radio-group v-model="gender" row>
                            <v-radio
                                label="남"
                                value="남"
                                color="teal"
                                class="gender-radio"
                            ></v-radio>
                            <v-radio
                                label="여"
                                value="여"
                                color="teal"
                                class="gender-radio"
                            ></v-radio>
                        </v-radio-group>
                    </div>

                    <div class="form-group">
                        <label>성향분석 하기</label>
                        <v-btn @click="openModal" color="teal" large rounded elevation="8">
                            <v-icon left>mdi-star</v-icon> 테스트 시작
                        </v-btn>
                        <span v-if="!InvestMentTest" class="red-mark">❌</span>
                        <span v-else class="green-mark">✅</span>
                    </div>

                    <button class="create-btn" type="submit" :disabled="!InvestMentTest">
                        회원가입
                    </button>
                </form>

                <ModalTest
                    :isOpen="isModalOpen"
                    :InvestMentTest="InvestMentTest"
                    :currentComponent="currentComponent"
                    @close="handleClose"
                    @finishTest="markTestAsFinished"
                    @next="nextStep"
                />

                <div class="login-link">
                    이미 계정이 있으신가요? <router-link to="/login">로그인</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { registerUser } from '@/api/memberApi'; // Import your API function

export default {
    components: {
        // ModalTestStart,
        // ModalTest,
        // ModalTestEnd,
    },
    data() {
        return {
            memberID: '',
            memberName: '',
            password: '',
            reEnteredPassword: '',
            email: '',
            birth: null,
            gender: '남',
            isModalOpen: false,
            currentComponent: markRaw(ModalTestStart),
            InvestMentTest: false,
            showPassword: false,
            // 날짜 선택
            selectedYear: null,
            selectedMonth: null,
            selectedDay: null,
            years: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
            months: Array.from({ length: 12 }, (_, i) => i + 1),
            days: Array.from({ length: 31 }, (_, i) => i + 1),
        };
    },
    methods: {
        async handleSubmit() {
            if (this.password !== this.reEnteredPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            const birthDate = `${this.selectedYear}-${String(this.selectedMonth).padStart(
                2,
                '0'
            )}-${String(this.selectedDay).padStart(2, '0')}`;

            const userData = {
                memberID: this.memberID,
                email: this.email,
                memberName: this.memberName,
                password: this.password,
                reEnteredPassword: this.reEnteredPassword,
                birth: birthDate,
                gender: this.gender,
                InvestMentTest: this.InvestMentTest,
            };

            try {
                const result = await registerUser(userData);
                console.log('회원가입 성공:', result);
                this.$router.push('/');
            } catch (error) {
                console.error('회원가입 실패:', error);
                if (error.response) {
                    alert(
                        `회원가입에 실패했습니다: ${
                            error.response.data.message || '알 수 없는 오류'
                        }`
                    );
                } else {
                    alert('회원가입에 실패했습니다. 다시 시도해주세요.');
                }
            }
        },
        openModal() {
            this.isModalOpen = true;
            this.currentComponent = markRaw(ModalTestStart);
        },

        handleClose() {
            this.isModalOpen = false;
        },
        nextStep() {
            if (this.currentComponent.__file.includes('ModalTestStart.vue')) {
                this.currentComponent = markRaw(ModalTest);
            } else if (this.currentComponent.__file.includes('ModalTest.vue')) {
                this.currentComponent = markRaw(ModalTestEnd);
            }
        },
        markTestAsFinished() {
            this.InvestMentTest = true;
            this.handleClose();
        },

        openDatePicker() {
            console.log('Open date picker');
        },
    },
};
</script>

<style scoped>
body {
    font-family: 'Arial', sans-serif; /* Modern font */
    background-color: #f0f4f8; /* Light background color */
}

.signup-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%; /* Full width */
    min-height: 100vh; /* Full height */
    background: linear-gradient(to bottom, #a0e0d2, #ffffff);
}

.signup-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.signup-box {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px; /* Increased padding */
    border-radius: 15px; /* More rounded corners */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow */
    width: 400px; /* Fixed width */
    text-align: center;
}

h2 {
    margin-bottom: 20px; /* Spacing below the title */
    color: #4db6ac; /* Title color */
}

.form-group {
    margin-bottom: 20px; /* Increased margin */
    text-align: left;
}

label {
    display: block;
    font-size: 16px; /* Larger font size */
    margin-bottom: 5px;
    color: #333; /* Darker label color */
}

input {
    width: 100%; /* Fill the width of the container */
    padding: 12px; /* Increased padding */
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s; /* Smooth border transition */
}

input:focus {
    border-color: #4db6ac; /* Highlighted border color on focus */
    outline: none; /* Remove default outline */
}

.gender-radio {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

.create-btn {
    width: 100%;
    padding: 12px; /* Increased padding */
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s; /* Smooth transition */
}

.create-btn:hover {
    background-color: #399d91; /* Darker button on hover */
}

.login-link {
    margin-top: 15px;
}

.login-link a {
    color: #4db6ac;
    text-decoration: none;
    transition: color 0.3s; /* Smooth color transition */
}

.login-link a:hover {
    color: #2e8b83; /* Darker link color on hover */
}

.dob-container {
    display: flex;
    align-items: center;
}

.dob-container input {
    width: calc(100% - 50px); /* Adjust width for the button */
    margin-right: 5px;
}
</style>
