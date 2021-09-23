import { MutationTree } from 'vuex'
import { Product } from '@/store/models/product';
import { State } from './state';
import { Order } from '@/store/models/order';
import { Unit } from '@/store/models/product';
import { Batch } from '@/store/models/batch';
import { Inventory } from '@/store/models/company';
import { Request } from '@/store/models/request';


export enum MutationTypes {
  SetOrderStatus = 'SET_ORDER_STATUS',
  SetOrder = 'SET_ORDER',
  SetProductResults = 'SET_PRODUCT_RESULTS',
  SetRecentProducts = 'SET_RECENT_PRODUCTS',
  SetListOfOrders = 'SET_LIST_OF_ORDERS',
  SetOrderStatuses = 'SET_ORDER_STATUSES',
  SetListOfProducts = 'SET_LIST_OF_PRODUCTS',
  SetSingleProduct = 'SET_SINGLE_PRODUCT',
  SetInventory = 'SET_INVENTORY',
  SetListOfRequests = 'SET_LIST_OF_REQUEST',
  SetUnit = 'SET_UNIT',
  SetBatch = 'SET_BATCH',
  SetInvoiceID = "SET_INVOICEID",
  SetRequest = "SET_REQUEST",
  SetError = "SET_ERROR",
  SetOrdersCount = "SET_ORDERS_COUNT",
  SetProductsCount = "SET_PRODUCTS_COUNT",
  SetBatchesCount = "SET_BATCHES_COUNT",
  SetInventoryCount = "SET_INVENTORY_COUNT",
  SetRequestsCount = "SET_REQUESTS_COUNT",
  SetAnalytics = "SET_ANALYTICS",
}

export type Mutations = {
  [MutationTypes.SetOrderStatus](state: State, value: string): void;
  [MutationTypes.SetOrder](state: State, order: Order): void;
  [MutationTypes.SetProductResults](state: State, productResults: Product[]): void;
  [MutationTypes.SetRecentProducts](state: State, recentProducts: Product[]): void;
  [MutationTypes.SetListOfOrders](state: State, orders: Order[]): void;
  [MutationTypes.SetOrderStatuses](state: State, statuses: {status: string}[]): void;
  [MutationTypes.SetListOfProducts](state: State, products: Product[]): void;
  [MutationTypes.SetSingleProduct](state: State, product: Product): void;
  [MutationTypes.SetProductsCount](state: State, productCount: number): void;
  [MutationTypes.SetInventory](state: State, inventory: Inventory[]): void;
  [MutationTypes.SetListOfRequests](state: State, requests: Request[]): void;
  [MutationTypes.SetUnit](state: State, units: Unit[]): void;
  [MutationTypes.SetBatch](state: State, batch: Batch): void;
  [MutationTypes.SetInvoiceID](state: State, id: string): void;
  [MutationTypes.SetRequest](state: State, request: Request): void;
  [MutationTypes.SetError](state: State, error: any): void;
  [MutationTypes.SetOrdersCount](state: State, count: number): void;
  [MutationTypes.SetBatchesCount](state: State, count: number): void;
  [MutationTypes.SetRequestsCount](state: State, count: number): void;
  [MutationTypes.SetInventoryCount](state: State, count: number): void;
  [MutationTypes.SetAnalytics](state: State, value: any): void;
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
  [MutationTypes.SetListOfOrders](state: State, orders: Order[]) {
    state.listOfOrders = orders;
  },
  [MutationTypes.SetOrderStatuses](state: State, statuses: {status: string}[]) {
    state.OrderStatuses = statuses;
  },
  [MutationTypes.SetListOfProducts](state, products) {
    state.listOfProducts = products;
  },
  [MutationTypes.SetSingleProduct](state: State, product: Product) {
    state.singleProduct = product;
  },
  [MutationTypes.SetProductsCount](state: State, productCount: number) {
    state.productsCount = productCount;
  },
  [MutationTypes.SetInventory](state, inventory) {
    state.inventory = inventory;
  },
  [MutationTypes.SetListOfRequests](state: State, requests: Request[]) {
    state.listofRequests = requests;
  },
  [MutationTypes.SetUnit](state, units) {
    state.units = units;
  },
  [MutationTypes.SetBatch](state: State, batch: Batch) {
    state.batch = batch;
  },
  [MutationTypes.SetInvoiceID](state: State, id: string) {
    state.invoice_id = id;
  },
  [MutationTypes.SetRequest](state: State, request: Request) {
    state.request = request;
  },
  [MutationTypes.SetError](state: State, error: any) {
    state.error = error;
  },
  [MutationTypes.SetOrdersCount](state: State, count: number) {
    state.totalCounts.orders = count;
  },
  [MutationTypes.SetBatchesCount](state: State, count: number) {
    state.totalCounts.batches = count;
  },
  [MutationTypes.SetInventoryCount](state: State, count: number) {
    state.totalCounts.inventory = count;
  },
  [MutationTypes.SetRequestsCount](state: State, count: number) {
    state.totalCounts.requests = count;
  },
  [MutationTypes.SetAnalytics](state: State, value: any) {
    state.analytics = value;
  }
}