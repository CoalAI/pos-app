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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from '@/store/modules/auth/actions'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore();
    const username = ref('');
    const password = ref('');

    return {
      username,
      password,
      submitLogin: () => store.dispatch(ActionTypes.LOGIN_USER, {
        username: username.value,
        password: password.value
      })
    }
  }
});
</script>

<style lang="scss" scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 1em;
  }

  .col {
    grid-column: 4/10;
    border: 1px solid $white-color;
    border-radius: 10px;
    padding: 4em;

    -webkit-box-shadow: 1px 1px 10px -1px $login-shodow-color;
    -moz-box-shadow: 1px 1px 10px -1px $login-shodow-color;
    box-shadow: 1px 1px 10px -1px $login-shodow-color;
  }

  .pad-label {
    padding:20px;
  }
</style>
