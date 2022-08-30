<template>
  <header class="header">
    <BNavbar type="dark" variant="dark" class="navbar">
      <BContainer>
        <BFormInput
          class="mr-sm-2 search-input"
          placeholder="Search"
          v-model="searchValue"
          debounce="800"
        ></BFormInput>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'Navbar',
    data: () => ({
      searchValue: '',
    }),
    watch: {
      searchValue: 'onSearchValue',
    },
    methods: {
      ...mapActions('posts', [
        'searchPosts',
        'fetchPosts',
        'toggleSearchState',
      ]),
      onSearchValue(val) {
        if (val) {
          this.searchPosts(val);
          this.toggleSearchState(true);
        } else {
          this.fetchPosts();
          this.toggleSearchState(false);
        }
      },
      clearSearchValue() {
        this.searchValue = '';
      },
    },
  };
</script>
