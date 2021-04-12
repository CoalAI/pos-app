import { MutationTree } from 'vuex'
import { ProductResults } from '@/store/models/product';
import { State } from './state';
import { Order } from '@/store/models/order';


export enum MutationTypes {
  SetOrderStatus = 'SET_ORDER_STATUS',
  SetOrder = 'SET_ORDER',
  SetProductResults = 'SET_PRODUCT_RESULTS',
  SetRecentProducts = 'SET_RECENT_PRODUCTS',
  SetError = 'SET_ERROR'
}

export type Mutations = {
  [MutationTypes.SetOrderStatus](state: State, value: string): void;
  [MutationTypes.SetOrder](state: State, order: Order): void;
  [MutationTypes.SetProductResults](state: State, productResults: ProductResults[]): void;
  [MutationTypes.SetRecentProducts](state: State, recentProducts: ProductResults[]): void;
  // eslint-disable-next-line
  [MutationTypes.SetError](state: State, error: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SetOrderStatus](state: State, value: string) {
    state.currentOrderStatus = value
  },
  [MutationTypes.SetOrder](state, order) {
    state.order = order
  },
  [MutationTypes.SetProductResults](state, productResults) {
    state.productResults = productResults
  },
  [MutationTypes.SetRecentProducts](state, recentProducts) {
    state.recentProducts = recentProducts
  },
  [MutationTypes.SetError](state, error) {
    state.error = error
  }
}