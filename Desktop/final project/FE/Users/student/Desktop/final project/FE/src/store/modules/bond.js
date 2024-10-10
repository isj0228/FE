// store/modules/bond.js
import { fetchBondProducts, searchBondProduct, getBondProductDetail } from '@/api/financeApi';

const bondModule = {
    namespaced: true,
    state: () => ({
        bondList: [], // 채권 리스트
        bondListLoaded: false,
        totalPages: 1, // 총 페이지 수 추가
        searchBondProducts: [], // 검색 결과
        bondProductDetail: {}, // 상세 정보
    }),

    mutations: {
        setBondList(state, bonds) {
            // 배열인지 객체인지 확인 후 처리
            if (Array.isArray(bonds)) {
                state.bondList = bonds.map((bond) => ({
                    ...bond,
                    finPrdtNm: bond.isinCdNm || '상품명 없음',
                }));
            } else if (typeof bonds === 'object' && bonds !== null) {
                state.bondList = [
                    {
                        ...bonds,
                        finPrdtNm: bonds.isinCdNm || '상품명 없음',
                    },
                ];
            } else {
                state.bondList = [];
            }
            state.bondListLoaded = true;
        },

        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },

        setSearchBondList(state, searchResults) {
            if (Array.isArray(searchResults)) {
                state.searchBondProducts = searchResults.map((bond) => ({
                    ...bond,
                    finPrdtNm: bond.isinCdNm || '상품명 없음',
                }));
            } else {
                state.searchBondProducts = [];
            }
        },

        setBondProductDetail(state, detail) {
            state.bondProductDetail = {
                ...detail,
                finPrdtNm: detail.isinCdNm || '상품명 없음',
            };
        },
    },

    actions: {
        async fetchBondList({ commit, state }, { page, pageSize }) {
            console.log('fetchBondList 액션 호출:', { page, pageSize });
            if (!state.bondListLoaded) {
                try {
                    const response = await fetchBondProducts(page, pageSize);
                    console.log('fetchBondList API 응답:', response);
                    // API 응답 구조에 따라 처리
                    if (response.items && Array.isArray(response.items)) {
                        commit('setBondList', response.items);
                        commit('setTotalPages', response.totalPages || 1); // totalPages 설정
                    } else if (response.productInfoTable) {
                        // 예: 객체로 반환될 경우
                        commit('setBondList', response.productInfoTable);
                        commit('setTotalPages', response.totalPages || 1); // totalPages 설정
                    } else {
                        throw new Error('채권 API 응답 구조가 예상과 다릅니다.');
                    }
                } catch (error) {
                    console.error('Error fetching bond list:', error);
                }
            }
        },

        async searchBondList({ commit }, keyword) {
            try {
                const searchResults = await searchBondProduct(keyword);
                commit('setSearchBondList', searchResults);
            } catch (error) {
                console.error('Error searching bond list:', error);
            }
        },

        async fetchBondProductDetail({ commit }, productId) {
            try {
                const response = await getBondProductDetail(productId);
                commit('setBondProductDetail', response);
            } catch (error) {
                console.error('Error fetching bond product detail:', error);
            }
        },
    },

    getters: {
        getBondList(state) {
            return state.bondList;
        },
        getTotalPages(state) {
            return state.totalPages; // totalPages를 getter로 추가
        },
        getSearchBondList(state) {
            return state.searchBondProducts;
        },
        getProductDetail(state) {
            return state.bondProductDetail;
        },
    },
};

export default bondModule;
