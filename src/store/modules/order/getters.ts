import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { Unit, Product } from '@/store/models/product';
import { Order } from '@/store/models/order';
import { State } from './state';
import { Batch } from "@/store/models/batch";
import { Inventory } from "@/store/models/company";
import { Request } from "@/store/models/request";

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
  getSingleProduct(state: State): Product;
  getProductsCount(state: State): number;
  // eslint-disable-next-line
  getSignleProduct(state: State, id: number): any;
  getInventory(state: State): Inventory[];
  getListOfRequests(state: State): Request[];
  getUnits(state: State): Unit[];
  getBatch(state: State): Batch;
  getInvoiceID(state: State): string;
  getRequest(state: State): Request;
  getFieldError(state: State): any;
  getTotalCountsOrderModule(state: State): any;
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
  getSingleProduct: (state: State) => state.singleProduct,
  getProductsCount: (state: State) => state.productsCount,
  getSignleProduct: (state: State) => (id: number) => {
    const product = state.listOfProducts.find((item: Product) => item.id && item.id === id);
    return product;
  },
  getInventory: (state: State) => {
    return state.inventory;
  },
  getListOfRequests: (state: State) => {
    return state.listofRequests
  },
  getUnits: (state: State) => {
    return state.units;
  },
  getBatch: (state: State) => {
    return state.batch;
  },
  getInvoiceID: (state: State) => {
    return state.invoice_id;
  },
  getRequest: (state: State) => {
    return state.request;
  },
  getFieldError: (state: State) => state.error,
  getTotalCountsOrderModule: (state: State) => state.totalCounts,
};