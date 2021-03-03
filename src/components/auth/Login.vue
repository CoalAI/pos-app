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

// import { Component, Prop, Vue } from 'vue-property-decorator';
// import { mapGetters, mapActions } from 'vuex';

// @Component({
//   computed: mapGetters(['getUser', 'getToken']),
// })
// export default class Login extends Vue {
//   private userName: string;
//   private password: string;

//   loginUser: any;

//   constructor() {
//     super();
//     this.loginUser = mapActions(['loginUser']);
//     this.userName = '';
//     this.password = '';
//   }

//   // data() : {username:string, password:string} {
//   //   return {
//   //     username: '',
//   //     password: '',
//   //   };
//   // }

//   submitLogin() {
//     this.loginUser({ username: this.userName, password: this.password });
//   }
// }
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
