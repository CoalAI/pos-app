import { createApp } from "vue";
import App from './App.vue';
import { store } from './store/index';
import router from './router';
import vueDebounce from 'vue-debounce';
import offlineStoreService from "./utils/offline-store";
// Vue.config.productionTip = false;
import VueSocketIO from '@/plugins/socket-io/index'

const prod = process.env.NODE_ENV === 'production';
const shouldSW = 'serviceWorker' in navigator && prod;
const shouldSWDev = 'serviceWorker' in navigator && !prod;
if (shouldSW) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log("Service Worker Registered!");
  })
} else if (shouldSWDev) {
  navigator.serviceWorker.register('/service-worker-dev.js').then(() => {
    console.log('Dev Service Worker Registered!');
  })
}

// Offline Store
offlineStoreService.initialize();

const app = createApp(App)

app.directive('focus', {
  // When the bound element is inserted into the DOM...
  mounted: function (el: HTMLElement) {
      // Focus the element
      el.focus();
  },
});

// app.use(new VueSocketIO(process.env.VUE_APP_NOTIFICATION_SERVER_IP, ['notification']));
app.use(vueDebounce);
app.use(store);
app.use(router);
app.mount("#app");
