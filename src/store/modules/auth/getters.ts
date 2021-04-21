import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { User } from '@/store/models/user';
import { state, State } from './state';
import { Company } from "@/store/models/company";

export interface Getters {
  getUser(state: State): User;
  getToken(state: State): string;
  getListOfUsers(state: State): User[];
  getListOfVendors(state: State): User[];
  getRoles(state: State): any[];
  getCompanies(state: State): Company[];
  // eslint-disable-next-line
  getSignleUser(state: State, id: number): any;
  // eslint-disable-next-line
  getSignleVendor(state: State): any;
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
  getListOfVendors: (state: State) => {
    return state.ListOfVendors;
  },
  getRoles: (state: State) => {
    return state.roles;
  },
  getCompanies: (state: State) => {
    return state.companies;
  },
  getSignleUser: (state: State) => (id: number) => {
    const user = state.listOfUsers.find((item: User) => item.id && item.id === id);
    return user;
  },
  getSignleVendor: (state: State) => (id: number) => {
    const vendor = state.ListOfVendors.find((item: User) => item.id && item.id === id);
    return vendor;
  },
};