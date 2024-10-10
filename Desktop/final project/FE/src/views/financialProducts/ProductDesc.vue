<template>
    <div class="product-desc-wrapper">
        <div class="product-desc-container">
            <!-- 상품명 표시 -->
            <h1 class="product-title">
                {{ productDetails ? getProductName(productDetails) : 'Loading...' }}
            </h1>

            <!-- 로딩 중 메시지 -->
            <div v-if="isLoading" class="loading-message">
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>

            <!-- 예금/적금 상세 정보 표시 -->
            <div v-else-if="isDepositOrSaving" class="product-detail-layout deposit-saving-layout">
                <div class="info-section">
                    <h2>상품 기본 정보</h2>
                    <div
                        v-for="(value, key) in getProductDetailsWithFilteredKeys(
                            productDetails.products[0]
                        )"
                        :key="key"
                        class="product-detail-item"
                    >
                        <p>
                            <strong>{{ getLabelForDepositOrSaving(key) }}:</strong> {{ value }}
                        </p>
                    </div>
                </div>

                <div
                    class="rate-section"
                    v-if="productDetails.rates && productDetails.rates.length > 0"
                >
                    <h2>금리 정보</h2>
                    <table class="rates-table">
                        <thead>
                            <tr>
                                <th>저축 기간 (개월)</th>
                                <th>기본 금리</th>
                                <th>최고 금리</th>
                                <th>이율 타입</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="rate in productDetails.rates"
                                :key="rate.productId + rate.saveTrm"
                            >
                                <td>{{ rate.saveTrm }}개월</td>
                                <td>{{ rate.intrRate }}%</td>
                                <td>{{ rate.intrRate2 }}%</td>
                                <td>{{ rate.intrRateTypeNm }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 채권 상세 정보 표시 -->
            <div v-else-if="isBond" class="product-detail-layout bond-layout">
                <h2>채권 정보</h2>
                <div
                    v-for="(value, key) in getProductDetailsWithFilteredKeys(productDetails)"
                    :key="key"
                    class="product-detail-item"
                >
                    <p>
                        <strong>{{ getLabelForBondOrFund(key) }}:</strong> {{ value }}
                    </p>
                </div>
            </div>

            <!-- 펀드 상세 정보 표시 -->
            <div v-else-if="isFund" class="product-detail-layout fund-layout">
                <h2>펀드 정보</h2>
                <div
                    v-for="(value, key) in getProductDetailsWithFilteredKeys(productDetails)"
                    :key="key"
                    class="product-detail-item"
                >
                    <p>
                        <strong>{{ getLabelForBondOrFund(key) }}:</strong> {{ value }}
                    </p>
                </div>
            </div>

            <!-- 상품이 없을 때 메시지 -->
            <div v-else class="no-product-message">
                <p>해당 상품을 찾을 수 없습니다.</p>
            </div>

            <v-btn class="back-button" @click="goBack">뒤로가기</v-btn>
        </div>
    </div>
</template>

<script>
import { productLabelMapping } from '@/ProductLabel.js';
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
            isDepositOrSaving: false, // 예/적금 여부
            isBond: false, // 채권 여부
            isFund: false, // 펀드 여부
        };
    },
    created() {
        const productIdParam = this.$route.params.productId;
        const productTypeParam = this.$route.query.productType;

        this.productId = productIdParam;
        this.productType = productTypeParam;

        if (!this.productId || !this.productType) {
            console.error('상품 ID 또는 상품 유형이 올바르지 않습니다.');
            return;
        }

        this.checkProductType();
        this.fetchProductDetails();
    },
    methods: {
        checkProductType() {
            if (this.productType === 'deposit' || this.productType === 'saving') {
                this.isDepositOrSaving = true;
            } else if (this.productType === 'fund') {
                this.isFund = true;
            } else if (this.productType === 'bond') {
                this.isBond = true;
            }
        },
        async fetchProductDetails() {
            this.isLoading = true;
            try {
                let data = null;

                if (this.isDepositOrSaving) {
                    if (this.productType === 'deposit') {
                        data = await getDepositProductDetail(this.productId);
                    } else if (this.productType === 'saving') {
                        data = await getSavingProductDetail(this.productId);
                    }
                } else if (this.isBond) {
                    data = await getBondProductDetail(this.productId);
                } else if (this.isFund) {
                    data = await getFundProductDetail(this.productId);
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
            const productInfo = this.isDepositOrSaving ? product.products[0] : product;
            return (
                productInfo?.finPrdtNm ||
                productInfo?.productNm ||
                productInfo?.isinCdNm ||
                productInfo?.name ||
                '상품명 없음'
            );
        },
        getLabelForDepositOrSaving(key) {
            const label = productLabelMapping.deposit[key] || productLabelMapping.saving[key];
            return label && !label.includes('삭제') ? label : null;
        },
        getLabelForBondOrFund(key) {
            const label = productLabelMapping.bond[key] || productLabelMapping.fund[key];
            return label && !label.includes('삭제') ? label : null;
        },
        getProductDetailsWithFilteredKeys(productDetails) {
            const filteredProductDetails = {};
            Object.keys(productDetails).forEach((key) => {
                const label = this.isDepositOrSaving
                    ? this.getLabelForDepositOrSaving(key)
                    : this.getLabelForBondOrFund(key);
                if (label) {
                    filteredProductDetails[key] = productDetails[key];
                }
            });
            return filteredProductDetails;
        },
    },
};
</script>

<style scoped>
.product-desc-wrapper {
    padding: 20px;
    background-color: #f0f4f8;
}

/* 통일된 스타일 */
.product-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
}

/* 공통 스타일 */
.product-desc-container {
    max-width: 1200px;
    margin: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loading-message,
.no-product-message {
    font-size: 18px;
    color: #999;
    text-align: center;
}

.product-detail-layout {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    flex-wrap: wrap;
}

.product-detail-item p {
    font-size: 16px;
    margin-bottom: 8px;
    color: #444;
}

/* 예/적금 스타일 */
.deposit-saving-layout .info-section,
.deposit-saving-layout .rate-section {
    width: 48%;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.deposit-saving-layout .info-section h2,
.deposit-saving-layout .rate-section h2 {
    font-size: 20px;
    margin-bottom: 15px;
    color: #3961e4;
}

.rates-table {
    width: 100%;
    border-collapse: collapse;
}

.rates-table th,
.rates-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    color: #333;
}

.rates-table th {
    background-color: #f5f5f5;
    font-weight: bold;
}

/* 채권 스타일 */
.bond-layout {
    display: flex;
    flex-direction: column;
    background-color: #e0f7fa;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #cce5ff;
}

.bond-layout h2 {
    font-size: 22px;
    color: #005662;
}

.bond-layout .product-detail-item p {
    font-size: 17px;
    color: #004d40;
    margin-bottom: 10px;
}

/* 펀드 스타일 */
.fund-layout {
    display: flex;
    flex-direction: column;
    background-color: #e0f7fa;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #cce5ff;
}

.fund-layout h2 {
    font-size: 22px;
    color: #005662;
}

.fund-layout .product-detail-item p {
    font-size: 17px;
    color: #004d40;
    margin-bottom: 10px;
}

/* 뒤로가기 버튼 */
.v-btn.back-button {
    margin-top: 30px;
    background-color: #3961e4;
    color: white;
    display: block;
    width: 100%;
    text-align: center;
}
</style>
