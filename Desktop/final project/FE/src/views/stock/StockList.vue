<template>
    <div class="stock-list-container">
        <div class="table-container">
            <table v-if="stocks.length > 0" class="table">
                <thead>
                    <tr>
                        <th>주식 코드</th>
                        <th>주식명</th>
                        <th>시장 구분</th>
                        <th>종가</th>
                        <th>전일비</th>
                        <th>등락률</th>
                        <th>시가</th>
                        <th>최고가</th>
                        <th>최저가</th>
                        <th>거래량</th>
                        <th>거래대금</th>
                        <th>상장주식수</th>
                        <th>시가총액</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="stock in paginatedStocks" :key="stock.stockCode">
                        <td>{{ stock.stockCode }}</td>
                        <td>{{ stock.stockName }}</td>
                        <td>{{ stock.mrktCtg }}</td>
                        <td>{{ stock.clpr }}</td>
                        <!-- 전일비: 값에 따라 색상 변경 -->
                        <td :style="getColorStyle(stock.vs)">{{ stock.vs }}</td>
                        <!-- 등락률: 값에 따라 색상 변경 -->
                        <td :style="getColorStyle(stock.fltRt)">{{ stock.fltRt }}%</td>
                        <td>{{ stock.mkp }}</td>
                        <td>{{ stock.hipr }}</td>
                        <td>{{ stock.lopr }}</td>
                        <td>{{ stock.trqu }}</td>
                        <td>{{ stock.trPrc }}</td>
                        <td>{{ stock.istgStCnt }}</td>
                        <td>{{ stock.mrktTotAmt }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else>주식 데이터가 없습니다.</p>
        </div>

        <!-- 페이지 네비게이션 -->
        <div v-if="totalPages > 1" class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
                이전
            </button>
            <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
                다음
            </button>
        </div>

        <!-- 페이지 입력 박스 -->
        <div class="page-input-container">
            <input
                v-model.number="inputPage"
                type="number"
                :min="1"
                :max="totalPages"
                class="page-input"
                @keyup.enter="goToPage"
                placeholder="이동할 페이지 입력"
            />
            <button @click="goToPage" class="go-btn">이동</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stocks: [],
            currentPage: 1,
            pageSize: 6,
            totalPages: 0,
            inputPage: '', // 입력된 페이지 번호
        };
    },
    computed: {
        paginatedStocks() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.stocks.slice(start, end);
        },
    },
    methods: {
        fetchStocks() {
            fetch('/api/stock/all')
                .then((response) => response.json())
                .then((data) => {
                    this.stocks = data;
                    this.totalPages = Math.ceil(this.stocks.length / this.pageSize);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        goToPage() {
            // 페이지 입력 값이 유효한지 확인
            if (this.inputPage >= 1 && this.inputPage <= this.totalPages) {
                this.currentPage = this.inputPage; // 입력한 페이지로 이동
            } else {
                alert(`1에서 ${this.totalPages} 사이의 유효한 페이지 번호를 입력하세요.`);
            }
        },
        // 값에 따라 색상을 반환하는 메서드
        getColorStyle(value) {
            if (value > 0) {
                return { color: 'red' }; // 양수일 때 빨간색
            } else if (value < 0) {
                return { color: 'blue' }; // 음수일 때 파란색
            } else {
                return { color: 'black' }; // 0일 때 검정색
            }
        },
    },
    created() {
        this.fetchStocks();
    },
};
</script>

<style scoped>
.stock-list-container {
    width: 100%;
    padding: 20px;
}

.table-container {
    max-height: 500px; /* 고정된 높이를 설정 */
    /* overflow-y: auto; 
    overflow-x: hidden; */
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

.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination-btn {
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    font-size: 14px;
}

.pagination-btn:hover {
    background-color: #31b0d5;
    color: white;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* 페이지 입력 컨테이너 */
.page-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.page-input {
    width: 100px;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
}

.go-btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.go-btn:hover {
    background-color: #0056b3;
}
</style>
