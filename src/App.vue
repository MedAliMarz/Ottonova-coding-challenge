<script setup lang="ts">
import {RouterView} from "vue-router"
</script>

<template>
<n-message-provider>
  <router-view></router-view>
</n-message-provider>
</template>

<style>
*{
  padding: 0;
  margin: 0;
  border: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
