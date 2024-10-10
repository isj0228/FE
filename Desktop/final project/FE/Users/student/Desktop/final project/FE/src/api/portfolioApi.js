import instance from '@/api/index.js';

// const portfolioApi = axios.create({
//     baseURL: 'http://localhost:8080/api/portfolio', // API 엔드 포인트
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

export async function fetchPortfolioList() {
  try {
    const response = await instance.get('/portfolio/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio list:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}

export async function getPortfolioDetail(portfolioId) {
  try {
    const response = await instance.get(`/portfolio/details/${portfolioId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio detail:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}

export async function postPortfolio(portfolioReqDto) {
  try {
    const response = await instance.post('/portfolio', portfolioReqDto);
    return response.data;
  } catch (error) {
    console.error('Error posting portfolio:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}

export async function deletePortfolio(portfolioId) {
  try {
    await instance.delete(`/portfolio/${portfolioId}`);
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}
