import { ActionContext, ActionTree, CommitOptions} from "vuex";
import { IRootState } from '@/store/models/root';
import { User, Credentials } from '@/store/models/user';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/store/modules/request'
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';

export enum ActionTypes {
  FETCH_TOEKN = "FETCH_TOEKN",
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  UPDATE_USER = "UPDATE_USER",
  LOGOUT_USER = "LOGOUT_USER",
  USER_DATA = "USER_DATA",
  GET_USERS = "GET_USERS",
  FETCH_ROLES = "FETCH_ROLES",
  FETCH_COMPANIES = "FETCH_COMPANIES"
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
  [ActionTypes.GET_USERS]({ commit }: AugmentedActionContext): void;
  [ActionTypes.FETCH_ROLES]({ commit }: AugmentedActionContext): void;
  [ActionTypes.FETCH_COMPANIES]({ commit }: AugmentedActionContext): void;
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
  },
  async [ActionTypes.REGISTER_USER]({ commit }: AugmentedActionContext, user: User) {
    const response = await serverRequest('post', 'user/', false, user);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetUser, response.data);
    }
  },
  async [ActionTypes.UPDATE_USER]({ commit }: AugmentedActionContext, updUser: User) {
    const response = await serverRequest('put', `user/${updUser.id}/`, true, updUser);
    if (isAxiosResponse(response)) {
      commit(MutationTypes.SetUser, response.data);
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
  async [ActionTypes.GET_USERS]({ commit }: AugmentedActionContext) {
    const response = await serverRequest('get', 'user/', true, undefined, undefined);
    if (isAxiosResponse(response)) {
      if (response.data.results.length > 0) {
        commit(MutationTypes.SetListOfUsers, response.data.results)
      }
    }
  },
  async [ActionTypes.FETCH_ROLES]({ commit }: AugmentedActionContext) {
    // const response = await serverRequest('get', 'roles/', true, undefined, undefined);
    // if (isAxiosResponse(response)) {
    //   if (response.data.results.length > 0) {
    //     commit(MutationTypes.SetRoles, response.data.results)
    //   }
    // }
    commit(MutationTypes.SetRoles, [
      {
        name: 'Manager'
      },
      {
        name: 'Admin'
      },
      {
        name: 'Super Admin'
      },
      {
        name: 'Sales Staff'
      },
      {
        name: 'Vendor'
      }
    ]);
  },
  async [ActionTypes.FETCH_COMPANIES]({ commit }: AugmentedActionContext) {
    // const response = await serverRequest('get', 'companies/', true, undefined, undefined);
    // if (isAxiosResponse(response)) {
    //   if (response.data.results.length > 0) {
    //     commit(MutationTypes.SetCompanies, response.data.results)
    //   }
    // }
    commit(MutationTypes.SetCompanies, [
      {
        id: 1,
        company_name: 'Rohi Bakers',
        company_type: 'PARENT',
        parent: null
      },
      {
        id: 2,
        company_name: 'Bakery 1',
        company_type: 'RETIAL',
        parent: 1
      },
      {
        id: 3,
        company_name: 'Bakery 2',
        company_type: 'RETIAL',
        parent: 1
      },
    ]);
  },
};