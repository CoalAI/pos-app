import serverRequest from './request';

const getters = {
  getUser: (state: any) => state.user,
  getErrors: (state: any) => state.errors,
  getToken: (state: any) => state.token,
};

const actions = {
  async fetchToken({ commit }: any) {
    if ('token' in localStorage) {
      if (localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'));
      }
    }
  },

  async loginUser({ commit }: any, user: any) {
    const response = await serverRequest('post', 'obtain-jwt/', false, user);
    localStorage.token = response.data.token;
    commit('setToken', response.data.token);
  },

  async registerUser({ commit }: any, user: any) {
    const response = await serverRequest('post', 'user/', false, user);
    commit('setUser', response.data);
  },

  async updateUser({ commit }: any, updUser: any) {
    const response = await serverRequest('put', `user/${updUser.id}/`, true, updUser);
    commit('setUser', response.data);
  },
};

const mutations = {
  setUser: (state: any, user: any) => {
    state.user = user;
  },

  setErrors: (state: any, errors: any) => {
    state.errors = errors;
  },

  setToken: (state: any, token: any) => {
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
