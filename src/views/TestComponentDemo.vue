<template>
  <div class="test-component">
    <TestComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import TestComponent from '@/components/TestComponent.vue';

export default {
  name: 'TestComponentDemo',
  components: {
    TestComponent,
  },
};
</script>
