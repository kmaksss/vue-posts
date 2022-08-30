import Vue from 'vue';
import Vuex from 'vuex';
import posts from './modules/posts';
import loaderStore from './modules/loader';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { posts, loaderStore },
});

store.dispatch('initPostsStore');

export default store;
