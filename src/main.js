import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
//test

import App from './App.vue';
import router from './router';

import en from './assets/json/en.json';
import vn from './assets/json/vn.json';
import id from './assets/json/id.json';
import th from './assets/json/th.json';
import bm from './assets/json/bm.json';
import cn from './assets/json/cn.json';


// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vue-Sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// PrimeVue
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'

//Icons
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives
});

const mergedMessages = {
  en,
  vn,
  id,
  th,
  bm,
  cn
};

export const i18n = createI18n({
  silentFallbackWarn: true,
  locale: localStorage.getItem('lang') == null ? 'en' : localStorage.getItem('lang'),
  legacy: false,
  fallbackLocale: 'en',
  messages: mergedMessages,
  warnHtmlMessage: false
});

app.use(PrimeVue);

app.use(VueSweetalert2);
app.use(vuetify);
app.use(router);
app.use(i18n);
app.mount('#app');