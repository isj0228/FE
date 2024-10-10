<template>
  <div class="Cart-container">
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="cartItems.length === 0" class="empty-cart">장바구니가 비어 있습니다.</div>
    <v-card v-else>
      <v-card-title class="d-flex justify-space-between align-center">
        <h2 class="text-h5">장바구니 목록</h2>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="header-row">
          <v-col class="text-h6">상품 종류</v-col>
          <v-col class="text-h6">제공자</v-col>
          <v-col class="text-h6">상품 이름</v-col>
          <v-col class="text-h6">기대 수익률</v-col>
          <v-col class="text-h6"></v-col>
        </v-row>
        <v-divider></v-divider>

        <div v-for="item in cartItems" :key="item.cartID" class="cart-item">
          <v-card elevation="2" class="cart-item-card mb-2">
            <v-card-text>
              <v-row>
                <v-col>
                  <span>
                    <span v-if="item.productType === 'S'">
                      {{ item.rsrvType === 'S' ? '적금' : '예금' }}
                    </span>
                    <span v-else-if="item.productType === 'B'">채권</span>
                    <span v-else-if="item.productType === 'F'">펀드</span>
                    <span v-else>기타</span>
                  </span>
                </v-col>
                <v-col>{{ item.provider }}</v-col>
                <v-col>{{ item.productName }}</v-col>
                <v-col>{{ item.expectedReturn ? `${item.expectedReturn}%` : '-' }}</v-col>
                <v-col>
                  <v-btn class="cart-trashcanBtn" @click="removeFromCart(item.cartID)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useCartStore } from '@/store/modules/cart';

export default {
  name: 'Cart',
  setup() {
    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.cartItems);
    const loading = ref(true);
    const error = ref(null);

    // Fetch cart items whenever the component is mounted
    onMounted(async () => {
      loading.value = true;
      await loadCartItems();
      loading.value = false;
    });

    // Load cart items with fallback to localStorage if needed
    const loadCartItems = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCart) {
          cartStore.cartItems = storedCart; // Set to cartStore
        } else {
          await cartStore.getCartItems();
          localStorage.setItem('cartItems', JSON.stringify(cartItems.value)); // Save to localStorage
        }
        console.log('Loaded cart items:', cartItems.value);
      } catch (err) {
        error.value = "Error loading cart items: " + err.message;
        console.error('Error loading cart items:', err);
        loading.value = false;
      }
    };

    // Remove an item from the cart and update localStorage
    const removeFromCart = async (cartID) => {
      if (!cartID) {
        console.error("cartID is undefined or null. Cannot remove item.");
        return;
      }

      try {
        console.log(`Attempting to remove item with cartID: ${cartID}`);
        await cartStore.removeCartItem(cartID); // Update store
        console.log('Item removed successfully');
        
        // Manually update local storage after deletion
        const updatedCartItems = cartItems.value.filter(item => item.cartID !== cartID);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Sync localStorage
        await loadCartItems(); // Reload items
      } catch (err) {
        console.error('Error removing item:', err);
        error.value = "Failed to remove item. Please try again.";
        loading.value = false;
      }
    };

    return {
      cartItems,
      removeFromCart,
      loading,
      error,
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

.error-message {
  text-align: center;
  color: red;
  font-weight: bold;
}

.header-row {
  font-weight: bold;
  margin-bottom: 10px;
}

.cart-item {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  margin-bottom: 15px;
}

.cart-item-card {
  padding: 15px;
  transition: box-shadow 0.2s;
}

.cart-item-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cart-trashcanBtn {
  flex: 0 0 auto;
  margin-left: auto;
}
</style>
