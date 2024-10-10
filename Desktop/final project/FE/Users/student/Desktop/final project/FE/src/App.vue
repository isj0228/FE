<template>
  <v-app>
    <DefaultLayout>
      <v-main>
        <router-view />
      </v-main>
    </DefaultLayout>
  </v-app>
</template>

<script>
import { provide, reactive } from 'vue';

export default {
    name: 'App',
    setup() {
        // Use reactive to make the cart reactive
        const cart = reactive([]);

        // Provide the cart to child components
        provide('cart', cart);

    return {
      cart,
    };
  },
};
</script>

<style>
/* Add your styles here */
</style>
