import { fetchRecentViewList, postRecentViewItem, resetRecentViewList } from '@/api/recentViewApi.js';

const recentViewModule = {
    namespaced: true,
    state: () => ({
        recentItems: [],
        recentItemsLoaded: false,
    }),

    actions: {
        async fetchRecentItems({ commit }) {
            try {
                const data = await fetchRecentViewList();
                commit('setRecentItems', data);
            } catch (error) {
                console.error('Error fetching recent items:', error);
            }
        },

        async addRecentViewItem({ commit }, recentViewedItem) {
            try {
                await postRecentViewItem(recentViewedItem);
                commit('addRecentItem', recentViewedItem); // 또는 서버에서 반환된 아이템을 사용할 수 있음
            } catch (error) {
                console.error('Error adding recent view item:', error);
            }
        },

        async resetRecentItems({ commit }) {
            try {
                await resetRecentViewList();
                commit('resetRecentItems'); // 상태를 초기화
            } catch (error) {
                console.error('Error resetting recent items:', error);
            }
        },
    },

    getters: {
        recentItems: (state) => state.recentItems,
        isRecentItemsLoaded: (state) => state.recentItemsLoaded,
    },

    mutations: {
        setRecentItems(state, recentItems) {
            state.recentItems = recentItems;
            state.recentItemsLoaded = true;
        },

        addRecentItem(state, recentViewedItem) {
            state.recentItems.push(recentViewedItem);
        },

        resetRecentItems(state) {
            state.recentItems = [];
            state.recentItemsLoaded = false;
        },
    },
};

export default recentViewModule;