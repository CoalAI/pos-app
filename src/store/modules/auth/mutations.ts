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
  SetCompany = "SET_COMPANY",
  SetCompanies = "SET_COMPANIES",
  SetTransactions = "SET_TRANSACTIONS",
  SetExpense = "SET_EXPENSE",
  SetJournalEntryStatus = 'SET_JOURNAL_ENTRY_STATUS',
  SetError = "SET_AUTH_ERROR",
  AppendNotification = "APPEND_NOTIFICATION",
  AppendUser = "APPEND_USER",
  AppendCompany = "APPEND_COMPANY",
  SetUsersCount = "SetUsersCount",
  SetCompaniesCount = "SetCompaniesCount",
  SetTransactionsCount = "SetTransactionsCount",
  SetVendorsCount = "SetVendorsCount",
}

export type Mutations = {
  [MutationTypes.SetUser](state: State, user: User): void;
  [MutationTypes.SetToken](state: State, token: string): void;
  [MutationTypes.SetListOfUsers](state: State, users: User[]): void;
  [MutationTypes.SetListOfVendors](state: State, vendors: User[]): void;
  // eslint-disable-next-line
  [MutationTypes.SetTypes](state: State, types: any[]): void;
  [MutationTypes.SetCompany](state: State, company: Company): void;
  [MutationTypes.SetCompanies](state: State, companies: Company[]): void;
  [MutationTypes.SetTransactions](state: State, transactions: Transaction[]): void;
  [MutationTypes.SetExpense](state: State, transactions: Transaction): void;
  [MutationTypes.SetError](state: State, error: any): void;
  [MutationTypes.AppendNotification](state: State, notification: Notification): void;
  [MutationTypes.AppendCompany](state: State, companies: Company[]): void;
  [MutationTypes.AppendUser](state: State, users: User[]): void;
  [MutationTypes.SetUsersCount](state: State, count: number): void;
  [MutationTypes.SetCompaniesCount](state: State, count: number): void;
  [MutationTypes.SetTransactionsCount](state: State, count: number): void;
  [MutationTypes.SetVendorsCount](state: State, count: number): void;
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
  [MutationTypes.SetCompany](state: State, company: Company) {
    state.company = company;
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
  [MutationTypes.SetJournalEntryStatus](state: State, je_status: string) {
    state.journal_entry_status = je_status
  },
  [MutationTypes.SetError](state: State, error: any) {
    state.error = error;
  },
  [MutationTypes.AppendNotification](state: State, notification: Notification) {
    state.notifications.push(notification);
  },
  [MutationTypes.AppendCompany](state: State, companies: Company[]) {
    state.companies = [
      ...state.companies,
      ...companies
    ]
  },
  [MutationTypes.AppendUser](state: State, users: User[]) {
    state.listOfUsers = [
      ...state.listOfUsers,
      ...users
    ]
  },
  [MutationTypes.SetUsersCount](state: State, count: number) {
    state.totalCounts.users = count;
  },
  [MutationTypes.SetCompaniesCount](state: State, count: number) {
    state.totalCounts.companies = count;
  },
  [MutationTypes.SetTransactionsCount](state: State, count: number) {
    state.totalCounts.transactions = count;
  },
  [MutationTypes.SetVendorsCount](state: State, count: number) {
    state.totalCounts.vendors = count;
  },
}