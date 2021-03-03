import { createStore } from 'vuex';
import { createLogger, ModuleTree } from 'vuex';
import { IRootState } from './models/root'
import auth from './modules/auth/index';

// Load Vuex
// Vue.use(Vuex);

// Create store
// export default new Vuex.Store({
//   modules: {
//     auth,
//   },
// });

const modules: ModuleTree<IRootState> = {
  auth
};

export const store = createStore<IRootState>({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules
});