import { ActionContext, ActionTree, CommitOptions } from "vuex";
import { IRootState } from '@/store/models/root';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/store/modules/request'
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';
import { Order } from '@/store/models/order';
import { Product } from '@/store/models/product';
import { Batch } from '@/store/models/batch';
import { Request } from "@/store/models/request";


export enum ActionTypes {
  SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME",
  SEARCH_PRODUCT_BY_BARCODE = "SEARCH_PRODUCT_BY_BARCODE",
  FETCH_ORDERS = "FETCH_ORDERS",
  FETCH_ORDER = "FETCH_ORDER",
  FETCH_ORDER_STATUSES = "FETCH_ORDER_STATUSES",
  CREATE_ORDER = "CREATE_ORDER",
  CHANGE_ORDER_STATUS = "CHANGE_ORDER_STATUS",
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_PRODUCTS_BY_PAGE = "GET_PRODUCTS_BY_PAGE",
  GET_UNITS = "GET_UNITS",
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  DELETE_PRODUCT_Variant = "DELETE_PRODUCT_Variant",
  CREATE_BATCH = "CREATE_BATCH",
  UPDATE_BATCH = "UPDATE_BATCH",
  DELETE_BATCH = "DELETE_BATCH",
  FETCH_INVENTORY = "FETCH_INVENTORY",
  INTERNAL_ORDER = "INTERNAL_ORDER",
  FETCH_INVOICE_ID = "FETCH_INVOICE_ID",
  CREATE_REQUEST = "CREATE_REQUEST",
  FETCH_REQUESTS = "FETCH_REQUESTS",
  UPDATE_REQUEST = "UPDATE_REQUEST",
  UPDATE_ORDER = "UPDATE_ORDER",
  SET_FIELD_ERROR = "SET_FIELD_ERROR",
}



export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K | string,
    // eslint-disable-next-line
    payload: Parameters<Mutations[K]>[1] | any,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, IRootState>, "commit">;

export interface Actions {
  [ActionTypes.SEARCH_PRODUCT_BY_NAME]({ commit }: AugmentedActionContext, name: string): void;
  [ActionTypes.SEARCH_PRODUCT_BY_BARCODE]({ commit }: AugmentedActionContext, name: string): void;
  [ActionTypes.FETCH_ORDERS]({ commit }: AugmentedActionContext, 
    options: {
      buyer__company?: number;
      seller_company?: number;
      id__contains?: string;
      cash?: boolean;
      status?: string;
      created?: Date;
      page?: number;
    }
  ): void;
  [ActionTypes.FETCH_ORDER]({ commit }: AugmentedActionContext, id: string): void;
  [ActionTypes.FETCH_ORDER_STATUSES]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CREATE_ORDER]({ commit }: AugmentedActionContext, order: Order): void;
  [ActionTypes.CHANGE_ORDER_STATUS]({ commit }: AugmentedActionContext, value: string): void;
  [ActionTypes.GET_PRODUCTS]({ commit }: AugmentedActionContext, search: string): void;
  [ActionTypes.GET_PRODUCTS_BY_PAGE]({ commit }: AugmentedActionContext, page?: number): void;
  [ActionTypes.GET_UNITS]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CREATE_PRODUCT]({ commit }: AugmentedActionContext, product: Product): void;
  [ActionTypes.UPDATE_PRODUCT]({ commit }: AugmentedActionContext, data: {productID: string; product: Product}): void;
  [ActionTypes.DELETE_PRODUCT]({ commit }: AugmentedActionContext, productID: string): void;
  [ActionTypes.DELETE_PRODUCT_Variant]({ commit }: AugmentedActionContext, productVariantID: string): void;
  [ActionTypes.CREATE_BATCH]({ commit }: AugmentedActionContext, batch: Batch): void;
  [ActionTypes.UPDATE_BATCH]({ commit }: AugmentedActionContext, batch: Batch): void;
  [ActionTypes.DELETE_BATCH]({ commit }: AugmentedActionContext, batchID: string): void;
  [ActionTypes.FETCH_INVENTORY]({ commit }: AugmentedActionContext, data: {company?: number; search?: string; page?: number}): void;
  [ActionTypes.INTERNAL_ORDER]({ commit }: AugmentedActionContext, order: Order): void;
  [ActionTypes.FETCH_INVOICE_ID]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CREATE_REQUEST]({ commit }: AugmentedActionContext, request: Request): void;
  [ActionTypes.FETCH_REQUESTS]({ commit }: AugmentedActionContext, options?: {sender__company?: number; receiver__company?: number; status: string; page?: number}): void;
  [ActionTypes.UPDATE_REQUEST]({ commit }: AugmentedActionContext, request: Request): void;
  [ActionTypes.UPDATE_ORDER]({ commit }: AugmentedActionContext, order: Order): void;
  [ActionTypes.SET_FIELD_ERROR]({ commit }: AugmentedActionContext, error: any): void;
}

