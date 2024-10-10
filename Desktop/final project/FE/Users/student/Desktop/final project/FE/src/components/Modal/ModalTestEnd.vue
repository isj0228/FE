<template>
    <div>
        <h2>테스트 완료</h2>
        <div class="test-end-message">투자 성향 분석이 완료되었습니다. 결과를 확인하세요.</div>
        <v-btn class="ModalTest-btn" @click="closeModal">완료</v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit('finish'); // Emit 'finish' event to close the modal
        },
    },
};
</script>
