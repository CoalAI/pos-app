import { createApp } from "vue";
import App from './App.vue';
import { store } from './store/index';
import router from './router';
import vueDebounce from 'vue-debounce'
// Vue.config.productionTip = false;
import VueSocketIO from '@/plugins/socket-io/index'
// import VueSocketIO from "vue-socket.io";
import io from 'socket.io-client'

const app = createApp(App)

app.directive('focus', {
  // When the bound element is inserted into the DOM...
  mounted: function (el: HTMLElement) {
      // Focus the element
      el.focus();
  },
});

app.use(new VueSocketIO("http://localhost:3000", ['notification']));
app.use(vueDebounce);
app.use(store);
app.use(router);
app.mount("#app");