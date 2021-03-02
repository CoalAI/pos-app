<template>
  <div class="hello">
    <div v-if="getToken">
      <!-- User In. with {{getToken}} -->
      <EditOrder/>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';
import Login from './auth/Login.vue';
// import Order from './sales/Order.vue';
import EditOrder from './sales/EditOrder.vue';
// import Report from './sales/Report.vue';

@Component({
  components: {
    Login,
    // Order,
    EditOrder,
    // Report,
  },
  methods: {
    ...mapActions(['fetchToken']),
  },
  computed: {
    ...mapGetters(['getToken']),
  },
})
export default class Home extends Vue {
  @Prop() private msg!: string;
}
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
