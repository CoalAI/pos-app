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

<<<<<<< HEAD
app.use(new VueSocketIO(process.env.NOTIFICATION_SERVER_IP, ['notification']));
=======
>>>>>>> 470d67495083250577403a3661f16fbc17b8aff9
app.use(vueDebounce);
app.use(store);
app.use(router);
app.mount("#app");