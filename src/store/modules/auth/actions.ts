import { ActionContext, ActionTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { User } from '@/store/models/user';
import serverRequest from '@/store/modules/request'
import { Mutations, MutationTypes } from "./mutations";
import { State } from './state';

export enum ActionTypes {
  FETCH_TOEKN = "FETCH_TOEKN",
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  UPDATE_USER = "UPDATE_USER"
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, IRootState>, "commit">;

export interface Actions {
  [ActionTypes.FETCH_TOEKN]({ commit }: AugmentedActionContext): void;
  [ActionTypes.LOGIN_USER]({ commit }: AugmentedActionContext, user: User): void;
  [ActionTypes.REGISTER_USER]({ commit }: AugmentedActionContext, user: User): void;
  [ActionTypes.UPDATE_USER]({ commit }: AugmentedActionContext, updUser: User): void;
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
  async [ActionTypes.LOGIN_USER]({ commit }: AugmentedActionContext, user: User) {
    const response = await serverRequest('post', 'obtain-jwt/', false, user);
    localStorage.token = response.data.token;
    commit(MutationTypes.SetToken, response.data.token);
  },
  async [ActionTypes.REGISTER_USER]({ commit }: AugmentedActionContext, user: User) {
    const response = await serverRequest('post', 'user/', false, user);
    commit(MutationTypes.SetUser, response.data);
  },
  async [ActionTypes.UPDATE_USER]({ commit }: AugmentedActionContext, updUser: User) {
    const response = await serverRequest('put', `user/${updUser.id}/`, true, updUser);
    commit(MutationTypes.SetUser, response.data);
  }
};