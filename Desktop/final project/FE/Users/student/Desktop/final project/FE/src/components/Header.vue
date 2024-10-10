<template>
    <header class="header">
        <div class="logoBox" @click="navigateToHome">
            <div class="logo">ProPortFolio</div>
        </div>

        <nav>
            <div class="menu" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
                <span class="menu-item">포트폴리오</span>
                <span class="menu-item">금융상품</span>
                <span class="menu-item">Insight</span>
                <span class="menu-item">My Investment</span>

                <!-- Unified Dropdown -->
                <div v-if="showDropdown" class="dropdown">
                    <div class="dropdown-section">
                        <ul>
                            <li
                                class="in"
                                :class="{ active: isActive('/my-portfolio') }"
                                @click="$router.push('/my-portfolio')"
                            >
                                내 포트폴리오
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/make-portfolio') }"
                                @click="$router.push('/make-portfolio')"
                            >
                                포트폴리오 구성하기
                            </li>
                        </ul>
                    </div>

                    <div class="dropdown-section">
                        <ul>
                            <li
                                class="in"
                                :class="{ active: isActive('/products/deposit') }"
                                @click="navigateToProductList('deposit')"
                            >
                                상품 리스트
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/cart') }"
                                @click="$router.push('/cart')"
                            >
                                장바구니
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/recently-viewed') }"
                                @click="$router.push('/recently-viewed')"
                            >
                                최근 본 상품
                            </li>
                        </ul>
                    </div>

                    <div class="dropdown-section">
                        <ul>
                            <li
                                class="in"
                                :class="{ active: isActive('/news') }"
                                @click="$router.push('/news')"
                            >
                                뉴스
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/youtube') }"
                                @click="$router.push('/youtube')"
                            >
                                유튜브
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/influencer') }"
                                @click="$router.push('/influencer')"
                            >
                                인플루언서
                            </li>
                        </ul>
                    </div>

                    <div class="dropdown-section">
                        <ul>
                            <li
                                class="in"
                                :class="{ active: isActive('/my-investment-analyze') }"
                                @click="$router.push('/my-investment-analyze')"
                            >
                                내 투자성향 분석
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/investment-test-start') }"
                                @click="$router.push('/investment-test-start')"
                            >
                                투자성향 분석하기
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <div class="user-controls">
            <template v-if="isLoggedIn">
                <div class="profile-info" @click="navigateToProfile">
                    <i class="fa-solid fa-user-tie"></i>
                    <span class="username">{{ userProfile.username }}</span>
                    <button @click.stop="handleLogout">로그아웃</button>
                </div>
            </template>
            <template v-else>
                <button class="login-btn" @click="navigateToLogin">로그인</button>
                <button class="signup-btn" @click="navigateToSignup">회원가입</button>
            </template>
        </div>
    </header>
</template>

<script>
import { useCookies } from 'vue3-cookies';

export default {
    name: 'Header',
    data() {
        return {
            isLoggedIn: false,
            userProfile: {
                username: '',
            },
            showDropdown: false, // 드롭다운 표시 제어
        };
    },
    methods: {
        navigateToHome() {
            this.$router.push('/');
        },
        navigateToLogin() {
            this.$router.push('/login');
        },
        navigateToSignup() {
            this.$router.push('/signup');
        },
        navigateToProfile() {
            this.$router.push('/myPage');
        },
        navigateToProductList(category) {
            this.$router.push({
                name: 'Products',
                params: { category: 'deposit' },
                query: { page: 1, pageSize: 10 },
            });
        },

        async handleLogout() {
            const { cookies } = useCookies();

            // Clear cookies and local storage
            cookies.remove('Authorization');
            cookies.remove('Refresh-Token');
            localStorage.removeItem('user');

            // Update user profile state
            await this.updateUserProfile(); // Update the state
            this.navigateToHome(); // Redirect to home
        },
        updateUserProfile() {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                this.isLoggedIn = true;
                this.userProfile.username = storedUser.username;
                this.userProfile.picture = storedUser.picture || this.userProfile.picture;
            } else {
                this.isLoggedIn = false;
                this.userProfile.username = '';
                this.userProfile.picture = 'path/to/default/profile/pic.png';
            }
        },
        isActive(route) {
            return this.$route.path === route;
        },
    },
    watch: {
        $route(to, from) {
            this.updateUserProfile();
        },
    },
    mounted() {
        this.updateUserProfile();
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #ffffff;
    color: rgb(10, 1, 1);
    width: 100%; /* 헤더의 너비를 100%로 고정 */
    height: 100px; /* 헤더의 높이를 고정 */
    position: relative;
    box-sizing: border-box; /* padding과 border를 포함한 크기 계산 */
    margin-top: 20px; /* 위쪽 마진 추가 */
}

.logoBox {
    width: 200px;
    height: 65px;
    display: flex; /* 플렉스박스 사용 */
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
}

.logo {
    font-size: 24px;
    font-weight: bold;
    text-align: center; /* 텍스트 중앙 정렬 */
}

.logoBox:hover {
    cursor: pointer;
}

nav {
    position: relative;
    display: flex;
    justify-content: center;
}

.menu {
    position: relative;
    padding: 10px;
    cursor: pointer;
    display: flex;
    gap: 50px;
}

.menu-item {
    font-size: 20px;
    font-weight: bold;
    padding: 0 10px;
}

.menu-item:hover {
    color: #3961e4;
}

.dropdown {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 100%; /* 헤더 바로 아래 정렬 */
    left: 0; /* 헤더 왼쪽 가장자리에 정렬 */
    width: 100%; /* 헤더의 전체 너비 */
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.dropdown-section {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 10px; /* 섹션 간의 여백 추가 */
    border-left: 1px solid #ddd; /* 섹션 간의 수직선 */
}

.dropdown-section:first-child {
    border-left: none; /* 첫 번째 섹션의 선 제거 */
}

.dropdown-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown-section ul li {
    font-weight: bold;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    border-radius: 4px;
    text-align: middle;
}

.dropdown-section ul li:hover {
    background-color: #f0f0f0;
}

.dropdown-section ul li.active {
    color: #2d6a4f;
    font-weight: bold;
    background-color: #e9f9f5;
}

.user-controls {
    display: flex;
    align-items: center;
}

.profile-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
}

.user-controls button {
    border: none;
    padding: 10px;
    margin-left: 10px;
    cursor: pointer;
    background-color: #3961e4;
    color: white;
    border-radius: 5px;
    transition: background-color 0.2s;
}

.user-controls button:hover {
    background-color: #4d85ff;
}
</style>
