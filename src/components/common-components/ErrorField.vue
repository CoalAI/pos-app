<template>
  <span
  v-for="errorMsg in errorField"
  v-bind:key="errorMsg"
  class="form-error">{{ errorMsg }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorField',
  props: {
    errorField: Array,
  },
});
</script>