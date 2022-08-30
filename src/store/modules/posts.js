import axios from '@/plugins/axios';

const postsStore = {
  namespaced: true,
  state: {
    postsOffset: 0,
    postsLimit: 10,
  },
  mutations: {},
  actions: {
    async fetchPosts({ getters }) {
      const { postsOffset, postsLimit } = getters;
      const params = { _start: 5, _limit: 5 };
      const response = await axios.get('/posts', { params });
      console.log(response);
    },
  },
  getters: {
    postsOffset: ({ postsOffset }) => postsOffset,
    postsLimit: ({ postsLimit }) => postsLimit,
  },
};

export default postsStore;
