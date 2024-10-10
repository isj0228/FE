import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Pinia import
import vuetify from './plugins/vuetify';
import DefaultLayout from './components/DefaultLayout.vue';

// Vuetify와 함께 사용할 아이콘 세트
import '@mdi/font/css/materialdesignicons.css'; // MDI 아이콘
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome 아이콘

// Import vue3-cookies
import VueCookies from 'vue3-cookies';

// Import axios and create an axios instance
import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = VueCookies.get('Authorization'); // Get the token from cookies
    if (token) {
      config.headers['Authorization'] = token; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific errors here, like token expiration
    if (error.response && error.response.status === 401) {
      // Redirect to login or handle token refresh logic
      window.location.href = '/login'; // Or use this.$router.push('/login');
    }
    return Promise.reject(error);
  }
);

// Create the Vue app instance
const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Register global components
app.component('DefaultLayout', DefaultLayout);

// Use Vue Router, Pinia, Vuetify plugins
app.use(router);
app.use(pinia); // Pinia 사용
app.use(vuetify);

// Use vue3-cookies
app.use(VueCookies);

// Make axios instance available globally
app.config.globalProperties.$axios = axiosInstance;

// Mount the app to the #app element
app.mount('#app');