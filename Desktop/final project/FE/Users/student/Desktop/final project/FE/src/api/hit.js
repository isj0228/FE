import axios from 'axios';
import { useCookies } from 'vue3-cookies';

// 쿠키에서 JWT 토큰을 가져오기 위한 설정
const { cookies } = useCookies();

// 조회수 증가 API 엔드 포인트 생성
const hitApi = axios.create({
    baseURL: 'http://localhost:8080/api/hit',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Axios 요청 인터셉터 cookies에서 jwt 토큰 포함
hitApi.interceptors.request.use(
    (config) => {
        // Access Token과 Refresh Token 가져오기
        const accessToken = cookies.get('Authorization');
        const refreshToken = cookies.get('Refresh-Token');

        if (accessToken) {
            // Access Token이 있는 경우
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            console.log('Access Token: ', config.headers.Authorization);
        } else if (refreshToken) {
            // Access Token이 없고, Refresh Token이 있는 경우
            config.headers['Refresh-Token'] = `Bearer ${refreshToken}`;
            console.log('Refresh Token: ', config.headers['Refresh-Token']);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios 응답 인터셉터: 만약 401 오류가 발생하면 Refresh-Token을 이용해 Access-Token을 재발급 받는 로직을 추가할 수 있습니다.
hitApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 401 Unauthorized 에러가 발생할 경우
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Refresh-Token으로 Access-Token 재발급 API 호출
            const refreshToken = cookies.get('Refresh-Token');
            if (refreshToken) {
                try {
                    // 새 Access-Token을 발급받는 요청을 수행
                    const response = await axios.post('http://localhost:8080/api/auth/refresh-token', null, {
                        headers: {
                            'Refresh-Token': `Bearer ${refreshToken}`,
                        },
                    });

                    // 새로 발급받은 Access-Token을 쿠키에 저장
                    cookies.set('Authorization', response.data.accessToken, {
                        path: '/',
                        secure: true, // https일 때만 작동
                        sameSite: 'Strict', // 쿠키 공유 방지
                    });

                    // 이전 요청에 새 Access-Token을 적용해서 다시 요청
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                    return hitApi(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

// 연령대에 따른 조회수 증가 API
export async function increaseAgeGroupProductHit(productId) {
    try {
        const response = await hitApi.post('/ageGroup/increase', {
            productId
        });
        
        return response.data;
    } catch (error) {
        console.error('Error increasing product hit by age group', error);
        throw error; // 오류발생 시 오류 던짐
    }
}

// 투자성향에 따른 조회수 증가 API
export async function increasePreferenceProductHit(productId) {
    try {
        const response = await hitApi.post('/preference/increase', {
            productId
        });

        return response.data;
    } catch (error) {
        console.error('Error increasing product hit by preference:', error);
        throw error; // 오류 발생 시 오류를 던짐
    }
}

// 연령대별 상위 3개 상품 조회 API
export async function getTopProductsByAgeGroup() {
    try {
        const response = await hitApi.get('/ageGroup/top-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching top products by age group:', error);
        throw error; // 오류 발생 시 오류를 던짐
    }
}

// 투자 성향별 상위 3개 상품 조회 API
export async function getTopProductsByPreference() {
    try {
        const response = await hitApi.get('/preference/top-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching top products by preference:', error);
        throw error; // 오류 발생 시 오류를 던짐
    }
}