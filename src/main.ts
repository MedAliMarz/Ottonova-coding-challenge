import { createApp } from 'vue'
import App from './App.vue'
import WaveUI from "wave-ui";
import "wave-ui/dist/wave-ui.css";
import {router} from './Router.vue'
const app = createApp(App);

new WaveUI(app, {
  // Some Wave UI options.
});
app.use(router);
app.mount("#app");
// createApp(App).mount('#app')
