<template>
  <div class="hello">
    <template v-if="getToken">
      <Header />
    </template>
    <div class="login-main">
      <router-view />
      
    </div>
    
    <ErrorHandler v-if="getError"></ErrorHandler>
    <Loader v-if="getSync" message="Syncing Data for offline mode. Please wait." ></Loader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/auth/actions';

import Header from './common-components/Header.vue';
import ErrorHandler from './common-components/ErrorHandler.vue';
import Loader from './common-components/Loader.vue';

export default defineComponent({
  name: 'App',
  components: { 
    Header,
    ErrorHandler,
    Loader,
  },
  computed: {
    ...mapGetters(['getToken', 'getError', 'getSync'])
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


.login-main {
  // margin: $page-margin;
  // background:url("../assets/login-back.png") center center fixed;
  // background-repeat: no-repeat;
  // background-size: cover;
}
</style>
