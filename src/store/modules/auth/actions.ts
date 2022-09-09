import { ActionContext, ActionTree, CommitOptions} from "vuex";
import { IRootState } from '@/store/models/root';
import { User, Credentials } from '@/store/models/user';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/utils/request';
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';
import { Company } from '@/store/models/company';
import { Transaction } from "@/store/models/transaction";
import offlineStoreService from '@/utils/offline-store';


export enum ActionTypes {
  FETCH_TOEKN = "FETCH_TOEKN",
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  UPDATE_USER = "UPDATE_USER",
  LOGOUT_USER = "LOGOUT_USER",
  USER_DATA = "USER_DATA",
  GET_USERS = "GET_USERS",
  GET_All_USERS = "GET_All_USERS",
  GET_USERS_BY_TYPES = "GET_USERS_BY_TYPES",
  GET_CUSTOMER_USERS = "GET_CUSTOMER_USERS",
  CREATE_EXPENSE = "CREATE_EXPENSE",
  CREATE_JOURNAL_ENTRY = "CREATE_JOURNAL_ENTRY",
  FETCH_TYPES = "FETCH_TYPES",
  FETCH_COMPANY = "FETCH_COMPANY",
  FETCH_COMPANIES = "FETCH_COMPANIES",
  FETCH_ALL_COMPANIES = "FETCH_ALL_COMPANIES",
  CREATE_COMPANY = "CREATE_COMPANY",
  UPDATE_COMPANY = "UPDATE_COMPANY",
  DELETE_COMPANY = "DELETE_COMPANY",
  FETCH_VENDORS = "FETCH_VENDORS",
  FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS",
  SET_FIELD_ERROR = "SET_FIELD_ERROR",
  SOCKET_notification = "SOCKET_notification"
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
  [ActionTypes.UPDATE_USER]({ commit }: AugmentedActionContext, data: {updUser: User; id: number}): void;
  [ActionTypes.LOGOUT_USER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.USER_DATA]({ commit }: AugmentedActionContext): void;
  [ActionTypes.GET_USERS]({ commit }: AugmentedActionContext, options?: {search?: string; company?: number; contact_number?: string; page?: number}): void;
  [ActionTypes.GET_All_USERS]({ commit }: AugmentedActionContext, company?: string): void;
  [ActionTypes.GET_USERS_BY_TYPES]({ commit }: AugmentedActionContext, user_types: string[]): void;
  [ActionTypes.GET_CUSTOMER_USERS]({ commit}: AugmentedActionContext, options?: {user_type?: string; search?: string; page?: number}): void;
  [ActionTypes.CREATE_EXPENSE]({ commit }: AugmentedActionContext, transaction: Transaction): void;
  [ActionTypes.CREATE_JOURNAL_ENTRY]({ commit }: AugmentedActionContext, data: any): void;
  [ActionTypes.FETCH_TYPES]({ commit }: AugmentedActionContext): void;
  [ActionTypes.FETCH_COMPANIES]({ commit }: AugmentedActionContext, options: {company_type?: string; search?: string; page?: number}): void;
  [ActionTypes.FETCH_ALL_COMPANIES]({ commit }: AugmentedActionContext, company: Company): void;
  [ActionTypes.CREATE_COMPANY]({ commit }: AugmentedActionContext, company: Company): void;
  [ActionTypes.FETCH_COMPANY]({ commit }: AugmentedActionContext, companyID: number): void;
  [ActionTypes.UPDATE_COMPANY]({ commit }: AugmentedActionContext, company: Company): void;
  [ActionTypes.DELETE_COMPANY]({ commit }: AugmentedActionContext, companyID: number): void;
  [ActionTypes.FETCH_VENDORS]({ commit }: AugmentedActionContext, options: {search?: string; page?: number}): void;
  [ActionTypes.FETCH_TRANSACTIONS]({ commit }: AugmentedActionContext, search_criteria: {start_date?: string; end_date?: string; page?: number}): void;
  [ActionTypes.SET_FIELD_ERROR]({ commit }: AugmentedActionContext, error: any): void;
  [ActionTypes.SOCKET_notification]({ commit }: AugmentedActionContext, data: any): void;
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
  async [ActionTypes.UPDATE_USER]({ commit }: AugmentedActionContext, data: {updUser: User; id: number}) {
    const response = await serverRequest('patch', `user/${data.id}/`, true, data.updUser);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.LOGOUT_USER]({ commit }: AugmentedActionContext) {
    localStorage.clear();
    commit(MutationTypes.SetToken, '');
  },
  async [ActionTypes.USER_DATA]({ commit, rootGetters }: AugmentedActionContext) {
    if (!navigator.onLine) {
      const userData = await offlineStoreService.getUserData();
      if (userData) {
        commit(MutationTypes.SetUser, userData);
      }
    } else {
      const response = await serverRequest('get', 'user-data/', true, undefined, undefined);
      if (isAxiosResponse(response)) {
        if (response.data.results.length > 0) {
          commit(MutationTypes.SetUser, response.data.results[0]);
        }
      }
    }
  },
  async [ActionTypes.GET_USERS]({ commit }: AugmentedActionContext, options?: {search?: string; company?: number; contact_number?: string; page?: number}) {
    let response;
    if (options) {
      response = await serverRequest('get', 'user/', true, undefined, options);
    } else {
      response = await serverRequest('get', 'user/', true, undefined, undefined);
    }
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetUsersCount, response.data.count)
      commit(MutationTypes.SetListOfUsers, response.data.results)
    }
  },
  async [ActionTypes.GET_All_USERS]({ commit }: AugmentedActionContext, user_type?: string) {
    const response = await serverRequest('get', 'user/', true, undefined, {user_type});
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetListOfUsers, response.data.results)
      if (response.data.count > 10) {
        let num = 2;
        while (num <= Math.ceil(response.data.count/10)) {
          const response = await serverRequest('get', 'user/', true, undefined, {user_type, page: num});
          if (isAxiosResponse(response)) {
            if (response.data.results) {
              commit(MutationTypes.AppendUser, response.data.results)
            }
          }
          num += 1;
        }
      }
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
  async [ActionTypes.GET_CUSTOMER_USERS]({ commit, rootGetters }: AugmentedActionContext, options?: {user_type?: string; search?: string; page?: number}) {
    if (!navigator.onLine) {
      let customers: User[] = [];
      if (options && options.user_type) {
        if (options.user_type === 'REGULAR_CUSTOMER') {
          customers = await offlineStoreService.getAllRegularCustomers();
        } else if (options.user_type === 'WALK_IN_CUSTOMER') {
          customers = await offlineStoreService.getWalkInCustomers();
        }
      } else if (options && options.search) {
        const singleCustomer = await offlineStoreService.getRegularCustomerByUsername(options.search);
        if (singleCustomer) customers.push(singleCustomer);
      }
      commit(MutationTypes.SetUsersCount, customers.length);
      commit(MutationTypes.SetListOfUsers, customers);
    } else {
      const response = await serverRequest('get', 'user/', true, undefined, options);
      commit(MutationTypes.SetListOfUsers, {});
      if (isAxiosResponse(response)) {
        if (response.data.results.length > 0) {
          commit(MutationTypes.SetUsersCount, response.data.count)
          const usersData = response.data.results;
          commit(MutationTypes.SetListOfUsers, usersData)
        }
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
  async [ActionTypes.CREATE_JOURNAL_ENTRY]({ commit }: AugmentedActionContext, data: any) {
    const response = await serverRequest('post', `journal-entry/`, true, data);
    if(isAxiosResponse(response)) {
      commit(MutationTypes.SetJournalEntryStatus, response.statusText)
    }
    if(isAxiosError(response)) {
      commit(MutationTypes.SetJournalEntryStatus, {})
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
  async [ActionTypes.FETCH_COMPANIES]({ commit }: AugmentedActionContext, options: {company_type?: string; search?: string; page?: number}) {
    const response = await serverRequest('get', 'company/', true, undefined, options);
    if (isAxiosResponse(response)) {
      if (response.data.results) {
        commit(MutationTypes.SetCompanies, response.data.results)
        commit(MutationTypes.SetCompaniesCount, response.data.count)
      }
    }
    if(isAxiosError(response)) {
      if(response.response && response.response.data){
        commit('setError', response.response.data, {root: true});
      }
    }
  },
  async [ActionTypes.FETCH_ALL_COMPANIES]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'company/', true);
    if (isAxiosResponse(response)) {
      if (response.data.results) {
        commit(MutationTypes.SetCompanies, response.data.results);
        let num = 2;
        while (num <= Math.ceil(response.data.count/10)) {
          const response = await serverRequest('get', 'company/', true, undefined, {page: num});
          if (isAxiosResponse(response)) {
            if (response.data.results) {
              commit(MutationTypes.AppendCompany, response.data.results)
            }
          }
          num += 1;
        }
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
  async [ActionTypes.FETCH_COMPANY]({ commit }: AugmentedActionContext, companyID: number) {
    const response = await serverRequest('get', `company/${companyID}/`, true);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetCompany, response.data)
    }
    if(isAxiosError(response)) {
      commit('setError', `Failed to get company with id: ${companyID}!`, {root: true});
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
  async [ActionTypes.FETCH_VENDORS]({ commit }: AugmentedActionContext, options: {search?: string; page?: number}) {
    let response;
    if (options && options.search) {
      response = await serverRequest('get', 'vendor/', true, undefined, options);
    } else {
      response = await serverRequest('get', 'vendor/', true, undefined, options);
    }
    if (isAxiosResponse(response)) {
      if (response.data.results) {
        commit(MutationTypes.SetVendorsCount, response.data.count)
        commit(MutationTypes.SetListOfVendors, response.data.results)
      }
    }
    if(isAxiosError(response)) {
      if(response.response && response.response.data){
        commit('setError', response.response.data, {root: true});
      }
    }
  },
  async [ActionTypes.FETCH_TRANSACTIONS]({ commit }: AugmentedActionContext, search_criteria: {start_date?: string; end_date?: string; page?: number}) {
    let response;
    if (search_criteria && (search_criteria.start_date && search_criteria.end_date && search_criteria.page==undefined)) {
      search_criteria.page=1;
      response = await serverRequest('get', 'transaction/', true, undefined, search_criteria);
    } else if (search_criteria && search_criteria.page && (search_criteria.start_date && search_criteria.end_date)) {
      response = await serverRequest('get', 'transaction/', true, undefined, search_criteria);
    }
    else if(search_criteria && search_criteria.page &&  (search_criteria.start_date==undefined && search_criteria.end_date==undefined)){
      const date = new Date()
      const now = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      response = await serverRequest('get', 'transaction/', true, undefined, {start_date: now, page: search_criteria.page});
    }
    else{
      const date = new Date()
      const now = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      response = await serverRequest('get', 'transaction/', true, undefined, {start_date: now, page:1});
    }
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetTransactionsCount,response.data.count)
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
  [ActionTypes.SOCKET_notification]({ commit }: AugmentedActionContext, data: Notification) {
    commit(MutationTypes.AppendNotification, data);
  }
};