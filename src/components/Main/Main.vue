<template>
  <main class="flex flex-col p-4 md:p-6 w-full max-w-full overflow-x-hidden">
    <!-- Saudação Redesign -->
    <div
      class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-10"
    >
      <div class="space-y-2 md:space-y-3 w-full">
        <div class="flex items-start md:items-center gap-3 md:gap-4">
          <div
            class="p-2 md:p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-sm flex-shrink-0"
          >
            <i class="ri-sun-line text-xl md:text-2xl text-yellow-600"></i>
          </div>
          <div class="min-w-0">
            <h1
              class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 truncate"
            >
              Bom dia,
              <span class="text-orange-600 font-semibold">Thiago</span>!
            </h1>
            <div
              class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 md:mt-2 w-full"
            >
              <p
                class="text-base md:text-lg lg:text-xl font-medium bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent truncate"
              >
                {{ frase }}
              </p>
              <span class="text-xs md:text-sm text-gray-500">
                - {{ autor }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Bloco direita (data e temperatura) -->
      <div
        class="flex flex-wrap gap-3 md:gap-4 justify-start lg:justify-end mt-4 lg:mt-0"
      >
        <div
          class="flex items-center gap-2 md:gap-3 bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <i class="ri-calendar-line text-gray-600 text-base md:text-lg"></i>
          <span
            class="text-xs md:text-sm font-medium text-gray-800 whitespace-nowrap"
            >{{ today }}</span
          >
        </div>

        <div
          class="flex items-center gap-2 md:gap-3 bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <i class="ri-temp-hot-line text-orange-600 text-base md:text-lg"></i>
          <div class="flex flex-col min-w-0">
            <span
              class="text-xs md:text-sm font-medium text-gray-800 whitespace-nowrap"
            >
              {{ temperatura }} °C
            </span>
            <span class="text-xs text-gray-500 truncate">{{ descricao }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <section class="mt-4 md:mt-6">
      <WidgetList />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import WidgetList from "../WidgetList/WidgetList.vue";
import quotes from "@/frases.json"; // ajusta o caminho
const frase = ref<string>("Carregando citação...");
const autor = ref<string>("");
const temperatura = ref<string>("");
const descricao = ref("Carregando...");

const today = ref(
  new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
);

function getTodayQuote() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem("dailyQuote") || "null");

  if (stored && stored.date === todayKey) {
    frase.value = stored.frase;
    autor.value = stored.autor;
  } else {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];

    frase.value = newQuote.frase;
    autor.value = newQuote.autor;

    localStorage.setItem(
      "dailyQuote",
      JSON.stringify({ ...newQuote, date: todayKey })
    );
  }
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (posicao) => {
      const lat = posicao.coords.latitude;
      const lon = posicao.coords.longitude;

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await res.json();
        temperatura.value = data.current_weather.temperature;

        // Para simplificação, traduzindo apenas o código do tempo
        const codigo = data.current_weather.weathercode;
        descricao.value = mapWeatherCode(codigo);
      } catch (erro) {
        descricao.value = "Erro ao carregar clima";
        console.error(erro);
      }
    });
  } else {
    descricao.value = "Geolocalização não suportada";
  }
});

// Função simples para traduzir código do Open-Meteo
function mapWeatherCode(code) {
  const mapa = {
    0: "Céu limpo",
    1: "Parcialmente nublado",
    2: "Nublado",
    3: "Nublado",
    45: "Nevoeiro",
    48: "Nevoeiro",
    51: "Garoa leve",
    53: "Garoa moderada",
    55: "Garoa intensa",
    61: "Chuva leve",
    63: "Chuva moderada",
    65: "Chuva forte",
    71: "Neve leve",
    73: "Neve moderada",
    75: "Neve forte",
    80: "Chuva de pancadas",
    81: "Chuva de pancadas forte",
    82: "Chuva de pancadas intensa",
    95: "Tempestade",
    96: "Tempestade com granizo",
    99: "Tempestade com granizo intenso",
  };
  return mapa[code] || "Desconhecido";
}

onMounted(getTodayQuote);
</script>
