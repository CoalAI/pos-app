<template>
  <div class="hello">
    <div v-if="getToken">
      <Header />
      <router-view />
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from '@/store/modules/auth/actions'

import Header from './sales/Header.vue';
import Login from './auth/Login.vue';

export default defineComponent({
  name: 'App',
  components: { 
    Header,
    Login,
  },
  created() {
    const store = useStore();
    store.dispatch(ActionTypes.FETCH_TOEKN)
  },
  setup() {
    const store = useStore();

    return {
      getToken: computed(() => store.getters.getToken)
    }
  }
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
a {
  color: #42b983;
}
</style>
