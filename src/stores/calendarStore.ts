import { defineStore } from "pinia";

export interface CalendarItem {
  id: string;
  title: string;
  date: string;
}

export const useCalendarStore = defineStore("Calendar", {
  state: () => ({
    events: [
      { id: "1", title: "Evento 1", date: "2025-07-01" },
      { id: "2", title: "Evento 2", date: "2025-07-15" },
    ] as CalendarItem[],
  }),

  actions: {
    adicionarEvento(evento: CalendarItem) {
      this.events.push(evento);
    },
    removerEvento(id: string) {
      this.events = this.events.filter((evento) => evento.id !== id);
    },
  },

  persist: true,
});
