<template>
    <li class="menu1" @click="toggleDropdown(1)">
        <a href="javascript:void(0)" class="sidebar-link">
            <i class="fas fa-briefcase icon"></i>
            <span v-if="portfolios && portfolios.length > 0" class="item-count">{{
                portfolios.length
            }}</span>
        </a>
        <div
            v-if="activeDropdown === 1"
            :class="['dropdown-content', { active: activeDropdown === 1 }]"
        >
            <div class="portfolio-dropdown">
                <h3 class="section-title">나의 포트폴리오</h3>
                <table class="portfolio-table">
                    <thead>
                        <tr>
                            <th>포트폴리오 명</th>
                            <th>기대수익율</th>
                            <th>위험도</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(portfolio, index) in portfolios" :key="index">
                            <td class="portfolio-name">{{ portfolio.name }}</td>
                            <td
                                :class="{
                                    positive: portfolio.returns > 0,
                                    negative: portfolio.returns < 0,
                                }"
                            >
                                {{ portfolio.returns }}%
                            </td>
                            <td class="risk-level">{{ portfolio.risk }}%</td>
                        </tr>
                    </tbody>
                </table>

                <div class="action-buttons">
                    <button @click="goToCreatePortfolio">포트폴리오 구성하기</button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        activeDropdown: {
            type: Number,
            default: null,
        },
        portfolios: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        toggleDropdown(menuNumber) {
            this.$emit('toggleDropdown', menuNumber);
        },
        goToCreatePortfolio() {
            this.$emit('goToCreatePortfolio');
        },
    },
};
</script>

<style scoped>
.sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 15px;
    text-decoration: none;
    background-color: #575757;
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%; /* Full width within the sidebar */
    height: 5vh; /* Maintain the height ratio for each button */
    position: relative; /* Position for item count */
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowed text */
    text-overflow: ellipsis; /* Add ellipsis for overflowed text */
}

.sidebar-link:hover {
    background-color: #645f5f;
}

.dropdown-content {
    position: absolute;
    left: -300px;
    top: 0;
    background-color: #f8f8f8; /* Changed to a lighter color for contrast */
    color: #333; /* Darker text for better readability */
    padding: 10px;
    width: 300px;
    height: auto; /* Auto height for dynamic content */
    border-radius: 5px;
    overflow-y: auto;
    z-index: 5555;
    transform: translateX(-100%);
    transition: transform 0.5s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added shadow for depth */
}

.dropdown-content.active {
    transform: translateX(0);
}

.portfolio-dropdown {
    padding: 20px;
}

.section-title {
    font-size: 1.4rem; /* Slightly larger for emphasis */
    margin-bottom: 15px; /* Adjusted margin for better spacing */
    color: #2d6a4f;
    border-bottom: 2px solid #2d6a4f; /* Added underline for separation */
    padding-bottom: 10px; /* Padding for spacing */
}

.portfolio-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px; /* Space above the table */
}

.portfolio-table th,
.portfolio-table td {
    padding: 12px; /* Increased padding for readability */
    border-bottom: 1px solid #ddd;
    font-size: 0.9rem;
    text-align: left;
}

.portfolio-table th {
    font-weight: bold;
    color: #2d6a4f;
}

.portfolio-name {
    color: #2d6a4f;
}

.portfolio-table td.positive {
    color: red; /* Positive return color */
}

.portfolio-table td.negative {
    color: blue; /* Negative return color */
}

.risk-level {
    color: #ffcc00; /* Risk level color */
}

.action-buttons {
    display: flex;
    justify-content: space-between; /* Align buttons on both sides */
    margin-top: 20px;
}

.action-buttons button {
    background-color: #2d6a4f;
    color: white;
    border: none;
    padding: 10px 15px; /* Adjusted padding for smaller buttons */
    border-radius: 5px;
    cursor: pointer;
    width: 48%; /* Set button width to 48% for spacing */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.action-buttons button:hover {
    background-color: #1b4633;
}

.item-count {
    position: absolute;
    top: 5px; /* Adjust this value to position it correctly */
    right: 5px; /* Adjust this value to position it correctly */
    background-color: red; /* Background color for visibility */
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.8rem; /* Font size for the count */
}

.menu-text {
    font-size: 0.6rem;
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowed text */
    text-overflow: ellipsis; /* Add ellipsis for overflowed text */
}

.icon {
    position: relative; /* Position for item count */
    font-size: 24px; /* Adjust icon size if needed */
}
</style>
