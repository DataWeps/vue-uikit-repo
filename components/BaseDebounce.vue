<template>
  <input v-if="tag === 'input'" v-model="model" />
  <select v-else-if="tag === 'select'" v-model="model">
    <slot />
  </select>
  <textarea v-else-if="tag === 'textarea'" v-model="model"></textarea>
</template>

<script>
import { debounce } from 'lodash';

export default {
  props: {
    tag: {
      type: String,
      default: 'input',
    },
    delay: {
      type: Number,
      default: 500,
    },
    value: {},
  },
  data() {
    return {
      model: this.value,
      unwatch: undefined,
    };
  },
  methods: {
    watch() {
      if (this.unwatch) this.unwatch();

      this.unwatch = this.$watch(
        'model',
        debounce((v) => this.$emit('input', v), this.delay)
      );
    },
  },
  watch: {
    value(value) {
      this.model = value;
    },
    delay() {
      this.watch();
    },
  },
  mounted() {
    this.watch();
  },
};
</script>
