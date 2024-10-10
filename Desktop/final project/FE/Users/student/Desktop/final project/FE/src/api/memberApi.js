import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:8080/api/member', // 사용자 API 엔드포인트
  headers: {
    'Content-Type': 'application/json',
  },
});

// 사용자 등록 API
export async function registerUser(userData) {
  try {
    const response = await userApi.post('/register', userData);
    return response.data; // 등록된 사용자 정보 반환
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}

// 사용자 로그인 API
export async function loginUser(credentials) {
  try {
    const response = await userApi.post('/login', credentials);

    // Check if response structure includes the necessary data
    if (response && response.data && response.data.responseData) {
      const userData = response.data.responseData.data; // User data if available

      // If the authorization token is expected here, access it accordingly
      const token = userData ? userData.authorization : null; // Adjust based on actual structure

      if (token) {
        localStorage.setItem('authToken', token); // Store token if available
      } else {
        console.error('Authorization token not found in response');
      }

      return response.data; // Return full data for further use
    } else {
      console.error('Unexpected response structure:', response);
      throw new Error('No data received from API');
    }
  } catch (error) {
    console.error('Error logging in user:', error.response || error.message); // Log error details
    throw error; // Maintain error throwing for further handling
  }
}

// 비밀번호 변경 API
export async function updatePassword(userId, newPassword) {
    try {
        const response = await userApi.put(`/password/update`, { userId, newPassword });
        return response.data; // Return response data upon successful password update
    } catch (error) {
        console.error('Error updating password:', error);
        throw error; // Throw error for further handling
    }
}
