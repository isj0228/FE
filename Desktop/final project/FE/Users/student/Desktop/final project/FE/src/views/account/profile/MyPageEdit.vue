<template>
    <v-app>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="3" md="4" lg="3">
                    <v-card class="pa-8" elevation="2">
                        <v-card-text>
                            <v-list>
                                <v-list-item @click="navigateTo('/mypage')">
                                    <v-list-item-content>
                                        <v-list-item-title>내 개인정보</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="navigateTo('/mypageEdit')">
                                    <v-list-item-content>
                                        <v-list-item-title>개인 정보 수정</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="8" lg="6">
                    <v-card class="pa-8" elevation="2">
                        <v-card-title class="text-h5 teal--text">개인 정보 수정</v-card-title>

                        <v-card-text>
                            <v-form @submit.prevent="handleUpdate">
                                <v-text-field
                                    label="전체 이름"
                                    v-model="user.fullName"
                                    prepend-icon="mdi-account"
                                ></v-text-field>

                                <v-text-field
                                    label="이메일"
                                    v-model="user.email"
                                    prepend-icon="mdi-email"
                                    type="email"
                                ></v-text-field>

                                <v-select
                                    v-model="selectedYear"
                                    :items="years"
                                    label="년"
                                ></v-select>

                                <v-select
                                    v-model="selectedMonth"
                                    :items="months"
                                    label="월"
                                ></v-select>

                                <v-select v-model="selectedDay" :items="days" label="일"></v-select>

                                <v-radio-group v-model="user.gender" row>
                                    <v-radio label="남성" value="male"></v-radio>
                                    <v-radio label="여성" value="female"></v-radio>
                                    <v-radio label="기타" value="other"></v-radio>
                                </v-radio-group>

                                <v-btn
                                    color="teal"
                                    block
                                    type="submit"
                                    @click="navigateTo('/mypage')"
                                    >저장</v-btn
                                >
                                <v-btn color="teal" block @click="navigateTo('/ChangePW')"
                                    >비밀번호 변경</v-btn
                                >
                                <v-btn color="teal" block @click="navigateTo('/mypage')"
                                    >취소</v-btn
                                >
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'MyPage',
    data() {
        return {
            user: {
                fullName: '홍길동',
                email: 'hong@example.com',
                user_birth: null, // Updated property name
                gender: 'male',
            },
            selectedYear: null,
            selectedMonth: null,
            selectedDay: null,
            years: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
            months: Array.from({ length: 12 }, (_, i) => i + 1),
            days: Array.from({ length: 31 }, (_, i) => i + 1),
        };
    },
    methods: {
        handleUpdate() {
            this.user.user_birth = `${this.selectedYear}-${this.selectedMonth
                .toString()
                .padStart(2, '0')}-${this.selectedDay.toString().padStart(2, '0')}`;
            console.log('User data updated:', this.user);
            alert('정보가 업데이트되었습니다.');
        },
        navigateTo(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped>
/* Styling to match the login and signup pages */
.v-application {
    background-color: #f0f9f9;
}

.v-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.v-card-title {
    text-align: center;
    color: #4db6ac;
    margin-bottom: 20px;
}

.v-text-field {
    margin-bottom: 15px;
}

.v-btn {
    background-color: #4db6ac;
    color: white;
    border-radius: 5px;
    font-size: 16px;
}

.v-btn:hover {
    background-color: #399d91;
}
</style>
