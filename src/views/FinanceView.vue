<template>
  <!-- Cabeçalho que só aparece na impressão -->
  <div class="print-header">
    <div class="letterhead">
      <div class="logo">
        <h1>Daily organizer</h1>
        <p>Finanças pessoais</p>
      </div>
      <div class="details">
        <p>Relatório gerado em: {{ dataAtual }}</p>
        <p>Usuário: usuario@email.com</p>
      </div>
    </div>
  </div>

  <!-- Conteúdo principal -->
  <div class="main-content p-6 max-w-6xl mx-auto">
    <FinanceTable />

    <div
      class="total-display mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <span class="text-2xl font-semibold text-gray-800">
        Total:
        <span
          :class="
            financeStore.financeTotal >= 0 ? 'text-green-600' : 'text-red-600'
          "
        >
          {{ formatarValor(financeStore.financeTotal) }}
        </span>
      </span>
    </div>

    <button
      @click="printPage"
      class="print-button mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md transition-all duration-200 ease-in-out flex items-center gap-2"
    >
      <i class="ri-printer-line text-lg"></i>
      Imprimir Página
    </button>
  </div>
  <!-- Modal de nova transação -->
  <div
    v-if="uiStore.isFinanceModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <!-- Overlay com backdrop blur -->
    <div
      class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
      @click="uiStore.closeFinanceModal"
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
          <i class="ri-money-dollar-circle-line text-orange-600 mr-2"></i>
          Nova Transação
        </h2>
      </div>

      <!-- Corpo do modal -->
      <div class="p-6 space-y-4">
        <!-- Campo de descrição -->
        <div>
          <label
            for="transaction-description"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Descrição
          </label>
          <input
            id="transaction-description"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="Ex: Salário mensal, Compras do mês"
            v-model="descricao"
            @keyup.enter="handleAddEvent"
          />
        </div>

        <!-- Tipo de transação -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="transaction-type"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Tipo
            </label>
            <select
              id="transaction-type"
              v-model="tipo"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            >
              <option value="">Selecione...</option>
              <option value="Entrada" class="text-orange-600">Entrada</option>
              <option value="Saída" class="text-red-600">Saída</option>
            </select>
          </div>

          <!-- Valor -->
          <div>
            <label
              for="transaction-value"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Valor
            </label>
            <div class="relative">
              <span class="absolute left-3 top-2 text-gray-500">R$</span>
              <input
                id="transaction-value"
                type="number"
                step="0.01"
                class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="0,00"
                v-model="valor"
              />
            </div>
          </div>
        </div>

        <!-- Categoria -->
        <div>
          <label
            for="transaction-category"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Categoria
          </label>
          <select
            id="transaction-category"
            v-model="categoria"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          >
            <option value="">Selecione...</option>
            <option value="trabalho">💼 Trabalho</option>
            <option value="alimentacao">🍔 Alimentação</option>
            <option value="transporte">🚗 Transporte</option>
            <option value="lazer">🎮 Lazer</option>
            <option value="saude">🏥 Saúde</option>
            <option value="educacao">📚 Educação</option>
            <option value="moradia">🏠 Moradia</option>
            <option value="investimentos">📈 Investimentos</option>
            <option value="outros">❓ Outros</option>
          </select>
        </div>

        <!-- Data -->
        <div>
          <label
            for="transaction-date"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Data
          </label>
          <input
            id="transaction-date"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            v-model="data"
          />
        </div>
      </div>

      <!-- Rodapé com ações -->
      <div
        class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3"
      >
        <button
          @click="uiStore.closeFinanceModal"
          class="px-5 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          @click="handleAddEvent"
          class="px-5 py-2 bg-orange-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-orange-500 flex items-center"
        >
          <i class="ri-add-circle-line mr-2"></i>
          Adicionar Transação
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FinanceTable from "../components/FinanceTable/FinanceTable.vue";
import { useUiStore } from "@/stores/uiStore";
const uiStore = useUiStore();

import { useFinanceStore } from "@/stores/financeStore";
const financeStore = useFinanceStore();

import { ref } from "vue";

const descricao = ref("");
const tipo = ref<"Entrada" | "Saída" | "">("");
const valor = ref("");
const categoria = ref("");
const data = ref("");

const handleAddEvent = () => {
  const campos = [
    descricao.value,
    tipo.value,
    valor.value,
    categoria.value,
    data.value,
  ];

  const todosPreenchidos = campos.every((c) => c.toString().trim() !== "");

  if (!todosPreenchidos) return;

  const valorNumerico = parseFloat(valor.value || "0");

  if (tipo.value === "Saída") {
    valor.value = (-Math.abs(valorNumerico)).toString();
  } else {
    valor.value = Math.abs(valorNumerico).toString();
  }

  financeStore.adicionarTransacao({
    descricao: descricao.value,
    tipo: tipo.value as "Entrada" | "Saída", // <- force cast
    valor: parseFloat(valor.value),
    categoria: categoria.value,
    data: data.value,
  });

  // Limpa os campos
  descricao.value = "";
  tipo.value = "";
  valor.value = "";
  categoria.value = "";
  data.value = "";

  uiStore.closeFinanceModal();
};

const formatarValor = (valor: number) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

function printPage() {
  window.print();
}

import { computed } from "vue";

// ... outros imports e código existente ...

const dataAtual = computed(() => {
  return new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});
</script>

<style>
/* Estilos normais (não impressão) */
.print-header {
  display: none;
}

.print-button {
  background-color: #3b82f6;
  color: white;
  font-size: 0.875rem;
  padding: 0.5rem;
  margin-top: 1.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.total-display span {
  color: black;
  font-size: 1.5rem;
  margin-top: 1.25rem;
}

@media print {
  /* Reset completo para impressão */
  body {
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
    font-family: "Arial", sans-serif !important;
  }

  /* Configuração da página */
  @page {
    size: A4 portrait;
    margin: 2.5cm 1cm 1.5cm 1cm;
  }

  /* Cabeçalho do timbrado */
  .print-header {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2cm;
    padding: 0.5cm 1cm;
    background-color: white;
    border-bottom: 2px solid #f97316;
    z-index: 100;
  }

  .letterhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .logo h1 {
    color: #f97316;
    font-size: 18pt;
    margin: 0;
    font-weight: bold;
  }

  .logo p {
    color: #6b7280;
    margin: 2px 0 0 0;
    font-size: 10pt;
  }

  .details {
    text-align: right;
    font-size: 9pt;
    color: #6b7280;
  }

  /* Conteúdo principal */
  .main-content {
    margin-top: 2.5cm !important; /* Igual à margem superior do @page */
    padding: 0 1cm;
  }

  /* Remove elementos não desejados */
  button {
    display: none !important;
  }

  /* Ajustes para a tabela */
  table {
    width: 100% !important;
    border-collapse: collapse !important;
    font-size: 10pt;
    page-break-inside: avoid;
  }

  th,
  td {
    border: 1px solid #ddd !important;
    padding: 6px 8px !important;
  }

  th {
    background-color: #f3f4f6 !important;
  }

  /* Total */
  .total-display span {
    font-size: 12pt !important;
    font-weight: bold;
  }

  /* Garante que linhas não quebrem entre páginas */
  tr {
    page-break-inside: avoid;
  }
}
</style>
