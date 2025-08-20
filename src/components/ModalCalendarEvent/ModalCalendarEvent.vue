<template>
  <!-- Modal de detalhes do evento -->
  <div
    v-if="isCalendarEventModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <!-- Overlay com backdrop blur -->
    <div
      class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
      @click="uiStore.closeCalendarEventModal"
    ></div>

    <!-- Conteúdo do modal -->
    <div
      class="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200"
    >
      <!-- Cabeçalho -->
      <div
        class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50 flex justify-between items-center"
      >
        <h2 class="text-xl font-semibold text-gray-800">
          <i class="ri-calendar-event-line mr-2 text-amber-600"></i>
          Detalhes do Evento
        </h2>
        <div class="flex gap-3">
          <button
            @click="calendarStore.removerEvento(event?.id)"
            class="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
            title="Excluir evento"
          >
            <i class="ri-delete-bin-line text-lg"></i>
          </button>
          <button
            @click="uiStore.closeCalendarEventModal"
            class="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            title="Fechar"
          >
            <i class="ri-close-line text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Corpo do modal -->
      <div class="p-6 space-y-4">
        <div class="flex items-start">
          <div class="bg-amber-100 p-2 rounded-lg mr-4">
            <i class="ri-quill-pen-line text-amber-600 text-xl"></i>
          </div>
          <div>
            <h3
              class="text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Título
            </h3>
            <p class="text-gray-800 font-medium break-words mt-1">
              {{ event?.title }}
            </p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="bg-amber-100 p-2 rounded-lg mr-4">
            <i class="ri-calendar-line text-amber-600 text-xl"></i>
          </div>
          <div>
            <h3
              class="text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Data
            </h3>
            <p class="text-gray-800 font-medium mt-1">
              {{ formatEventDate(event?.date) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isCalendarEventModalOpen: boolean;
  event: { title: string; date: string; id: string } | null;
}>();

import { useUiStore } from "@/stores/uiStore";
const uiStore = useUiStore();
import { useCalendarStore } from "@/stores/calendarStore";
const calendarStore = useCalendarStore();

const formatEventDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
