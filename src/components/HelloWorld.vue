<template>
  <div>
    <p>Times clicked: {{ count }}</p>
    <button @click="increment">increment</button>
    <p>de.NO_DEALS.TITLE</p>
    <p>Change me again  , please</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    count: 0,
  }),

  methods: {
    increment() {
      this.count += 1;
    },
  },
};
</script>
