import { defineStore } from 'pinia';
import { 
  increaseAgeGroupProductHit, 
  increasePreferenceProductHit, 
  getTopProductsByAgeGroup, 
  getTopProductsByPreference,
  getTopProductsBySelectedAgeGroup,
  getTopProductsBySelectedPreference 
} from '@/api/hit';

export const useHitStore = defineStore('hit', {
    state: () => ({
        topAgeGroupProducts: [],
        topPreferenceProducts: [],
        selectedAgeGroupProducts: [], // 선택된 연령대에 따른 상품
        selectedPreferenceProducts: [], // 선택된 투자 성향에 따른 상품
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
        },
        // 선택된 연령대에 따른 상위 3개 상품 가져오기
        async fetchTopProductsBySelectedAgeGroup(ageGroup) {
          try {
            const products = await getTopProductsBySelectedAgeGroup(ageGroup);
            this.selectedAgeGroupProducts = products;
          } catch (error) {
            console.error(`Error fetching top products for age group ${ageGroup}:`, error);
            throw error;
          }
        },
        // 선택된 투자 성향에 따른 상위 3개 상품 가져오기
        async fetchTopProductsBySelectedPreference(preference) {
          try {
            const products = await getTopProductsBySelectedPreference(preference);
            this.selectedPreferenceProducts = products;
          } catch (error) {
            console.error(`Error fetching top products for preference ${preference}:`, error);
            throw error;
          }
        },
    },
});