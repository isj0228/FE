<template>
    <div>
        <h2>테스트 시작 설명</h2>
        <div class="InvestmentTest-body">
            <div class="InvestmentTest-content">
                <div class="InvestmentTest-text">
                    투자성향분석 결과는 12개월간 재사용이 가능합니다. 다만 당일이 아닐 경우 재사용을
                    하더라도 일부 문항에 대한 답변은 필수입니다...
                </div>
                <v-btn class="ModalTest-btn" @click="startTest">시작하기</v-btn>
                <v-btn class="ModalTest-btn" @click="closeModal">취소 </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        isOpen: {
            type: Boolean,
            required: false,
        },
        InvestMentTest: {
            type: Boolean,
            required: false,
        },
    },
    setup(props, { emit }) {
        const startTest = () => {
            emit('next');
            emit('investMentTestStarted');
            console.log('진짜이동함??');
        };

        const closeModal = () => {
            console.log('모달 닫기');
            emit('close');
        };

        return {
            startTest,
            closeModal,
        };
    },
});
</script>
