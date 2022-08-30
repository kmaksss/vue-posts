<template>
  <div class="m-auto">
    <BPagination
      v-model="currentPageModel"
      :per-page="perPage"
      :total-rows="total"
      prev-text="Prev"
      next-text="Next"
      class="pagination"
    />
  </div>
</template>

<script>
  export default {
    name: 'PostsPagination',
    props: {
      currentPage: {
        type: Number,
        default: 1,
      },
      total: {
        type: Number,
        default: 100,
      },
      perPage: {
        type: Number,
        default: 10,
      },
    },
    computed: {
      currentPageModel: {
        get() {
          return this.currentPage;
        },
        set(value) {
          this.$emit('onChangePage', value);
        },
      },
    },
  };
</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
</style>
