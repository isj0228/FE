import instance from "@/api/index.js";

export async function fetchCartList() {
    try {
        const response = await instance.get('/cart/init');
        return response.data;
    } catch (error) {
        console.error('Error fetching cart list:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

export async function getCartList() {
    try {
        const response = await instance.get(`/cart/list`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching cart detail:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

export async function postCartItem(cartItem) {
    try {
        const response = await instance.post('/cart/items', cartItem);
        return response.data;
    } catch (error) {
        console.error('Error posting cart:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

export async function deleteCartItem(productId) {
    try {
        await instance.delete(`/cart/items/${productId}`);
    } catch (error) {
        console.error('Error deleting cart:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}