import { defineStore } from 'pinia';
import { increaseAgeGroupProductHit, increasePreferenceProductHit, getTopProductsByAgeGroup, getTopProductsByPreference } from '@/api/hit';

export const useHitStore = defineStore('hit', {
    state: () => ({
        topAgeGroupProducts: [],
        topPreferenceProducts: [],
        hitMessage: '',
    }),
    actions: {
        async increaseAgeGroupHit(productId) {
          try {
            const response = await increaseAgeGroupProductHit(productId);
            this.hitMessage = response; // 성공 메시지 저장
          } catch (error) {
            console.error('Error increasing age group hit:', error);
            throw error;
          }
        },
        async increasePreferenceHit(productId) {
          try {
            const response = await increasePreferenceProductHit(productId);
            this.hitMessage = response; // 성공 메시지 저장
          } catch (error) {
            console.error('Error increasing preference hit:', error);
            throw error;
          }
        },
        async fetchTopProductsByAgeGroup() {
          try {
            const products = await getTopProductsByAgeGroup();
            this.topAgeGroupProducts = products;
          } catch (error) {
            console.error('Error fetching top products by age group:', error);
            throw error;
          }
        },
        async fetchTopProductsByPreference() {
          try {
            const products = await getTopProductsByPreference();
            this.topPreferenceProducts = products;
          } catch (error) {
            console.error('Error fetching top products by preference:', error);
            throw error;
          }
        }
    },
});