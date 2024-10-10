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

                <!-- ModalTest를 바로 사용 -->
                <ModalTest
                    :isOpen="isModalOpen"
                    @close="handleClose"
                    @finishTest="markTestAsFinished"
                />

                <div class="login-link">
                    이미 계정이 있으신가요? <router-link to="/login">로그인</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { registerUser } from '@/api/memberApi';
import ModalTest from '@/components/Modal/ModalTest.vue'; // ModalTest 임포트

export default {
    components: {
        ModalTest, // ModalTest 컴포넌트 등록
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
            isModalOpen: false, // 모달 열림 상태
            InvestMentTest: false, // 테스트 완료 상태
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
            this.isModalOpen = true; // 모달 열기
        },
        handleClose() {
            this.isModalOpen = false; // 모달 닫기
        },
        markTestAsFinished() {
            this.InvestMentTest = true; // 테스트 완료 상태 설정
            this.handleClose(); // 모달 닫기
        },
    },
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
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
</style>
