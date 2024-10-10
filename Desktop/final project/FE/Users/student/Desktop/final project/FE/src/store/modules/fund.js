// store/modules/fund.js
import { fetchFundProducts, searchFundProduct, getFundProductDetail } from '@/api/financeApi';

const fundModule = {
    namespaced: true,
    state: () => ({
        fundList: [], // 펀드 리스트
        fundListLoaded: false,
        totalPages: 1, // 총 페이지 수 추가
        searchFundProducts: [], // 검색 결과
        fundProductDetail: {}, // 상세 정보
    }),

    mutations: {
        setFundList(state, { items, totalPages }) {
            // 페이지네이션 정보도 함께 저장
            if (Array.isArray(items)) {
                state.fundList = items.map((fund) => ({
                    ...fund,
                    finPrdtNm: fund.product_nm || '상품명 없음',
                }));
                state.totalPages = totalPages; // 총 페이지 수 설정
            } else if (typeof items === 'object' && items !== null) {
                state.fundList = [
                    {
                        ...items,
                        finPrdtNm: items.product_nm || '상품명 없음',
                    },
                ];
                state.totalPages = 1; // 총 페이지 수가 없을 경우 기본값
            } else {
                state.fundList = [];
            }
            state.fundListLoaded = true;
        },

        setSearchFundList(state, searchResults) {
            if (Array.isArray(searchResults)) {
                state.searchFundProducts = searchResults.map((fund) => ({
                    ...fund,
                    finPrdtNm: fund.product_nm || '상품명 없음',
                }));
            } else {
                state.searchFundProducts = [];
            }
        },

        setFundProductDetail(state, detail) {
            state.fundProductDetail = {
                ...detail,
                finPrdtNm: detail.product_nm || '상품명 없음',
            };
        },
    },

    actions: {
        async fetchFundList({ commit, state }, { page, pageSize }) {
            console.log('fetchFundList 액션 호출:', { page, pageSize });
            if (!state.fundListLoaded || page !== 1) {
                // 다른 페이지로 이동할 때도 새로 로드
                try {
                    const response = await fetchFundProducts(page, pageSize);
                    console.log('fetchFundList API 응답:', response);
                    if (response.items && Array.isArray(response.items)) {
                        // 총 페이지 수도 함께 전달
                        commit('setFundList', {
                            items: response.items,
                            totalPages: response.totalPages,
                        });
                    } else {
                        throw new Error('펀드 API 응답 구조가 예상과 다릅니다.');
                    }
                } catch (error) {
                    console.error('Error fetching fund list:', error);
                }
            }
        },

        async searchFundList({ commit }, keyword) {
            try {
                const searchResults = await searchFundProduct(keyword);
                commit('setSearchFundList', searchResults);
            } catch (error) {
                console.error('Error searching fund list:', error);
            }
        },

        async fetchFundProductDetail({ commit }, productId) {
            try {
                const response = await getFundProductDetail(productId);
                commit('setFundProductDetail', response);
            } catch (error) {
                console.error('Error fetching fund product detail:', error);
            }
        },
    },

    getters: {
        getFundList(state) {
            return state.fundList;
        },
        getSearchFundList(state) {
            return state.searchFundProducts;
        },
        getProductDetail(state) {
            return state.fundProductDetail;
        },
        getTotalPages(state) {
            return state.totalPages; // 총 페이지 수 가져오기
        },
    },
};

export default fundModule;
