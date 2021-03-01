<template>
  <div class="hello">
    <div v-if="getToken">
      <!-- User In. with {{getToken}} -->
      <User/>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Login from './auth/Login.vue';
// import Order from './sales/Order.vue';
// import EditOrder from './sales/EditOrder.vue';
// import Report from './sales/Report.vue';
// import Product from './sales/Product.vue';
// import Batch from './sales/Batch.vue';
import User from './sales/User.vue';

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  components: {
    Login,
    // Order,
    // EditOrder,
    // Report,
    // Product,
    // Batch,
    User,
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
