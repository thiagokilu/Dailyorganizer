<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
const todoStore = useTodoStore();
import { useUiStore } from "@/stores/uiStore";
const uiStore = useUiStore();
import { useRoute } from "vue-router";
const route = useRoute();

import { ref } from "vue";
const taskTitle = ref("");
const taskTime = ref("");

const dataAtual = ref(new Date());

const formatarData = (data: string): string => {
  const [ano, mes, dia] = data.split("-");
  const dateObj = new Date(Number(ano), Number(mes) - 1, Number(dia));
  // aqui não usa UTC, já pega direto a data no fuso local

  return new Intl.DateTimeFormat("pt-BR").format(dateObj);
};
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm w-full max-w-sm max-h-52 overflow-auto"
  >
    <table class="w-full items-center justify-center">
      <thead class="bg-[#fac000] text-white items-center">
        <tr>
          <th class="px-4 py-3 text-left text-sm font-medium w-10"></th>
          <th class="px-4 py-3 text-left text-sm font-semibold">Tarefa</th>
          <th class="px-4 py-3 w-10 text-center text-sm font-semibold">
            Prazo
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr
          v-for="(item, index) in todoStore.todo"
          :key="index"
          class="hover:bg-yellow-50 transition-colors"
        >
          <td class="px-4 py-3 whitespace-nowrap">
            <input
              type="checkbox"
              v-model="item.checked"
              class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
            />
          </td>
          <td class="px-4 py-3 whitespace-nowrap font-medium text-gray-800">
            <router-link to="/todo">
              {{ item.titulo }}
            </router-link>
          </td>
          <td class="px-4 py-3 whitespace-nowrap text-gray-600">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="
                new Date(item.prazo).getTime() < dataAtual.getTime()
                  ? 'text-red-800 bg-red-100'
                  : 'text-green-800 bg-green-100'
              "
            >
              {{ formatarData(item.prazo) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Esconde scrollbars no WebKit (Chrome, Edge, Safari) */
::-webkit-scrollbar {
  display: none;
}

/* Esconde scrollbars no Firefox */
* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
</style>
