<template>
  <div>
    <div class="row">
      <div class="col">
        <div>Login form</div>
        <form>
          <input
            v-model="username"
            label="Username"
            name="username"
            type="text"
          />

          <input
            v-model="password"
            id="password"
            label="Password"
            name="password"
            type="password"
          />
        </form>
        <button @click="submitLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: mapGetters(['getUser', 'getToken']),
  methods: {
    ...mapActions(['loginUser']),
    submitLogin() {
      this.loginUser({ username: this.username, password: this.password });
    },
  },
};
</script>
