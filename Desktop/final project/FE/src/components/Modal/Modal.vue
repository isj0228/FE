<template>
    <div class="modal" v-if="isOpen">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <component
                :is="currentComponent"
                @next="emitNext"
                @finish="finishTest"
                ref="currentComponentRef"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
        currentComponent: Object,
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        emitNext() {
            this.$emit('next');
        },
        finishTest() {
            this.closeModal();
            this.$emit('finished');
        },
    },
};
</script>
