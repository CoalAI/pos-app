<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="getToken">
      User In. with {{getToken}}
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Login from './auth/Login.vue';

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  components: {
    Login,
  },
  methods: {
    ...mapActions(['fetchToken']),
  },
  computed: {
    ...mapGetters(['getToken']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
