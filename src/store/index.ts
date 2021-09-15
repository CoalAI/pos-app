import { createStore } from 'vuex';
import { createLogger, ModuleTree } from 'vuex';
import { IRootState } from './models/root'
import auth from './modules/auth/index';
import order from './modules/order/index'
import { AuthStoreModuleTypes } from './modules/auth/types';
import { OrderStoreModuleTypes } from './modules/order/types';

const modules: ModuleTree<IRootState> = {
  auth,
  order
};

export const store = createStore<IRootState>({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  state: {
    root: true,
    version: '1.0.0',
    error: null,
    sync: false,
    offlineMode: process.env.VUE_APP_OFFLINE_SAVE_DATA as boolean || true,
  },
  getters: {
    getError (state) {
      return state.error;
    },
    getSync (state) {
      return state.sync;
    },
    getOfflineMode (state) {
      return state.offlineMode;
    }
  },
  mutations: {
    setError (state, error) {
      state.error = error;
    },
    changeSync (state, val) {
      state.sync = val;
    },
  },
  actions: {
    setError (context, error) {
      context.commit('setError', error);
    },
    setSync (context, flag) {
      context.commit('changeSync', flag);
    }
  },
  modules
});

type StoreModules = {
  auth: AuthStoreModuleTypes;
  order: OrderStoreModuleTypes;
};

export type Store = AuthStoreModuleTypes<Pick<StoreModules, "auth">> &
OrderStoreModuleTypes<Pick<StoreModules, "order">>;