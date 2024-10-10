import instance from "@/api/index.js";

export async function fetchRecentViewList() {
    try {
        const response = await instance.get('/recentView/list');
        return response.data;
    } catch (error) {
        console.error('Error fetching recentView list:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

export async function postRecentViewItem(recentViewedItem) {
    try {
        const response = await instance.post('/recentView/items', recentViewedItem);
        return response.data;
    } catch (error) {
        console.error('Error posting recentViewedItem:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

export async function resetRecentViewList() {
    try {
        await instance.delete(`/recentView/reset`);
    } catch (error) {
        console.error('Error deleting recentView list:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}