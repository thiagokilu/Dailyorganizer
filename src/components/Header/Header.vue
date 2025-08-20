<template>
  <div class="flex h-screen">
    <!-- Sidebar Redesign -->
    <aside
      class="w-64 bg-white border-r border-orange-50 text-black flex flex-col"
    >
      <!-- User Profile Section -->
      <div
        class="p-5 border-b border-orange-50 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"
          >
            <i class="ri-user-3-fill text-lg text-orange-500"></i>
          </div>
          <div>
            <p class="text-sm font-medium">usuario@email.com</p>
            <p class="text-xs text-orange-500">Premium</p>
          </div>
        </div>
        <i
          class="ri-arrow-down-s-line text-xs text-gray-400 cursor-pointer"
        ></i>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 p-3 space-y-1">
        <!-- Dashboard -->
        <RouterLink
          to="/"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
          active-class="bg-orange-50 text-orange-600"
        >
          <div
            class="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center"
            :class="{
              'text-orange-600 bg-orange-100': route.path === '/',
              'text-gray-600': route.path !== '/',
            }"
          >
            <i class="ri-home-line text-sm"></i>
          </div>
          <span class="text-sm font-medium">Dashboard</span>
        </RouterLink>

        <!-- Tarefas -->
        <RouterLink
          to="/todo"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
          active-class="bg-orange-50 text-orange-600"
        >
          <div
            class="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center"
            :class="{
              'text-orange-600 bg-orange-100': route.path === '/todo',
              'text-gray-600': route.path !== '/todo',
            }"
          >
            <i class="ri-task-line text-sm"></i>
          </div>
          <span class="text-sm font-medium">Tarefas</span>
        </RouterLink>

        <!-- Calendário -->
        <RouterLink
          to="/calendar"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
          active-class="bg-orange-50 text-orange-600"
        >
          <div
            class="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center"
            :class="{
              'text-orange-600 bg-orange-100': route.path === '/calendar',
              'text-gray-600': route.path !== '/calendar',
            }"
          >
            <i class="ri-calendar-event-fill text-sm"></i>
          </div>
          <span class="text-sm font-medium">Calendário</span>
        </RouterLink>

        <!-- Notas -->
        <RouterLink
          to="/notes"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
          active-class="bg-orange-50 text-orange-600"
        >
          <div
            class="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center"
            :class="{
              'text-orange-600 bg-orange-100': route.path === '/notes',
              'text-gray-600': route.path !== '/notes',
            }"
          >
            <i class="ri-booklet-line text-sm"></i>
          </div>
          <span class="text-sm font-medium">Notas</span>
        </RouterLink>

        <!-- Finanças -->
        <RouterLink
          to="/finance"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
          active-class="bg-orange-50 text-orange-600"
        >
          <div
            class="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center"
            :class="{
              'text-orange-600 bg-orange-100': route.path === '/finance',
              'text-gray-600': route.path !== '/finance',
            }"
          >
            <i class="ri-coins-line text-sm"></i>
          </div>
          <span class="text-sm font-medium">Finanças</span>
        </RouterLink>
      </nav>

      <!-- Botão tarefa -->
      <div class="p-4 border-t border-orange-50" v-if="route.path === '/todo'">
        <button
          @click="uiStore.openTaskModal"
          class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          <i class="ri-add-line"></i>
          <span>Nova Tarefa</span>
        </button>
      </div>
      <!--Botão nota-->
      <div class="p-4 border-t border-orange-50" v-if="route.path === '/notes'">
        <button
          class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          @click="uiStore.openNotaModal"
        >
          <i class="ri-add-line"></i>
          <span>Nova Nota</span>
        </button>
      </div>

      <!--Botão calendar-->
      <div
        class="p-4 border-t border-orange-50"
        v-if="route.path === '/calendar'"
      >
        <button
          class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          @click="uiStore.openNewCalendarModal"
        >
          <i class="ri-add-line"></i>
          <span>Nova Evento</span>
        </button>
      </div>

      <!--Botão financas-->
      <div
        class="p-4 border-t border-orange-50"
        v-if="route.path === '/finance'"
      >
        <button
          class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          @click="uiStore.openFinanceModal"
        >
          <i class="ri-add-line"></i>
          <span>Nova Transação</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const today = new Date().toLocaleDateString("pt-BR");
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUiStore } from "@/stores/uiStore";
const uiStore = useUiStore();
const route = useRoute();

const isModalOpen = ref(false);
</script>
