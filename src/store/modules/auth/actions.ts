import { ActionContext, ActionTree, CommitOptions} from "vuex";
import { IRootState } from '@/store/models/root';
import { User, Credentials } from '@/store/models/user';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/store/modules/request'
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';
import { Company } from '@/store/models/company';
import { Transaction } from "@/store/models/transaction";

export enum ActionTypes {
  FETCH_TOEKN = "FETCH_TOEKN",
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  UPDATE_USER = "UPDATE_USER",
  LOGOUT_USER = "LOGOUT_USER",
  USER_DATA = "USER_DATA",
  GET_USERS = "GET_USERS",
  GET_USERS_BY_TYPES = "GET_USERS_BY_TYPES",
  GET_USERS_BY_TYPE = "GET_USERS_BY_TYPE",
  CREATE_EXPENSE = "CREATE_EXPENSE",
  FETCH_TYPES = "FETCH_TYPES",
  FETCH_COMPANIES = "FETCH_COMPANIES",
  CREATE_COMPANY = "CREATE_COMPANY",
  UPDATE_COMPANY = "UPDATE_COMPANY",
  DELETE_COMPANY = "DELETE_COMPANY",
  FETCH_VENDORS = "FETCH_VENDORS",
  FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS",
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
  [ActionTypes.FETCH_TOEKN]({ commit }: AugmentedActionContext): void;
  [ActionTypes.LOGIN_USER]({ commit }: AugmentedActionContext, credentials: Credentials): void;
  [ActionTypes.REGISTER_USER]({ commit }: AugmentedActionContext, user: User): void;
  [ActionTypes.UPDATE_USER]({ commit }: AugmentedActionContext, updUser: User): void;
  [ActionTypes.LOGOUT_USER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.USER_DATA]({ commit }: AugmentedActionContext): void;
  [ActionTypes.GET_USERS]({ commit }: AugmentedActionContext, options?: {search?: string; company?: number; contact_number?: string}): void;
  [ActionTypes.GET_USERS_BY_TYPES]({ commit }: AugmentedActionContext, user_types: string[]): void;

  [ActionTypes.GET_USERS_BY_TYPE]({ commit}: AugmentedActionContext, options?: {user_type?: string; search?: string }): void;
  [ActionTypes.CREATE_EXPENSE]({ commit }: AugmentedActionContext, transaction: Transaction): void;
  [ActionTypes.FETCH_TYPES]({ commit }: AugmentedActionContext): void;
  [ActionTypes.FETCH_COMPANIES]({ commit }: AugmentedActionContext, options: {company_type?: string; search?: string}): void;
  [ActionTypes.CREATE_COMPANY]({ commit }: AugmentedActionContext, company: Company): void;
  [ActionTypes.UPDATE_COMPANY]({ commit }: AugmentedActionContext, company: Company): void;
  [ActionTypes.DELETE_COMPANY]({ commit }: AugmentedActionContext, companyID: number): void;
  [ActionTypes.FETCH_VENDORS]({ commit }: AugmentedActionContext, search: string): void;
  [ActionTypes.FETCH_TRANSACTIONS]({ commit }: AugmentedActionContext, search_criteria: {start_date?: string; end_date?: string}): void;
  [ActionTypes.SET_FIELD_ERROR]({ commit }: AugmentedActionContext, error: any): void;

}

