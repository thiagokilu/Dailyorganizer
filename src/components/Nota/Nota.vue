<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300"
    @click.self="emit('fechar')"
  >
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
    >
      <div
        class="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-yellow-50 to-amber-50"
      >
        <h1 class="text-2xl font-semibold text-gray-800">{{ nota.title }}</h1>
        <div class="flex flex-row gap-4">
          <button
            @click="toggleInput"
            class="text-gray-500 hover:text-amber-600 transition-colors p-1 rounded-full hover:bg-amber-100"
            title="Editar"
          >
            <i class="ri-edit-line text-xl"></i>
          </button>
          <button
            @click="removerENotarFechar()"
            class="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-100"
            title="Excluir"
          >
            <i class="ri-delete-bin-line text-xl"></i>
          </button>
          <button
            @click="emit('fechar')"
            class="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            title="Fechar"
          >
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
      </div>

      <div class="p-6 overflow-y-auto flex-grow">
        <div v-html="nota.content" class="ql-editor prose max-w-none"></div>
      </div>

      <div
        class="px-6 py-3 border-t border-gray-200 text-sm text-gray-500 bg-gray-50 flex justify-between items-center"
      >
        <span>{{ formatarData(nota.date) }}</span>
        <span
          class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
        >
          <i class="ri-sticky-note-line mr-1"></i> Nota
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "quill/dist/quill.snow.css";

const props = defineProps<{
  nota: {
    title: string;
    content: string;
    date: string;
    id: string;
  };
}>();

const emit = defineEmits(["fechar", "remover"]);

const formatarData = (data: string) => {
  return new Date(data).toLocaleString("pt-BR");
};

import { ref } from "vue";

const estaDesabilitado = ref(false);

function toggleInput() {
  estaDesabilitado.value = !estaDesabilitado.value;
}

function removerENotarFechar() {
  emit("remover", props.nota.id);
  emit("fechar");
}
</script>

<style>
.ql-editor {
  padding: 0.5rem;
  color: #222;
}
.ql-editor h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.ql-editor h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.ql-editor h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.ql-editor p {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.6;
}
</style>
