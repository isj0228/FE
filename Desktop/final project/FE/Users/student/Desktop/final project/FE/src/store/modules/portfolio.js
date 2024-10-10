import {fetchPortfolioList, getPortfolioDetail, postPortfolio, deletePortfolio,} from '@/api/portfolioApi.js';
const portfolioModule = {
    namespaced: true,
    state: () => ({
        portfolioList: [],
        portfolioListLoaded: false,
        portfolioDetail: null,
        newPortfolio: null,
        newPortfolioItems: [],
    }),
    actions: {
        async fetchPortfolioList({ commit, state }) {
            if (!state.portfolioListLoaded) {
                try {
                    const data = await fetchPortfolioList();
                    commit('setPortfolioList', data);
                } catch (error) {
                    console.error('Error fetching portfolio list:', error);
                }
            }
        },
        async getPortfolioDetail({ commit }, portfolioId) {
            try {
                const data = await getPortfolioDetail(portfolioId);
                commit('setPortfolioDetail', data);
            } catch (error) {
                console.error('Error fetching portfolio detail:', error);
            }
        },
        async postPortfolio({ commit }, portfolio) {
            try {
                const data = await postPortfolio(portfolio);
                commit('setNewPortfolio', data);
            } catch (error) {
                console.error('Error posting portfolio:', error);
            }
        },
        async deletePortfolio({ commit }, portfolioId) {
            try {
                const data = await deletePortfolio(portfolioId);
                commit('removePortfolio', portfolioId);
            } catch (error) {
                console.error('Error deleting portfolio:', error);
            }
        },
    },
    getters: {
        portfolioList: (state) => state.portfolioList,
        portfolioDetail: (state) => state.portfolioDetail,
        newPortfolio: (state) => state.newPortfolio,
        isPortfolioListLoaded: (state) => state.portfolioListLoaded,
    },
    mutations: {
        setPortfolioList(state, portfolioList) {
            state.portfolioList = portfolioList;
            state.portfolioListLoaded = true;
        },
        setPortfolioDetail(state, portfolioDetail) {
            state.portfolioDetail = portfolioDetail;
        },
        setNewPortfolio(state, newPortfolio) {
            state.newPortfolio = newPortfolio;
            state.portfolioList.push(newPortfolio); // 새로운 포트폴리오 리스트에 추가
        },
        removePortfolio(state, portfolioId) {
            state.portfolioList = state.portfolioList.filter(
                (portfolio) => portfolio.id !== portfolioId
            );
        },
    },
};
export default portfolioModule;