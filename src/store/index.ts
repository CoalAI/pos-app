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
    error: null
  },
  getters: {
    getError (state) {
      return state.error;
    }
  },
  mutations: {
    setError (state, error) {
      state.error = error;
    }
  },
  actions: {
    setError (context, error) {
      context.commit('setError', error);
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