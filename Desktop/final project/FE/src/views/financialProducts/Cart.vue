<template>
    <div class="Cart-container">
        <div v-if="cart.length === 0" class="empty-cart">장바구니가 비어 있습니다.</div>
        <v-card v-else>
            <v-card-title>
                <h2>장바구니 목록</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <!-- Combined list of items -->
                <div v-for="item in paginatedCart" :key="item.id" class="cart-item">
                    <div class="cart-row">
                        <h3 class="cart-itemId">{{ item.id }}</h3>
                        <!-- 장바구니 상품명 클릭시 해당 상품 상세로 이동 -->
                        <h3
                            class="cart-itemName"
                            @click="gotoProductDesc(item.ProductType, item.id)"
                        >
                            {{ item.name }}
                        </h3>
                        <div class="item-details">
                            <p v-if="item.ProductType === 'a' || item.ProductType === 'b'">
                                기본금리: {{ item.baseRate }} / 최고금리: {{ item.maxRate }}
                            </p>
                            <p v-if="item.ProductType === 'c'">
                                {{ item.fundType }} - 수익률: {{ item.yield }}
                            </p>
                            <p v-if="item.ProductType === 'd'">
                                기본금리: {{ item.baseRate }} / 최고금리: {{ item.maxRate }}
                            </p>
                        </div>
                        <v-btn class="cart-trashcanBtn" @click="removeFromCart(item)" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </div>
                    <v-divider></v-divider>
                </div>

                <!-- Pagination -->
                <v-pagination
                    v-model="currentPage"
                    :length="totalPages"
                    @input="updatePagination"
                ></v-pagination>
            </v-card-text>

            <div class="Cart-Btn-Set">
                <v-btn class="cart-Btn-Gotocompare" @click="goToCompare">상품 비교해보기</v-btn>
                <v-btn class="cart-Btn-GotoPortfolio" @click="goToMakePortfolio"
                    >포트폴리오 구성하기</v-btn
                >
            </div>
        </v-card>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
    name: 'Cart',
    setup() {
        const router = useRouter(); // Initialize the router
        const cart = ref([
            {
                id: 1,
                ProductType: 'a',
                bank: '우리은행',
                name: '정기예금 A',
                baseRate: '2.5%',
                maxRate: '3.0%',
            },
            {
                id: 2,
                ProductType: 'b',
                bank: '신한은행',
                name: '정기적금 B',
                baseRate: '3.0%',
                maxRate: '3.5%',
            },
            {
                id: 3,
                ProductType: 'c',
                fundType: '주식형',
                name: '펀드 C',
                yield: '5.0%',
            },
            {
                id: 5,
                ProductType: 'd',
                bank: 'NH농협은행',
                name: '채권 E',
                baseRate: '6.0%',
                maxRate: '7.0%',
            },
        ]);
        const selectedItems = ref([]);
        const itemsPerPage = 5; // Set the number of items per page
        const currentPage = ref(1);

        const totalPages = computed(() => Math.ceil(cart.value.length / itemsPerPage));

        const paginatedCart = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            return cart.value.slice(start, start + itemsPerPage);
        });

        const removeFromCart = (item) => {
            const index = cart.value.indexOf(item);
            if (index > -1) {
                cart.value.splice(index, 1);
            }
        };

        const updatePagination = (page) => {
            currentPage.value = page;
        };

        const gotoProductDesc = (productType, id) => {
            // 상품 상세 페이지로 이동
            router.push({
                name: 'ProductDetail', // 라우터 이름 사용
                params: { id: id },
                query: { productType: productType },
            });
        };

        const goToCompare = () => {
            router.push('/product-comparison');
        };

        const goToMakePortfolio = () => {
            router.push('/make-portfolio');
        };

        return {
            cart,
            removeFromCart,
            selectedItems,
            currentPage,
            totalPages,
            paginatedCart,
            updatePagination,
            gotoProductDesc,
            goToCompare,
            goToMakePortfolio,
        };
    },
};
</script>

<style scoped>
.Cart-container {
    padding: 20px;
}

.empty-cart {
    text-align: center;
    margin: 20px 0;
    color: #ff5722;
    font-weight: bold;
}

.cart-item {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
}

.cart-row {
    display: flex;
    justify-content: space-between; /* Spread items across the width */
    align-items: center;
    width: 100%;
}

.cart-itemId {
    flex: 0 0 auto; /* Fixed size for ID */
    width: 60px; /* Set width for ID */
    text-align: left; /* Align ID to the left */
}

.cart-itemName {
    flex: 1; /* Allow item name to take up available space */
    text-align: left; /* Align name to the left */
}

.cart-itemName:hover {
    cursor: pointer;
    text-decoration: underline;
    color: blue;
}

.item-details {
    flex: 2; /* Allow details to take more space */
    margin-left: 20px; /* Adjust spacing between name and details */
}

.cart-trashcanBtn {
    flex: 0 0 auto; /* Fixed size for delete button */
    margin-left: auto; /* Push the button to the right */
}

.cart-checkBox {
    display: flex;
    align-items: center;
}

.cart-removeBtn {
    width: 100px;
    height: 68px;
    background-color: #17de74;
    color: azure;
}

/* Pagination styling can go here if needed */
</style>
