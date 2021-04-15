import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { User } from '@/store/models/user';
import { State } from './state';

export interface Getters {
  getUser(state: State): User;
  getToken(state: State): string;
}

export const getters: GetterTree<State, IRootState> & Getters = {
  getUser: (state: State) => {
    return state.user;
  },
  getToken: (state: State) => {
    return state.token;
  }
};