<template>
    <div class="product-desc-wrapper">
        <div class="product-desc-container">
            <!-- 상품명 표시 -->
            <h1>{{ productDetails ? getProductName(productDetails) : 'Loading...' }}</h1>

            <!-- 로딩 중 메시지 -->
            <div v-if="isLoading">
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>

            <!-- 상품 상세 정보 표시 -->
            <div v-else-if="productDetails">
                <div v-for="(value, key) in productDetails" :key="key" class="product-detail-item">
                    <p>
                        <strong>{{ key }}:</strong> {{ value }}
                    </p>
                </div>
            </div>

            <!-- 상품이 없을 때 메시지 -->
            <div v-else>
                <p>해당 상품을 찾을 수 없습니다.</p>
            </div>

            <v-btn @click="goBack">뒤로가기</v-btn>
        </div>
    </div>
</template>

<script>
import {
    getDepositProductDetail,
    getSavingProductDetail,
    getBondProductDetail,
    getFundProductDetail,
} from '@/api/financeApi.js';

export default {
    data() {
        return {
            productDetails: null,
            productType: '', // 상품 유형 ('deposit', 'saving', 'fund', 'bond')
            productId: '', // 상품 ID
            isLoading: true,
        };
    },
    created() {
        // URL에서 productId와 productType 가져오기
        const productIdParam = this.$route.params.id; // 'productId'로 수정
        const productTypeParam = this.$route.query.productType;

        this.productId = productIdParam;
        this.productType = productTypeParam;

        if (!this.productId || !this.productType) {
            console.error('상품 ID 또는 상품 유형이 올바르지 않습니다.');
            return;
        }

        this.fetchProductDetails();
    },
    methods: {
        async fetchProductDetails() {
            this.isLoading = true;
            try {
                let data = null;
                if (this.productType === 'deposit') {
                    data = await getDepositProductDetail(this.productId); // API 호출
                } else if (this.productType === 'saving') {
                    data = await getSavingProductDetail(this.productId); // API 호출
                } else if (this.productType === 'bond') {
                    data = await getBondProductDetail(this.productId); // API 호출
                } else if (this.productType === 'fund') {
                    data = await getFundProductDetail(this.productId); // API 호출
                } else {
                    console.error('알 수 없는 상품 유형입니다.');
                }
                if (data) {
                    this.productDetails = data;
                } else {
                    this.productDetails = null;
                }
            } catch (error) {
                console.error('상품 정보를 불러오는 중 오류 발생:', error);
                this.productDetails = null;
            } finally {
                this.isLoading = false;
            }
        },

        goBack() {
            this.$router.go(-1); // 이전 페이지로 돌아가기
        },
        getProductName(product) {
            // 상품명 속성은 상품 유형에 따라 다를 수 있으므로 처리
            return (
                product.finPrdtNm ||
                product.productNm ||
                product.isinCdNm ||
                product.name ||
                '상품명 없음'
            );
        },
    },
};
</script>

<style scoped>
.product-desc-wrapper {
    padding: 20px;
}

.product-desc-container {
    max-width: 800px;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    background-color: #f9f9f9;
}

.product-detail-item {
    margin-bottom: 10px;
}
</style>
