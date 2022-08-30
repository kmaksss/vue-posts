<template>
  <BContainer class="mt-4 mb-4">
    <h1>{{ listTitle }}</h1>
    <b-list-group v-if="list.length">
      <b-list-group-item v-for="post of list" :key="post.id">
        <post-item :post="post" />
      </b-list-group-item>
    </b-list-group>
    <div v-else>Empty list</div>
  </BContainer>
</template>

<script>
  import { mapGetters } from 'vuex';
  import PostItem from './PostItem.vue';

  export default {
    name: 'PostsList',
    components: { PostItem },
    computed: {
      ...mapGetters('posts', ['isSearch']),
      listTitle() {
        return this.isSearch ? 'Search' : 'Posts';
      },
    },
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>
