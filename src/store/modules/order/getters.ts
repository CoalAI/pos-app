import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { Unit, Product } from '@/store/models/product';
import { Order } from '@/store/models/order';
import { State } from './state';
import { state } from "../auth/state";

export interface Getters {
  getOrderStatus(state: State): string;
  getOrder(state: State): Order;
  getProductResults(state: State): Product[];
  getRecentProducts(state: State): any;
  getListOfProducts(state: State): Product[];
  getSignleProduct(state: State, id: number): any;
  getUnits(state: State): Unit[];
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
  getListOfProducts: (state: State) => {
    return state.listOfProducts;
  },
  getSignleProduct: (state: State) => (id: number) => {
    const product = state.listOfProducts.find((item: Product) => item.id && item.id === id);
    return product;
  },
  getUnits: (state: State) => {
    return state.units;
  },
  getError: (state: State) => {
    return state.error;
  }
};