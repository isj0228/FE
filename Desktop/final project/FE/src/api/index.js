import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 쿠키에서 Refresh-Token 추출
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = decodeURIComponent(value); // URL 디코딩
      return acc;
    }, {});

    const accessToken = cookies['Authorization'];
    const refreshToken = cookies['Refresh-Token']; // 쿠키에서 'Refresh-Token' 가져오기

    if (accessToken) {
      // 토큰이 있는 경우
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      console.log('access', config.headers.Authorization);
    } else if (refreshToken) {
      config.headers['Refresh-Token'] = `Bearer ${refreshToken}`;
      console.log('refresh', config.headers['Refresh-Token']);
    }

    config.withCredentials = true;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    }
    if (response.status === 404) {
      return Promise.reject('404: 페이지 없음 ' + response.request);
    }
    return response;
  }
  // 로그아웃이나 admin 기능 추가시 설정 필요!!!
  // async (error) => {
  //     if (error.response?.status === 401) {
  //         const { logout } = useAuthStore();
  //         logout();
  //         router.push('/auth/login?error=loing_required');
  //         return Promise.reject({ error: '로그인이 필요한 서비스입니다.' });
  //         // 로그인 필요
  //     } else if (error.response?.status === 403) {
  //         return Promise.reject({ error: '권한이 부족합니다.' });
  //     }
  //     return Promise.reject(error);
  // }
);

export default instance;
