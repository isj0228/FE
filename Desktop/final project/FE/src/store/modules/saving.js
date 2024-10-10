import { fetchSavingProducts, searchSavingProduct } from '@/api/financeApi';

const savingModule = {
    namespaced: true,
    state: () => ({
        savingProducts: [],
        savingListLoaded: false,
        searchSavingProducts: [],
    }),

    mutations: {
        setSavingList(state, savings) {
            state.savingProducts = savings;
            state.savingListLoaded = true;
        },

        setSearchSavingList(state, searchResults) {
            state.searchSavingProducts = searchResults;
        },

        SET_SAVING_PRODUCTS(state, products) {
            state.savingProducts = products; // Set it to the array
        },
    },

    actions: {
        async fetchSavingList({ commit, state }) {
            if (!state.savingListLoaded) {
                try {
                    const savings = await fetchSavingProducts();
                    commit('setSavingList', savings);
                } catch (error) {
                    console.error('Error fetching saving list:', error);
                }
            }
        },

        async searchSavingList({ commit }, keyword) {
            try {
                // const saving = await fetchDepositProducts();
                const searchResults = await searchSavingProduct(keyword);
                commit('setSearchSavingList', searchResults);
            } catch (error) {
                console.error('Error searching saving list: ', error);
            }
        },

        async fetchSavingProductDetail({ state }, productId) {
            console.log('배열 확인', state.depositProducts);

            const productsArray = state.savingProducts.products;

            if (!Array.isArray(state.savingProducts)) {
                console.error('savingProducts가 배열이 아닙니다:', state.savingProducts);
                return null; // 또는 적절한 에러 처리를 합니다.
            }

            // Find the product by ID
            return productsArray.find((product) => product.productID === productId) || null;
        },

        async fetchSavingProducts({ commit }) {
            const response = await api.getSavingProducts(); // Adjust according to your API call
            const data = response.data; // Assuming this contains { rates: ..., products: ... }

            if (Array.isArray(data.products)) {
                commit('SET_SAVING_PRODUCTS', data.products); // Ensure you're committing the array
            } else {
                console.error('savingProducts가 배열이 아닙니다:', data);
            }
        },
    },
    getters: {
        getSavingList(state) {
            return state.savingProducts;
        },

        getSearchSavingList(state) {
            return state.searchSavingProducts;
        },
    },
};

export default savingModule;
