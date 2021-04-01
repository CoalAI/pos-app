import { ActionContext, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from 'axios';
import { IRootState } from '@/store/models/root';
import { User, Credentials } from '@/store/models/user';
import serverRequest, { isAxiosResponse } from '@/store/modules/request'
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';

export enum ActionTypes {
  FETCH_TOEKN = "FETCH_TOEKN",
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  UPDATE_USER = "UPDATE_USER",
  LOGOUT_USER = "LOGOUT_USER",
  USER_DATA = "USER_DATA"
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, IRootState>, "commit">;

export interface Actions {
  [ActionTypes.FETCH_TOEKN]({ commit }: AugmentedActionContext): void;
  [ActionTypes.LOGIN_USER]({ commit }: AugmentedActionContext, credentials: Credentials): void;
  [ActionTypes.REGISTER_USER]({ commit }: AugmentedActionContext, user: User): void;
  [ActionTypes.UPDATE_USER]({ commit }: AugmentedActionContext, updUser: User): void;
  [ActionTypes.LOGOUT_USER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.USER_DATA]({ commit }: AugmentedActionContext): void;
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
  }
};