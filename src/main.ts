import { createApp } from "vue";
import App from './App.vue';
import { store } from './store/index';
import router from './router';
import vueDebounce from 'vue-debounce'
// Vue.config.productionTip = false;
import VueSocketIO from '@/plugins/socket-io/index'


const app = createApp(App)

app.directive('focus', {
  // When the bound element is inserted into the DOM...
  mounted: function (el: HTMLElement) {
      // Focus the element
      el.focus();
  },
});

app.use(new VueSocketIO(process.env.VUE_APP_NOTIFICATION_SERVER_IP, ['notification']));
app.use(vueDebounce);
app.use(store);
app.use(router);
app.mount("#app");
