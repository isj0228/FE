// store/modules/deposit.js
import { fetchDepositProducts, searchDepositProduct } from '@/api/financeApi';

const depositModule = {
  namespaced: true,
  state: () => ({
    depositProducts: [],
    depositListLoaded: false,
    searchDepositProducts: [],
  }),

  mutations: {
    setDepositList(state, deposits) {
      state.depositProducts = deposits;
      state.depositListLoaded = true;
    },

    setSearchDepositList(state, searchResults) {
      state.searchDepositProducts = searchResults;
    },

    SET_DEPOSIT_PRODUCTS(state, products) {
      state.depositProducts = products; // Set it to the array
    },
  },

  actions: {
    async fetchDepositList({ commit, state }) {
      if (!state.depositListLoaded) {
        try {
          const deposits = await fetchDepositProducts();
          commit('setDepositList', deposits);
        } catch (error) {
          console.error('Error fetching deposit list:', error);
        }
      }
    },
    async searchDepositList({ commit }, keyword) {
      try {
        const searchResults = await searchDepositProduct(keyword);
        commit('setSearchDepositList', searchResults);
      } catch (error) {
        console.error('Error searching deposit list: ', error);
      }
    },

    async fetchDepositProductDetail({ state }, productId) {
      console.log('배열 확인', state.depositProducts);

      // Check if products is an array
      const productsArray = state.depositProducts.products;

      if (!Array.isArray(productsArray)) {
        console.error(
          'depositProducts.products가 배열이 아닙니다:',
          productsArray
        );
        return null; // 또는 적절한 에러 처리를 합니다.
      }

      // Find the product by ID
      return (
        productsArray.find((product) => product.productID === productId) || null
      );
    },
    async fetchDepositProducts({ commit }) {
      const response = await api.getDepositProducts(); // Adjust according to your API call
      const data = response.data; // Assuming this contains { rates: ..., products: ... }

      if (Array.isArray(data.products)) {
        commit('SET_DEPOSIT_PRODUCTS', data.products); // Ensure you're committing the array
      } else {
        console.error('depositProducts가 배열이 아닙니다:', data);
      }
    },
  },

  getters: {
    getDepositList(state) {
      return state.depositProducts;
    },
    getSearchDepositList(state) {
      return state.searchDepositProducts;
    },
    getDepositProductDetail: (state) => (productId) => {
      return (
        state.depositProducts.find(
          (product) => product.productID === productId
        ) || null
      );
    },
  },
};

export default depositModule;
