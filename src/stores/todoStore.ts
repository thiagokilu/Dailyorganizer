import { identity } from "@fullcalendar/core/internal";
import { defineStore } from "pinia";

interface TodoItem {
  id: string;
  checked: boolean;
  titulo: string;
  prazo: string;
}

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todo: [
      {
        checked: false,
        titulo: "Estudar Vue.js",
        prazo: "2025-07-30",
        id: "",
      },
    ] as TodoItem[],
  }),

  actions: {
    removeTodo(index: number) {
      this.todo.splice(index, 1);
    },
    addTask(title: string, time: string, id: string) {
      const novaTarefa = {
        checked: false,
        titulo: title,
        prazo: time,
        id: id,
      };

      this.todo.push(novaTarefa);
    },
  },
  persist: true, // 👈 ativa persistência automática
});
