// store/bond.js
import { defineStore } from 'pinia';
import { fetchBondProducts, searchBondProduct, getBondProductDetail } from '@/api/financeApi';

export const useBondStore = defineStore('bond', {
    state: () => ({
        bondList: [], // 채권 리스트
        bondListLoaded: false,
        totalPages: 1, // 총 페이지 수
        searchBondProducts: [], // 검색 결과
        bondProductDetail: {}, // 상세 정보
    }),

    actions: {
        setBondList(bonds) {
            if (Array.isArray(bonds)) {
                this.bondList = bonds.map((bond) => ({
                    ...bond,
                    finPrdtNm: bond.isinCdNm || '상품명 없음',
                }));
            } else if (typeof bonds === 'object' && bonds !== null) {
                this.bondList = [
                    {
                        ...bonds,
                        finPrdtNm: bonds.isinCdNm || '상품명 없음',
                    },
                ];
            } else {
                this.bondList = [];
            }
            this.bondListLoaded = true;
        },

        setTotalPages(totalPages) {
            this.totalPages = totalPages;
        },

        setSearchBondList(searchResults) {
            if (Array.isArray(searchResults)) {
                this.searchBondProducts = searchResults.map((bond) => ({
                    ...bond,
                    finPrdtNm: bond.isinCdNm || '상품명 없음',
                }));
            } else {
                this.searchBondProducts = [];
            }
        },

        setBondProductDetail(detail) {
            this.bondProductDetail = {
                ...detail,
                finPrdtNm: detail.isinCdNm || '상품명 없음',
            };
        },

        async fetchBondList(page, pageSize) {
            try {
                const response = await fetchBondProducts(page, pageSize);
                // API 응답 구조에 따라 처리
                if (response.items && Array.isArray(response.items)) {
                    this.setBondList(response.items);
                    this.setTotalPages(response.totalPages || 1);
                } else if (response.productInfoTable) {
                    this.setBondList(response.productInfoTable);
                    this.setTotalPages(response.totalPages || 1);
                } else {
                    throw new Error('채권 API 응답 구조가 예상과 다릅니다.');
                }
            } catch (error) {
                console.error('Error fetching bond list:', error);
            }
        },

        async searchBondList(keyword) {
            try {
                const searchResults = await searchBondProduct(keyword);
                this.setSearchBondList(searchResults);
            } catch (error) {
                console.error('Error searching bond list:', error);
            }
        },

        async fetchBondProductDetail(productId) {
            try {
                const response = await getBondProductDetail(productId);
                this.setBondProductDetail(response);
            } catch (error) {
                console.error('Error fetching bond product detail:', error);
            }
        },
    },

    getters: {
        getBondList() {
            return this.bondList;
        },
        getTotalPages() {
            return this.totalPages;
        },
        getSearchBondList() {
            return this.searchBondProducts;
        },
        getProductDetail() {
            return this.bondProductDetail;
        },
    },
});
