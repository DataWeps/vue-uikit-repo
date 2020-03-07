<template>
  <div>
    <h1 v-text="title"></h1>
    <p v-text="dateTime"></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TestComponent',
  data() {
    return {
      title: 'Test component',
    };
  },
  computed: {
    dateTime() {
      return new Date();
    },
  },
});
</script>

<style scoped>
</style>