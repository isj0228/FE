<template>
    <!-- 이달의 추천 영상 섹션 -->
    <div class="featured-header">
        이달의 추천 영상
        
        <!-- 관리자인 경우에 추가하기 버튼 표시-->
         <v-btn v-if="isAdmin" color="primary" @click="goToAddYoutubePage">
            추가하기
         </v-btn>
    </div>

    <!-- 이달의 추천 영상 2개 -->
    <div id="featured-videos" class="d-flex flex-wrap justify-space-between">
        <div v-for="(video, index) in featuredVideos.slice(0, 2)" :key="index" class="card-wrapper featured">
            <v-card class="mx-auto featured-card" color="white" max-width="500" elevation="5">
                <template v-slot:prepend>
                    <v-icon class="red-icon">mdi-youtube</v-icon>
                </template>

                <!-- 유튜브 비디오 임베드 -->
                <iframe
                    :src="getYoutubeEmbedUrl(video.youtubeUrl)"
                    width="100%"
                    height="250"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="border-radius: 10px; margin-bottom: 10px;"
                ></iframe>

                <!-- 제목 (상세 페이지로 이동 버튼) -->
                <v-card-title class="video-title" @click="goToYoutubeDetail(video.youtubeNum)" style="cursor: pointer;">
                    {{ video.youtubeTitle }}
                </v-card-title>
            </v-card>
        </div>
    </div>

    <!-- 다른 영상들 리스트 형식 -->
    <div class="other-header">다른 영상들</div>
    <div id="other-videos" class="d-flex flex-wrap justify-space-between">
        <div v-for="(video, index) in otherVideos" :key="index" class="card-wrapper">
            <v-card class="mx-auto other-card" color="white" max-width="300" elevation="3">
                <template v-slot:prepend>
                    <v-icon class="red-icon">mdi-youtube</v-icon>
                </template>

                <!-- 유튜브 비디오 임베드 -->
                <iframe
                    :src="getYoutubeEmbedUrl(video.youtubeUrl)"
                    width="100%"
                    height="180"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="border-radius: 10px; margin-bottom: 10px;"
                ></iframe>

                <!-- 제목 (상세 페이지로 이동 버튼) -->
                <v-card-title class="video-title" @click="goToYoutubeDetail(video.youtubeNum)" style="cursor: pointer;">
                    {{ video.youtubeTitle }}
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>

<script>
import { useYoutubeStore } from '@/store/youtubeStore';
import { useAuthStore } from '@/store/authStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'YoutubeVideos',
    setup() {
        const youtubeStore = useYoutubeStore();
        const authStore = useAuthStore();
        const router = useRouter();

        onMounted(() => {
            youtubeStore.fetchAllYoutubeData();
            authStore.checkAuth(); // 사용자 인증 상태 및 역할 확인
        });

        // 유튜브 URL에서 v= 뒤의 ID 값을 추출해 임베드 주소를 생성하는 함수
        const getYoutubeEmbedUrl = (youtubeUrl) => {
            const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
            const videoId = urlParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        };

        const goToAddYoutubePage = () => {
            router.push('/add-youtube'); // 유튜브 추가 페이지로 이동
        };

        const goToYoutubeDetail = (youtubeNum) => {
            router.push(`/youtube/${youtubeNum}`); // 유튜브 상세 페이지로 이동
        };

        return {
            featuredVideos: youtubeStore.featuredVideos,
            otherVideos: youtubeStore.otherVideos,
            getYoutubeEmbedUrl,
            isAdmin: authStore.userRole === 'admin',
            goToAddYoutubePage,
            goToYoutubeDetail,
        };
    },
};
</script>

<style scoped>
/* 이달의 추천 영상 섹션 스타일 */
.featured-header {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 30px 0;
    color: #ff6347;
    text-transform: uppercase;
}

/* 다른 영상들 헤더 스타일 */
.other-header {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin: 40px 0 20px;
    color: #007acc;
    text-transform: uppercase;
}

/* 이달의 추천 영상 2개 레이아웃 */
#featured-videos {
    display: flex;
    justify-content: center; /* 카드들이 중앙에 배치되도록 설정 */
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 30px;
}

#other-videos {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 40px;
    justify-content: space-evenly;
}

.card-wrapper {
    width: calc(45% - 20px); /* 반응형으로 카드의 크기를 조정 */
    margin: 10px;
    min-width: 260px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.card-wrapper.featured {
    width: calc(45% - 20px);
    max-width: 500px;
}

.card-wrapper:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
}

.v-card {
    border-radius: 15px;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.v-card:hover {
    background-color: #f0f0f0;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

.red-icon {
    color: red; /* 유튜브 아이콘 색상 */
}

.video-title {
    font-weight: bold;
    font-size: 1.2rem;
    white-space: normal;
    margin: 10px;
    text-align: center;
}

@media (max-width: 768px) {
    .card-wrapper {
        width: 100%;
    }
}
</style>