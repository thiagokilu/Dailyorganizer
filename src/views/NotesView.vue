<template>
  <div class="flex flex-row flex-wrap gap-5">
    <NotaCard
      v-for="(item, index) in notaStore.notas"
      :key="index"
      :nota="item"
      @abrirNota="notaSelecionada = $event"
    />

    <!-- Só exibe a nota grande se uma estiver selecionada -->
    <Nota
      v-if="notaSelecionada"
      :nota="notaSelecionada"
      @fechar="notaSelecionada = null"
      @remover="removerNota"
    />
  </div>

  <!-- Modal de nova nota -->
  <div
    v-if="uiStore.isNotaModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <!-- Overlay com backdrop blur -->
    <div
      class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
      @click="uiStore.closeNotaModal"
    ></div>

    <!-- Conteúdo do modal -->
    <div
      class="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
    >
      <!-- Cabeçalho -->
      <div
        class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50"
      >
        <h2 class="text-xl font-semibold text-gray-800">Nova Nota</h2>
      </div>

      <!-- Corpo do modal -->
      <div class="p-6 overflow-y-auto flex-grow">
        <!-- Campo de título -->
        <div class="mb-6">
          <label
            for="nota-title"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Título</label
          >
          <input
            id="nota-title"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            placeholder="Digite um título para sua nota"
            v-model="notaTitle"
            @keyup.enter="handleAddEvent"
          />
        </div>

        <!-- Editor de conteúdo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Conteúdo</label
          >
          <QuillEditor
            v-model:content="notaContent"
            content-type="html"
            theme="snow"
            class="border border-gray-300 rounded-lg overflow-hidden [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-t-0"
          />
        </div>
      </div>

      <!-- Rodapé com ações -->
      <div
        class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3"
      >
        <button
          @click="uiStore.closeNotaModal"
          class="px-5 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          @click="handleAddEvent"
          class="px-5 py-2 bg-orange-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-orange-500"
        >
          <i class="ri-add-line mr-1"></i> Adicionar Nota
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NotaCard from "../components/NotaCard/NotaCard.vue";
import Nota from "@/components/Nota/Nota.vue";
import { nanoid } from "nanoid"; // você pode instalar com `npm i nanoid`

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { useUiStore } from "@/stores/uiStore";
const uiStore = useUiStore();

import { useNotaStore } from "@/stores/notaStore";
const notaStore = useNotaStore();

import { ref } from "vue";

const notaTitle = ref("");
const notaContent = ref("");

const handleAddEvent = () => {
  if (notaTitle.value.trim() && notaContent.value.trim()) {
    notaStore.notas.push({
      title: notaTitle.value,
      content: notaContent.value,
      date: new Date().toISOString(), // <- adiciona data/hora atual
      id: nanoid(),
    });

    // Limpa os campos após adicionar
    notaTitle.value = "";
    notaContent.value = "";

    // Fecha o modal
    uiStore.closeNotaModal();
  }
};
const notaSelecionada = ref(null);

const removerNota = (id) => {
  notaStore.removerNota(id);
};
</script>
