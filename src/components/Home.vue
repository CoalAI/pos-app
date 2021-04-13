<template>
  <div class="hello">
    <div v-if="getToken">
      <Header />
      <router-view class="page-mr" />
      <p class="coaldev-name">Created by CoalDev</p>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/auth/actions';

import Header from './common-components/Header.vue';
import Login from './auth/Login.vue';

export default defineComponent({
  name: 'App',
  components: { 
    Header,
    Login,
  },
  computed: {
    ...mapGetters(['getToken'])
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

.page-mr {
  margin: $page-margin;
}
</style>
