import instance from '@/api/index.js';

export default {
  async fetchPortfolioList() {
    try {
      const response = await instance.get(`portfolio/list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio list:', error);
      throw error; // 오류 발생 시 오류를 던져줌
    }
  },

  async getPortfolioDetail(portfolioId) {
    try {
      const response = await instance.get(`/portfolio/details/${portfolioId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio detail:', error);
      throw error; // 오류 발생 시 오류를 던져줌
    }
  },

  async postPortfolio(portfolioReqDto) {
    try {
      const response = await instance.post('/portfolio', portfolioReqDto);
      return response.data;
    } catch (error) {
      console.error('Error posting portfolio:', error);
      throw error; // 오류 발생 시 오류를 던져줌
    }
  },

  async deletePortfolio(portfolioId) {
    try {
      console.log(portfolioId);
      await instance.delete(`portfolio/${portfolioId}`);
      return;
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      throw error; // 오류 발생 시 오류를 던져줌
    }
  },
};
