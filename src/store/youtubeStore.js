import { defineStore } from 'pinia';
import { getAllYoutubeData, getYoutubeDetail } from '@/api/youtubeApi';

// Pinia Store 정의
export const useYoutubeStore = defineStore('youtube', {
  state: () => ({
    featuredVideos: [],
    otherVideos: [],
    selectedVideoDetail: null,
  }),

  actions: {
    async fetchAllYoutubeData() {
      try {
        const data = await getAllYoutubeData();
        this.featuredVideos = data.slice(0, 3);
        this.otherVideos = data.slice(3);
      } catch (error) {
        console.error('Error fetching all YouTube data:', error);
      }
    },

    async fetchYoutubeDetail(youtubeNum) {
      try {
        this.selectedVideoDetail = await getYoutubeDetail(youtubeNum);
      } catch (error) {
        console.error('Error fetching YouTube detail:', error);
      }
    },
  },
});