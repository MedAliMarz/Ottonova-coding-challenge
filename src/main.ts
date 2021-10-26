import { createApp } from 'vue'
import App from './App.vue'
import naive from "naive-ui";
import { router } from "./Router.vue";
import { store } from "./store";

const app = createApp(App);

app.use(store);
app.use(naive);
app.use(router);
app.mount("#app");
