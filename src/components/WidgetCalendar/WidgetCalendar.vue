<script lang="ts" setup>
import { useCalendarStore } from "@/stores/calendarStore";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const calendarStore = useCalendarStore();

// Data atual formatada em pt-BR
const hoje = new Date();

const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(hoje);
const dia = new Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(hoje);

const dataAtual = ref(new Date());

const formatarData = (data: string): string => {
  const [ano, mes, dia] = data.split("-");
  const dateObj = new Date(Number(ano), Number(mes) - 1, Number(dia));
  // aqui não usa UTC, já pega direto a data no fuso local

  return new Intl.DateTimeFormat("pt-BR").format(dateObj);
};
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm w-full max-w-sm max-h-52 overflow-auto p-3"
  >
    <div>
      <h2 class="text-[#f64844] font-semibold text-lg capitalize">{{ mes }}</h2>
      <span class="text-4xl font-bold">{{ dia }}</span>
    </div>

    <div>
      <router-link
        to="/calendar"
        v-for="item in calendarStore.events"
        :key="item.id"
        class="mt-2 flex flex-col text-sm p-1 border-l-[3px]"
        :class="
          new Date(item.date).getTime() < dataAtual.getTime()
            ? 'text-red-800 bg-red-100'
            : 'text-green-800 bg-green-100'
        "
      >
        <span class="font-semibold">{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </router-link>
    </div>
  </div>
</template>

<style>
.custom-scroll::-webkit-scrollbar {
  width: 4px; /* largura da barra lateral */
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent; /* fundo */
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #f64844; /* cor da barra */
  border-radius: 9999px; /* bem arredondada */
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #d73734; /* cor quando passa o mouse */
}

::-webkit-scrollbar {
  display: none;
}

/* Esconde scrollbars no Firefox */
* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
</style>
