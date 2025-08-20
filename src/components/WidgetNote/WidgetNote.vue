<template>
  <div
    class="bg-white rounded-xl shadow-sm w-full max-w-sm max-h-52 overflow-hidden cursor-pointer"
    @click="selecionarNota"
  >
    <div class="bg-[#fbcd02] p-2 text-lg text-white">
      <h2>{{ ultimaNota?.title }}</h2>
    </div>
    <div class="mt-2 p-2 line-clamp-5">
      <p>{{ ultimaNota?.content }}</p>
    </div>
  </div>

  <!-- Modal da Nota -->
  <Nota
    v-if="notaSelecionada"
    :nota="notaSelecionada"
    @fechar="notaSelecionada = null"
    @remover="removerNota"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useNotaStore } from "@/stores/notaStore";
import Nota from "../Nota/Nota.vue";
import type { Nota as NotaType } from "@/types/Nota/Nota";

const notaStore = useNotaStore();

const notaSelecionada = ref<NotaType | null>(null);

// Computed que retorna a última nota
const ultimaNota = computed((): NotaType | null => {
  if (notaStore.notas.length === 0) return null;
  return notaStore.notas[notaStore.notas.length - 1];
});

const selecionarNota = () => {
  if (ultimaNota.value) {
    notaSelecionada.value = ultimaNota.value;
  }
};

const removerNota = (id : string) => {
  notaStore.removerNota(id);
};
</script>
