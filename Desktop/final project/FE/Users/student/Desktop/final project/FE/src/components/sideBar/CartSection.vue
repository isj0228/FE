<template>
    <li class="menu2" @click="toggleDropdown(2)">
        <a href="javascript:void(0)" class="sidebar-link">
            <i class="fas fa-shopping-cart icon grey-icon"></i>
            <span class="menu-text">장바구니</span>
            <span v-if="cart.length > 0" class="item-count">{{ cart.length }}</span>
        </a>
        <div
            v-if="activeDropdown === 2"
            :class="['dropdown-content', { active: activeDropdown === 2 }]"
        >
            <div class="cart-dropdown">
                <h3 class="section-title">장바구니</h3>
                <div v-if="cart.length === 0" class="empty-cart">장바구니가 비어 있습니다.</div>
                <table v-else class="cart-table">
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in paginatedCart" :key="index">
                            <td class="item-name">{{ item.name }}</td>
                            <td class="item-price">{{ item.price }}원</td>
                            <td class="item-quantity">{{ item.quantity }}</td>
                            <td>
                                <button class="cart-trashcanBtn" @click="removeFromCart(item)">
                                    삭제
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <v-pagination
                    v-model="currentPage"
                    :length="totalPages"
                    @input="updatePagination"
                ></v-pagination>
                <div class="action-buttons">
                    <button @click="goToCompare">상품 비교해보기</button>
                    <button @click="goToMakePortfolio">포트폴리오 구성하기</button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: ['activeDropdown', 'cartItems'],
    setup(props, { emit }) {
        const cart = ref([
            { id: 1, name: '상품 A', price: 5000, quantity: 1 },
            { id: 2, name: '상품 B', price: 3000, quantity: 2 },
        ]);

        const currentPage = ref(1);
        const itemsPerPage = 5;

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

        const toggleDropdown = (menuNumber) => {
            emit('toggleDropdown', menuNumber);
        };

        const router = useRouter();

        const goToCompare = () => {
            router.push('/product-comparison');
        };

        const goToMakePortfolio = () => {
            router.push('/make-portfolio');
        };

        return {
            cart,
            currentPage,
            paginatedCart,
            totalPages,
            removeFromCart,
            updatePagination,
            toggleDropdown,
            goToCompare,
            goToMakePortfolio,
        };
    },
};
</script>

<style scoped>
.sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #a9a9a9; /* Lighter text color for default */
    padding: 15px;
    text-decoration: none;
    background-color: transparent;
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%; /* Full width within the sidebar */
    height: 5vh; /* Maintain the height ratio for each button */
    position: relative; /* Position for item count */
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowed text */
    text-overflow: ellipsis; /* Add ellipsis for overflowed text */
}

.sidebar-link:hover {
    background-color: #d0d0d0; /* Grey background on hover */
    color: grey; /* Grey text color on hover */
}

.icon {
    position: relative;
    font-size: 24px; /* Icon size */
    color: #a9a9a9; /* Default lighter grey */
}

.sidebar-link:hover .icon {
    color: grey; /* Darker grey on hover */
}

.menu-text {
    font-size: 0.8rem;
    color: #a9a9a9; /* Lighter grey for default text */
    margin-top: 5px; /* Space between icon and text */
}

.sidebar-link:hover .menu-text {
    color: grey; /* Darker grey on hover */
}

.item-count {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.8rem;
}
</style>

