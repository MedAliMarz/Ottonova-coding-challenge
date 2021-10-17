<script lang="ts">

import {createRouter, createWebHashHistory} from 'vue-router'
import ChatVue from './screens/Chat.vue'
import LoginVue from './screens/Login.vue'
const routes = [
  { path: '/', component: LoginVue },
  { path: '/chat', component: ChatVue },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
</script>