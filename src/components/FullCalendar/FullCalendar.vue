<template>
  <main class="flex flex-col p-6 w-full h-screen overflow-hidden">
    <!-- Calendário -->
    <div class="flex-1 overflow-auto">
      <FullCalendar ref="calendarRef" :options="calendarOptions" />
    </div>

    <ModalCalendarEvent
      :isCalendarEventModalOpen="uiStore.isCalendarEventModalOpen"
      :event="selectedEvent"
    />

    <!-- Modal de novo evento -->
    <div
      v-if="uiStore.isNewCalendarModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Overlay com backdrop blur -->
      <div
        class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        @click="uiStore.closeNewCalendarModal"
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
            <i class="ri-add-circle-line text-amber-600 mr-2"></i>
            Novo Evento
          </h2>
        </div>

        <!-- Corpo do modal -->
        <div class="p-6 space-y-5">
          <!-- Campo de título -->
          <div>
            <label
              for="event-title"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Título do Evento
            </label>
            <input
              id="event-title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              placeholder="Ex: Reunião com equipe"
              v-model="eventTitle"
              @keyup.enter="handleAddEvent"
            />
          </div>

          <!-- Campo de data -->
          <div>
            <label
              for="event-date"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Data e Hora
            </label>
            <input
              id="event-date"
              type="datetime-local"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              v-model="eventTime"
            />
          </div>
        </div>

        <!-- Rodapé com ações -->
        <div
          class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3"
        >
          <button
            @click="uiStore.closeNewCalendarModal"
            class="px-5 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            @click="handleAddEvent"
            class="px-5 py-2 bg-orange-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all hover:from-orange-600 hover:to-amber-600 flex items-center"
          >
            <i class="ri-check-line mr-2"></i>
            Adicionar Evento
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ModalCalendarEvent from "../ModalCalendarEvent/ModalCalendarEvent.vue";

import { useUiStore } from "@/stores/uiStore";
import { useCalendarStore } from "@/stores/calendarStore";

// Tipos do FullCalendar
import type { EventClickArg } from "@fullcalendar/core";
import type { DayCellMountArg } from "@fullcalendar/core";

// Refs e stores
import type FullCalendarComponent from "@fullcalendar/vue3";

const calendarRef = ref<InstanceType<typeof FullCalendarComponent> | null>(
  null
);

const eventTitle = ref("");
const eventTime = ref("");

const uiStore = useUiStore();
const calendarStore = useCalendarStore();

// Evento selecionado para o modal
const selectedEvent = ref<{ title: string; date: string; id: string } | null>(
  null
);

// Lidar com clique em um evento existente
function handleEventClick(info: EventClickArg) {
  console.log("Evento clicado:", info.event);
  selectedEvent.value = {
    title: info.event.title,
    date: info.event.startStr,
    id: info.event.id,
  };
  uiStore.openCalendarEventModal();
}

// Lidar com clique em uma data vazia
function handleDateClick(info: { dateStr: string }) {
  console.log("Data clicada:", info.dateStr);
  eventTime.value = info.dateStr;
  uiStore.openNewCalendarModal();
}

// Adicionar novo evento
function handleAddEvent() {
  if (!eventTitle.value || !eventTime.value) {
    alert("Preencha todos os campos!");
    return;
  }

  calendarStore.events.push({
    id: String(Date.now()),
    title: eventTitle.value,
    date: eventTime.value,
  });

  calendarRef.value?.getApi().refetchEvents();

  eventTitle.value = "";
  eventTime.value = "";
  uiStore.closeNewCalendarModal();
}

// Configurações do FullCalendar
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: calendarStore.events,
  contentHeight: "auto",
  height: "auto",
  dateClick: handleDateClick,
  eventClick: handleEventClick,
  dayCellDidMount(info: DayCellMountArg) {
    info.el.classList.add(
      "hover:bg-yellow-200",
      "transition-colors",
      "cursor-pointer",
      "rounded-md",
      "duration-200"
    );
  },
}));
</script>
