import { MutationTree } from 'vuex'
import { User } from '@/store/models/user';
import { State } from './state'
import { Company } from '@/store/models/company';


export enum MutationTypes {
  SetUser = 'SET_USER',
  SetToken = 'SET_TOKEN',
  SetListOfUsers = "SET_LIST_OF_USERS",
  SetRoles = "SET_ROLES",
  SetCompanies = "SET_COMPANIES",

}

export type Mutations = {
  [MutationTypes.SetUser](state: State, user: User): void;
  [MutationTypes.SetToken](state: State, token: string): void;
  [MutationTypes.SetListOfUsers](state: State, users: User[]): void;
  [MutationTypes.SetRoles](state: State, roles: any[]): void;
  [MutationTypes.SetCompanies](state: State, companies: Company[]): void;
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
  [MutationTypes.SetRoles](state: State, roles: any[]) {
    state.roles = roles;
  },
  [MutationTypes.SetCompanies](state: State, companies: Company[]) {
    state.companies = companies;
  }
}