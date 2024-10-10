<template>
    <div class="news-list">
        <v-container class="news-container">
            <v-row>
                <v-col v-for="(news, index) in paginatedNews" :key="index" cols="12">
                    <!-- 뉴스 항목 -->
                    <v-card class="news-card">
                        <v-row>
                            <v-col cols="3">
                                <v-img :src="news.image" aspect-ratio="2" class="news-image"
                                    >이미지 박스</v-img
                                >
                            </v-col>
                            <v-col cols="9">
                                <v-card-title class="news-title">{{ news.title }}</v-card-title>
                                <v-card-subtitle class="news-summary">{{
                                    truncateSummary(news.summary)
                                }}</v-card-subtitle>
                                <v-card-subtitle class="news-date">{{ news.date }}</v-card-subtitle>
                            </v-col>
                        </v-row>
                    </v-card>

                    <!-- 구분선 -->
                    <v-divider v-if="index < paginatedNews.length - 1"></v-divider>
                </v-col>
            </v-row>
        </v-container>

        <!-- 페이지네이션 -->
        <v-container class="pagination-container">
            <v-pagination
                v-model="page"
                :length="totalPages"
                @input="onPageChange"
                circle
            ></v-pagination>
        </v-container>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'News_title',
    setup() {
        const page = ref(1);
        const pageSize = 7; // 페이지당 7개의 뉴스 표시

        // 뉴스 데이터 정의
        const newsList = ref([
            {
                image: '', // 이미지 경로 비워둠
                title: '최신 금융 뉴스',
                summary: '이 뉴스는 최신 금융 시장 동향에 대한 내용을 다룹니다.',
                date: '2024-09-28',
            },
            {
                image: '', // 이미지 경로 비워둠
                title: '주식 시장 분석',
                summary: '주식 시장의 최근 동향을 분석한 뉴스입니다.',
                date: '2024-09-27',
            },
            // 필요 시 추가 데이터 입력
        ]);

        // 페이지네이션을 위한 slice 처리
        const paginatedNews = computed(() => {
            const start = (page.value - 1) * pageSize;
            const end = start + pageSize;
            return newsList.value.slice(start, end);
        });

        // 전체 페이지 계산
        const totalPages = computed(() => {
            return Math.ceil(newsList.value.length / pageSize);
        });

        // 뉴스 요약을 자르는 함수
        const truncateSummary = (summary) => {
            const maxLength = 120; // 최대 글자 수 설정
            return summary.length > maxLength ? summary.substring(0, maxLength) + '...' : summary;
        };

        // 페이지 변경 처리
        const onPageChange = (newPage) => {
            page.value = newPage;
        };

        return { paginatedNews, totalPages, page, onPageChange, truncateSummary };
    },
};
</script>

<style scoped>
.news-list {
    padding: 20px;
}

.title {
    font-size: 1.5em;
    margin-bottom: 20px;
    text-align: center;
}

.news-container {
    padding: 0;
}

.news-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
}

.news-image {
    height: 120px; /* 뉴스 이미지 크기 */
    background-color: #b7d78d;
}

.news-title {
    font-size: 1.2em;
    margin-bottom: 5px;
}

.news-summary {
    font-size: 1em;
    color: #666;
    margin-bottom: 5px;
}

.news-date {
    font-size: 0.9em;
    color: #999;
}

.pagination-container {
    margin-top: 20px;
    text-align: center;
}
</style>
