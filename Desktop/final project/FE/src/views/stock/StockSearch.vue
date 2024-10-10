<template>
    <div class="stock-search-container">
        <!-- 검색 입력 폼 -->
        <div class="search-box">
            <input
                type="text"
                v-model="searchTerm"
                placeholder="주식명 또는 주식코드를 입력하시오"
                @keydown.enter="searchStock"
            />
            <button class="search-btn" @click="searchStock">검색</button>
            <button class="clear-btn" @click="clearSearch">
                {{ isSearched ? '닫기' : '지우기' }}
            </button>
        </div>

        <!-- 주식 결과 테이블 -->
        <div class="table-container">
            <table v-if="stocks.length > 0" class="table">
                <thead>
                    <tr>
                        <th>주식 코드</th>
                        <th>주식명</th>
                        <th>종가</th>
                        <th>전일비</th>
                        <th>등락률</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="stock in stocks" :key="stock.stockCode">
                        <td>{{ stock.stockCode }}</td>
                        <td>{{ stock.stockName }}</td>
                        <td>{{ stock.clpr }}</td>
                        <td :style="getColorStyle(stock.vs)">{{ stock.vs }}</td>
                        <td :style="getColorStyle(stock.fltRt)">{{ stock.fltRt }}%</td>
                    </tr>
                </tbody>
            </table>

            <p v-else-if="isSearchAttempted">검색 결과가 없습니다.</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: '', // 검색어 입력
            stocks: [], // 주식 데이터를 저장할 배열
            isSearchAttempted: false, // 검색 시도 여부를 관리하는 변수
            isSearched: false,
        };
    },
    methods: {
        // 주식 검색 메서드
        searchStock() {
            if (!this.searchTerm) {
                alert('검색어를 입력하세요!');
                return;
            }

            // API에 요청을 보내 주식 데이터를 가져옴
            fetch(`/api/stock/searchStock?searchTerm=${encodeURIComponent(this.searchTerm)}`)
                .then((response) => response.json())
                .then((data) => {
                    this.stocks = data; // 검색된 주식 데이터를 배열에 저장
                    this.isSearched = true;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },

        // 검색 초기화 메서드
        clearSearch() {
            this.searchTerm = ''; // 검색어 초기화
            this.stocks = []; // 검색 결과 초기화
            this.isSearched = false; // 검색 시도 상태 리셋
        },

        // 양수, 음수, 0에 따라 색상을 다르게 적용하는 메서드
        getColorStyle(value) {
            if (value > 0) {
                return { color: 'red' }; // 양수인 경우 빨간색
            } else if (value < 0) {
                return { color: 'blue' }; // 음수인 경우 파란색
            } else {
                return { color: 'black' }; // 0인 경우 검정색
            }
        },
    },
};
</script>

<style scoped>
.stock-search-container {
    width: 100%;
    padding: 20px;
}

.table-container {
    max-height: 500px; /* 고정된 높이를 설정 */
    overflow-y: auto; /* 세로 스크롤 */
    overflow-x: hidden; /* 가로 스크롤 숨김 */
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table th,
.table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.table th {
    font-weight: bold;
    color: #333;
}

.table tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
}

.search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.search-box input[type='text'] {
    width: 60%; /* 버튼과 나란히 배치되도록 너비 설정 */
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    margin-right: 10px; /* 버튼과의 간격 */
}

.search-btn {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 5px;
}
.clear-btn {
    padding: 10px 15px;
    margin-left: 10px;
    background-color: #f0f0f0;
    color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search-btn:hover {
    background-color: #0056b3;
}

.clear-btn:hover {
    background-color: #ddd;
}

.search-box input[type='text']:focus {
    border-color: #5bc0de;
    outline: none;
}
</style>
