import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import router from "./router";

import './assets/main.css'

// createApp(App).use(router).mount("#app");
createApp(App).use(router).use(store).mount("#app");
