const loaderStore = {
  state: {
    isLoading: false,
  },
  mutations: {
    TOGGLE_LOADER(state, bool) {
      state.isLoading = bool;
    },
  },
  actions: {
    toggleLoader({ commit }, bool) {
      commit('TOGGLE_LOADER', bool);
    },
  },
  getters: {
    isLoading: ({ isLoading }) => isLoading,
  },
};

export default loaderStore;
