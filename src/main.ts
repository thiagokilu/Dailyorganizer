import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // ✅ plugin de persistência

import App from "./App.vue";
import router from "./router";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Importa os ícones que quiser usar:
import {
  faUser,
  faSun,
  faCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Adiciona os ícones à biblioteca
library.add(faUser, faSun, faCheck, faEdit, faGithub);

// Cria o app e configura o Pinia com o plugin de persistência
const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // ✅ usa o plugin

app.use(pinia);
app.use(router);

// Registra o componente do FontAwesome globalmente
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
