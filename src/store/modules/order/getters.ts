import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { Unit, Product } from '@/store/models/product';
import { Order } from '@/store/models/order';
import { State } from './state';

export interface Getters {
  getOrderStatus(state: State): string;
  getOrder(state: State): Order;
  getProductResults(state: State): Product[];
  getRecentProducts(state: State): Product[];
  getListOfProducts(state: State): Product[];
  // eslint-disable-next-line
  getSignleProduct(state: State, id: number): any;
  getUnits(state: State): Unit[];
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
  }
};