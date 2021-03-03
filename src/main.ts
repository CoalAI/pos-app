import { createApp } from "vue";
import App from './App.vue';
import { store } from './store/index';
import router from './router';

// Vue.config.productionTip = false;

const app = createApp(App)

app.use(store)
// .use(router)
app.mount("#app");

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount('#app');
