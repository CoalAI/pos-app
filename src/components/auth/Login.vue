<template>
  <div>
    <h1 class="text-center">CoalDev POS</h1>
    <!-- <img src="../../assets/logo.png" alt="coaldev"> -->
    <div class="wrapper mr-6">
      <div class="col">
        <form>
          <div class="flex-box">
            <label class="pad-label" for="username">
              <strong>Username:</strong>
            </label>
            <input
              v-model="username"
              label="Username"
              name="username"
              type="text"
              placeholder="Enter Username"
            />
          </div>
          <div class="flex-box">
            <label class="pad-label" for="password">
              <strong>Password:</strong>
            </label>
            <input
              v-model="password"
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </div>
        </form>
        <button class="btn btn-orange btn-lg"
        @click="submitLogin">Login</button>
        <a href="forgetpassword">
          <span>Forget Password?</span>
        </a>
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

<style scoped>
  .col {
    grid-column: 4/10;
    border: 1px solid #ffffff;
    border-radius: 10px;
    padding: 4em;

    -webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,0.75);
    box-shadow: 1px 1px 10px -1px rgba(0,0,0,0.75);
  }

  .pad-label {
    padding:20px;
  }
</style>
