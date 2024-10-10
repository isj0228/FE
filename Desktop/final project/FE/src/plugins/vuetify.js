import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Global Vuetify styles
import * as components from 'vuetify/components'; // Import all Vuetify components
import * as directives from 'vuetify/directives'; // Import all Vuetify directives

// Create Vuetify instance
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    components, // Register all Vuetify components
    directives, // Register all Vuetify directives
    theme: {
        defaultTheme: 'light', // or 'dark'
    },
});

// Export the Vuetify instance
export default vuetify;
