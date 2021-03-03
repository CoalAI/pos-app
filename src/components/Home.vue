<template>
  <div class="hello">
    <!-- <div v-if="getToken"> -->
      <!-- User In. with {{getToken}} -->
      <!-- <EditOrder/> -->
    <!-- </div> -->
    <!-- <div v-else> -->
      <!-- <Login/> -->
    <!-- </div> -->
    <div>{{msg}}</div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';

// import Login from './auth/Login.vue';
// import EditOrder from './sales/EditOrder.vue';

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  // components: {
  //   Login,
  //   // Order,
  //   EditOrder,
  //   // Report,
  // },
  // methods: {
  //   ...mapActions(['fetchToken']),
  // },
  // computed: {
  //   ...mapGetters(['getToken']),
  // },
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