export const actions: ActionTree<State, IRootState> &
Actions = {
  async [ActionTypes.FETCH_TOEKN]({ commit }: AugmentedActionContext) {
    if ('token' in localStorage) {
      if (localStorage.getItem('token')) {
        commit(MutationTypes.SetToken, localStorage.getItem('token') || '');
      }
    }
  },
  async [ActionTypes.LOGIN_USER]({ commit }: AugmentedActionContext, credentials: Credentials) {
    const response = await serverRequest('post', 'obtain-jwt/', false, credentials);
    if (isAxiosResponse(response)) {
      localStorage.token = response.data && response.data.token ? response.data.token : '';
      commit(MutationTypes.SetToken, response.data.token);
    }
    if(isAxiosError(response)) {
      if (response.response && response.response.data)
      {
        if(response.response.data.non_field_errors && response.response.data.non_field_errors.length>=1)
          commit('setError', response.response.data.non_field_errors[0], {root: true});
        else
          commit('setError', response.response.data, {root: true});
      }
    }
  },
  async [ActionTypes.REGISTER_USER]({ commit }: AugmentedActionContext, user: User) {
    const response = await serverRequest('post', 'create/user/', true, user);
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
  async [ActionTypes.UPDATE_USER]({ commit }: AugmentedActionContext, updUser: User) {
    const response = await serverRequest('patch', `user/${updUser.id}/`, true, updUser);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.LOGOUT_USER]({ commit }: AugmentedActionContext) {
    localStorage.clear();
    commit(MutationTypes.SetToken, '');
  },
  async [ActionTypes.USER_DATA]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'user-data/', true, undefined, undefined);
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0) {
        commit(MutationTypes.SetUser, response.data.results[0]);
      }
    }
  },
  async [ActionTypes.GET_USERS]({ commit }: AugmentedActionContext, options?: {search?: string; company?: number; contact_number?: string}) {
    let response;
    if (options) {
      response = await serverRequest('get', 'user/', true, undefined, options);
    } else {
      response = await serverRequest('get', 'user/', true, undefined, undefined);
    }
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetListOfUsers, response.data.results)
    }
  },
  async [ActionTypes.GET_USERS_BY_TYPES]({ commit}: AugmentedActionContext, user_types: string[]) {
    const params = new URLSearchParams();
    for(const user_type of user_types) {
      params.append('user_type', user_type);
    }
    const response = await serverRequest('get', 'user/', true, undefined, params);
    const loggedInUser = await serverRequest('get', 'user-data/', true, undefined, undefined);
    if (isAxiosResponse(response) && isAxiosResponse(loggedInUser)) {
      if (response.data.results.length > 0 && loggedInUser.data.results.length > 0) {
        const usersData = response.data.results;
        usersData.filter((user: User) => user.id !== loggedInUser.data.results[0].id);
        commit(MutationTypes.SetListOfUsers, usersData)
      }
    }
  },
  async [ActionTypes.GET_USERS_BY_TYPE]({ commit}: AugmentedActionContext, options?: {user_type?: string; search?: string}) {
    const response = await serverRequest('get', 'user/', true, undefined, options);
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0) {
        const usersData = response.data.results;
        commit(MutationTypes.SetListOfUsers, usersData)
      }
    }
  },
  async [ActionTypes.CREATE_EXPENSE]({ commit }: AugmentedActionContext, transaction: Transaction) {
    const response = await serverRequest('post', `transaction/`, true, transaction);
    if(isAxiosResponse(response)) {
      commit(MutationTypes.SetExpense, response.data)
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetExpense, {})
      commit('setError', response.message , {root: true});
    }
  },

  async [ActionTypes.FETCH_TYPES]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'type/', true, undefined, undefined);
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0) {
        commit(MutationTypes.SetTypes, response.data.results);
      }
    }
  },
  async [ActionTypes.FETCH_COMPANIES]({ commit }: AugmentedActionContext, options: {company_type?: string; search?: string}) {
    const response = await serverRequest('get', 'company/', true, undefined, options);
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0) {
        commit(MutationTypes.SetCompanies, response.data.results)
      }
    }
    if(isAxiosError(response)) {
      if(response.response && response.response.data){
        commit('setError', response.response.data, {root: true});
      }
    }
  },
  async [ActionTypes.CREATE_COMPANY]({ commit }: AugmentedActionContext, company: Company) {
    const response = await serverRequest('post', `company/`, true, company);
    
    if(isAxiosResponse(response)){
      commit(MutationTypes.SetError, {});
    }
    
    if(isAxiosError(response)) {
      let error_message = "Failed to create company!";
      if (response.response && response.response.data){
        if( response.response.data.non_field_errors) {
          error_message = response.response.data.non_field_errors[0];
        } else {
          commit(MutationTypes.SetError, response.response.data);   
        }
      }
      commit('setError', error_message, {root: true});
    }
  },
  async [ActionTypes.UPDATE_COMPANY]({ commit }: AugmentedActionContext, company: Company) {
    const response = await serverRequest('patch', `company/${company.id}/`, true, company);
    if(isAxiosError(response)) {
      commit('setError', `Failed to update company with id: ${company.id}!`, {root: true});
    }
  },
  async [ActionTypes.DELETE_COMPANY]({ commit }: AugmentedActionContext, companyID: number) {
    const response = await serverRequest('delete', `company/${companyID}/`, true);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.FETCH_VENDORS]({ commit }: AugmentedActionContext, search: string) {
    let response;
    if (search) {
      response = await serverRequest('get', 'vendor/', true, undefined, {search: search});
    } else {
      response = await serverRequest('get', 'vendor/', true, undefined, undefined);
    }
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0) {
        commit(MutationTypes.SetListOfVendors, response.data.results)
      }
    }
    if(isAxiosError(response)) {
      if(response.response && response.response.data){
        commit('setError', response.response.data, {root: true});
      }
    }
  },
  async [ActionTypes.FETCH_TRANSACTIONS]({ commit }: AugmentedActionContext, search_criteria: {start_date?: string; end_date?: string}) {
    let response;
    if (search_criteria) {
      response = await serverRequest('get', 'transaction/', true, undefined, {start_date: search_criteria.start_date, end_date:search_criteria.end_date});
    } else {
      const now = new Date().toLocaleDateString()
      response = await serverRequest('get', 'transaction/', true, undefined, {start_date: now});
    }
    if (isAxiosResponse(response)) {
        commit(MutationTypes.SetTransactions, response.data.results)
    }
    if(isAxiosError(response)) {
      if(response.response && response.response.data){
        commit('setError', response.response.data, {root: true});
      }
    }
  },
  async [ActionTypes.SET_FIELD_ERROR]({ commit }: AugmentedActionContext, error: any) {
    commit(MutationTypes.SetError, error);
  },
};