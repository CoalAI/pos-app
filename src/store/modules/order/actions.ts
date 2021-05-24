import { ActionContext, ActionTree, CommitOptions } from "vuex";
import { IRootState } from '@/store/models/root';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/store/modules/request'
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';
import { Order } from '@/store/models/order';
import { Product } from '@/store/models/product';
import { Batch } from '@/store/models/batch';


export enum ActionTypes {
  SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME",
  SEARCH_PRODUCT_BY_BARCODE = "SEARCH_PRODUCT_BY_BARCODE",
  FETCH_ORDERS = "FETCH_ORDERS",
  FETCH_ORDER_STATUSES = "FETCH_ORDER_STATUSES",
  CREATE_ORDER = "CREATE_ORDER",
  CHANGE_ORDER_STATUS = "CHANGE_ORDER_STATUS",
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_UNITS = "GET_UNITS",
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  DELETE_PRODUCT_Variant = "DELETE_PRODUCT_Variant",
  CREATE_BATCH = "CREATE_BATCH",
  UPDATE_BATCH = "UPDATE_BATCH",
  DELETE_BATCH = "DELETE_BATCH",
  FETCH_INVENTORY = "FETCH_INVENTORY",
  INTERNAL_ORDER = "INTERNAL_ORDER"
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
  [ActionTypes.FETCH_ORDERS]({ commit }: AugmentedActionContext, options: {id__contains?: string; cash?: boolean; status?: string; created?: Date}): void;
  [ActionTypes.FETCH_ORDER_STATUSES]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CREATE_ORDER]({ commit }: AugmentedActionContext, order: Order): void;
  [ActionTypes.CHANGE_ORDER_STATUS]({ commit }: AugmentedActionContext, value: string): void;
  [ActionTypes.GET_PRODUCTS]({ commit }: AugmentedActionContext, search: string): void;
  [ActionTypes.GET_UNITS]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CREATE_PRODUCT]({ commit }: AugmentedActionContext, product: Product): void;
  [ActionTypes.UPDATE_PRODUCT]({ commit }: AugmentedActionContext, data: {productID: string; product: Product}): void;
  [ActionTypes.DELETE_PRODUCT]({ commit }: AugmentedActionContext, productID: string): void;
  [ActionTypes.DELETE_PRODUCT_Variant]({ commit }: AugmentedActionContext, productVariantID: string): void;
  [ActionTypes.CREATE_BATCH]({ commit }: AugmentedActionContext, batch: Batch): void;
  [ActionTypes.UPDATE_BATCH]({ commit }: AugmentedActionContext, batch: Batch): void;
  [ActionTypes.DELETE_BATCH]({ commit }: AugmentedActionContext, batchID: string): void;
  [ActionTypes.FETCH_INVENTORY]({ commit }: AugmentedActionContext, data: {company?: number; search?: string}): void;
  [ActionTypes.INTERNAL_ORDER]({ commit }: AugmentedActionContext, order: Order): void;
}

export const actions: ActionTree<State, IRootState> &
Actions = {
  async [ActionTypes.SEARCH_PRODUCT_BY_NAME]({ commit }: AugmentedActionContext, name: string) {
    if (name === '') {
      commit(MutationTypes.SetProductResults, []);
    } else {
      const response = await serverRequest('get', 'product/', true, undefined, {name__istartswith: name});
      if (isAxiosResponse(response)) {
        commit(MutationTypes.SetProductResults, response.data.results);
      }
      if(isAxiosError(response)) {
        commit('setError', response, {root: true});
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
        commit('setError', response, {root: true});
      }
    }
  },
  async [ActionTypes.FETCH_ORDERS](
    { commit }: AugmentedActionContext,
    options: {
      id__contains?: string;
      cash?: boolean;
      status?: string;
      created__date?: Date;
    }
  ) {
    const response = await serverRequest('get', 'order/', true, undefined, options);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetListOfOrders, response.data.results);
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.FETCH_ORDER_STATUSES]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'order-type/', true);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrderStatuses, response.data.results);
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.CREATE_ORDER]({ commit }: AugmentedActionContext, order: Order) {
    const response = await serverRequest('post', 'order/', true, order);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
      commit(MutationTypes.SetOrderStatus, 'Order is completed successfully.');
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
      if (response.response && response.response.data &&  response.response.data.non_field_errors) {
        commit(MutationTypes.SetOrderStatus, response.response.data.non_field_errors);
      } else {
        commit(MutationTypes.SetOrderStatus, "Server side error. Kindly try again.");
      }
    }
  },
  [ActionTypes.CHANGE_ORDER_STATUS]({ commit }: AugmentedActionContext, value: string) {
    commit(MutationTypes.SetOrderStatus, value);
  },
  async [ActionTypes.GET_PRODUCTS]({ commit }: AugmentedActionContext, search: string) {
    let response;
    if (search) {
      response = await serverRequest('get', 'product/', true, undefined, {search: search});
    } else {
      response = await serverRequest('get', 'product/', true, undefined, undefined);
    }
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetListOfProducts, response.data.results);
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.GET_UNITS]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'unit/', true, undefined, undefined);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetUnit, response.data.results);
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.CREATE_PRODUCT]({ commit }: AugmentedActionContext, product: Product) {
    const response = await serverRequest('post', 'product/', true, product);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.UPDATE_PRODUCT]({ commit }: AugmentedActionContext, data: {productID: string; product: Product}) {
    const response = await serverRequest('put', `product/${data.productID}/`, true, data.product, undefined);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.DELETE_PRODUCT]({ commit }: AugmentedActionContext, productID: string) {
    const response = await serverRequest('delete', `product/${productID}/`, true);
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.DELETE_PRODUCT_Variant]({ commit }: AugmentedActionContext, productVariantID: string) {
    const response = await serverRequest('delete', `product-variant/${productVariantID}/`, true);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.CREATE_BATCH]({ commit }: AugmentedActionContext, batch: Batch) {
    const response = await serverRequest('post', `batch/`, true, batch);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetBatch, response.data);
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
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
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.FETCH_INVENTORY]({ commit }: AugmentedActionContext, data?: {company?: number; search?: string}) {
    let response;
    if (data) {
      response = await serverRequest('get', 'inventory/', true, undefined, data);
    } else {
      response = await serverRequest('get', `inventory/`, true);
    }
    if(isAxiosResponse(response)) {
      commit(MutationTypes.SetInventory, response.data.results)
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.INTERNAL_ORDER]({ commit }: AugmentedActionContext, order: Order) {
    const response = await serverRequest('post', 'internal-order/', true, order);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
      commit(MutationTypes.SetOrderStatus, 'Order is completed successfully.');
    }
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
      if (response.response && response.response.data &&  response.response.data.non_field_errors) {
        commit(MutationTypes.SetOrderStatus, response.response.data.non_field_errors);
      } else {
        commit(MutationTypes.SetOrderStatus, "Server side error. Kindly try again.");
      }
    }
  }
};