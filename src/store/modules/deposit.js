// store/deposit.js
import { defineStore } from 'pinia';
import { fetchDepositProducts, searchDepositProduct } from '@/api/financeApi';

export const useDepositStore = defineStore('deposit', {
  state: () => ({
    depositProducts: [],
    depositListLoaded: false,
    searchDepositProducts: [],
  }),

  actions: {
    setDepositList(deposits) {
      this.depositProducts = deposits;
      this.depositListLoaded = true;
    },

    setSearchDepositList(searchResults) {
      this.searchDepositProducts = searchResults;
    },

    setDepositProducts(products) {
      this.depositProducts = products; // Set it to the array
    },

    async fetchDepositList() {
      if (!this.depositListLoaded) {
        try {
          const deposits = await fetchDepositProducts();
          this.setDepositList(deposits);
        } catch (error) {
          console.error('Error fetching deposit list:', error);
        }
      }
    },

    async searchDepositList(keyword) {
      try {
        const searchResults = await searchDepositProduct(keyword);
        this.setSearchDepositList(searchResults);
      } catch (error) {
        console.error('Error searching deposit list:', error);
      }
    },

    async fetchDepositProductDetail(productId) {
      console.log('배열 확인', this.depositProducts);

      // Check if depositProducts is an array
      const productsArray = this.depositProducts;

      if (!Array.isArray(productsArray)) {
        console.error('depositProducts가 배열이 아닙니다:', productsArray);
        return null; // Return null or handle error appropriately
      }

      // Find the product by ID
      return (
        productsArray.find((product) => product.productID === productId) || null
      );
    },

    async fetchDepositProducts() {
      try {
        const response = await fetchDepositProducts(); // Adjust according to your API call
        const data = response.data; // Assuming this contains { rates: ..., products: ... }

        if (Array.isArray(data.products)) {
          this.setDepositProducts(data.products); // Ensure you're committing the array
        } else {
          console.error('depositProducts가 배열이 아닙니다:', data);
        }
      } catch (error) {
        console.error('Error fetching deposit products:', error);
      }
    },
  },

  getters: {
    getDepositList() {
      return this.depositProducts;
    },
    getSearchDepositList() {
      return this.searchDepositProducts;
    },
    getDepositProductDetail: (state) => (productId) => {
      return (
        state.depositProducts.find(
          (product) => product.productID === productId
        ) || null
      );
    },
  },
});