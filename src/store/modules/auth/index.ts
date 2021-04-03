import { Module } from "vuex";
import { IRootState } from '@/store/models/root';
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state, State } from "./state";

// Module
const auth: Module<State, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default auth;