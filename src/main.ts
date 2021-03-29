import { createApp, Directive } from "vue";
import App from './App.vue';
import { store } from './store/index';
import router from './router';

// Vue.config.productionTip = false;

const app = createApp(App)

app.directive('focus', {
  // When the bound element is inserted into the DOM...
  mounted: function (el: HTMLElement) {
      // Focus the element
      el.focus();
  },
});

app.use(store);
app.use(router);
app.mount("#app");