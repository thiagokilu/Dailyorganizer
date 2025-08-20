// stores/uiStore.ts
import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    isTaskModalOpen: false,
    isNewCalendarModalOpen: false,
    isCalendarEventModalOpen: false,
    isNotaOpen: false,
    isNotaModalOpen: false,
    isFinanceModalOpen: false,
  }),
  actions: {
    openTaskModal() {
      this.isTaskModalOpen = true;
    },
    closeTaskModal() {
      this.isTaskModalOpen = false;
    },

    openNewCalendarModal() {
      this.isNewCalendarModalOpen = true;
    },
    closeNewCalendarModal() {
      this.isNewCalendarModalOpen = false;
    },
    openCalendarEventModal() {
      this.isCalendarEventModalOpen = true;
    },
    closeCalendarEventModal() {
      this.isCalendarEventModalOpen = false;
    },
    openNota() {
      this.isNotaOpen = true;
    },

    closeNota() {
      this.isNotaOpen = false;
    },
    openNotaModal() {
      this.isNotaModalOpen = true;
    },

    closeNotaModal() {
      this.isNotaModalOpen = false;
    },

    openFinanceModal() {
      this.isFinanceModalOpen = true;
    },
    closeFinanceModal() {
      this.isFinanceModalOpen = false;
    },
  },
});
