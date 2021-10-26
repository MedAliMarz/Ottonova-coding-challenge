<script lang="ts">
import { createRouter, createWebHashHistory } from "vue-router";
import ChatVue from "./screens/Chat.vue";
import LoginVue from "./screens/Login.vue";
import { store } from "./store";
const routes = [
  { path: "/", component: LoginVue },
  { path: "/login", component: LoginVue },
  { path: "/chat", component: ChatVue },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.fullPath === "/chat" && !store.getters.isAuthenticated) {
    return "/login";
  }
});
</script>
