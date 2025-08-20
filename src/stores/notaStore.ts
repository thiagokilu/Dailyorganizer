import { defineStore } from "pinia";

interface NotaItem {
  title: string;
  content: string;
  id: string;
  date: string;
}

export const useNotaStore = defineStore("Nota", {
  state: () => ({
    notas: [
      {
        title: "teste",
        content: "essa e uma nota de teste",
        id: "",
        date: "1-1-1",
      },
    ] as NotaItem[],
  }),

  actions: {
    removerNota(id: string) {
      this.notas = this.notas.filter((nota) => nota.id !== id);
    },
  },
  persist: true, // 👈 ativa persistência automática
});
