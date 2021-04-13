import { ActionContext, ActionTree } from "vuex";
import { IRootState } from '@/store/models/root';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/store/modules/request'
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';
import { Order } from '@/store/models/order';
import { Product } from '@/store/models/product';

export enum ActionTypes {
  SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME",
  SEARCH_PRODUCT_BY_BARCODE = "SEARCH_PRODUCT_BY_BARCODE",
  CREATE_ORDER = "CREATE_ORDER",
  CHANGE_ORDER_STATUS = "CHANGE_ORDER_STATUS",
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_UNITS = "GET_UNITS",
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  DELETE_PRODUCT_Variant = "DELETE_PRODUCT_Variant"
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, IRootState>, "commit">;

export interface Actions {
  [ActionTypes.SEARCH_PRODUCT_BY_NAME]({ commit }: AugmentedActionContext, name: string): void;
  [ActionTypes.SEARCH_PRODUCT_BY_BARCODE]({ commit }: AugmentedActionContext, name: string): void;
  [ActionTypes.CREATE_ORDER]({ commit }: AugmentedActionContext, order: Order): void;
  [ActionTypes.CHANGE_ORDER_STATUS]({ commit }: AugmentedActionContext, value: string): void;
  [ActionTypes.GET_PRODUCTS]({ commit }: AugmentedActionContext, search: string): void;
  [ActionTypes.GET_UNITS]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CREATE_PRODUCT]({ commit }: AugmentedActionContext, product: Product): void;
  [ActionTypes.UPDATE_PRODUCT]({ commit }: AugmentedActionContext, data: {productID: string; product: Product}): void;
  [ActionTypes.DELETE_PRODUCT]({ commit }: AugmentedActionContext, productID: string): void;
  [ActionTypes.DELETE_PRODUCT_Variant]({ commit }: AugmentedActionContext, productVariantID: string): void;
}

export const actions: ActionTree<State, IRootState> &
Actions = {
  async [ActionTypes.SEARCH_PRODUCT_BY_NAME]({ commit }: AugmentedActionContext, name: string) {
    const response = await serverRequest('get', 'product/', true, undefined, {name__startswith: name});
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetProductResults, response.data.results);
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetError, response)
    }
  },
  async [ActionTypes.SEARCH_PRODUCT_BY_BARCODE]({ commit }: AugmentedActionContext, barcode: string) {
    const response = await serverRequest('get', 'product/', true, undefined, {bar_code__startswith: barcode});
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetProductResults, response.data.results);
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetError, response)
    }
  },
  async [ActionTypes.CREATE_ORDER]({ commit }: AugmentedActionContext, order: Order) {
    const response = await serverRequest('post', 'order/', true, order);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
      commit(MutationTypes.SetOrderStatus, 'Order is completed successfully.');
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetError, response)
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
      commit(MutationTypes.SetError, response)
    }
  },
  async [ActionTypes.GET_UNITS]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'unit/', true, undefined, undefined);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetUnit, response.data.results);
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetError, response)
    }
  },
  async [ActionTypes.CREATE_PRODUCT]({ commit }: AugmentedActionContext, product: Product) {
    const response = await serverRequest('post', 'product/', true, product);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetError, response);
    }
  },
  async [ActionTypes.UPDATE_PRODUCT]({ commit }: AugmentedActionContext, data: {productID: string; product: Product}) {
    const response = await serverRequest('put', `product/${data.productID}/`, true, data.product, undefined);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetError, response);
    }
  },
  async [ActionTypes.DELETE_PRODUCT]({ commit }: AugmentedActionContext, productID: string) {
    const response = await serverRequest('delete', `product/${productID}/`, true);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetError, response);
    }
  },
  async [ActionTypes.DELETE_PRODUCT_Variant]({ commit }: AugmentedActionContext, productVariantID: string) {
    const response = await serverRequest('delete', `product-variant/${productVariantID}/`, true);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetOrder, response.data);
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetError, response);
    }
  }
};