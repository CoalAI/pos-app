import serverRequest from './request';

const getters = {
  getUser: (state) => state.user,
  getErrors: (state) => state.errors,
  getToken: (state) => state.token,
};

const actions = {
  async fetchToken({ commit }) {
    if ('token' in localStorage) {
      if (localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'));
      }
    }
  },

  async loginUser({ commit }, user) {
    const response = await serverRequest('post', 'obtain-jwt/', false, user);
    localStorage.token = response.data.token;
    commit('setToken', response.data.token);
  },

  async registerUser({ commit }, user) {
    const response = await serverRequest('post', 'user/', false, user);
    commit('setUser', response.data);
  },

  async updateUser({ commit }, updUser) {
    const response = await serverRequest('put', `user/${updUser.id}/`, true, updUser);
    commit('setUser', response.data);
  },
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },

  setErrors: (state, errors) => {
    state.errors = errors;
  },

  setToken: (state, token) => {
    state.token = token;
  },
};

const state = {
  user: {},
  token: '',
  errors: null,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
