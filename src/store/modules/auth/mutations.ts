import { MutationTree } from 'vuex'
import { User } from '@/store/models/user';
import { State } from './state'


export enum MutationTypes {
  SetUser = 'SET_USER',
  SetErrors = 'SET_ERRORS',
  SetToken = 'SET_TOKEN',
}

export type Mutations = {
  [MutationTypes.SetUser](state: State, user: User): void;
  [MutationTypes.SetErrors](state: State, errors: any): void;
  [MutationTypes.SetToken](state: State, token: string): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SetUser](state, user) {
    state.user = user
  },
  [MutationTypes.SetErrors](state, errors) {
    state.errors = errors
  },
  [MutationTypes.SetToken](state, token) {
    state.token = token
  }
}