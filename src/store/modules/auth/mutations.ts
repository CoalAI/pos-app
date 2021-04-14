import { MutationTree } from 'vuex'
import { User } from '@/store/models/user';
import { State } from './state'


export enum MutationTypes {
  SetUser = 'SET_USER',
  SetToken = 'SET_TOKEN',
}

export type Mutations = {
  [MutationTypes.SetUser](state: State, user: User): void;
  [MutationTypes.SetToken](state: State, token: string): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SetUser](state, user) {
    state.user = user
  },
  [MutationTypes.SetToken](state, token) {
    state.token = token
  }
}