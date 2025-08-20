<template>
  <div class="bg-white rounded-xl w-full overflow-auto">
    <table class="w-full items-center justify-center">
      <thead class="bg-[#fac000] text-white items-center">
        <tr>
          <th class="px-4 py-3 text-left text-sm font-medium w-10"></th>
          <th class="px-4 py-3 text-left text-sm font-semibold">Tarefa</th>
          <th class="px-4 py-3 w-10 text-center text-sm font-semibold">
            Prazo
          </th>
          <th class="px-4 py-3 text-center text-sm font-semibold"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr
          v-for="(item, index) in todoStore.todo"
          :key="index"
          class="hover:bg-yellow-200 bg-yellow-100 transition-colors"
        >
          <td class="px-4 py-3 whitespace-nowrap">
            <input
              type="checkbox"
              v-model="item.checked"
              class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
            />
          </td>
          <td class="px-4 py-3 whitespace-nowrap font-medium text-gray-800">
            <input
              :ref="(el) => (inputRefs[index] = el)"
              type="text"
              v-model="item.titulo"
              :disabled="estadoInputs[index] !== false"
              :class="[{ 'line-through text-gray-500': item.checked }]"
              @blur="estadoInputs[index] = true"
            />
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
          <td
            class="px-4 py-3 whitespace-nowrap flex items-center justify-center font-medium text-gray-800 text-lg"
          >
            <i
              @click="toggleInput(index)"
              class="ri-edit-line text-center hover:cursor-pointer hover:text-yellow-600"
            ></i>

            <i
              @click="removerTask(index)"
              class="ri-delete-bin-line text-center hover:cursor-pointer hover:text-yellow-600"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal de nova tarefa -->
    <div
      v-if="uiStore.isTaskModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Overlay com backdrop blur -->
      <div
        class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        @click="uiStore.closeTaskModal"
      ></div>

      <!-- Conteúdo do modal -->
      <div
        class="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200"
      >
        <!-- Cabeçalho -->
        <div
          class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50"
        >
          <h2 class="text-xl font-semibold text-gray-800 flex items-center">
            <i class="ri-task-line text-orange-600 mr-2"></i>
            Nova Tarefa
          </h2>
        </div>

        <!-- Corpo do modal -->
        <div class="p-6 space-y-5">
          <!-- Campo de título -->
          <div>
            <label
              for="task-title"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Título da Tarefa
            </label>
            <input
              id="task-title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              placeholder="Ex: Finalizar relatório mensal"
              v-model="taskTitle"
              @keyup.enter="handleAddTask"
            />
          </div>

          <!-- Campo de data -->
          <div>
            <label
              for="task-date"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Prazo
            </label>
            <input
              id="task-date"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              v-model="taskTime"
            />
          </div>
        </div>

        <!-- Rodapé com ações -->
        <div
          class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3"
        >
          <button
            @click="uiStore.closeTaskModal"
            class="px-5 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            @click="handleAddTask"
            class="px-5 py-2 bg-orange-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-orange-500 flex items-center"
          >
            <i class="ri-check-line mr-2"></i>
            Adicionar Tarefa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
const todoStore = useTodoStore();
import { useCalendarStore } from "@/stores/calendarStore";
const calendarStore = useCalendarStore();
import { useUiStore } from "@/stores/uiStore";
const uiStore = useUiStore();
import { nanoid } from "nanoid"; // você pode instalar com `npm i nanoid`

import { ref, nextTick } from "vue";
const taskTitle = ref("");
const taskTime = ref("");
const estadoInputs = ref<boolean[]>([]);
const inputRefs = ref<(HTMLInputElement | null)[]>([]);
const dataAtual = ref(new Date());

const formatarData = (data: string): string => {
  const [ano, mes, dia] = data.split("-");
  const dateObj = new Date(Number(ano), Number(mes) - 1, Number(dia));
  // aqui não usa UTC, já pega direto a data no fuso local

  return new Intl.DateTimeFormat("pt-BR").format(dateObj);
};

const handleAddTask = () => {
  if (!taskTitle.value.trim()) return;
  if (!taskTime.value.trim()) return;
  const newTaskid = nanoid(); // gera um ID único como "V1StGXR8_Z5jdHi6B-myT"

  todoStore.addTask(taskTitle.value, taskTime.value, newTaskid);
  handleAddToCalendar(newTaskid);
  taskTitle.value = "";
  uiStore.closeTaskModal();
};

const handleAddToCalendar = (newTaskid: string) => {
  calendarStore.events.push({
    title: taskTitle.value,
    date: taskTime.value,
    id: newTaskid,
  });
};

const estaDesabilitado = ref(false);

function toggleInput(index: number) {
  estadoInputs.value[index] = false;

  nextTick(() => {
    inputRefs.value[index]?.focus();
  });
}

const removerTask = (index: number) => {
  const item = todoStore.todo[index];
  todoStore.removeTodo(index);
  calendarStore.removerEvento(item.id);
};
</script>
