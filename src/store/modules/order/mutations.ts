import { MutationTree } from 'vuex'
import { Product } from '@/store/models/product';
import { State } from './state';
import { Order } from '@/store/models/order';
import { Unit } from '@/store/models/product';
import { Batch } from '@/store/models/batch';
import { Inventory } from '@/store/models/company';


export enum MutationTypes {
  SetOrderStatus = 'SET_ORDER_STATUS',
  SetOrder = 'SET_ORDER',
  SetProductResults = 'SET_PRODUCT_RESULTS',
  SetRecentProducts = 'SET_RECENT_PRODUCTS',
  SetListOfOrders = 'SET_LIST_OF_ORDERS',
  SetOrderStatuses = 'SET_ORDER_STATUSES',
  SetListOfProducts = 'SET_LIST_OF_PRODUCTS',
  SetInventory = 'SET_INVENTORY',
  SetUnit = 'SET_UNIT',
  SetBatch = 'SET_BATCH',
  SetInvoiceID = "SetInvoiceID"
}

export type Mutations = {
  [MutationTypes.SetOrderStatus](state: State, value: string): void;
  [MutationTypes.SetOrder](state: State, order: Order): void;
  [MutationTypes.SetProductResults](state: State, productResults: Product[]): void;
  [MutationTypes.SetRecentProducts](state: State, recentProducts: Product[]): void;
  [MutationTypes.SetListOfOrders](state: State, orders: Order[]): void;
  [MutationTypes.SetOrderStatuses](state: State, statuses: {status: string}[]): void;
  [MutationTypes.SetListOfProducts](state: State, products: Product[]): void;
  [MutationTypes.SetInventory](state: State, inventory: Inventory[]): void;
  [MutationTypes.SetUnit](state: State, units: Unit[]): void;
  [MutationTypes.SetBatch](state: State, batch: Batch): void;
  [MutationTypes.SetInvoiceID](state: State, id: string): void;
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
  [MutationTypes.SetInventory](state, inventory) {
    state.inventory = inventory;
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
}