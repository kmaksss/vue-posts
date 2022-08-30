<template>
  <BContainer v-if="emails.length">
    <h2>Unique emails</h2>
    <ul class="emails">
      <li v-for="(email, idx) in emails" :key="idx" class="email">
        {{ email }}
      </li>
    </ul>
  </BContainer>
</template>

<script>
  export default {
    name: 'EmailsList',
    props: {
      emails: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style scoped>
  .emails {
    padding-left: 0;
    margin-top: 10px;
  }
  .email {
    font-size: 0.8rem;
    list-style: none;
    line-height: 2;
  }
</style>
