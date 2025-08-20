<script lang="ts" setup>
import { useFinanceStore } from "@/stores/financeStore";
const finance = useFinanceStore();
const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

// Funções auxiliares
const entradas = () =>
  finance.transacoes
    .filter((t) => t.tipo === "Entrada")
    .reduce((acc, t) => acc + t.valor, 0);

const saidas = () =>
  finance.transacoes
    .filter((t) => t.tipo === "Saída")
    .reduce((acc, t) => acc + t.valor, 0);
</script>

<template>
  <router-link to="/finance">
    <div class="bg-white rounded-xl shadow-sm w-full max-w-sm p-4">
      <!-- Saldo -->
      <div class="mb-4">
        <h2 class="text-gray-600 text-sm">Saldo Total</h2>
        <p class="text-2xl font-bold text-green-600">
          {{ finance.somaTotal() }}
        </p>
      </div>

      <!-- Entradas e Saídas -->
      <div class="flex justify-between mb-4">
        <div>
          <p class="text-gray-500 text-sm">Entradas</p>
          <p class="text-green-500 font-semibold">
            {{ formatarMoeda(entradas()) }}
          </p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Saídas</p>
          <p class="text-red-500 font-semibold">
            {{ formatarMoeda(saidas()) }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>
