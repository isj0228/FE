// store/fund.js
import { defineStore } from 'pinia';
import { fetchFundProducts, searchFundProduct, getFundProductDetail } from '@/api/financeApi';

export const useFundStore = defineStore('fund', {
    state: () => ({
        fundList: [], // 펀드 리스트
        fundListLoaded: false,
        totalPages: 1, // 총 페이지 수 추가
        searchFundProducts: [], // 검색 결과
        fundProductDetail: {}, // 상세 정보
    }),

    actions: {
        setFundList({ items, totalPages }) {
            if (Array.isArray(items)) {
                this.fundList = items.map((fund) => ({
                    ...fund,
                    finPrdtNm: fund.product_nm || '상품명 없음',
                }));
                this.totalPages = totalPages; // 총 페이지 수 설정
            } else if (typeof items === 'object' && items !== null) {
                this.fundList = [
                    {
                        ...items,
                        finPrdtNm: items.product_nm || '상품명 없음',
                    },
                ];
                this.totalPages = 1; // 총 페이지 수가 없을 경우 기본값
            } else {
                this.fundList = [];
            }
            this.fundListLoaded = true;
        },

        setSearchFundList(searchResults) {
            if (Array.isArray(searchResults)) {
                this.searchFundProducts = searchResults.map((fund) => ({
                    ...fund,
                    finPrdtNm: fund.product_nm || '상품명 없음',
                }));
            } else {
                this.searchFundProducts = [];
            }
        },

        setFundProductDetail(detail) {
            this.fundProductDetail = {
                ...detail,
                finPrdtNm: detail.product_nm || '상품명 없음',
            };
        },

        async fetchFundList(page, pageSize) {
            console.log('fetchFundList 액션 호출:', { page, pageSize });
            if (!this.fundListLoaded || page !== 1) {
                // 다른 페이지로 이동할 때도 새로 로드
                try {
                    const response = await fetchFundProducts(page, pageSize);
                    console.log('fetchFundList API 응답:', response);
                    if (response.items && Array.isArray(response.items)) {
                        // 총 페이지 수도 함께 전달
                        this.setFundList({
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

        async searchFundList(keyword) {
            try {
                const searchResults = await searchFundProduct(keyword);
                this.setSearchFundList(searchResults);
            } catch (error) {
                console.error('Error searching fund list:', error);
            }
        },

        async fetchFundProductDetail(productId) {
            try {
                const response = await getFundProductDetail(productId);
                this.setFundProductDetail(response);
            } catch (error) {
                console.error('Error fetching fund product detail:', error);
            }
        },
    },

    getters: {
        getFundList() {
            return this.fundList;
        },
        getSearchFundList() {
            return this.searchFundProducts;
        },
        getProductDetail() {
            return this.fundProductDetail;
        },
        getTotalPages() {
            return this.totalPages; // 총 페이지 수 가져오기
        },
    },
});
