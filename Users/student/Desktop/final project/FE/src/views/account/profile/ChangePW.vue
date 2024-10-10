<template>
    <div class="changePW-container">
        <div class="changePW-header">
            <h1>비밀번호 변경</h1>
        </div>
        <div class="changePW-box">
            <form @submit.prevent="handleSubmit" class="changePW-form">
                <div class="form-group">
                    <label for="password">기존 비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="기존 비밀번호"
                        v-model="password"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password2">새 비밀번호</label>
                    <input
                        type="password"
                        id="password2"
                        placeholder="새 비밀번호"
                        v-model="password2"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="confirmPassword">새 비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="새 비밀번호 확인"
                        v-model="confirmPassword"
                        required
                    />
                </div>

                <button class="changePW-btn" type="submit">비밀번호 변경</button>
                <v-btn color="grey" block @click="cancel()">취소</v-btn>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; // Import Axios

export default {
    data() {
        return {
            password: '',
            password2: '',
            confirmPassword: '',
            user_pw: '1234', // Replace with the actual logic for fetching user's current password
        };
    },

    methods: {
        async handleSubmit() {
            // 1. Check existing password
            if (this.password !== this.user_pw) {
                alert('기존 비밀번호가 일치하지 않습니다.');
                return;
            }

            // 2. Check if new password and confirm password match
            if (this.password2 !== this.confirmPassword) {
                alert('새 비밀번호가 일치하지 않습니다.');
                return;
            }

            // 3. Update password
            const payload = {
                newPassword: this.password2,
            };

            try {
                // Make an API call to update the password
                await axios.post('@/api/member/password/update', payload);
                alert('비밀번호가 성공적으로 변경되었습니다.');
                // Clear fields after successful change
                this.cancel();
                this.navigateTo('/mypage'); // Redirect after successful update
            } catch (error) {
                console.error('Error updating password:', error);
                alert('비밀번호 변경에 실패했습니다.');
            }
        },

        cancel() {
            // Reset password input fields
            this.password = '';
            this.password2 = '';
            this.confirmPassword = '';
        },

        navigateTo(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped>
.changePW-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to bottom, #e0f2f1, #ffffff);
    padding: 20px;
}

.changePW-header {
    margin-bottom: 20px;
}

.changePW-header h1 {
    font-size: 2.5rem;
    color: #4db6ac;
    text-align: center;
}

.changePW-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 400px; /* Wider box for better layout */
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
    transition: border-color 0.3s;
}

input:focus {
    border-color: #4db6ac; /* Change border color on focus */
    outline: none;
}

.changePW-btn {
    width: 100%;
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
}

.changePW-btn:hover {
    background-color: #399d91;
}

.v-btn {
    margin-top: 10px; /* Add some space above the cancel button */
}
</style>
