<template>
    <div id="All">
        <!-- 왼쪽 메뉴 바 -->
        <div id="left">
            <v-card class="pa-4" elevation="2" style="height: 100%">
                <v-card-text>
                    <div class="list-container">
                        <span @click="navigateTo('/Youtube')" class="list-item"> 금융 유튜브 </span>
                        <span @click="navigateTo('/Influencer')" class="list-item">
                            인플루언서
                        </span>
                        <span @click="navigateTo('/News')" class="list-item"> 뉴스 </span>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <!-- 상품명 검색, 제목 -->
        <div id="right">
            <v-container>
                <div id="seartext" class="search-container">
                    <h1 class="sixth">_</h1>

                    <div id="search" class="search-filter">
                        <i class="fa-solid fa-magnifying-glass" style="font-size: 24px"></i>
                        <input
                            v-model="searchQuery"
                            type="text"
                            class="form-control"
                            placeholder="검색어를 입력해 주세요"
                        />
                        <v-btn class="erase-btn" @click="eraseSearch"> 지우기 </v-btn>
                    </div>
                </div>

                <!-- 메인 -->
                <Influencer_title :searchQuery="searchQuery" @openModal="openModal" />
            </v-container>
        </div>

        <!-- 모달 창 -->
        <ModalInfluencer
            v-if="isModalOpen"
            :isOpen="isModalOpen"
            :persona="selectedPersona"
            @close="closeModal"
        />
    </div>
</template>

<script>
import Influencer_title from './Influencer_title.vue';
import ModalInfluencer from '@/components/Modal/ModalInfluencer.vue';

export default {
    name: 'Influencer',
    components: {
        Influencer_title,
        ModalInfluencer, // 모달 컴포넌트 추가
    },
    data() {
        return {
            searchQuery: '', // 검색어 데이터
            page: 1, // 현재 페이지
            isModalOpen: false, // 모달 상태 관리
            selectedPersona: null, // 선택된 인플루언서 데이터
        };
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        onPageChange(newPage) {
            this.page = newPage; // 페이지가 변경될 때 호출되는 메서드
            console.log(`Current page: ${newPage}`);
        },
        openModal(persona) {
            this.selectedPersona = persona;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedPersona = null;
        },

        // 검색창 지우기 기능
        eraseSearch() {
            this.searchQuery = ''; // 검색어를 빈 문자열로 설정하여 검색창을 초기화
        },
    },
};
</script>

<style scoped>
#All {
    display: flex;
    align-items: stretch; /* 왼쪽과 오른쪽 영역을 세로로 늘림 */
    padding-left: 100px;
}
#left {
    width: 300px; /* 고정된 너비 (300px) */
}
#right {
    flex: 1; /* 오른쪽 영역은 남은 공간을 모두 차지 */
}
.search-container {
    display: flex;
    align-items: center; /* 수직 정렬 */
    margin-bottom: 20px; /* 아래 여백 추가 */
    justify-content: space-between;
}
#search {
    display: flex; /* 아이콘과 인풋을 나란히 배치 */
    align-items: center; /* 수직 중앙 정렬 */
    gap: 10px; /* 아이콘과 인풋 간격 */
}
.form-control {
    flex: 1; /* 인풋 필드를 남은 공간에 맞게 확장 */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.erase-btn {
    margin-left: 10px;
}
h1.sixth {
    position: relative;
}

h1.sixth:before,
h1.sixth:after {
    content: '금융 ';
    display: inline-block;
    position: relative;
    top: 1px;
    height: 100%;
    font-size: 1.25em;
    color: black;

    transition: all 0.5s ease;
}

h1.sixth:after {
    content: '인플루언서';
}

h1.sixth:hover:before {
    transform: translateX(-5px);
}

h1.sixth:hover:after {
    transform: translateX(5px);
}

.list-container {
    display: flex;
    flex-direction: column;
}

.list-item {
    display: block;
    padding: 10px 0;
    cursor: pointer;
    color: #3f51b5; /* Vuetify 기본 색상 중 하나 */
    font-size: 16px;
}

.list-item:hover {
    background-color: #f0f0f0;
}
</style>
