<template>
  <div
    class="bg-yellow-100 w-72 h-72 p-4 overflow-hidden rounded-lg border-2 border-yellow-200 shadow-md hover:shadow-lg hover:border-yellow-300 hover:cursor-pointer transition-all duration-200 transform hover:-translate-y-1 flex flex-col"
    @click="selecionarNota"
  >
    <!-- Cabeçalho da nota pequena -->
    <div class="pb-2 mb-2 border-b border-yellow-200">
      <h1 class="text-lg font-bold text-yellow-800 truncate">
        {{ nota.title }}
      </h1>
    </div>

    <!-- Corpo da nota pequena (com gradiente de fade no final) -->
    <div class="flex-1 overflow-hidden relative">
      <div class="h-full pr-2">
        <div v-html="nota.content" class="text-sm text-yellow-900 mb-2"></div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-yellow-100 to-transparent"
      ></div>
    </div>

    <!-- Rodapé com data -->
    <div
      class="pt-2 mt-2 text-xs text-yellow-600 text-right border-t border-yellow-200"
    >
      {{ formatarData(nota.date) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from "@/stores/uiStore";
const uiStore = useUiStore();

// Recebe a prop `nota`
const props = defineProps<{
  nota: {
    title: string;
    content: string;
    date: string; // ou Date
  };
}>();

// Função para formatar data (opcional)
const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString("pt-BR");
};

const emit = defineEmits(["abrirNota"]);
const selecionarNota = () => {
  emit("abrirNota", props.nota);
};
</script>
