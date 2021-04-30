import { ActionContext, ActionTree, CommitOptions} from "vuex";
import { IRootState } from '@/store/models/root';
import { User, Credentials } from '@/store/models/user';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/store/modules/request'
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';
import { Company } from '@/store/models/company';

export enum ActionTypes {
  FETCH_TOEKN = "FETCH_TOEKN",
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  UPDATE_USER = "UPDATE_USER",
  LOGOUT_USER = "LOGOUT_USER",
  USER_DATA = "USER_DATA",
  GET_USERS = "GET_USERS",
  FETCH_ROLES = "FETCH_ROLES",
  FETCH_COMPANIES = "FETCH_COMPANIES",
  CREATE_COMPANY = "CREATE_COMPANY",
  UPDATE_COMPANY = "UPDATE_COMPANY",
  DELETE_COMPANY = "DELETE_COMPANY",
  FETCH_VENDORS = "FETCH_VENDORS"
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
  [ActionTypes.GET_USERS]({ commit }: AugmentedActionContext, search: string): void;
  [ActionTypes.FETCH_ROLES]({ commit }: AugmentedActionContext): void;
  [ActionTypes.FETCH_COMPANIES]({ commit }: AugmentedActionContext, options: {company_type?: string; search?: string}): void;
  [ActionTypes.CREATE_COMPANY]({ commit }: AugmentedActionContext, company: Company): void;
  [ActionTypes.UPDATE_COMPANY]({ commit }: AugmentedActionContext, company: Company): void;
  [ActionTypes.DELETE_COMPANY]({ commit }: AugmentedActionContext, companyID: number): void;
  [ActionTypes.FETCH_VENDORS]({ commit }: AugmentedActionContext, search: string): void;
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
        commit('setError', response.response.data, {root: true});
      }
    }
  },
  async [ActionTypes.REGISTER_USER]({ commit }: AugmentedActionContext, user: User) {
    const response = await serverRequest('post', 'create/user/', true, user);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
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
        commit(MutationTypes.SetUser, response.data.results[0])
      }
    }
  },
  async [ActionTypes.GET_USERS]({ commit }: AugmentedActionContext, search: string) {
    let response;
    if (search) {
      response = await serverRequest('get', 'user/', true, undefined, {search: search});
    } else {
      response = await serverRequest('get', 'user/', true, undefined, undefined);
    }
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0) {
        commit(MutationTypes.SetListOfUsers, response.data.results)
      }
    }
  },
  async [ActionTypes.FETCH_ROLES]({ commit }: AugmentedActionContext) {
    // const response = await serverRequest('get', 'user-type/', true, undefined, undefined);
    // if (isAxiosResponse(response)) {
    //   if (response.data.results.length > 0) {
    //     commit(MutationTypes.SetRoles, response.data.results)
    //   }
    // }
    commit(MutationTypes.SetRoles, [
      {
        user_type: 'SALES_STAFF'
      },
      {
        user_type: 'ADMIN'
      },
      {
        user_type: 'SUPER_ADMIN'
      },
      {
        user_type: 'VENDOR'
      },
      {
        user_type: 'WALK_IN_CUSTOMER'
      }
    ]);
  },
  async [ActionTypes.FETCH_COMPANIES]({ commit }: AugmentedActionContext, options: {company_type?: string; search?: string}) {
    const response = await serverRequest('get', 'company/', true, undefined, options);
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0) {
        commit(MutationTypes.SetCompanies, response.data.results)
      }
    }
    if(isAxiosError(response)) {
      commit('setError', response.response?.data, {root: true});
    }
  },
  async [ActionTypes.CREATE_COMPANY]({ commit }: AugmentedActionContext, company: Company) {
    const response = await serverRequest('post', `company/`, true, company);
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
    }
  },
  async [ActionTypes.UPDATE_COMPANY]({ commit }: AugmentedActionContext, company: Company) {
    const response = await serverRequest('patch', `company/${company.id}/`, true, company);
    if(isAxiosError(response)) {
      commit('setError', response.message, {root: true});
    }
  },
  async [ActionTypes.DELETE_COMPANY]({ commit }: AugmentedActionContext, companyID: number) {
    const response = await serverRequest('delete', `company/${companyID}/`, true);
    if(isAxiosError(response)) {
      commit('setError', response, {root: true});
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
      commit('setError', response.response?.data, {root: true});
    }
  }
};