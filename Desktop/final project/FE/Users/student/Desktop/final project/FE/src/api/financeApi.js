// src/api/financeApi.js

import axios from 'axios';

const bondApi = axios.create({
    baseURL: 'http://localhost:8080/api/bond', // 채권 API 엔드 포인트
    headers: {
        'Content-Type': 'application/json',
    },
});

const savingApi = axios.create({
    baseURL: 'http://localhost:8080/api/saving-products', // 예/적금 API 엔드 포인트
    headers: {
        'Content-Type': 'application/json',
    },
});

const fundApi = axios.create({
    baseURL: 'http://localhost:8080/api/fund-products', // 펀드 API 엔드 포인트
    headers: {
        'Content-Type': 'application/json',
    },
});

// 채권 상품 조회 API with pagination
export async function fetchBondProducts(page = 1, pageSize = 10) {
    try {
        const response = await bondApi.get(`/list`, {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching bond products:', error);
        throw error;
    }
}

// 채권 상품 상세 조회 API
export async function getBondProductDetail(productId) {
    try {
        const response = await bondApi.get(`/list/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bond product detail:', error);
        throw error;
    }
}

// 예금 상품 조회 API with pagination
export async function fetchDepositProducts(page = 1, pageSize = 10) {
    try {
        const response = await savingApi.get(`/deposit`, {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching deposit products:', error);
        throw error;
    }
}

// 예금 상품 상세 조회 API with path parameter
export async function getDepositProductDetail(productId) {
    try {
        // 엔드포인트를 수정: /list/{productId} -> /deposit/{productId}
        const response = await savingApi.get(`/list/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching deposit product detail:', error);
        throw error;
    }
}

// 적금 상품 조회 API with pagination
export async function fetchSavingProducts(page = 1, pageSize = 10) {
    try {
        const response = await savingApi.get(`/saving`, {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching saving products:', error);
        throw error;
    }
}

// 적금 상품 상세 조회 API with path parameter
export async function getSavingProductDetail(productId) {
    try {
        const response = await savingApi.get(`/list/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching saving product detail:', error);
        throw error;
    }
}

// 펀드 상품 조회 API with pagination
export async function fetchFundProducts(page = 1, pageSize = 10) {
    try {
        const response = await fundApi.get(`/list`, {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching fund products:', error);
        throw error;
    }
}

// 펀드 상품 상세 조회 API
export async function getFundProductDetail(productId) {
    try {
        const response = await fundApi.get(`/list/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching fund product detail:', error);
        throw error;
    }
}

// 펀드 상품 검색 API
export async function searchFundProduct(keyword) {
    try {
        const response = await fundApi.get(`/search`, {
            params: { keyword },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching fund product:', error);
        throw error;
    }
}

// 채권 상품 검색 API
export async function searchBondProduct(keyword) {
    try {
        const response = await bondApi.get(`/search`, {
            params: { keyword },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching bond product:', error);
        throw error;
    }
}

// 예금 상품 검색 API
export async function searchDepositProduct(keyword) {
    try {
        const response = await savingApi.get(`/depositSearch`, {
            params: { keyword },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching deposit product:', error);
        throw error;
    }
}

// 적금 상품 검색 API
export async function searchSavingProduct(keyword) {
    try {
        const response = await savingApi.get(`/savingSearch`, {
            params: { keyword },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching saving product:', error);
        throw error;
    }
}
