<template>
    <li class="menu3" @click="toggleDropdown(3)">
        <a href="javascript:void(0)" class="sidebar-link">
            <i class="fas fa-history icon"></i>
            <span v-if="recentProductSide.length > 0" class="item-count">{{
                recentProductSide.length
            }}</span>
        </a>
        <div
            v-if="activeDropdown === 3"
            :class="['dropdown-content', { active: activeDropdown === 3 }]"
        >
            <div class="recent-dropdown">
                <h3 class="section-title">최근 본 상품</h3>
                <ul v-if="recentProductSide.length > 0">
                    <li
                        v-for="(product, index) in recentProductSide"
                        :key="index"
                        class="recent-item"
                    >
                        {{ product.name }} - {{ product.price }}원
                    </li>
                </ul>
                <div v-else class="empty-recent">최근 본 상품이 없습니다.</div>
            </div>
        </div>
    </li>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'RecentProductSection',
    props: ['activeDropdown', 'recentProducts'],
    methods: {
        toggleDropdown(menuNumber) {
            this.$emit('toggleDropdown', menuNumber);
        },
    },
    data() {
        return {
            recentProductSide: [
                { name: '상품 A', price: 10000 },
                { name: '상품 B', price: 20000 },
                { name: '상품 C', price: 30000 },
            ],
        };
    },
});
</script>

<style scoped>
.sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white; /* Text color */
    padding: 15px;
    text-decoration: none;
    background-color: transparent; /* No background */
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
    background-color: #575757; /* Change background on hover */
}

.icon {
    font-size: 24px; /* Desired size */
    color: grey; /* Grey color for the icon */
}

.dropdown-content {
    position: absolute;
    left: -300px; /* Adjust to align dropdown */
    top: 0;
    background-color: #f8f8f8; /* Changed to a lighter color for contrast */
    color: #333; /* Darker text for better readability */
    padding: 10px;
    width: 300px;
    height: auto; /* Dynamic height for content */
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

.recent-dropdown {
    padding: 20px;
}

.section-title {
    font-size: 1.4rem; /* Slightly larger for emphasis */
    margin-bottom: 15px; /* Adjusted margin for better spacing */
    color: #2d6a4f;
    border-bottom: 2px solid #2d6a4f; /* Added underline for separation */
    padding-bottom: 10px; /* Padding for spacing */
}

.recent-item {
    margin: 5px 0;
}

.empty-recent {
    color: #ffcc00;
    text-align: center; /* Center the message */
    font-size: 1.1rem; /* Increased font size for visibility */
    margin-top: 20px; /* Spacing above */
}

/* Item count badge style */
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
    font-size: 0.6rem; /* Adjusted size */
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowed text */
    text-overflow: ellipsis; /* Show ellipsis for overflowed text */
}
</style>
