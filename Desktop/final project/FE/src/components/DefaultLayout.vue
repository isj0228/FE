<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
import SideBar from './Sidebar.vue';
</script>

<template>
    <div class="container">
        <div class="main">
            <div class="exceptSide">
                <Header />
                <div class="content my-5 px-3">
                    <slot></slot>
                </div>
                <Footer />
            </div>
            <SideBar />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */

    height: 100vh;
}

.main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 1300px; /* 원하는 고정 너비로 설정 */
    padding: 0px;
}

.content {
    flex: 1;
    padding: 20px;
}

#sidebar {
}

.exceptSide {
}
</style>
