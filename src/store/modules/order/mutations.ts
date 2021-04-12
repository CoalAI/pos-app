import { MutationTree } from 'vuex'
import { Product } from '@/store/models/product';
import { State } from './state';
import { Order } from '@/store/models/order';
import { Unit } from '@/store/models/product';


export enum MutationTypes {
  SetOrderStatus = 'SET_ORDER_STATUS',
  SetOrder = 'SET_ORDER',
  SetProductResults = 'SET_PRODUCT_RESULTS',
  SetRecentProducts = 'SET_RECENT_PRODUCTS',
  SetListOfProducts = 'SET_LIST_OF_PRODUCTS',
  SetUnit = 'SET_UNIT',
  SetError = 'SET_ERROR'
}

export type Mutations = {
  [MutationTypes.SetOrderStatus](state: State, value: string): void;
  [MutationTypes.SetOrder](state: State, order: Order): void;
  [MutationTypes.SetProductResults](state: State, productResults: Product[]): void;
  [MutationTypes.SetRecentProducts](state: State, recentProducts: any): void;
  [MutationTypes.SetListOfProducts](state: State, products: Product[]): void;
  [MutationTypes.SetUnit](state: State, units: Unit[]): void;
  // eslint-disable-next-line
  [MutationTypes.SetError](state: State, error: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SetOrderStatus](state, value) {
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
  [MutationTypes.SetListOfProducts](state, products) {
    state.listOfProducts = products;
  },
  [MutationTypes.SetUnit](state, units) {
    state.units = units;
  },
  [MutationTypes.SetError](state, error) {
    state.error = error
  }
}