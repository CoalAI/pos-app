import { GetterTree } from "vuex";
import { IRootState } from '@/store/models/root';
import { User } from '@/store/models/user';
import { State } from './state';
import { Company } from "@/store/models/company";
import { Transaction } from "@/store/models/transaction";

export interface Getters {
  getUser(state: State): User;
  getToken(state: State): string;
  getListOfUsers(state: State): User[];
  getListOfVendors(state: State): User[];
  getRoles(state: State): string[];
  getCompanyTypes(state: State): string[];
  getRequestTypes(state: State): string[];
  getCompanies(state: State): Company[];
  // eslint-disable-next-line
  getSignleUser(state: State, id: number): any;
  // eslint-disable-next-line
  getSignleCompany(state: State, id: number): any;
  // eslint-disable-next-line
  getSignleVendor(state: State): any;
  // eslint-disable-next-line
  getTransactions(state: State): Transaction[];
  // eslint-disable-next-line
  getExpense(state: State): Transaction;
  // eslint-disable-next-line
  getAuthFieldError(state: State): any;
  getNotifications(state: State): Notification[];
  // eslint-disable-next-line
  getTotalCounts(state: State): any;
  getInventoryCompanies(state: State): Company[];
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
    for (const object of state.types) {
      if (object.user_type) {
        return object.user_type;
      }
    }
  },
  getCompanyTypes: (state: State) => {
    for (const object of state.types) {
      if (object.company_type) {
        return object.company_type;
      }
    }
  },
  getRequestTypes: (state: State) => {
    for (const object of state.types) {
      if (object.request_type) {
        return object.request_type;
      }
    }
  },
  getCompanies: (state: State) => {
    return state.companies;
  },
  getSignleUser: (state: State) => (id: number) => {
    const user = state.listOfUsers.find((item: User) => item.id && item.id === id);
    return user;
  },
  getSignleCompany: (state: State) => (id: number) => {
    const company = state.companies.find((item: Company) => item.id && item.id === id);
    return company;
  },
  getSignleVendor: (state: State) => (id: number) => {
    const vendor = state.ListOfVendors.find((item: User) => item.id && item.id === id);
    return vendor;
  },
  getTransactions: (state: State) => state.transactions,
  getExpense: (state: State)  => state.expense,
  getAuthFieldError: (state: State) => state.error,
  getNotifications: (state: State) => state.notifications.reverse(),
  getTotalCounts: (state: State) => state.totalCounts,
  getInventoryCompanies: (state: State) => state.companies.filter((item: Company) => item.company_type && item.company_type !== 'VENDOR')
};