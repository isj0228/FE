<template>
    <li class="menu-item" @click="openSidePanel">
        <a href="javascript:void(0)" class="sidebar-link">
            <i class="fas fa-shopping-cart icon"></i>
            <span class="menu-text">장바구니</span>
        </a>
    </li>
</template>

<script>
export default {
    name: 'CartSection',
    props: {
        cart: {
            type: Array,
            required: true,
        },
        removeFromCart: {
            type: Function,
            required: true,
        },
    },
    methods: {
        openSidePanel() {
            this.$emit('openSidePanel', {
                title: '장바구니',
                section: 'CartSection',
                data: this.cart, // Pass the cart data
            });
        },
    },
};
</script>

<style scoped>
.menu-item {
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
}
.sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    color: grey;
    text-decoration: none;
    width: 100%;
    transition: background-color 0.3s ease;
}
.sidebar-link:hover {
    background-color: #d7dbde; /* Change background on hover */
}
.icon {
    font-size: 24px; /* Size of the icon */
    margin-bottom: 5px;
}
.menu-text {
    font-size: 0.8rem;
    opacity: 1; /* Always fully visible */
}
</style>
