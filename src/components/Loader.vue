<template>
  <transition name="fade">
    <div class="loader-wrap" v-if="isLoading">
      <b-spinner variant="light"></b-spinner>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Loader',
    computed: {
      ...mapGetters(['isLoading']),
    },
  };
</script>

<style scoped>
  .loader-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
    display: grid;
    align-items: center;
    justify-content: center;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
