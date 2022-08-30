import axios from '@/plugins/axios';

const postsStore = {
  namespaced: true,
  state: {
    isSearch: false,
    postsOffset: 0,
    postsLimit: 10,
    posts: [],
    uniqueEmails: [],
  },
  mutations: {
    POSTS(state, value) {
      state.posts = value;
    },
    SET_OFFSET(state, value) {
      state.postsOffset = value;
    },
    SET_EMAILS(state, value) {
      state.uniqueEmails = value;
    },
    TOGGLE_SEARCH(state, bool) {
      state.isSearch = bool;
    },
  },
  actions: {
    initPostsStore: {
      handler({ dispatch }) {
        dispatch('fetchPosts');
      },
      root: true,
    },
    async fetchPosts({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const { postsOffset, postsLimit } = getters;
        const params = { _start: postsOffset, _limit: postsLimit };
        const response = await axios.get('/posts', { params });
        commit('POSTS', response);
      } catch (e) {
        console.log(e);
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    changePageOffset({ commit, dispatch }, value) {
      commit('SET_OFFSET', value);
      dispatch('fetchPosts');
    },
    async searchPosts({ commit, dispatch }, query) {
      try {
        dispatch('toggleLoader', true, { root: true });
        let response = await axios.get(`/posts?title_like=${query}`);

        if (response.length < 10) {
          const postIds = response.map(post => post.id);
          const responses = postIds.reduce((acc, cur) => {
            acc.push(axios.get(`/posts/${cur}/comments`));
            return acc;
          }, []);

          const emails = (await Promise.all(responses)).reduce((acc, cur) => {
            const emails = cur.map(item => item.email);
            acc.push(...emails);
            return acc;
          }, []);

          const uniqueEmails = [...new Set(emails)];
          commit('SET_EMAILS', uniqueEmails);
        } else {
          commit('SET_EMAILS', []);
        }

        commit('POSTS', response);
      } catch (e) {
        console.log(e);
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    toggleSearchState({ commit }, bool) {
      !bool && commit('SET_EMAILS', []);
      commit('TOGGLE_SEARCH', bool);
    },
  },
  getters: {
    postsOffset: ({ postsOffset }) => postsOffset,
    postsLimit: ({ postsLimit }) => postsLimit,
    posts: ({ posts }) => posts,
    isSearch: ({ isSearch }) => isSearch,
    uniqueEmails: ({ uniqueEmails }) => uniqueEmails,
  },
};

export default postsStore;
