import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { User } from '@/store/models/user';
import { state, State } from './state';
import { Company } from "@/store/models/company";

export interface Getters {
  getUser(state: State): User;
  getToken(state: State): string;
  getListOfUsers(state: State): User[];
  getRoles(state: State): any[];
  getCompanies(state: State): Company[];
}

export const getters: GetterTree<State, IRootState> & Getters = {
  getUser: (state: State) => {
    return state.user;
  },
  getToken: (state: State) => {
    return state.token;
  },
  getListOfUsers: (state: State) => {
    return state.listOfUsers;
  },
  getRoles: (state: State) => {
    return state.roles;
  },
  getCompanies: (state: State) => {
    return state.companies;
  }
};