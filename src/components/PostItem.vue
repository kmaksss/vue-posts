<template>
  <div class="post">
    <b>{{ post.id }}. </b>
    <span>{{ post.title }}</span>
  </div>
</template>

<script>
  export default {
    name: 'PostItem',
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
  };
</script>
