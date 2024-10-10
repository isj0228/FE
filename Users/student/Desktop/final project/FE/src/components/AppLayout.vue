<template>
    <div class="app-layout">
        <header>
            <h1 class="title">금융상품 페이지</h1>
        </header>
        <main>
            <slot></slot> <!-- Allows child components to be rendered here -->
        </main>
    </div>
</template>

<script>
export default {
    name: 'AppLayout',
};
</script>

<style scoped>
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.title {
    text-align: center; /* Center the title horizontally */
    margin: 20px 0; /* Space above and below the title */
    font-size: 24px; /* Adjust font size */
    font-weight: bold; /* Make the title bold */
}
</style>
