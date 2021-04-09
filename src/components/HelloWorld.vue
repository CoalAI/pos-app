<template>
  <div>
    <p> {{ msg }}</p>
    <p>Times clicked: {{ count }}</p>
    <button @click="increment">increment</button>
    <p>de.NO_DEALS.TITLE</p>
    <p>Change me again, please</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      count: 0
    }
  },
  props: ['msg'],
  methods: {
    increment() {
      this.count += 1;
    },
  },
});
</script>