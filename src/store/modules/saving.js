// store/saving.js
import { defineStore } from 'pinia';
import { fetchSavingProducts, searchSavingProduct } from '@/api/financeApi';

export const useSavingStore = defineStore('saving', {
  state: () => ({
    savingProducts: [],
    savingListLoaded: false,
    searchSavingProducts: [],
  }),

  actions: {
    setSavingList(savings) {
      this.savingProducts = savings;
      this.savingListLoaded = true;
    },

    setSearchSavingList(searchResults) {
      this.searchSavingProducts = searchResults;
    },

    setSavingProducts(products) {
      this.savingProducts = products; // Set it to the array
    },

    async fetchSavingList() {
      if (!this.savingListLoaded) {
        try {
          const savings = await fetchSavingProducts();
          this.setSavingList(savings);
        } catch (error) {
          console.error('Error fetching saving list:', error);
        }
      }
    },

    async searchSavingList(keyword) {
      try {
        const searchResults = await searchSavingProduct(keyword);
        this.setSearchSavingList(searchResults);
      } catch (error) {
        console.error('Error searching saving list: ', error);
      }
    },

    async fetchSavingProductDetail(productId) {
      console.log('배열 확인', this.savingProducts);

      const productsArray = this.savingProducts;

      if (!Array.isArray(productsArray)) {
        console.error('savingProducts가 배열이 아닙니다:', productsArray);
        return null; // Return null or handle error appropriately
      }

      // Find the product by ID
      return (
        productsArray.find((product) => product.productID === productId) || null
      );
    },

    async fetchSavingProducts() {
      try {
        const response = await fetchSavingProducts(); // Adjust according to your API call
        const data = response.data; // Assuming this contains { rates: ..., products: ... }

        if (Array.isArray(data.products)) {
          this.setSavingProducts(data.products); // Ensure you're setting the array
        } else {
          console.error('savingProducts가 배열이 아닙니다:', data);
        }
      } catch (error) {
        console.error('Error fetching saving products:', error);
      }
    },
  },

  getters: {
    getSavingList() {
      return this.savingProducts;
    },

    getSearchSavingList() {
      return this.searchSavingProducts;
    },
  },
});
