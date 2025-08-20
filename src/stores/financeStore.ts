// stores/financeStore.ts
import { defineStore } from "pinia";

export interface Transacao {
  id: number;
  descricao: string;
  tipo: "Entrada" | "Saída";
  valor: number;
  categoria: string;
  data: string; // formato ISO ou "DD/MM/AAAA"
}

export const useFinanceStore = defineStore("finance", {
  state: () => ({
    transacoes: [
      {
        id: 1,
        descricao: "Salário mensal",
        tipo: "Entrada",
        valor: 3000,
        categoria: "Trabalho",
        data: "2025-07-31",
      },
      {
        id: 2,
        descricao: "Supermercado",
        tipo: "Saída",
        valor: -230.5,
        categoria: "Alimentação",
        data: "2025-07-30",
      },
      {
        id: 3,
        descricao: "Netflix",
        tipo: "Saída",
        valor: -39.9,
        categoria: "Assinatura",
        data: "2025-07-28",
      },
      {
        id: 4,
        descricao: "Venda item usado",
        tipo: "Entrada",
        valor: 150,
        categoria: "Extra",
        data: "2025-07-27",
      },
    ] as Transacao[],
    nextId: 1,
    financeTotal: 2879.6,
  }),

  actions: {
    adicionarTransacao(nova: Omit<Transacao, "id">) {
      this.transacoes.push({
        ...nova,
        id: this.nextId++,
      });
      this.financeTotal = this.transacoes.reduce(
        (total, item) => total + item.valor,
        0
      );
    },

    removerTransacao(id: number) {
      this.transacoes = this.transacoes.filter((t) => t.id !== id);
      this.financeTotal = this.transacoes.reduce(
        (total, item) => total + item.valor,
        0
      );
    },

    limparTransacoes() {
      this.transacoes = [];
      this.nextId = 1;
    },
    somaTotal() {
      return this.transacoes.reduce((total, item) => total + item.valor, 0);
    },
  },

  persist: true, // persiste localmente (requer pinia-plugin-persistedstate)
});
