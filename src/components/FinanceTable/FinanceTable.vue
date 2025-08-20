<template>
  <div class="printable bg-white rounded-xl w-full overflow-auto shadow-sm">
    <table class="w-full border-collapse">
      <thead class="bg-orange-500 text-white sticky top-0">
        <tr>
          <th
            class="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
          >
            Descrição
          </th>
          <th
            class="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider"
          >
            Tipo
          </th>
          <th
            class="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider"
          >
            Valor
          </th>
          <th
            class="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider"
          >
            Categoria
          </th>
          <th
            class="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider"
          >
            Data
          </th>
          <th
            class="no-print px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider"
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(item, index) in financeStore.transacoes"
          :key="index"
          class="hover:bg-gray-50 bg-white transition-colors"
        >
          <td
            class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium"
          >
            {{ item.descricao }}
          </td>
          <td class="px-4 py-3 text-center">
            <span
              class="inline-block rounded-lg px-3 py-1 text-xs font-semibold"
              :class="
                item.tipo === 'Entrada'
                  ? 'text-green-800 bg-green-100'
                  : 'text-red-800 bg-red-100'
              "
            >
              {{ item.tipo }}
            </span>
          </td>
          <td
            class="px-4 py-3 text-center text-sm font-medium"
            :class="item.tipo === 'Entrada' ? 'text-green-600' : 'text-red-600'"
          >
            {{ formatarValor(item.valor) }}
          </td>
          <td class="px-4 py-3 text-center text-sm text-gray-700">
            {{ categoriasComEmoji[item.categoria] || item.categoria }}
          </td>
          <td class="px-4 py-3 text-center text-sm text-gray-600">
            {{ formatarData(item.data) }}
          </td>
          <td class="no-print px-4 py-3 text-center">
            <button
              @click="financeStore.removerTransacao(index)"
              class="text-gray-400 hover:text-red-600 transition-colors focus:outline-none"
              aria-label="Remover transação"
            >
              <i class="ri-delete-bin-line text-lg"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useFinanceStore } from "@/stores/financeStore";
const financeStore = useFinanceStore();

const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString("pt-BR");
};

const formatarValor = (valor: number) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const categoriasComEmoji: Record<string, string> = {
  trabalho: "💼 Trabalho",
  alimentacao: "🍔 Alimentação",
  transporte: "🚗 Transporte",
  lazer: "🎮 Lazer",
  saude: "🏥 Saúde",
  educacao: "📚 Educação",
  moradia: "🏠 Moradia",
  investimentos: "📈 Investimentos",
  outros: "❓ Outros",
};
</script>
