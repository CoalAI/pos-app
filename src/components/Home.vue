<template>
  <div class="hello">
    <template v-if="getToken">
      <Header />
      <p class="coaldev-name">Created by CoalDev</p>
    </template>
    <div class="login-main">
      <router-view />
    </div>
    <ErrorHandler v-if="getError"></ErrorHandler>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/auth/actions';

import Header from './common-components/Header.vue';
import ErrorHandler from './common-components/ErrorHandler.vue'

export default defineComponent({
  name: 'App',
  components: { 
    Header,
    ErrorHandler,
  },
  computed: {
    ...mapGetters(['getToken', 'getError'])
  },
  methods: {
    ...mapActions({
      fetchToken: ActionTypes.FETCH_TOEKN
    })
  },
  created() {
    this.fetchToken();
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

.login-main {
  // margin: $page-margin;
  // background:url("../assets/login-back.png") center center fixed;
  // background-repeat: no-repeat;
  // background-size: cover;
}
</style>
