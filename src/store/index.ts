import { createStore } from 'vuex';
import { createLogger, ModuleTree } from 'vuex';
import { IRootState } from './models/root'
import auth from './modules/auth/index';
import { AuthStoreModuleTypes } from './modules/auth/types';

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
  state: {
    root: true,
    version: '1.0.0'
  },
  modules
});

type StoreModules = {
  auth: AuthStoreModuleTypes;
};

export type Store = AuthStoreModuleTypes<Pick<StoreModules, "auth">>