<template>
    <div class="youtube-detail-container" v-if="isLoading">
      <div class="loading-message">데이터를 불러오는 중입니다...</div>
    </div>
  
    <div class="youtube-detail-container" v-else-if="videoDetail && !isLoading">
      <h1 class="video-title">{{ videoDetail.youtubeTitle }}</h1>
      <iframe
        :src="getYoutubeEmbedUrl(videoDetail.youtubeUrl)"
        width="100%"
        height="400"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      
      <!-- 본문 내용 출력 -->
      <div class="video-content">
        <div v-for="(paragraph, index) in splitContent(videoDetail.youtubeContext)" :key="index" class="content-box">
          <p>{{ paragraph }}</p>
        </div>
      </div>
    </div>
  
    <!-- 데이터가 없을 때 메시지 표시 -->
    <div v-else class="loading-message">
      데이터를 찾을 수 없습니다.
    </div>
  </template>
  
  <script>
  import { useYoutubeStore } from '@/store/youtubeStore';
  import { onMounted, watch, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'YoutubeDetail',
    props: ['youtubeNum'],
    setup(props) {
      const youtubeStore = useYoutubeStore();
      const isLoading = ref(true);
  
      // 비디오 세부 정보를 초기화하고 로드하는 함수
      const loadVideoDetail = async () => {
        isLoading.value = true;
        await youtubeStore.fetchYoutubeDetail(props.youtubeNum);
        isLoading.value = false;
      };
  
      // 컴포넌트가 마운트될 때 비디오 세부 정보 로드
      onMounted(() => {
        youtubeStore.selectedVideoDetail = null; // 이전 데이터 초기화
        loadVideoDetail();
      });
  
      // youtubeNum이 변경될 때마다 비디오 세부 정보 로드
      watch(() => props.youtubeNum, async (newYoutubeNum) => {
        if (newYoutubeNum) {
          youtubeStore.selectedVideoDetail = null; // 이전 데이터 초기화
          await loadVideoDetail();
        }
      });
  
      const getYoutubeEmbedUrl = (youtubeUrl) => {
        const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
        const videoId = urlParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      };
  
      // 긴 본문 내용을 나누어 출력하기 위한 함수
      const splitContent = (content) => {
        if (!content) return [];
        return content.split('\n\n'); // 두 줄 간격으로 나누어 배열로 반환
      };
  
      return {
        videoDetail: youtubeStore.selectedVideoDetail,
        getYoutubeEmbedUrl,
        splitContent,
        isLoading,
      };
    }
  };
  </script>
  
  <style scoped>
  .youtube-detail-container {
    padding: 20px;
    text-align: center;
  }
  
  .video-title {
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }
  
  .video-content {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .content-box {
    width: 80%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .content-box p {
    margin: 0;
    line-height: 1.6;
    font-size: 1rem;
    color: #555;
  }
  
  .loading-message {
    text-align: center;
    font-size: 1.5rem;
    color: #888;
    margin-top: 50px;
  }
  </style>