import { fetchCartList, getCartList, postCartItem, deleteCartItem } from '@/api/cartApi.js';

const cartModule = {
    namespaced: true,
    state: () => ({
        cartItems: [],
        cartItemsLoaded: false,
        newCartItem: null,
    }),

    actions: {
        async fetchCartItems({ commit, state }) {
            if (!state.cartItems) {
                try {
                    const data = await fetchCartList();
                    commit('setCartItems', data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        },

        async getCartItems({ commit }) {
            try {
                const data = await getCartList();
                commit('setCartItems', data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        },

        async addCartItem({ commit }, cartItem) {
            try {
                const data = await postCartItem(cartItem);
                commit('setNewCartItem', data);
            } catch (error) {
                console.error('Error adding cart item:', error);
            }
        },

        async removeCartItem({ commit }, productId) {
            try {
                await deleteCartItem(productId);
                commit('removeCartItem', productId);
            } catch (error) {
                console.error('Error removing cart item:', error);
            }
        },
    },

    getters: {
        cartItems: (state) => state.cartItems,
        newCartItem: (state) => state.newCartItem,
        isCartItemsLoaded: (state) => state.cartItemsLoaded,
    },

    mutations: {
        setCartItems(state, cartItems) {
            state.cartItems = cartItems;
            state.cartItemsLoaded = true;
        },

        setNewCartItem(state, newCartItem) {
            state.newCartItem = newCartItem;
            state.cartItems.push(newCartItem); // 새로운 장바구니 아이템을 리스트에 추가
        },

        removeCartItem(state, productId) {
            state.cartItems = state.cartItems.filter(
                (item) => item.productId !== productId
            );
        },
    },
};

export default cartModule;
