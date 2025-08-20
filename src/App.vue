<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header/Header.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="mainHeader w-64 h-screen fixed left-0 top-0">
      <Header />
    </aside>

    <main class="mainContent ml-64 flex-1 overflow-auto overflow-x-hidden p-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
