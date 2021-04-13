import { State } from './state'
import { Mutations } from './mutations'
import { Actions } from './actions'
import { Getters  } from './getters'
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
  
export type OrderStoreModuleTypes<S = State> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
  > & {
  commit<
      K extends keyof Mutations,
      P extends Parameters<Mutations[K]>[1]
  >(
      key: K,
      payload?: P,
      options?: CommitOptions
  ): ReturnType<Mutations[K]>;
  } & {
  getters: {
      [K in keyof Getters]: ReturnType<Getters[K]>;
  };
  } & {
  dispatch<K extends keyof Actions>(
      key: K,
      payload?: Parameters<Actions[K]>[1],
      options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};