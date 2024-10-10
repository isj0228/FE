import axios from 'axios';

const personaApi = axios.create({
  baseURL: 'http://localhost:8080/api/personas',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 전체 페르소나 리스트를 가져오는 함수
export async function fetchPersonas() {
  try {
    const response = await personaApi.get('/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
}
