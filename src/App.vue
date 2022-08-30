<template>
  <div id="app">
    <Loader />
    <navbar ref="navbar" />
    <posts-list :list="posts" />
    <emails-list :emails="uniqueEmails" />
    <posts-pagination
      :current-page="currentPage"
      :per-page="postsLimit"
      :total="100"
      @onChangePage="onChangePage"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import PostsList from './components/PostsList.vue';
  import EmailsList from './components/EmailsList.vue';
  import PostsPagination from './components/PostsPagination.vue';
  import Loader from './components/Loader.vue';
  import Navbar from './components/Navbar.vue';

  export default {
    components: { PostsList, PostsPagination, Loader, Navbar, EmailsList },
    name: 'App',
    computed: {
      ...mapGetters('posts', [
        'posts',
        'postsOffset',
        'postsLimit',
        'uniqueEmails',
      ]),
      currentPage() {
        return this.postsOffset / this.postsLimit + 1;
      },
    },
    methods: {
      ...mapActions('posts', ['changePageOffset', 'toggleSearchState']),
      onChangePage(page) {
        const { postsLimit: limit } = this;
        this.changePageOffset(page * limit - limit);
        this.toggleSearchState(false);
        const { navbar } = this.$refs;
        navbar.searchValue && navbar.clearSearchValue();
      },
    },
  };
</script>
