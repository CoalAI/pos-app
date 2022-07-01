import { MutationTree } from 'vuex'
import { Category, Product } from '@/store/models/product';
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
  SetListOfBatches = 'SET_LIST_OF_BATCHES',
  SetOrderStatuses = 'SET_ORDER_STATUSES',
  SetListOfProducts = 'SET_LIST_OF_PRODUCTS',
  SetSingleProduct = 'SET_SINGLE_PRODUCT',
  SetInventory = 'SET_INVENTORY',
  SetListOfRequests = 'SET_LIST_OF_REQUEST',
  SetUnit = 'SET_UNIT',
  SetCategories = 'SET_CATEGORIES',
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
  SetExpenseSales = "SET_EXPENSE_SALES",
  SetSalesanalytics = "SET_SALESANALYTICS",
  SetTotalPayableReceivable = 'SET_TOTAL_PAYABLE_RECEIVABLE',
  SetComparisonAnalysis = 'SET_COMPARISON_ANALYSIS',
  SetInventoryTotalAmount = 'SET_INVENTORY_TOTAL_AMOUNT',
  SetLogoImgage = 'SET_LOGO_IMAGE',
}

export type Mutations = {
  [MutationTypes.SetOrderStatus](state: State, value: string): void;
  [MutationTypes.SetOrder](state: State, order: Order): void;
  [MutationTypes.SetProductResults](state: State, productResults: Product[]): void;
  [MutationTypes.SetRecentProducts](state: State, recentProducts: Product[]): void;
  [MutationTypes.SetListOfOrders](state: State, orders: Order[]): void;
  [MutationTypes.SetListOfBatches](state: State, batches: Batch[]): void;
  [MutationTypes.SetOrderStatuses](state: State, statuses: {status: string}[]): void;
  [MutationTypes.SetListOfProducts](state: State, products: Product[]): void;
  [MutationTypes.SetSingleProduct](state: State, product: Product): void;
  [MutationTypes.SetProductsCount](state: State, productCount: number): void;
  [MutationTypes.SetInventory](state: State, inventory: Inventory[]): void;
  [MutationTypes.SetListOfRequests](state: State, requests: Request[]): void;
  [MutationTypes.SetUnit](state: State, units: Unit[]): void;
  [MutationTypes.SetCategories](state: State, categories: Category[]): void;
  [MutationTypes.SetBatch](state: State, batch: Batch): void;
  [MutationTypes.SetInvoiceID](state: State, id: string): void;
  [MutationTypes.SetRequest](state: State, request: Request): void;
  [MutationTypes.SetError](state: State, error: any): void;
  [MutationTypes.SetOrdersCount](state: State, count: number): void;
  [MutationTypes.SetBatchesCount](state: State, count: number): void;
  [MutationTypes.SetRequestsCount](state: State, count: number): void;
  [MutationTypes.SetInventoryCount](state: State, count: number): void;
  [MutationTypes.SetAnalytics](state: State, value: any): void;
  [MutationTypes.SetExpenseSales](state: State, value: any): void;
  [MutationTypes.SetSalesanalytics](state: State, value: any): void;
  [MutationTypes.SetTotalPayableReceivable](state: State, value: any): void;
  [MutationTypes.SetComparisonAnalysis](state: State, value: any): void;
  [MutationTypes.SetInventoryTotalAmount](state: State, value: number): void;
  [MutationTypes.SetLogoImgage](state: State, value: string): void;
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
  [MutationTypes.SetInventoryTotalAmount](state, value) {
    state.totalinventoryamount = value;
  },
  [MutationTypes.SetListOfRequests](state: State, requests: Request[]) {
    state.listofRequests = requests;
  },
  [MutationTypes.SetUnit](state, units) {
    state.units = units;
  },
  [MutationTypes.SetCategories](state, categories) {
    state.categories = categories;
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
  [MutationTypes.SetListOfBatches](state: State, batches: Batch[]) {
    state.listOfBatches = batches;
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
  },
  [MutationTypes.SetExpenseSales](state: State, value: any) {
    state.expensesales = value;
  },
  [MutationTypes.SetSalesanalytics](state: State, value: any) {
    state.salesanalytics = value;
  },
  [MutationTypes.SetTotalPayableReceivable](state: State, value: any){
    state.totalpayablereceivable = value;
  },
  [MutationTypes.SetComparisonAnalysis](state: State, value: any){
    state.comparisonanalysis = value;
  },
  [MutationTypes.SetLogoImgage](state: State, value: string){
    state.logoimage = value;
  }
}