export const actions: ActionTree<State, IRootState> &
Actions = {
  async [ActionTypes.SEARCH_PRODUCT_BY_NAME]({ commit }: AugmentedActionContext, name: string) {
    if (name === '') {
      commit(MutationTypes.SetProductResults, []);
    } else {
      const response = await serverRequest('get', 'product/', true, undefined, {name__contains: name});
      if (isAxiosResponse(response)) {
        commit(MutationTypes.SetProductResults, response.data.results);
      }
      if(isAxiosError(response)) {
        commit('setError', "Failed to search product!", {root: true});
      }
    }
  },
  async [ActionTypes.SEARCH_PRODUCT_BY_BARCODE]({ commit }: AugmentedActionContext, barcode: string) {
    if (barcode === '') {
      commit(MutationTypes.SetProductResults, []);
    } else {
      const response = await serverRequest('get', 'product/', true, undefined, {bar_code__iendswith: barcode});
      if (isAxiosResponse(response)) {
        commit(MutationTypes.SetProductResults, response.data.results);
      }
      if(isAxiosError(response)) {
        commit('setError', response.message, {root: true});
      }
    }
  },
  async [ActionTypes.FETCH_ORDERS](
    { commit }: AugmentedActionContext,
    options: {
      buyer__company?: number;
      seller_company?: number;
      id__contains?: string;
      invoice_id__contains?: string;
      cash?: boolean;
      status?: string;
      created__date?: Date;
      page?: number;
    }
  ) {
    const response = await serverRequest('get', 'order/', true, undefined, options);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrdersCount, response.data.count);
      commit(MutationTypes.SetListOfOrders, response.data.results);
    }
    if(isAxiosError(response)) {
      commit('setError', 'Failed to fetch orders!', {root: true});
    }
  },
  async [ActionTypes.FETCH_ORDER]({ commit }: AugmentedActionContext, id: string){
    const response = await serverRequest('get', `order/${id}`, true, undefined, undefined);
    if (isAxiosResponse(response) && response.data.results.length===1) {
      commit(MutationTypes.SetOrder, response.data.results[0]);
    }
    if(isAxiosError(response)) {
      commit('setError', `Failed to fetch order with id: ${id} !`, {root: true});
    }
  },
  async [ActionTypes.FETCH_ORDER_STATUSES]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'order-type/', true);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrderStatuses, response.data.results);
    }
    if(isAxiosError(response)) {
      commit('setError', 'Failed to fetch order statuses!', {root: true});
    }
  },
  async [ActionTypes.CREATE_ORDER]({ commit }: AugmentedActionContext, order: Order) {
    const response = await serverRequest('post', 'order/', true, order);
    if (isAxiosResponse(response)) {
      const response2 = await serverRequest('get', `order/${response.data.id}`, true);
      if(isAxiosResponse(response2) && response2.data.results && response2.data.results.length === 1 )
        commit(MutationTypes.SetOrder, response2.data.results[0]);
      commit(MutationTypes.SetOrderStatus, 'Order is completed successfully!.');
      commit(MutationTypes.SetError, {});  
    }
    if(isAxiosError(response)) {
      if (response.response && response.response.data){
          if( response.response.data.non_field_errors) {
            commit('setError', response.response.data.non_field_errors[0], {root: true});
          } else {
            commit(MutationTypes.SetError, response.response.data);   
          }
      }
      commit(MutationTypes.SetOrderStatus, "Failed to create the Order!.");
    }
  },
  [ActionTypes.CHANGE_ORDER_STATUS]({ commit }: AugmentedActionContext, value: string) {
    commit(MutationTypes.SetOrderStatus, value);
    commit(MutationTypes.SetOrder, {});
  },
  async [ActionTypes.GET_PRODUCTS]({ commit }: AugmentedActionContext, search: string) {
    let response;
    if (search) {
      response = await serverRequest('get', 'product/', true, undefined, {search: search});
    }else{
      response = await serverRequest('get', 'product/', true, undefined, undefined);
    }
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetListOfProducts, response.data.results);
      if(!search){
        commit(MutationTypes.SetProductsCount, response.data.count);
      }
    }
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.GET_PRODUCTS_BY_PAGE]({ commit }: AugmentedActionContext, page?: number) {
    let response;
    if (page) {
      response = await serverRequest('get', 'product/', true, undefined, {page: page});
    }else{
      response = await serverRequest('get', 'product/', true, undefined, undefined);
    }
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetListOfProducts, response.data.results);
    }
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.GET_UNITS]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'unit/', true, undefined, undefined);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetUnit, response.data.results);
    }
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.CREATE_PRODUCT]({ commit }: AugmentedActionContext, product: Product) {
    const response = await serverRequest('post', 'product/', true, product);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetError, {});
    }
    if(isAxiosError(response) && response.response && response.response.data) {
      if (response.response.data.non_field_errors) {
        commit('setError', response.response.data.non_field_errors, {root: true});
      } else {
        commit(MutationTypes.SetError, response.response.data);
      }
    }
  },
  async [ActionTypes.UPDATE_PRODUCT]({ commit }: AugmentedActionContext, data: {productID: string; product: Product}) {
    const response = await serverRequest('put', `product/${data.productID}/`, true, data.product, undefined);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.DELETE_PRODUCT]({ commit }: AugmentedActionContext, productID: string) {
    const response = await serverRequest('delete', `product/${productID}/`, true);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.DELETE_PRODUCT_Variant]({ commit }: AugmentedActionContext, productVariantID: string) {
    const response = await serverRequest('delete', `product-variant/${productVariantID}/`, true);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.CREATE_BATCH]({ commit }: AugmentedActionContext, batch: Batch) {
    const response = await serverRequest('post', `batch/`, true, batch);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetBatch, response.data);
    }
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.UPDATE_BATCH]({ commit }: AugmentedActionContext, batch: Batch) {
    const response = await serverRequest('patch', `batch/${batch.id}/`, true, batch);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.DELETE_BATCH]({ commit }: AugmentedActionContext, batchID: string) {
    const response = await serverRequest('delete', `batch/${batchID}/`, true);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.FETCH_INVENTORY]({ commit }: AugmentedActionContext, data: {company?: number; search?: string; page?: number}) {
    let response;
    if (data && data.search && data.search) {
      response = await serverRequest('get', 'inventory/', true, undefined, data);
    } else {
      response = await serverRequest('get', `inventory/`, true, data);
    }
    if(isAxiosResponse(response)) {
      commit(MutationTypes.SetInventoryCount, response.data.count)
      commit(MutationTypes.SetInventory, response.data.results)
    }
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.INTERNAL_ORDER]({ commit }: AugmentedActionContext, order: Order) {
    const response = await serverRequest('post', 'internal-order/', true, order);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
      commit(MutationTypes.SetOrderStatus, 'Order is completed successfully.');
    }
    if(isAxiosError(response)) {
      if (response.response && response.response.data &&  response.response.data.non_field_errors) {
        commit(MutationTypes.SetOrderStatus, response.response.data.non_field_errors);
      } else {
        commit(MutationTypes.SetOrderStatus, "Server side error. Kindly try again.");
      }
    }
  },
  async [ActionTypes.FETCH_INVOICE_ID]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'invoice-id/', true, undefined, undefined);
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0 && response.data.results[0].InvoiceID) {
        commit(MutationTypes.SetInvoiceID, response.data.results[0].InvoiceID);
      }
    }
  },
  async [ActionTypes.CREATE_REQUEST]({ commit }: AugmentedActionContext, request: Request) {
    const response = await serverRequest('post', `request/`, true, request);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetRequest, response.data);
    }
    if(isAxiosError(response) && response.response && response.response.data) {
      commit(MutationTypes.SetRequest, {});
      commit('setError', response.response.data, {root: true});
    }
  },
  async [ActionTypes.FETCH_REQUESTS]({ commit }: AugmentedActionContext, options: {sender__company?: number; receiver__company?: number; status: string; page?: number}) {
    let response;
    if (options.sender__company || options.receiver__company) {
      response = await serverRequest('get', 'request/', true, undefined, options);
    } else {
      response = await serverRequest('get', 'request/', true, undefined, {page: options.page});
    } 
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetRequestsCount,response.data.count);
      commit(MutationTypes.SetListOfRequests, response.data.results);
    }
  },
  async [ActionTypes.UPDATE_REQUEST]({ commit }: AugmentedActionContext, request: Request) {
    const response = await serverRequest('patch', `response/${request.id}/`, true, request);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.UPDATE_ORDER]({ commit }: AugmentedActionContext, order: Order) {
    const response = await serverRequest('patch', `order/${order.id}/`, true, order);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.SET_FIELD_ERROR]({ commit }: AugmentedActionContext, error: any) {
    commit(MutationTypes.SetError, error);
  },
};

