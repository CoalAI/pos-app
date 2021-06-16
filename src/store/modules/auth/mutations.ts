import { MutationTree } from 'vuex'
import { User } from '@/store/models/user';
import { state, State } from './state'
import { Company } from '@/store/models/company';
import { Transaction } from '@/store/models/transaction';


export enum MutationTypes {
  SetUser = 'SET_USER',
  SetToken = 'SET_TOKEN',
  SetListOfUsers = "SET_LIST_OF_USERS",
  SetListOfVendors = "SET_LIST_OF_VENDORS",
  SetTypes = "SET_TYPES",
  SetCompanies = "SET_COMPANIES",
  SetTransactions = "SET_TRANSACTIONS",
  SetExpense = "SET_EXPENSE",
  SetError = "SET_AUTH_ERROR",
}

export type Mutations = {
  [MutationTypes.SetUser](state: State, user: User): void;
  [MutationTypes.SetToken](state: State, token: string): void;
  [MutationTypes.SetListOfUsers](state: State, users: User[]): void;
  [MutationTypes.SetListOfVendors](state: State, vendors: User[]): void;
  // eslint-disable-next-line
  [MutationTypes.SetTypes](state: State, types: any[]): void;
  [MutationTypes.SetCompanies](state: State, companies: Company[]): void;
  [MutationTypes.SetTransactions](state: State, transactions: Transaction[]): void;
  [MutationTypes.SetExpense](state: State, transactions: Transaction): void;
  [MutationTypes.SetError](state: State, error: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SetUser](state, user) {
    state.user = user;
  },
  [MutationTypes.SetToken](state, token) {
    state.token = token;
  },
  [MutationTypes.SetListOfUsers](state: State, users: User[]) {
    state.listOfUsers = users;
  },
  [MutationTypes.SetListOfUsers](state: State, users: User[]) {
    state.listOfUsers = users;
  },
  [MutationTypes.SetListOfVendors](state: State, vendors: User[]) {
    state.ListOfVendors = vendors;
  },
  // eslint-disable-next-line
  [MutationTypes.SetTypes](state: State, types: any[]) {
    state.types = types;
  },
  [MutationTypes.SetCompanies](state: State, companies: Company[]) {
    state.companies = companies;
  },
  [MutationTypes.SetTransactions](state: State, transactions: Transaction[]) {
    state.transactions = transactions;
  },
  [MutationTypes.SetExpense](state: State, transaction: Transaction) {
    state.expense = transaction
  },
  [MutationTypes.SetError](state: State, error: any) {
    state.error = error;
  }
}