import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { Unit, Product } from '@/store/models/product';
import { Order } from '@/store/models/order';
import { State } from './state';
import { Batch } from "@/store/models/batch";
import { Inventory } from "@/store/models/company";

export interface Getters {
  getOrderStatus(state: State): string;
  getOrder(state: State): Order;
  getProductResults(state: State): Product[];
  getRecentProducts(state: State): Product[];
  getListOfOrders(state: State): Order[];
  getOrderStatuses(state: State): {status: string}[];
  // eslint-disable-next-line
  getSignleOrder(state: State, id: number): any;
  getListOfProducts(state: State): Product[];
  // eslint-disable-next-line
  getSignleProduct(state: State, id: number): any;
  getInventory(state: State): Inventory[];
  getUnits(state: State): Unit[];
  getBatch(state: State): Batch;
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
  getListOfOrders: (state: State) => {
    return state.listOfOrders
  },
  getOrderStatuses: (state: State) => {
    return state.OrderStatuses
  },
  getSignleOrder: (state: State) => (id: number) => {
    const order = state.listOfOrders.find((item: Order) => item.id && item.id === id);
    return order;
  },
  getListOfProducts: (state: State) => {
    return state.listOfProducts;
  },
  getSignleProduct: (state: State) => (id: number) => {
    const product = state.listOfProducts.find((item: Product) => item.id && item.id === id);
    return product;
  },
  getInventory: (state: State) => {
    return state.inventory;
  },
  getUnits: (state: State) => {
    return state.units;
  },
  getBatch: (state: State) => {
    return state.batch;
  }
};