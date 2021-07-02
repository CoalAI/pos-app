<template>
  <div id="Home">
    <router-view />
    <p class="coaldev-name">Created by CoalDev</p>
    <ErrorHandler v-if="getError"></ErrorHandler>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import ErrorHandler from './common-components/ErrorHandler.vue'

export default defineComponent({
  name: 'App',
  components: {
    ErrorHandler,
  },
  computed: {
    ...mapGetters(['getError'])
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.coaldev-name {
  font-size: 15px;
  color: $coaldev-name-color;
  padding: 0px 0px 5px 20px;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
