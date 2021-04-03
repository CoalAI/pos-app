import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { User } from '@/store/models/user';
import { State } from './state';

export interface Getters {
  getUser(state: State): User;
  getErrors(state: State): any;
  getToken(state: State): string;
}

export const getters: GetterTree<State, IRootState> & Getters = {
  getUser: (state: State) => {
    return state.user;
  },
  getErrors: (state: State) => {
    return state.errors;
  },
  getToken: (state: State) => {
    return state.token;
  }
};