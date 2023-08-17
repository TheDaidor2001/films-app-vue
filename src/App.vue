<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navBar from './components/UI/navBar.vue';
</script>

<template>
  <navBar />  

  <main>
    <RouterView />
  </main>
</template>
