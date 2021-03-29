import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { ProductResults } from '@/store/models/product';
import { Order } from '@/store/models/order';
import { State } from './state';

export interface Getters {
  getOrderStatus(state: State): string;
  getOrder(state: State): Order;
  getProductResults(state: State): ProductResults[];
  getRecentProducts(state: State): any;
  getError(state: State): any;
}

export const getters: GetterTree<State, IRootState> & Getters = {
  getOrderStatus: (state: State) => {
    return state.currentOrderStatus
  },
  getOrder: (state: State) => {
    return state.order;
  },
  getProductResults: (state: State) => {
    return state.productResults;
  },
  getRecentProducts: (state: State) => {
    return state.recentProducts;
  },
  getError: (state: State) => {
    return state.error
  }
};